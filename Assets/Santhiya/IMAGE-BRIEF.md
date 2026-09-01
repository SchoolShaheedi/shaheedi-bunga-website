# Santhiya Vidyala — image brief

Generate these in Claude Design and save them into **this folder** with the exact
filenames below. The page looks for them by name.

---

## Three rules that apply to every image

**1. No Gurmukhi text may be legible. Ever.**
Image models cannot render Gurmukhi — they produce letterforms that look like
Gurmukhi and are gibberish. On a page whose whole subject is *reading Gurbani
correctly*, garbled Gurbani would be the worst possible error, and Sikhs will spot
it instantly. Every prompt below therefore keeps pages **out of focus, turned away,
edge-on, or too distant to read**. All real Gurmukhi on the page is live text set in
Noto Serif Gurmukhi — never baked into an image.

**2. A pothi, not Sri Guru Granth Sahib Ji.**
These images show a **pothi or gutka on a low wooden rehal** — what a student
actually reads from in class. Do **not** generate Sri Guru Granth Sahib Ji parkash
(palki, chanani, chaur sahib, manji sahib). Depicting Guru Sahib in a generated
image is not something to do casually, and it is also not what a santhiya class
looks like.

**3. Dress and setting must be right.**
Dastaar tied properly (not a loose wrap or a bandana), kesh and beards uncut and
untrimmed, heads covered, **bare feet**, everyone seated cross-legged on the floor.
Modest dress — kurta or chola for men, salwar kameez with chunni for women.
No shoes indoors. No jewellery beyond a kara.

---

## Palette — hold to the brand

| Use | Colour |
|---|---|
| Walls, light, ground | cream `#F5F0E6` |
| Clothing, shadow, depth | navy `#20284F` |
| Light accents, brass, warm edge | gold `#C6A24A` |
| Occasional secondary | royal `#2C4A9A` |

Say this in every prompt: *"muted cream, navy and warm gold palette; soft natural
morning light; low saturation."* The real class photographs are lit by fluorescent
tubes over royal-blue carpet with magenta cloth — accurate, but it fights the brand
palette badly. These generated images are what make the page hold together.

---

## The images

### 1. `santhiya-01-student.png` — 1200 × 1500 (4:5 portrait)

> A young Sikh man in his early twenties sits cross-legged on the floor of a bright,
> plain room, head bowed over an open pothi resting on a low X-shaped wooden book
> rest. He wears a navy dastaar and a simple cream kurta, bare feet tucked beneath
> him. Soft morning daylight falls from a tall window to his left, catching the edge
> of the page. **The open pages are turned away from the camera and softly out of
> focus — no writing is readable.** Cream walls, warm wood, muted navy and gold
> palette, low saturation, shallow depth of field. Quiet, unposed, documentary
> stillness. No text anywhere in the image.

### 2. `santhiya-02-ustad.png` — 1200 × 1500 (4:5 portrait)

> An elder Sikh teacher with a long white beard and white dastaar sits cross-legged
> facing a young student across a low wooden book rest, mid-sentence, one hand
> raised in a small correcting gesture. The student listens, head slightly bowed.
> Both barefoot on a plain cream floor covering. Warm morning light from one side.
> **The pothi between them is seen edge-on, its pages not legible.** Muted cream,
> navy and gold palette, low saturation, natural light only. The mood is patient
> and unhurried — a correction being made gently. No text anywhere in the image.

### 3. `santhiya-03-hands.png` — 1400 × 1000 (7:5 landscape)

> Extreme close crop of two hands above an open book on a wooden rest — one older
> hand with a steel kara resting at the edge of the page, one younger index finger
> paused mid-line as if tracking a word. Warm side light rakes across the paper
> texture. **The page is deliberately thrown out of focus so that no letterform is
> readable — only the warm cream of aged paper and the shadow of the fingers.**
> Cream, navy and warm gold, very low saturation, macro depth of field. No faces.
> No text anywhere in the image.

### 4. `santhiya-04-group.png` — 1400 × 1000 (7:5 landscape)

> Wide view of a plain, bright classroom in a Sikh gurdwara. Eight or nine people of
> mixed ages sit cross-legged on the floor in two loose rows, each with a low wooden
> book rest in front of them, heads bowed, all barefoot. Men in navy and white
> dastaars, women in salwar kameez with chunni covering the head. An elder sits at
> the front facing them. Tall windows on one side flood the room with soft morning
> daylight; cream walls, no clutter, no noticeboards or signage. **Seen from behind
> and above — faces are not the subject and no page is readable.** Muted cream,
> navy and gold, low saturation. No text anywhere in the image.

### 5. `santhiya-room.png` — 2400 × 1350 (16:9 landscape)

> An empty room in a Sikh gurdwara at seven in the morning, prepared for a class.
> Six low wooden X-shaped book rests are set out in two rows on a plain cream floor
> covering, each with a cloth-wrapped bundle resting on it, all closed. Tall windows
> down one wall; long shafts of pale morning sun crossing the floor; fine dust
> visible in the light. Cream walls, warm wood, deep navy shadow, one small brass
> lamp catching gold. Completely empty of people. Muted, low saturation, still and
> expectant. Architectural photography, wide lens, no text anywhere in the image.

### 6. `santhiya-cloth.png` — 1600 × 1600 (square)

> Top-down view of a single folded cloth — a plain cream silk rumala with a narrow
> woven gold border — draped loosely over a small rectangular object on a low wooden
> stand, its folds falling naturally to either side. Soft directional morning light
> from the upper left, raking across the fabric so the weave and every fold shadow
> reads clearly. Cream and warm gold only, with deep navy in the shadow. No pattern,
> no embroidery motifs, no writing, no tassels. Low saturation, quiet, reverent.
> Photographic, not illustrated. No text anywhere in the image.

---

## What is NOT generated

The **cloth lift, the pothi, and the page-turn are built in 3D** (Three.js) with
textures drawn procedurally in canvas, so they respond to scroll properly and carry
no risk of fake Gurmukhi. Image 6 above is a look reference for that cloth, and a
fallback still for devices that can't run WebGL.

The **live background** — dust in light shafts, a slow lamp flicker — is also
procedural, not an image.

## Real photographs

Four panels in the Instagram archive are genuinely good and consent is confirmed,
but every one is a panel inside a 4-up or 6-up collage, so cropping drops them to
roughly 700 × 480. They are usable small, in the margins, at reduced saturation —
not as hero imagery. If anyone can supply the **originals** rather than the
collaged exports, that changes the picture completely and several of the generated
images above become unnecessary.
