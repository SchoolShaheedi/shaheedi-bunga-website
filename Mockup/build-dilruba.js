// Inline the two animation plates and the seal into a single self-contained page.
// Same shape as build-santhiya.js: no dependencies, no bundler.
const fs = require('fs'), path = require('path');
const here = __dirname;
let html = fs.readFileSync(path.join(here, 'pages/dilruba.html'), 'utf8');

const assets = path.resolve(here, '../Assets/Dilruba');
for (const f of ['plate-still.webp', 'plate-bow.webp', 'logo.webp']) {
  const ref = `../../Assets/Dilruba/${f}`;
  if (!html.includes(ref)) throw new Error(`reference missing: ${ref}`);
  const b64 = fs.readFileSync(path.join(assets, f)).toString('base64');
  html = html.split(ref).join(`data:image/webp;base64,${b64}`);
}

// The element's src folder is only the fallback for when the page is served
// from the repo. window.__resources supersedes it and now holds data URIs, so
// strip the dead path rather than leave it pointing at nothing.
const folder = /\n\s*src="\.\.\/\.\.\/Assets\/Dilruba"/;
if (!folder.test(html)) throw new Error('src folder attribute not found');
html = html.replace(folder, '');

const out = path.join(here, 'dilruba.built.html');
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1048576).toFixed(2), 'MB');
