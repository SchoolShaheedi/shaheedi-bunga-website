# Launch checklist

Prepared 2026-10-04. Decisions so far: **Archery and Kirtan Vidyala go live,
Santhiya becomes coming soon, shaheedibunga.com replaces the Google Sites.**
Hosting was deliberately left open.

## Done

- **Santhiya is coming soon.** Its route and all five nav links are gone; the
  panel's own markup is untouched in the page, so it comes back by restoring
  one line in `PANELS` and its nav links. `?vid` retired with it — it would
  have thrown on a missing panel, the way `?vidk` did.
- **Drafts kept out of search.** `robots.txt` plus a `noindex` meta on all 31
  other HTML files. Nothing deleted, every existing link still works.
  `Mockup/parikrama.html` deliberately has **no** meta: it is the source of
  the live page and the build would inherit it.

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

- The Google Sites has **Resources** (Granth and Pothi Drive folders,
  presentations) and a **Gallery** (two Google Photos albums) and a
  **Contact Us** page. The new site has none of these. Switching the domain
  loses them unless they are rebuilt or linked.
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
