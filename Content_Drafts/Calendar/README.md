# Sikhi Calendar — website pages

Two files. Both are self-contained: copy them in and they work.

| File | For | Link it? |
|---|---|---|
| [`sikhi-calendar.html`](sikhi-calendar.html) | The public calendar | **Yes** — this is the page for the sangat |
| [`sikhi-calendar-editor.html`](sikhi-calendar-editor.html) | Editing the calendar | **No** — keep the address to the sevadaar who maintains it |

---

# 1. The public page

**The file to copy: [`sikhi-calendar.html`](sikhi-calendar.html)**

One self-contained page. Drop it into the site and it works — no build step, no
JavaScript bundle, no data files, nothing to install. The only thing it fetches
from outside is Google Fonts.

- **196 KB** on disk, **47 KB** over the wire once gzipped
- Six years of verified calendar data are inside the file
- Works offline once loaded
- The engines are checked at build time — see *How it is made* below

---

## Where it goes

Anywhere. It is a complete `<html>` document, so the simplest option is to
serve it as its own page:

```
yoursite.com/calendar  →  sikhi-calendar.html
```

### If you'd rather it sat inside an existing page

Everything visual is scoped under `.sbcal`, so it will not fight the site's own
stylesheet. To embed it in a page you already have:

1. Copy the `<style>` block into your stylesheet (or leave it inline).
2. Copy the `<div class="sbcal">…</div>` into your page body.
3. Copy the two `<script>` blocks to just before `</body>`.
4. Keep the Google Fonts `<link>` in your `<head>`.

Nothing is written to `window` except `Nanakshahi`, `Bikrami`, `Jantri`,
`SikhEvents` and `Cal`.

---

## Design

Cream `#F5F0E6` is the ground throughout, as asked. Type follows the Shaheedi
Bunga design system so the page sits with the rest of the site:

| Role | Face |
|---|---|
| Display | Cormorant Garamond |
| Body | Spectral |
| Labels, dates, UI | Jost |
| Gurmukhi | Noto Serif Gurmukhi / Noto Sans Gurmukhi |

Accent is gold `#9A7A2C`. Category colours are clay, plum, crimson, saffron,
forest, stone and green.

**There is no blue anywhere in the page.** The only blue is inside the Baba Deep
Singh Ji roundel at the top, which is the logo artwork rather than a UI colour —
left exactly as it is.

> **Worth knowing before tomorrow:** the design system at `Website/ds/src/tokens.css`
> is built on navy `#20284F` and royal `#2C4A9A`. This page deliberately does not
> use them. If the rest of the site keeps its navy, this page will read as a
> distinct section rather than a seamless one. If you want the whole site moved
> off blue, that is a change to `tokens.css` and every page that has been mocked
> up so far — say the word and it can be done properly.

---

## What's on the page

1. **Today** — the Nanakshahi date set large in Gurmukhi, the English date
   beneath, both samvats, and the countdown to the next sangrand.
2. **Coming up** — the next ten gurpurabs and sangrands with a day count.
3. **This month** — a full month grid. Panjabi day number large, English date
   beside it. `●` masya, `○` puranmashi, gold edge on the sangrand. The arrows
   step through the months.
4. **The year** — all twelve months as an index of the headline dates.
5. **A plain-English colophon** — which calendar this is, where the dates come
   from, and what is and is not covered.

It is read-only on purpose. Personal events, reminders and editing live in the
full app, not on the public page.

---

## The dates

These are the Nanakshahi dates **as printed in the jantri** — transcribed, not
calculated. Gurpurabs follow the lunar tithi, so they cannot be derived; they
have to be typed in from the jantri each year.

**Currently covered: 13 March 2021 → 15 March 2027** (Samvat 553 to 558).

Every one of the 876 entries carries the Nanakshahi date exactly as printed, and
the build refuses to run if the calendar engine derives anything different from
the Gregorian date. So a typo cannot reach the website.

### It will need updating in March 2027

