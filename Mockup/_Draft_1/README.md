# Draft 1 — "Parikrama"

Frozen 2026-08-26. The first complete homepage concept.

**Live artifact:** https://claude.ai/code/artifact/3e3706a5-dde4-4a05-9852-4d00c8975edc
(superseded — that artifact was republished with Draft 2 on 2026-08-27.
This draft survives only as the files in this folder.)

## What it is
A real-time WebGL scroll journey at amrit vela, standing among the bungas on the
parikrama at Amritsar. Six chapters: under a verandah → across the water → what
was taught → almost all pulled down → the bunga we are named for → we raise it
again on any ground.

## Files
- `parikrama.html` — source. `__THREE__` is the placeholder for the library.
- `parikrama.built.html` — deployable. Build with:
  `node -e 'var fs=require("fs");var h=fs.readFileSync("parikrama.html","utf8");h=h.replace("__THREE__",function(){return fs.readFileSync("lib/three.min.js","utf8")});fs.writeFileSync("parikrama.built.html","<!doctype html>\n"+h)'`

## State at freeze
- Harmandir Sahib: the FIRST-DRAFT form (marble arcaded ground storey, gilt above
  the chhajja, tall ribbed dome ~20 m). Not the photo-accurate squat version.
- Shaheedan da Bunga: three storeys with a gold dome. The surviving photograph
  (`../refs/p-shaheedan-bunga.jpg`) shows the real one was single-storey; the
  taller version was chosen deliberately. `lowBunga()` is still in the file, unused.
- No trees. `tree()` builder kept, nothing placed.
- Lighting deliberately dark: bloom strength 0.42, threshold 1.45, exposure 1.06.
- Rendering: IBL from a procedural sky, canvas-drawn grain/repoussé/wave maps,
  hand-rolled HDR bloom. Cast shadows OFF behind `SHADOWS = false`.
- Nav + mobile menu. Places: Africa Nairobi · Europe Germany, Netherlands ·
  UK Leicester, Nottingham, Birmingham, East London, Southall, Scotland ·
  Middle East Kuwait · Asia Panjab · Oceania Australia.

## Known open problem
The Harmandir Sahib model was never satisfactory. Proportions, ornament density
and the emissive "glow" on the gold were all flagged as wrong.
