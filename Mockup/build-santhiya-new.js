// Inline the Gurmat Vidyala roundel into a single self-contained page.
const fs = require('fs'), path = require('path');
const here = __dirname;
let html = fs.readFileSync(path.join(here, 'pages/santhiya.html'), 'utf8');
const logo = fs.readFileSync(path.resolve(here, '../Assets/Brand/gurmat-vidyala-512.png')).toString('base64');
if (!html.includes('__LOGO__')) throw new Error('__LOGO__ token missing');
html = html.split('__LOGO__').join('data:image/png;base64,' + logo);
const out = path.join(here, 'santhiya.built.html');
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1048576).toFixed(2), 'MB');
