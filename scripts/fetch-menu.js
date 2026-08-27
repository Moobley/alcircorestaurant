const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const rawDir = path.join(__dirname, 'menu-raw');
fs.mkdirSync(rawDir, { recursive: true });
const jar = path.join(os.tmpdir(), 'opencode', 'menu-cookies.txt');
const base = 'https://alcircoristoranteitaliano.menu.is.it';
const UA = 'Mozilla/5.0';

function get(url, out) {
  execSync(`curl.exe -s -c "${jar}" -b "${jar}" -A "${UA}" "${url}" -o "${out}"`);
}

// First hits prime the cookie/session so subsequent page fetches return real content
// instead of the JS-redirect homepage / /expired redirects. The /Menus/df-it hit
// establishes the language session (visiting only `/` is not enough).
get(`${base}/`, path.join(rawDir, 'home.html'));
get(`${base}/Menus/df-it`, path.join(os.tmpdir(), 'opencode', 'priming.html'));

const pages = [
  ['cat_10', '/Menu/1/10'], ['cat_20', '/Menu/1/20'], ['cat_30', '/Menu/1/30'],
  ['cat_70', '/Menu/1/70'], ['cat_90', '/Menu/1/90'], ['cat_178', '/Menu/1/178'],
  ['sub_1020', '/Menu/1/40/1020'], ['sub_1030', '/Menu/1/50/1030'], ['sub_1050', '/Menu/1/50/1050'],
  ['sub_1060', '/Menu/1/60/1060'], ['sub_1070', '/Menu/1/60/1070'], ['sub_1080', '/Menu/1/60/1080'],
  ['sub_1090', '/Menu/1/60/1090'], ['sub_1594', '/Menu/1/134/1594'], ['sub_1130', '/Menu/1/134/1130'],
  ['sub_1140', '/Menu/1/134/1140'], ['sub_1150', '/Menu/1/134/1150'], ['sub_1100', '/Menu/1/80/1100'],
  ['sub_1695', '/Menu/1/80/1695'], ['sub_1110', '/Menu/1/80/1110'], ['sub_1120', '/Menu/1/80/1120'],
  ['sub_1796', '/Menu/1/80/1796'],
];

for (const [name, url] of pages) {
  get(`${base}${url}`, path.join(rawDir, `${name}.html`));
  console.log('fetched', name);
}
console.log('DONE');