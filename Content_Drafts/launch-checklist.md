# Launch checklist

Prepared 2026-10-04. Decisions so far: **Archery and Kirtan Vidyala go live,
Santhiya becomes coming soon, shaheedibunga.com replaces the Google Sites.**
Hosting was deliberately left open.

## Done

- **Santhiya is coming soon.** Its route and all five nav links are gone; the
  panel's own markup is untouched in the page, so it comes back by restoring
  one line in `PANELS` and its nav links. `?vid` retired with it — it would
  have thrown on a missing panel, the way `?vidk` did.
- **Drafts kept out of search.** A `noindex` meta on all 31 other HTML files,
  plus a `robots.txt`. Nothing deleted, every existing link still works.
  `Mockup/parikrama.html` deliberately has **no** meta: it is the source of
  the live page and the build would inherit it.

  **The noindex metas are doing all the work today.** Crawlers read robots.txt
  from the host root, and on a project site this one sits at a sub-path:
  `schoolshaheedi.github.io/robots.txt` is a 404 and that is the file that
  counts. It starts working the day the site answers on its own domain. Worth
  re-checking after the move that it is reachable at `/robots.txt`.

## Blocked on someone else

### Cloudflare — the account is not visible yet

`wrangler whoami` on this Mac shows only **`13hartegsingh@gmail.com's Account`**,
which holds the Saarang client sites (Patel Brothers, Jannats Bakery, Punjabi
Poppets…). The Shaheedi Bunga account is not listed, so **any deploy from here
today would go to the client account.**

Before any Cloudflare work: accept the invite, then re-run `wrangler login` so
both accounts appear, and confirm the account id before deploying. Both logins
are on the same email, so the account must be chosen explicitly every time —
never let a deploy pick the default.

### DNS — this is the irreversible one

Pointing `shaheedibunga.com` at the new site **takes the Google Sites down as
the public face of the charity.** Worth being deliberate about:

- ~~The Google Sites has Resources, a Gallery and a Contact Us page that the
  new site lacks.~~ **Closed 2026-10-05.** `/resources/`, `/gallery/` and
  `/contact/` are built: all 44 granths, pothis and talks listed with sizes
  and linked to the same Drive folders; 88 photographs; and contact details
  the old site never actually carried — it said only "Shaheedi Bunga
  Leicester, UK".
- Still worth checking before the switch: whether anything else on the Google
  Sites is relied on that nobody has mentioned.
- Safer order: put the new site on a subdomain, check it on the real domain
  with real devices, then switch the apex when Ustad Ji is happy.

## To do at launch, once the domain is settled

- **Four absolute URLs change.** `saaj/dilruba/index.html` hardcodes
  `schoolshaheedi.github.io` in its canonical, `og:url`, `og:image` and
  `twitter:image`. On the new domain the share card silently stops working —
  the image 404s and the card goes blank. Grep for `schoolshaheedi.github.io`.
- **The main site has no share card at all.** Only the Kirtan link has one.
  Sharing `shaheedibunga.com` itself will show a bare link. Needs the final
  domain before it can be written.
- **A sitemap** is worth adding once the domain is fixed, not before: one
  naming the wrong host is worse than none.
- **The page is 11MB.** Everything is inlined into one file, which is why it
  has no loading flicker — but it is a heavy first visit on mobile data. Fine
  for a mockup, worth a conversation before it is the charity's front door.

## Still open from before

- `Content_Drafts/archery-to-confirm.md` — the league table question is
  closed; nothing outstanding there now.

## Worth building next: a /classes/ page

"Find a class" on the home page now points at `/contact/`, which names both
gurdware and what runs at each. It does not give times, and times are what
someone clicking that button wants.

Everything needed already exists, in two places:

- Kirtan Vidyala — nine a week at Gipsy Lane, in the `DTT` array in
  `Mockup/parikrama.html`
- Archery Akhara — Sundays 2.30-4pm at East Park Road
- Santhiya — coming soon

The catch is drift: that would be a third copy of the same times. If it is
built, it should read from one source rather than restate them.

---

## /classes/ — built 8 Oct 2026

The note below said a classes page would be better than sending "Find a class"
to Contact, and warned it would become a third copy of the timetable. It is
built, and it avoids that: **it carries no times of its own.** Each class says
what it is and which gurdwara it is at, and the live ones link to their own
page for the times. The only numbers on it are "nine classes a week" (a count,
already on Contact) and "Sundays" (a day, already everywhere).

Six vidyale, taken from the hidden All-pages menu in `index.html` so the two
lists cannot disagree: Kirtan Vidyala and the Archery Akhara link to their
pages; Santhiya, Tabla & Jori, Katha and Itihaas show a "page being written"
panel instead of a photograph — a stand-in image would imply there is
somewhere to click.

Santhiya and Tabla & Jori are marked **Running**, because Contact and About
both say they run; Katha and Itihaas carry no such claim, because nothing in
the repo establishes whether they run weekly. **Worth asking Ustad Ji**, along
with whether Katha and Itihaas should be listed at all yet.

"Classes" was added to the shared nav on all seven content pages, and
`/classes/` to the sitemap. Without the nav entry the page would have been
reachable only from the hero button.
