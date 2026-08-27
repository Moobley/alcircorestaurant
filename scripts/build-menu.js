const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const LANGS = ['es', 'it', 'en', 'fr', 'de'];
const source = JSON.parse(fs.readFileSync(path.join(root, 'data', 'menu-source.json'), 'utf8'));

const translations = { categories: {}, subcategories: {}, items: {} };
const trDir = path.join(__dirname, 'translations');
if (fs.existsSync(trDir)) {
  for (const f of fs.readdirSync(trDir).filter(f => f.endsWith('.json')).sort()) {
    const batch = JSON.parse(fs.readFileSync(path.join(trDir, f), 'utf8'));
    Object.assign(translations.categories, batch.categories || {});
    Object.assign(translations.subcategories, batch.subcategories || {});
    Object.assign(translations.items, batch.items || {});
  }
}

function langsFor(itText, tr) {
  const out = { it: itText };
  for (const l of LANGS) {
    if (l === 'it') continue;
    out[l] = (tr && tr[l]) || itText;
  }
  return out;
}

function buildItem(it) {
  const tr = translations.items[it.id] || {};
  return {
    id: it.id,
    name: langsFor(it.name_it, tr.name),
    description: langsFor(it.description_it || '', tr.description),
    price: it.price,
    priceFrom: it.priceFrom,
    image: 'images/menu/' + it.image,
    badges: [],
  };
}

function isSignature(name) { return /buona del mondo/i.test(name.it || name); }

function buildCategory(c) {
  const out = {
    id: c.id,
    name: langsFor(c.name_it, translations.categories[c.id]),
  };
  if (c.items) {
    out.items = c.items.map(buildItem);
  } else {
    out.subcategories = c.subcategories.map(s => ({
      id: s.id,
      name: langsFor(s.name_it, translations.subcategories[s.id]),
      items: s.items.map(buildItem),
    }));
  }
  return out;
}

const result = { categories: source.categories.map(buildCategory) };

// Badges: vegan for menu-vegano items, chef for signature dishes
function badgeFn(c) {
  const assign = (items) => items.forEach(it => {
    it.badges = [];
    if (c.id === 'menu-vegano') it.badges.push('vegano');
    if (isSignature(it.name)) it.badges.push('chef');
  });
  if (c.items) assign(c.items);
  else c.subcategories.forEach(s => assign(s.items));
}
result.categories.forEach(badgeFn);

fs.writeFileSync(path.join(root, 'data', 'menu.json'), JSON.stringify(result, null, 4) + '\n');

let total = 0;
for (const c of result.categories) {
  total += c.items ? c.items.length : c.subcategories.reduce((n, s) => n + s.items.length, 0);
}
console.log('menu.json items:', total);