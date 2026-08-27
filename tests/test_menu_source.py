import json, os, sys, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'data', 'menu-source.json'), encoding='utf-8') as f:
    data = json.load(f)

cats = data['categories']
ids = set(c['id'] for c in cats)
checks = {
    '11 categories': len(cats) == 11,
    'no INFO': 'informazioni' not in ids,
    'primi has subcats': any(c['id'] == 'primi' and 'subcategories' in c for c in cats),
    'antipasti flat': any(c['id'] == 'antipasti' and 'items' in c for c in cats),
}

total = 0
for c in cats:
    if 'items' in c:
        total += len(c['items'])
    else:
        total += sum(len(s['items']) for s in c['subcategories'])

all_ids = []
for c in cats:
    items = c['items'] if 'items' in c else [it for s in c['subcategories'] for it in s['items']]
    for it in items:
        assert it['id'], 'item missing id'
        assert it['name_it'], 'item missing name_it'
        assert isinstance(it['price'], (int, float)) or it['price'] is None
        assert isinstance(it['priceFrom'], bool)
        assert it['image'], 'item missing image'
        assert re.fullmatch(r'[\w.\-]+', it['image']), f"bad image: {it['image']}"
        all_ids.append(it['id'])

checks['229 total items'] = total == 229
checks['global unique ids'] = len(all_ids) == len(set(all_ids))
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')