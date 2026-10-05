#!/usr/bin/env python3
"""Regenerate the home page's share card at share/home.jpg.

The seal on the site's own near-black, at 1200x630 - the size every chat app
expects. Run from the repo root:  python3 Assets/Brand/make-home-card.py

Unlike the Kirtan card this one has no build-time check, because its source is
the brand seal and that does not change. If it ever does, re-run this.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEAL = os.path.join(ROOT, "Assets/Brand/gurmat-vidyala-512.png")
OUT  = os.path.join(ROOT, "share/home.jpg")

W, H = 1200, 630
INK  = (8, 9, 12, 255)          # the site's own background

seal = Image.open(SEAL).convert("RGBA")
card = Image.new("RGBA", (W, H), INK)

# a soft warm pool behind it, the same gesture the panels use
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
import math
px = glow.load()
cx, cy, rad = W / 2, H / 2, H * 0.62
for y in range(H):
    for x in range(0, W, 2):                      # every other column, then blur
        d = math.hypot((x - cx) / rad, (y - cy) / rad)
        if d < 1:
            a = int(26 * (1 - d) ** 2)
            px[x, y] = (233, 206, 131, a)
from PIL import ImageFilter
glow = glow.filter(ImageFilter.GaussianBlur(18))
card.alpha_composite(glow)

s = int(H * 0.46)
seal = seal.resize((s, s), Image.LANCZOS)
card.alpha_composite(seal, ((W - s) // 2, (H - s) // 2))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
card.convert("RGB").save(OUT, quality=90, optimize=True, progressive=True)
print("share/home.jpg  %dx%d  %.0fKB" % (W, H, os.path.getsize(OUT) / 1024))
