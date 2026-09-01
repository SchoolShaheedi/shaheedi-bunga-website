# Shaheedi Bunga — website

Work-in-progress rebuild of `shaheedibunga.com` for **Shaheedi Bunga**, a Sikh
education charity in Leicester (registered charity **1185103**).

> **Nothing here is final.** Every page is a mockup, and several times and
> addresses are still marked as needing confirmation on the pages themselves.

---

## What's in here

| Path | What it is |
|---|---|
| `Mockup/parikrama.html` | **The site.** One file: the homepage 3D scene plus every vidyala/akhara page as a panel. Build tokens: `__THREE__`, `__MODELS__`, `__VIDLOGO__`, `__DRIFT__`, `__KTILES__`, `__ATILES__`, `__WA__`. |
| `Mockup/build-parikrama.js` | Inlines the library, models and images into `parikrama.built.html`. |
| `Mockup/lib/three.min.js` | Three.js r160 UMD, inlined at build time. |
| `Models/models.packed.json` | The 13 Amritsar models, quantised to int16 and merged per material by `Models/pack.js` (18 MB of GLB → 3.8 MB). |
| `Assets/Santhiya/drift/` | Photographs for the Santhiya hero. Drop more JPGs or HEICs in — the build reads the folder. |
| `Assets/Kirtan/tiles/` · `Assets/Archery/tiles/` | Gallery tiles for those pages. |
| `Mockup/_Draft_1/` · `_Draft_2/` · `_Archive/` | Frozen earlier versions, each with a README explaining what changed and why. |

## Build

```bash
cd Mockup
node build-parikrama.js      # → parikrama.built.html
```

No dependencies, no bundler. Open the built file directly, or serve the folder.

Debug hooks, all URL params on the built page:

| Param | Effect |
|---|---|
| `?vid` `?vidk` `?vida` | open the Santhiya / Kirtan / Archery panel directly |
| `?vs=0..1` | jump to a fraction of the open panel |
| `?still` | freeze animations at their final state, for screenshots |
| `?p=0..1` | force a scroll position in the homepage 3D scene |
| `?cam=…` `?lit` `?hide=…` | inspection cameras, flood lighting, hide scene layers |

## A note on the stack

The pages are hand-rolled — no GSAP, ScrollTrigger, Lenis or React Three Fiber.
That is deliberate: the mockups are reviewed as Claude Artifacts, whose CSP blocks
every external host except Google Fonts, so no CDN library can load. Scroll pinning
is `position:sticky`, scroll smoothing is a lerp, and the 3D is Three.js inlined at
build time. If the site later moves to normal hosting, those libraries become
available and several of these effects would be simpler with them.

## What is NOT in this repository

Deliberately excluded, and it matters:

- **`Admin/Social_Media/`** — the raw Instagram export and the sorted media library.
  It contains DMs, follower lists and thousands of photographs of children. It has
  never been part of this repo and must not be added.
- `ds/` — the design-system package, which is its own repository.
- `Assets/Santhiya/drift/_originals/` — raw camera files; the processed versions
  the site uses are committed.
- `Models/glb/` — the 18 MB of source models. `models.packed.json` is what the
  build consumes.

## Safeguarding

`Mockup/parikrama.built.html` has **88 photographs inlined as base64**, many of
them showing children of the sangat. This repository is **private** for that
reason. Before it is made public, or before GitHub Pages is enabled, someone needs
to make a deliberate decision about publishing those images.
