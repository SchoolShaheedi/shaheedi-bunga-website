#!/usr/bin/env python3
"""Regenerate the share card at saaj/dilruba/preview.jpg.

The card is the two animation plates composited, cropped to the figure and set
on the panel's cream. It is generated rather than hand-made so it can never
drift from the artwork: build-parikrama.js re-hashes the plates on every build
and fails if they no longer match what this script last used.

Run from the repo root:  python3 Assets/Dilruba/make-preview.py
Then commit both saaj/dilruba/preview.jpg and saaj/dilruba/preview.source.json.

If you change W/H here, change og:image:width / og:image:height in
saaj/dilruba/index.html to match - the build checks those agree too.
"""
import hashlib
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLATES = [
    os.path.join(ROOT, "Assets/Dilruba/plate-still.webp"),
    os.path.join(ROOT, "Assets/Dilruba/plate-bow.webp"),
]
OUT = os.path.join(ROOT, "saaj/dilruba/preview.jpg")
LOCK = os.path.join(ROOT, "saaj/dilruba/preview.source.json")

W, H = 1200, 630          # the size every chat app expects
CREAM = (250, 246, 238, 255)
MARGIN = 46
BIAS = 0.52               # seat the figure a touch below centre


def sha256(path):
    with open(path, "rb") as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def main():
    still, bow = (Image.open(p).convert("RGBA") for p in PLATES)
    fig = Image.alpha_composite(still, bow)
    fig = fig.crop(fig.getbbox())                 # tight to the drawn figure

    card = Image.new("RGBA", (W, H), CREAM)
    scale = min((W - MARGIN * 2) / fig.width, (H - MARGIN * 2) / fig.height)
    size = (max(1, int(fig.width * scale)), max(1, int(fig.height * scale)))
    fig = fig.resize(size, Image.LANCZOS)
    card.alpha_composite(fig, ((W - size[0]) // 2, int((H - size[1]) * BIAS)))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    card.convert("RGB").save(OUT, quality=88, optimize=True, progressive=True)

    with open(LOCK, "w") as fh:
        json.dump({
            "_comment": "Written by Assets/Dilruba/make-preview.py. "
                        "build-parikrama.js checks these hashes against the "
                        "plates on disk, so a changed plate fails the build "
                        "instead of leaving a stale share card.",
            "width": W,
            "height": H,
            "plates": {os.path.relpath(p, ROOT): sha256(p) for p in PLATES},
        }, fh, indent=2)
        fh.write("\n")

    print("preview.jpg  %dx%d  %.0fKB" % (W, H, os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    main()
