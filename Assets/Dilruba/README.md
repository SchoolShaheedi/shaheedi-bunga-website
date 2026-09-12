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

## The gallery photographs

The strip on the dilruba panel shows all twelve photographs in
`Assets/Kirtan/tiles` — the set that came with the Kirtan panel and stayed in
the repo when that panel was removed. Four of them (k01, k02, k11, k24) show a
dilruba being played; the rest are the other classes and the samagams.

`Mockup/build-parikrama.js` reads that folder directly rather than keeping a
copy here: with all twelve in use, a copy would be a byte-for-byte duplicate.
That makes the dilruba panel depend on `Assets/Kirtan/tiles`, which is a real
dependency worth knowing about — though the build already read that folder for
its own `__KTILES__` token, so nothing new breaks if it moves.

**`ALT[]` in the gallery script is index-matched to the sorted filenames.**
Adding or removing a tile means editing that array at the same position, or
every photograph after it gets someone else's description.

The tiles are JPEGs and should stay JPEGs. Re-encoding four of them to WebP was
measured and came out **larger** (164KB → 185KB) as well as slightly softer:
they are already-compressed JPEGs, so a second lossy pass only adds work.

## The share card

`saaj/dilruba/preview.jpg` is the thumbnail chat apps show when the page's
link is shared. It is **generated, not hand-made**:

```bash
python3 Assets/Dilruba/make-preview.py
```

That composites the two plates, crops to the figure, sets it on the panel's
cream at 1200×630, and writes `saaj/dilruba/preview.source.json` recording the
hash of each plate it used.

**`build-parikrama.js` re-hashes the plates on every build** and fails if they
no longer match, so a changed illustration cannot leave a stale thumbnail on
every link that has already been shared. It also reads the JPEG's own frame
header and fails if the file is not the size `og:image:width` /
`og:image:height` claim — chat apps lay the card out from those numbers, so a
mismatch crops the picture.

So: **change a plate, re-run the script, commit both outputs.** The build will
tell you if you forget. If the whole `saaj/dilruba/` folder is ever removed the
check skips rather than failing, since that means the page went on purpose.
