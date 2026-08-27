const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'data', 'menu-source.json'), 'utf8'));
const imgDir = path.join(root, 'images', 'menu');
fs.mkdirSync(imgDir, { recursive: true });

const base = 'https://alcircoristoranteitaliano.menu.is.it/images_catalogo_chack/';
const seen = new Set();
for (const c of source.categories) {
  const items = c.items || c.subcategories.flatMap(s => s.items);
  for (const it of items) {
    if (it.image === 'placeholder.png') continue;
    if (seen.has(it.image)) continue;
    seen.add(it.image);
    const out = path.join(imgDir, it.image);
    if (!fs.existsSync(out)) {
      try {
        execSync(`curl.exe -s -f -A "Mozilla/5.0" "${base}${encodeURIComponent(it.image)}" -o "${out}"`, { stdio: 'pipe' });
        console.log('downloaded', it.image);
      } catch (e) {
        console.log('FAILED', it.image);
      }
    } else {
      console.log('exists', it.image);
    }
  }
}
console.log('DONE', seen.size, 'unique');