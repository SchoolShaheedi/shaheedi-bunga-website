# Dhanush model spec — for the Archery Akhara hero

Make this in Claude Design and save the **.glb** into this folder as `dhanush.glb`.
The page looks for that exact filename.

---

## What it is

A traditional Sikh composite bow — a **dhanush** — floating horizontally, seen
side-on. The hero draws the string back as the cursor moves down the page, which
means **the limbs have to bend and the string has to move**. That is the whole
interaction, so the rig matters more than the detail.

---

## The rig — this is the part that must be right

Name the meshes **exactly** as below. Everything else can be merged.

| Mesh name | What it is | Pivot / origin must be |
|---|---|---|
| `riser` | the rigid centre grip section | model centre, at 0,0,0 |
| `limb_upper` | the upper limb | **at the riser end**, where it joins the grip |
| `limb_lower` | the lower limb | **at the riser end**, where it joins the grip |
| `string` | the bowstring | model centre |
| `arrow` | one arrow, nocked | at the **nock** (the back end that sits on the string) |

**Why the pivots matter:** I rotate each limb around its riser joint to bend the
bow, and translate the arrow along its own axis to shoot it. If a limb's origin is
at its own centre or at the tip, it will swing away from the bow instead of
flexing. This is the single most common way this rig goes wrong.

**The string** should be a thin tube or a flattened cylinder running tip to tip —
not a flat plane, which disappears edge-on. I re-shape it in code to follow the
draw, so a straight, evenly-segmented string is ideal: **at least 24 segments
along its length** so it can bend smoothly.

---

## Geometry

- **Scale:** roughly **1.2 m tip to tip**, real-world. Consistent scale matters
  more than exact.
- **Orientation:** the bow stands **vertically in the XY plane** — limbs along Y,
  string toward **+Z** (toward the viewer), arrow pointing **−Z** (away, downrange).
- **Origin:** at the centre of the grip, so the whole bow sits around 0,0,0.
- **Poly budget:** under **40k triangles**. It gets quantised and inlined into the
  page, so smaller is genuinely better.
- Give the limbs a gentle recurve — the classic double-curve of a composite bow —
  not a plain arc.

## Materials

Flat colours, **no textures** — textures are dropped by the pipeline. Name them:

| Material name | Use |
|---|---|
| `horn` | the dark laminated belly of the limbs |
| `sinew_lacquer` | the painted/lacquered back — deep red or ochre |
| `grip_leather` | the wrapped centre grip |
| `gold_leaf` | any gilt banding or tip detail |
| `string_fibre` | the string — pale, matte |
| `arrow_shaft` / `fletching` | the arrow |

## Do not include

- No hand, arm or figure — the bow alone.
- No environment, floor, target or backdrop.
- No Gurmukhi lettering anywhere on it.

---

## If you'd rather film it

A **landscape video** works instead: locked-off camera side-on to an archer, one
full draw and release, 4–6 seconds, silent, shot at 60fps if possible so it can be
slowed. Save as `draw-release.mp4` here (H.264, 1920×1080, under 8 MB) and tell me
— I'll drive it from scroll position instead of the 3D rig.

---

## Until it arrives

The hero runs a **procedural dhanush** built in code — recurved limbs, a real
string that bends to the draw, and an arrow that releases and flies at the camera.
It is flat-shaded and plain, but the physics is real, so you can judge the draw
weight, the release snap and the arrow speed now. Your model swaps straight in
against the mesh names above.
