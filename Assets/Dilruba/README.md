# Assets/Dilruba

Plates for the bowing animation on `Mockup/pages/dilruba.html`.

| File | What it is |
|---|---|
| `plate-still.webp` | Everything in the illustration that never moves. |
| `plate-bow.webp` | The bowing arm, hand and gaj, cut as one piece. |
| `logo.webp` | The Shaheedi Bunga seal at 176px, for the page masthead. |

`Mockup/build-dilruba.js` inlines all three as data URIs into
`Mockup/dilruba.built.html`.

## Where they came from

The source is an AI-generated illustration, regenerated several times before it
drew a dilruba rather than a sitar or sarangi — the resonator must be a
drum-like skin membrane, the neck near-vertical against the shoulder, and the
peg box plain. It was then split into the two plates above so the bowing arm
could move independently.

## If these are ever regenerated

Three things are load-bearing, and the page breaks quietly if they change:

- **The two plates must stay in register** — identical dimensions (1254×1254),
  same origin. The animation composites one over the other at fixed offsets.
- **Encode as WebP quality 92 with `alpha_quality=100`.** That measured zero
  alpha error. Palette-quantising instead corrupts the alpha edge — which *is*
  the silhouette on a cut-out plate — and bands the turban's shading.
- **The geometry constants in `pages/dilruba.html` are measured against these
  exact plates** (`OX`, `OY`, `THETA`, `W0`, `W1`, `SHEAR_RECT`). New plates
  mean re-measuring them.

The plates carry a 1px pale fringe around the silhouette, from anti-aliasing
against the light background they were cut from. It is invisible on this page's
cream ground; it would show if they were ever placed on a dark one.

## gallery/

Four photographs from Shaheedi Bunga's own classes and samagams, shown in the
strip on the dilruba panel. They are copies of `Assets/Kirtan/tiles/k01, k02,
k11, k24` — the four of that set that show a dilruba being played.

They are **copied, not referenced**, so the dilruba panel does not break if the
Kirtan tiles are ever reorganised. 172KB for the four.

They are kept as the original JPEGs on purpose. Re-encoding them to WebP was
measured and came out **larger** (164KB → 185KB) as well as slightly softer:
they are already-compressed JPEGs, so a second lossy pass only adds work for
the encoder. Do not "optimise" them to WebP.

`Mockup/build-parikrama.js` inlines every `.jpg` in this folder as `__DTILES__`,
so adding a photo here is the only step needed to add it to the strip — but
`ALT[]` in the gallery script is index-matched to the sorted filenames, so add
its alt text there at the same position.
