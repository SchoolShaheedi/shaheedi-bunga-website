// Inline three.min.js and the two camp posters into a single self-contained page.
const fs = require('fs'), path = require('path');
const here = __dirname;
let html = fs.readFileSync(path.join(here, 'pages/santhiya-vidyala.html'), 'utf8');

const three = fs.readFileSync(path.join(here, 'lib/three.min.js'), 'utf8');
html = html.replace('__THREE__', () => three);

const assets = path.resolve(here, '../Assets/Instagram');
for (const f of ['santhiya-camp-feb2026.jpg', 'santhiya-camp-may2026.jpg']) {
  const b64 = fs.readFileSync(path.join(assets, f)).toString('base64');
  html = html.split(`../../Assets/Instagram/${f}`).join(`data:image/jpeg;base64,${b64}`);
}
const out = path.join(here, 'santhiya-vidyala.built.html');
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1048576).toFixed(2), 'MB');
