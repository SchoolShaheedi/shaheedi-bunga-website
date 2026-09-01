// Inline three.js, the packed models, the vidyala logo and the week photographs.
const fs = require('fs'), path = require('path');
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

const out = path.join(here, 'parikrama.built.html');
fs.writeFileSync(out, '<!doctype html>\n' + h);
console.log('built', (h.length / 1048576).toFixed(2), 'MB');

// keep the Pages entry point pointing at this build
console.log('Pages entry: ../index.html redirects to Mockup/parikrama.built.html');