The jantri is published each March, at the Sikh new year. When Samvat 559
appears, the page has to be rebuilt or it will stop listing gurpurabs after
15 March 2027 — with a note saying new dates arrive at 1 Chet, rather than
showing wrong ones, but it will stop.

---

## How it is made

The page is **generated**, not hand-written. Do not edit `sikhi-calendar.html`
directly — the next rebuild will overwrite it.

```bash
cd "1_Shaheedi_Bunga/Sikhi_School/Apps/Sikhi_Calendar"
node tools/build-web-page.js
```

That bundles the calendar engines, the verified jantri data, the page's view
layer and the logo into the single file, and writes it here. It runs the full
self-test first and writes nothing if anything fails.

Sources:

```
Apps/Sikhi_Calendar/tools/web/template.html   markup + all the CSS
Apps/Sikhi_Calendar/tools/web/page.js         the view layer for this page
Apps/Sikhi_Calendar/tools/jantri/*.tsv        the transcribed jantri
Apps/Sikhi_Calendar/js/*.js                   the calendar engines
```

To change the look, edit `template.html`. To change what's shown, edit
`page.js`. Then rebuild.

---

## The full app

The page here is the public face. The complete app — four views, your own
events, reminders, the Mool/SGPC switch, `.ics` export, installable on a phone —
lives at:

```
1_Shaheedi_Bunga/Sikhi_School/Apps/Sikhi_Calendar/
```

Open its `index.html`, or read its `README.md` for the whole picture.


---

# 2. The editor page

**The file to copy: [`sikhi-calendar-editor.html`](sikhi-calendar-editor.html)** — 219 KB,
self-contained, no build step.

The tool the calendar is actually maintained with. It edits the shared calendar
through the sync server, so a change made here reaches every phone in the sangat
within seconds — and the public page picks it up next time it is rebuilt.

## What it can do

| | |
|---|---|
| **Rename** | In Gurmukhi, English, or both. Applies to every year at once. The dialog always shows the printed name underneath, so you can see what you changed it from |
| **Change the kind** | Move a date between Prakash Gurpurab, Shaheedi Divas, Jor Mela and the rest — it changes the colour it appears in |
| **Hide entirely** | It stops appearing anywhere |
| **Hide from a date** | Earlier years keep showing. For something the sangat has stopped keeping, without erasing that it was once kept |
| **Move a single date** | Change one year's date and leave the other years alone. The Nanakshahi day is recalculated, never carried over |
| **Add your own date** | A barsi, an akhand paath, a sangat programme — anchored to a Panjabi date or an English one, once or every year. Not in the jantri, but shared with everyone |
| **Delete** what you added | Removes it from every device |
| **Undo everything** | Back to exactly what the jantri printed |
| **Export** | A JSON file of your changes, plus a plain-English summary |

Search, filter by kind, or narrow to **edited / hidden / added by us**.

## Signing in

The passphrase is only needed to **save**. Leave it blank and the page opens
read-only — useful for checking what the calendar says without risk.

**This page is not a secret, and does not need to be.** Anyone with the address
can open it and read a calendar that is public anyway. Without the passphrase
the server refuses every write with a 401, so nothing can be changed by someone
who stumbles across it. Still: don't link it from the navigation. There is no
reason to invite people to a tool they cannot use.

## Nothing here rewrites the jantri

Every change is stored as a separate layer on top of the printed calendar. That
is why **Undo all changes** can always return to exactly what was published, and
why the 876 transcribed dates stay verifiable. Hiding a printed purab is a hide,
not a delete — the record stands and the change can be reversed. Only dates you
added yourself can truly be deleted.

## Rebuilding it

```bash
cd "1_Shaheedi_Bunga/Sikhi_School/Apps/Sikhi_Calendar"
node tools/build-web-page.js
```

That writes **both** pages. Sources: `tools/web/editor-template.html` for the
look, `tools/web/editor.js` for the behaviour.

The sync address is baked in at build time. If the Worker URL ever changes,
update `ENDPOINT` at the top of `tools/web/editor.js` and rebuild.
