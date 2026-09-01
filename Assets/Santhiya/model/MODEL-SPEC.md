# Pothi model spec — for the Santhiya hero

Make this in Claude Design and save the **.glb** into this folder as `pothi.glb`.
The page looks for that exact filename.

---

## What it is

An open pothi resting on a wooden rehal, seen from slightly above and in front —
the object a santhiya student sits at. The hero turns **one page** as the cursor
moves, so the page has to be its own mesh, hinged at the spine.

---

## The one thing that matters most

**The turning page must be a separate named mesh** called exactly:

    page_turn

Its **origin/pivot must sit on the spine** — the centre fold — not at the page's
own centre. If the pivot is in the middle of the page, it will rotate through the
book instead of turning. Everything else can be merged.

Name the other parts:

| Mesh name | What it is |
|---|---|
| `page_turn` | the single leaf that lifts and turns. Pivot ON the spine. |
| `pages_left` | the left block of leaves |
| `pages_right` | the right block of leaves |
| `rehal` | the X-frame wooden stand |
| `cloth` | the rumala / cover cloth |

---

## Geometry

- **Scale:** build it roughly **30 cm wide**, real-world. Any consistent scale is
  fine — I normalise on load — but keep the proportions true.
- **Orientation:** +Y is up, the open pothi faces **+Z** (toward the viewer), spine
  running left–right along X.
- **Origin:** put the model origin at the **base of the rehal**, centred, so it sits
  on y = 0.
- **Poly budget:** under **60k triangles** total. It gets quantised and inlined into
  the page, so smaller is genuinely better.
- **The page leaf** should be a slightly curved plane, not flat — a gentle bow, as
  paper actually sits. Give it a little thickness (1–2 mm).

## Materials

Flat colours, **no textures** — the page bakes them and textures are dropped in
the pipeline. Name them so I can map them to the site palette:

| Material name | Use |
|---|---|
| `paper` | the leaves — warm off-white, roughness ~0.85 |
| `wood_dark` | rehal frame — walnut, roughness ~0.42 |
| `brass` | any pin, clasp or edge band — metalness 1.0, roughness ~0.25 |
| `cloth_navy` | the rumala |

## Do not include

- **No Gurmukhi text on the pages.** None. Leave them blank — the page is about
  reading Gurbani correctly, and generated lettering would be gibberish. Real
  Gurmukhi on the site is live text.
- **No Sri Guru Granth Sahib Ji parkash** — no palki, chanani, chaur sahib or manji
  sahib. This is a pothi on a rehal, which is what a student reads from.
- No environment, no floor, no backdrop — just the object.

---

## If you'd rather shoot it than model it

A **landscape video** works instead: locked-off camera, one hand turning a single
page of a pothi, 4–6 seconds, silent, shallow depth of field. Save as
`pothi-turn.mp4` in this folder (H.264, 1920×1080, under 6 MB) and tell me —
I'll use the footage and drop the 3D route.

---

## Until it arrives

The hero runs a **procedural placeholder** built in code: a simplified pothi and
rehal with a page that turns on cursor. It looks like what it is — flat-shaded and
plain — but the interaction is real, so you can judge the motion now and the model
swaps straight in.
