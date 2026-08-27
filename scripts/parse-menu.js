const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'menu-raw');

const MAP = {
  cat_10: { id: 'antipasti', name_it: 'Antipasti', kind: 'flat' },
  cat_20: { id: 'insalate', name_it: 'Insalate', kind: 'flat' },
  cat_30: { id: 'pani', name_it: 'I Pani Fatti in Casa', kind: 'flat' },
  cat_70: { id: 'dolci', name_it: 'Dolci Fatti in Casa', kind: 'flat' },
  cat_90: { id: 'menu-bambini', name_it: 'Menu Bambini', kind: 'flat' },
  cat_178: { id: 'menu-vegano', name_it: 'Menù Vegano', kind: 'flat' },
  sub_1020: { id: 'paste', name_it: 'Paste' },
  sub_1030: { id: 'secondi', name_it: 'Secondi Piatti' },
  sub_1050: { id: 'contorni', name_it: 'Contorni' },
  sub_1060: { id: 'pizze-artigianali', name_it: 'Pizze Artigianali' },
  sub_1070: { id: 'covaccini', name_it: 'Covaccini Artigianali' },
  sub_1080: { id: 'calzoni', name_it: 'Calzoni Artigianali' },
  sub_1090: { id: 'ingredienti-extra', name_it: 'Ingredienti Extra' },
  sub_1594: { id: 'bicchiere', name_it: 'Bicchiere' },
  sub_1130: { id: 'vino-bianco', name_it: 'Vino Bianco' },
  sub_1140: { id: 'vino-rosso', name_it: 'Vino Rosso' },
  sub_1150: { id: 'vino-rosato', name_it: 'Vino Rosato' },
  sub_1100: { id: 'bibite', name_it: 'Bibite' },
  sub_1695: { id: 'birra', name_it: 'Birra' },
  sub_1110: { id: 'caffe', name_it: 'Caffè & Co.' },
  sub_1120: { id: 'liquori', name_it: 'Liquori / Amari' },
  sub_1796: { id: 'long-drinks', name_it: 'Long Drinks' },
};

const PARENT = {
  sub_1020: 'primi', sub_1030: 'secondi-piatti', sub_1050: 'secondi-piatti',
  sub_1060: 'pizze', sub_1070: 'pizze', sub_1080: 'pizze', sub_1090: 'pizze',
  sub_1594: 'vini', sub_1130: 'vini', sub_1140: 'vini', sub_1150: 'vini',
  sub_1100: 'bevande', sub_1695: 'bevande', sub_1110: 'bevande',
  sub_1120: 'bevande', sub_1796: 'bevande',
};

const PARENT_NAME = {
  primi: 'Primi Piatti', 'secondi-piatti': 'Secondi Piatti', pizze: 'Le Pizze',
  vini: 'Vini', bevande: 'Bevande',
};

function slug(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parsePrice(s) {
  s = (s || '').trim();
  if (!s) return { price: null, priceFrom: false };
  const from = /^da\s/i.test(s);
  const m = s.match(/(\d+)[.,](\d+)/);
  return { price: m ? parseFloat(m[1] + '.' + m[2]) : null, priceFrom: from };
}

function extractItems(html) {
  const items = [];
  const blocks = html.split(/class="row products-box/).slice(1);
  for (const block of blocks) {
    const b = 'class="row products-box' + block.split(/<div id="[^"]*" class="row products-box/)[0];
    const titleM = b.match(/products-title[^>]*>\s*([^<]+?)\s*<\/p>/);
    const decode = (s) => s.replace(/&#039;/g, "'").replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const title = titleM ? decode(titleM[1].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()) : '';
    if (!title) continue;
    const priceM = b.match(/products-price[^>]*>\s*([^<]+?)\s*<\/p>/);
    const descM = b.match(/products-description[^>]*>\s*([\s\S]*?)<\/div>/);
    const imgM = b.match(/background-image: url\('([^']+)'\)/);
    const { price, priceFrom } = parsePrice(priceM ? priceM[1] : '');
    let desc = descM ? descM[1] : '';
    desc = desc.replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/gi, ', ')
      .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    desc = decode(desc);
    const imgRaw = imgM ? imgM[1] : '';
    const image = imgRaw ? imgRaw.replace(/^\/images_catalogo_chack\//, '') : 'placeholder.png';
    items.push({
      id: '',
      name_it: title,
      description_it: desc,
      price,
      priceFrom,
      image,
    });
  }
  return items;
}

function dedupe(items, seen) {
  for (const it of items) {
    let base = slug(it.name_it) || 'item';
    let id = base;
    let n = 2;
    while (seen.has(id)) id = base + '-' + (n++);
    seen.set(id, true);
    it.id = id;
  }
  return items;
}

const categories = [];
const flat = ['cat_10', 'cat_20', 'cat_30', 'cat_70', 'cat_90', 'cat_178'];
for (const f of flat) {
  const html = fs.readFileSync(path.join(rawDir, f + '.html'), 'utf8');
  categories.push({
    id: MAP[f].id,
    name_it: MAP[f].name_it,
    items: extractItems(html),
  });
}

const subMap = new Map();
for (const [file, meta] of Object.entries(MAP)) {
  if (file.startsWith('sub_')) {
    if (!subMap.has(PARENT[file])) subMap.set(PARENT[file], []);
    const html = fs.readFileSync(path.join(rawDir, file + '.html'), 'utf8');
    subMap.get(PARENT[file]).push({ id: meta.id, name_it: meta.name_it, items: extractItems(html) });
  }
}
for (const [parentId, subs] of subMap) {
  categories.push({ id: parentId, name_it: PARENT_NAME[parentId], subcategories: subs });
}

const seen = new Map();
for (const c of categories) {
  const items = c.items || c.subcategories.flatMap((s) => s.items);
  dedupe(items, seen);
}

const out = path.join(__dirname, '..', 'data', 'menu-source.json');
fs.writeFileSync(out, JSON.stringify({ categories }, null, 4) + '\n');

let total = 0;
for (const c of categories) {
  const count = c.items ? c.items.length : c.subcategories.reduce((n, s) => n + s.items.length, 0);
  total += count;
  console.log(c.id, count);
}
console.log('TOTAL', total);