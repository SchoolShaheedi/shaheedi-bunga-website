# Archery page — two things to check with Ustad Ji

Raised 2026-09-20. Harteg does not do archery, so neither of these is his to
answer. **Item 1 is still live on the public site and still unanswered.** Item 2 was
answered on 2026-09-20 and is done.

---

## 1. ~~Fifteen archers are named~~ — RESOLVED 2026-09-20

> **Answered.** Ustad Ji said to take the table out altogether; a new one goes
> in when the new league starts.

The standings table listed fifteen archers in full with their weekly scores,
under a note — itself public — asking that they confirm first. Ustad Ji's
answer settles it: the table is gone from the page, and the note with it.

**The names are not repeated here.** This file is inside the repo, and the
repo is served by GitHub Pages: it was fetchable at
`schoolshaheedi.github.io/shaheedi-bunga-website/Content_Drafts/archery-to-confirm.md`
and returned a 200 with the roster in it. Writing the names down to record
that they should not be published would have published them.

For the same reason the table was **deleted rather than commented out**. An
HTML comment ships to every visitor; view source would have carried the
fifteen names exactly as the table did.

**To restore it when the new league starts:** the markup and the full roster
are in git history, in `Mockup/parikrama.html` immediately before commit
`357b449`. `git show <that commit>^:Mockup/parikrama.html` has the table intact.
The `.lg` table styles were left in the stylesheet, so a new table needs the
rows and nothing else. Section numbering will need putting back too — "When"
was renumbered from 05 to 04 when the league came out.

---

## 2. ~~The Sunday time disagrees with the charity's own poster~~ — RESOLVED 2026-09-20

> **Answered.** Ustad Ji confirmed 2.30–4pm. The page now says 2.30–4pm in
> both places, the "confirm before publishing" note is gone, and the time is
> stated under the hero as well. Kept below for the record.

### What the question was

The page says:

> **Sundays, 3–4pm** — archery and shastar vidya at Guru Tegh Bahadur
> Gurdwara, 106 East Park Road

…and, again visibly, "Times taken from your own posters — confirm before
publishing."

But the poster it cites says otherwise. `Assets/Instagram/timetable-poster-gtb.jpg`
reads, in the Sunday column, **2.30pm–4pm ARCHERY**.

And this repo already settled it. `Content_Drafts/timetable-confirmed.md`,
written from that same poster, says:

> "**Archery** is Sunday 2:30–4pm here, not '6pm onwards' as older posts said."

So the page contradicts both the poster it names as its source and this repo's
own confirmed timetable. The likeliest explanation is simply that the page was
written before that document, and 3–4pm is a half-hour slip.

**The question for Ustad Ji is therefore a small one:** is the poster still
current? If it is, the page should read 2.30–4pm and the "confirm before
publishing" note comes off.

**The hero line this was blocking** is now in: "Sundays 2.30–4pm · East Park
Road", directly under the headline, so nobody has to scroll the page to find
out when archery is on.

---

## Not blocked on either of these

The bullseye text-contrast bug found at the same time is fixed and merged —
it needed nobody's confirmation.
