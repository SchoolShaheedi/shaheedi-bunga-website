#!/usr/bin/env python3
"""Re-download the self-hosted web fonts from Google and rebuild /lib/fonts.css.

Run this after changing which families or weights the site uses:

    python3 _tools/fetch-fonts.py

It asks Google for exactly the stylesheet the pages used to link to, keeps the
@font-face blocks verbatim, and rewrites only the src URLs to /lib/fonts/. That
is deliberate: rendering then matches what Google served by construction, rather
than depending on anyone's judgement about weights and unicode ranges.

Subsets outside KEEP are dropped. unicode-range meant the browser never fetched
them anyway, so this costs nothing at runtime and keeps ~20 files out of the repo.
"""
import os, re, sys, urllib.request

# Must stay identical to the href the pages used before self-hosting.
CSS_URL = ("https://fonts.googleapis.com/css2"
           "?family=Archivo:wght@400;500;600;700"
           "&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600"
           "&family=JetBrains+Mono:wght@400;500"
           "&family=Noto+Serif+Gurmukhi:wght@400;600;700"
           "&display=swap")

KEEP = {"latin", "latin-ext", "gurmukhi"}

# Google serves woff2 only to browsers it recognises; with a Python UA it
# returns ancient TTF. This UA is load-bearing, not decoration.
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FONT_DIR = os.path.join(ROOT, "lib", "fonts")

HEADER = """/* Self-hosted web fonts.
   Generated from the Google Fonts css2 response by _tools/fetch-fonts.py.
   The @font-face blocks below are Google's own, unchanged except that each
   src URL now points at /lib/fonts/ instead of fonts.gstatic.com - so
   rendering is identical to what the site did before, by construction rather
   than by my judgement.

   Why self-hosted: fonts.googleapis.com was the only third party left on the
   site, and the browser's request to it carries the visitor's IP address.
   Removing it is the difference between the privacy notice saying "one third
   party receives your IP" and saying "none". It is also faster - one less DNS
   lookup, TCP connection and TLS handshake before any text can paint.

   Subsets kept: latin, latin-ext, gurmukhi. Google also serves cyrillic,
   cyrillic-ext, greek and vietnamese; no page uses them.

   Licences: Archivo, JetBrains Mono, Noto Serif Gurmukhi and Source Serif 4
   are all SIL Open Font License 1.1. See /lib/fonts/LICENSE.txt.

   Do not hand-edit this file. */
"""


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=60).read()
    return data if binary else data.decode("utf-8")


def main():
    css = fetch(CSS_URL)
    if "woff2" not in css:
        sys.exit("Google returned no woff2 - the User-Agent is probably wrong.")

    blocks = re.findall(r"(/\*\s*([a-z0-9-]+)\s*\*/\s*@font-face\s*\{.*?\})", css, re.S)
    if not blocks:
        sys.exit("Could not parse any @font-face blocks - Google changed its format.")

    os.makedirs(FONT_DIR, exist_ok=True)
    slug = lambda s: re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

    out, written, kept = [HEADER], {}, 0
    for block, subset in blocks:
        if subset not in KEEP:
            continue
        fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        name = f"{slug(fam)}-{subset}.woff2"

        if name in written:
            # Variable fonts: several weights share one file. Make sure they
            # really are the same file before silently reusing it.
            assert written[name] == url, f"{name} wanted from two different URLs"
        else:
            data = fetch(url, binary=True)
            with open(os.path.join(FONT_DIR, name), "wb") as fh:
                fh.write(data)
            written[name] = url
            print(f"  {len(data):>8,}B  {name}")

        new = re.sub(r"url\(https://[^)]+\)", f"url(/lib/fonts/{name})", block)
        assert "/lib/fonts/" in new, f"url rewrite produced nothing for {fam}/{subset}"
        out.append(new)
        kept += 1

    body = "\n".join(out)
    assert "gstatic" not in body and "googleapis" not in body, \
        "a Google URL survived the rewrite - refusing to write the file"

    with open(os.path.join(ROOT, "lib", "fonts.css"), "w") as fh:
        fh.write(body + "\n")

    print(f"\n  {kept} @font-face blocks, {len(written)} files, "
          f"{sum(os.path.getsize(os.path.join(FONT_DIR, n)) for n in written):,} bytes")
    print("  wrote lib/fonts.css")


if __name__ == "__main__":
    main()
