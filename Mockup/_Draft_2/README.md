# Draft 2 — "Parikrama, by moonlight"

Frozen 2026-08-27, on approval. Draft 1 rebuilt on real 3D models instead of
procedural geometry, at night instead of at amrit vela.

**Live artifact:** https://claude.ai/code/artifact/3e3706a5-dde4-4a05-9852-4d00c8975edc
(the same URL Draft 1 used — that artifact now shows Draft 2.)

## What changed from Draft 1

| | Draft 1 | Draft 2 |
|---|---|---|
| Geometry | procedural, written in the file | 13 GLB models, baked in at build time |
| Light | amrit vela, sun low in the east | night — full moon behind the Darbar Sahib, stars, no sun |
| Water | "water" | "sarovar" throughout the copy |
| Geography | approximate | verified: Shaheedan on the SOUTH parikrama, Ramgarhia on the far north bank, Akal Takht on the viewer's left |
| Nav | text only | logo + wordmark |

## Files
- `parikrama.html` — source. Two build-time placeholders: `__THREE__` and `__MODELS__`.
- `models.packed.json` — the 13 models, quantised. Copied here so this draft
  rebuilds without the `../../Models/` tree. Regenerate with `Models/pack.js`.
- `parikrama.built.html` — deployable, self-contained, 4.86 MB.
- `preview/` — four chapters as rendered at freeze.

Rebuild from this folder:

```bash
node -e 'var fs=require("fs");var h=fs.readFileSync("parikrama.html","utf8");h=h.replace("__THREE__",function(){return fs.readFileSync("../lib/three.min.js","utf8")});h=h.replace("__MODELS__",function(){return fs.readFileSync("models.packed.json","utf8")});fs.writeFileSync("parikrama.built.html","<!doctype html>\n"+h)'
```

## The compass — settled, do not re-derive

    -Z is NORTH   +Z is SOUTH   +X is EAST   -X is WEST

Darshani Deori, the causeway and the Akal Takht are WEST. Shaheedan da Bunga is
on the SOUTH parikrama; Ramgarhia is on the far, north bank. The camera walks the
south parikrama facing north, which puts the Akal Takht on the viewer's left.

## State at freeze

- **Levels untouched.** `DECK 1.9`, `WATER_Y 1.05`, `PLINTH 0.30`. Neither the
  parikrama nor the sarovar is raised or lowered — this was asked for explicitly
  after a long loop of moving them, and every fix that moved them broke something
  else.
- **The walkway seats itself.** `parikrama.glb` has its base at y = −1.1, not 0,
  so `modelTop()` reads the model's own extent and lands the walking surface on
  `DECK`. Swap the GLB and the seating still holds.
- **The walkway is excluded from the reflection** (`pk.userData.noMirror`).
  See the note below — this was the hard bug of the session.
- Water: `roughness 0.18`, `metalness 0.28`, `envMapIntensity 0.18`, `opacity 0.91`.
- Everything else in the mirror is dimmed: colour × 0.42, env × 0.30, and the
  emissive materials swapped for darker clones, so reflected lamps don't blow out.
- Moon: a world-space sprite at `normalize(moon.position) × 548`, plus a halo.
  Painting it into the equirect sky does not work — it vanishes.
- Nishan Sahib: blue, at `(64, DECK, 96)`, which is screen-LEFT of the bunga in
  chapter 5 because the camera faces +z there.
- Bloom 0.42 / threshold 1.45 / exposure 1.06. Cast shadows OFF (`SHADOWS = false`).
- Places: Africa Nairobi · Europe Germany, Netherlands · UK Leicester, Nottingham,
  Birmingham, East London, Southall, Scotland · Middle East Kuwait · Asia Panjab ·
  Oceania Australia.

## The bug worth remembering

For several rounds the sarovar rendered as a pale grey sheet across the lower half
of the frame. It was not the water, the water material, the land plane, or the
walkway. It was the **reflection of the walkway**.

The mirror is `world.clone()` with `scale.y = -1`. The parikrama's marble is a
huge flat expanse, so cloning it into the mirror laid a sheet of pale stone over
the whole foreground and buried the real reflection beneath it. In life you never
see this: a flat surface's reflection lies directly under it, so the surface hides
its own reflection. Draft 1's walkway had a balustrade that happened to occlude it;
the replacement model has none, which exposed it.

**Flat ground planes must not go into the mirror. Only things that stand up do.**

Diagnosing it needed a proper bisect, because hiding one layer only reveals the
next one and every layer there is pale. The `?hide=` param was added for this and
is worth keeping.

## Debug hooks (URL params, all still live)

- `?p=0..1` — force a scroll position
- `?cam=top|east|edge|sw|walk|mid|joint|level` — fixed inspection cameras
- `?lit` — flood the scene with light
- `?hide=land,water,mirror,ripple,pk` — hide surfaces, comma-separated

## Known, not addressed

Both were pointed out at freeze and deliberately left alone:

- Chapter 6 ("Almost all of them were pulled down"): a lamp head overlaps the nav
  bar at top-left.
- The final risen frame looks down on bunga rooftops with the Darbar Sahib out of
  shot — it ends on the bungas rather than the shrine.

Still outstanding across the project: the historical copy in chapters 1–4 has not
been verified by anyone; the sister-brand akhara/vidyala pages are unstarted.
