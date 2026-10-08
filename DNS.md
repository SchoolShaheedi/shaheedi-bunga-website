# DNS — making shaheedibunga.com work without the www

**Status on 8 October 2026:** `www.shaheedibunga.com` works. `shaheedibunga.com`
on its own does **not** — it hangs for about 75 seconds and then fails.

Everything below is done at **Namecheap**, because that is where the domain's
nameservers are (`dns1.registrar-servers.com` / `dns2.registrar-servers.com`).
I have no login there, so this is a job for whoever holds the Namecheap account.

---

## Read this part before you touch anything

The apex record set also carries **the charity's email**. Deleting the wrong row
takes `@shaheedibunga.com` email offline, and that is a far worse outcome than a
domain that needs a `www`.

**Leave these completely alone:**

| Type | Host | Value | What it is |
|---|---|---|---|
| MX | `@` | `smtp.google.com` (priority 1) | **Your email.** Delete this and mail stops. |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | Stops your mail being marked as spam. |
| TXT | `@` | `google-site-verification=I1DRLGd-…` | Proves you own the domain to Google. |
| TXT | `@` | `google-site-verification=oi6q6fDH…` | The same, a second one. |
| CNAME | `www` | `shaheedi-bunga.github.io` | **This is what makes the site work today.** |

You are changing **only the A and AAAA records on `@`**. Nothing else.

---

## What is wrong

`shaheedibunga.com` currently points at **192.64.119.112**, which is a Namecheap
parking server. The domain was never repointed at GitHub after the site moved
there. There is also an AAAA (IPv6) record, `64:ff9b::c040:7770`, which is the
same parking address written the IPv6 way — so it has to go too, or visitors on
IPv6 connections keep hitting the dead server even after the A records are fixed.

`www` was done properly and works. That is why the site is reachable at all.

---

## The change

### 1. Open the editor

Namecheap → sign in → **Domain List** → **Manage** next to `shaheedibunga.com`
→ the **Advanced DNS** tab. You will see a table called *Host Records*.

### 2. Delete two rows

Find the row with **Type `A Record`**, **Host `@`**, **Value `192.64.119.112`**.
Delete it (bin icon on the right).

Find the row with **Type `AAAA Record`**, **Host `@`**. Delete that one too.

If a row says `URL Redirect Record` on Host `@`, delete that as well — it does
the same job as the parking page.

> If you cannot see an AAAA row in the panel, that is fine — Namecheap sometimes
> synthesises it. Do the A records and re-check afterwards with step 5.

### 3. Add four A records

**Add New Record** → `A Record`, four times. Same Host, same TTL, different value:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |

All four are correct and all four are needed — they are GitHub's four Pages
servers, and having all of them means the site stays up when one is down. They
differ only in the third number: 108, 109, 110, 111.

### 4. Optionally add four AAAA records

Only if you want the apex to work over IPv6 as well. Not required; skip it if
the panel makes it awkward.

| Type | Host | Value |
|---|---|---|
| AAAA Record | `@` | `2606:50c0:8000::153` |
| AAAA Record | `@` | `2606:50c0:8001::153` |
| AAAA Record | `@` | `2606:50c0:8002::153` |
| AAAA Record | `@` | `2606:50c0:8003::153` |

### 5. Save, then wait

Click the green tick on each row to save. Namecheap says 30 minutes; in practice
allow a few hours, and up to 24 before worrying.

To check from a Mac Terminal:

```
dig +short shaheedibunga.com A
```

Right when it is working, that prints the four `185.199.…` addresses and nothing
else. Then:

```
curl -sI https://shaheedibunga.com/ | head -1
```

### 6. Let GitHub issue the certificate

Once DNS has moved, GitHub needs to issue an HTTPS certificate covering the
bare domain. Go to the repository → **Settings** → **Pages**. If *Enforce HTTPS*
is greyed out, that is normal while the certificate is being issued — leave it
an hour and come back, then make sure it is ticked.

---

## What you will get

`shaheedibunga.com` will redirect to `https://www.shaheedibunga.com`. That is the
right behaviour and it is automatic: GitHub reads the `CNAME` file in this
repository, which says `www.shaheedibunga.com`, and treats that as the real
address. Do not delete or edit that file.

## Why it matters

- Most people type a domain without the `www`. Today every one of them waits
  75 seconds and gives up.
- Anything printed — a poster, a flyer, a business card — almost always shows the
  short form.
- Search engines treat the two as separate sites. The redirect joins them, so the
  site gets credit for both.

---

## If it does not work

| What you see | What it means |
|---|---|
| Still the old parking page | Caching. Try a phone on mobile data, not the home wifi. |
| `dig` still shows `192.64.119.112` | A record was not saved, or an old row is still there. |
| Browser warns about the certificate | Step 6 — GitHub has not issued it yet. Wait, then re-check. |
| **Email stops** | A record was deleted that should not have been. Put the MX row back: Type `MX Record`, Host `@`, Value `smtp.google.com`, Priority `1`. |
