# Instagram — derived content for the website

Safe, text-only slice of the `@shaheedi_bunga_uk` data export. **No DMs, no follower
lists, no personal or login data** — those stay in the raw export and never come here.

| File | What it is |
|---|---|
| `ig-content.json` | 4,053 items — posts, reels, stories, IGTV, archived. Each has `kind`, `date`, `caption`, `media` (paths relative to the raw export). Newest first. |
| `ig-performance.json` | 221 posts that carry Instagram insights — reach, likes, shares, saves, follows — matched to their caption where the timestamps line up (153 of 221). |

The findings written from these are in [`../instagram-findings.md`](../instagram-findings.md).

## Where the raw export lives

`1_Shaheedi_Bunga/Admin/Social_Media/_Sources/Instagram_Export_2026-08-26/`

It was moved out of `Website/` on 2026-08-26: it is 14 GB and contains the charity's
direct messages, follower list, login history and the account holder's personal
details. None of that can sit in a folder that becomes a public git repo.

## Regenerating

```
python3 ig_parse.py <path-to-export>/instagram-shaheedi_bunga_uk-2026-08-26-DZGO0PH0 ig-content.json
```

Only the `DZGO0PH0` bundle carries the HTML data files; the other two parts are
media-only continuations.

## Using the media

5,429 photos and videos are in the raw export. Copy individual files into
`Website/Assets/` as they are chosen — never bulk-copy the media folders.

**Nothing showing an identifiable child may be used until there is a written
photo-consent position.** Much of the archive is children's classes and camps.

## Captions are public, but not automatically safe to republish

Captions carry volunteers' mobile numbers, guest speakers' names, and partner
organisations. All of it was published on Instagram by the charity, but posting it
again on a website is a fresh publication — check before reusing names or numbers.
