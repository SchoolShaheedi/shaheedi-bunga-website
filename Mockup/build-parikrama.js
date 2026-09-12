// Inline three.js, the packed models, the vidyala logo and the week photographs.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const here = __dirname;
let h = fs.readFileSync(path.join(here, 'parikrama.html'), 'utf8');

h = h.replace('__THREE__',  () => fs.readFileSync(path.join(here, 'lib/three.min.js'), 'utf8'));
h = h.replace('__MODELS__', () => fs.readFileSync(path.resolve(here, '../Models/models.packed.json'), 'utf8'));

const b64 = (p, mime) => 'data:' + mime + ';base64,' + fs.readFileSync(p).toString('base64');
h = h.split('__VIDLOGO__').join(b64(path.resolve(here, '../Assets/Brand/gurmat-vidyala-512.png'), 'image/png'));

const D = path.resolve(here, '../Assets/Santhiya/drift');
const drift = fs.readdirSync(D).filter(f => f.endsWith('.jpg')).sort()
  .map(f => b64(path.join(D, f), 'image/jpeg'));
h = h.replace('__DRIFT__', () => JSON.stringify(drift));
console.log('drift images inlined:', drift.length);

// WhatsApp — number from the Guru Tegh Bahadur weekly timetable poster.
// Change WA_NUMBER here if a different line should take class enquiries.
const WA_NUMBER = '447394848407';
const WA_TEXT = encodeURIComponent(
  "Sat Sri Akal — I'd like to ask about Santhiya classes (in person or online).");
h = h.split('__WA__').join('https://wa.me/' + WA_NUMBER + '?text=' + WA_TEXT);
const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
  + '<path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.29-.02-.45.13-.6.13-.13.3-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.02c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.85.12.56-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.2-.56-.34z"/>'
  + '<path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.8 9.8 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 17.93h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.83-3.01-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19z"/></svg>';
h = h.split('__WASVG__').join(WA_SVG);

const K = path.resolve(here, '../Assets/Kirtan/tiles');
const ktiles = fs.readdirSync(K).filter(f => f.endsWith('.jpg')).sort()
  .map(f => b64(path.join(K, f), 'image/jpeg'));
h = h.replace('__KTILES__', () => JSON.stringify(ktiles));
console.log('kirtan tiles inlined:', ktiles.length);
const WAK_TEXT = encodeURIComponent(
  "Sat Sri Akal — I'd like to ask about Kirtan / tanti saaj classes.");
h = h.split('__WAK__').join('https://wa.me/' + WA_NUMBER + '?text=' + WAK_TEXT);

const A = path.resolve(here, '../Assets/Archery/tiles');
const atiles = fs.readdirSync(A).filter(f => f.endsWith('.jpg')).sort()
  .map(f => b64(path.join(A, f), 'image/jpeg'));
h = h.replace('__ATILES__', () => JSON.stringify(atiles));
console.log('archery tiles inlined:', atiles.length);
const WAA_TEXT = encodeURIComponent("Sat Sri Akal — I'd like to ask about the Archery Akhara.");
h = h.split('__WAA__').join('https://wa.me/' + WA_NUMBER + '?text=' + WAA_TEXT);

const DIL = path.resolve(here, '../Assets/Dilruba');
h = h.split('__DPLATE_STILL__').join(b64(path.join(DIL, 'plate-still.webp'), 'image/webp'));
h = h.split('__DPLATE_BOW__').join(b64(path.join(DIL, 'plate-bow.webp'), 'image/webp'));
/* The dilruba strip shows the whole Kirtan tile set, so it reads that folder
   rather than keeping a byte-for-byte copy of it. ALT[] in the gallery
   script is index-matched to this sorted order. */
const dtiles = fs.readdirSync(K).filter(f => f.endsWith('.jpg')).sort()
  .map(f => b64(path.join(K, f), 'image/jpeg'));
/* split/join, not replace: replace() swaps only the first match, and the
   token is also named in a comment in the page. */
h = h.split('__DTILES__').join(JSON.stringify(dtiles));
console.log('dilruba gallery tiles inlined:', dtiles.length);
/* ── the share card must not drift from the artwork ──
   saaj/dilruba/preview.jpg is generated from the two plates by
   Assets/Dilruba/make-preview.py, which records their hashes alongside it.
   Re-hash them here so a changed plate fails the build loudly instead of
   leaving a stale thumbnail on every link anyone has shared. Also check the
   JPEG really is the size the og: tags claim - chat apps lay the card out
   from those numbers, so a mismatch crops the picture. */
(() => {
  const dir = path.resolve(here, '../saaj/dilruba');
  const jpg = path.join(dir, 'preview.jpg');
  const lockPath = path.join(dir, 'preview.source.json');
  const REGEN = 'run: python3 Assets/Dilruba/make-preview.py';

  /* If the whole folder is gone the page was removed on purpose, and that is
     not a reason to break the build for everything else on the site. A folder
     that exists but is missing pieces is a mistake, and does throw. */
  if (!fs.existsSync(dir)) {
    console.log('share card: saaj/dilruba not present, skipping');
    return;
  }

  for (const f of [jpg, lockPath]) {
    if (!fs.existsSync(f)) {
      throw new Error(`share card missing: ${path.relative(path.resolve(here, '..'), f)} — ${REGEN}`);
    }
  }
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));

  for (const [rel, want] of Object.entries(lock.plates)) {
    const got = crypto.createHash('sha256')
      .update(fs.readFileSync(path.resolve(here, '..', rel))).digest('hex');
    if (got !== want) {
      throw new Error(`${rel} changed since the share card was made, so the thumbnail `
        + `no longer matches the artwork — ${REGEN}`);
    }
  }

  /* JPEG frame header, read without a library: walk the markers to the SOF */
  const buf = fs.readFileSync(jpg);
  let i = 2, dims = null;
  while (i < buf.length - 9 && buf[i] === 0xFF) {
    const marker = buf[i + 1], len = buf.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker)) {
      dims = { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      break;
    }
    i += 2 + len;
  }
  if (!dims) throw new Error(`could not read the size of saaj/dilruba/preview.jpg`);
  if (dims.width !== lock.width || dims.height !== lock.height) {
    throw new Error(`share card is ${dims.width}x${dims.height} but preview.source.json `
      + `says ${lock.width}x${lock.height} — ${REGEN}`);
  }

  /* and the og: tags must agree with the file */
  const share = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  for (const [prop, want] of [['og:image:width', lock.width], ['og:image:height', lock.height]]) {
    const m = share.match(new RegExp(`property="${prop}" content="(\\d+)"`));
    if (!m || Number(m[1]) !== want) {
      throw new Error(`saaj/dilruba/index.html declares ${prop}=${m ? m[1] : 'nothing'} but `
        + `the image is ${want}px — fix the tag`);
    }
  }
  console.log(`share card checked: ${dims.width}x${dims.height}, plates unchanged`);
})();

const WAD_TEXT = encodeURIComponent("Sat Sri Akal — I'd like to ask about learning dilruba.");
h = h.split('__WAD__').join('https://wa.me/' + WA_NUMBER + '?text=' + WAD_TEXT);
console.log('dilruba plates inlined: 2');

const out = path.join(here, 'parikrama.built.html');
fs.writeFileSync(out, '<!doctype html>\n' + h);
console.log('built', (h.length / 1048576).toFixed(2), 'MB');

// keep the Pages entry point pointing at this build
console.log('Pages entry: ../index.html redirects to Mockup/parikrama.built.html');
