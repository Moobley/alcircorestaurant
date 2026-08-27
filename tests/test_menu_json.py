import json, os, re, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'data', 'menu.json'), encoding='utf-8') as f:
    data = json.load(f)

LANGS = ('es', 'it', 'en', 'fr', 'de')
cats = data['categories']

def get_items(c):
    return c['items'] if 'items' in c else [it for s in c['subcategories'] for it in s['items']]

items = [it for c in cats for it in get_items(c)]
failed = []

def check(name, ok):
    if not ok:
        failed.append(name)

check('11 categories', len(cats) == 11)
check('229 items', len(items) == 229)
check('no INFO', all(c['id'] != 'informazioni' for c in cats))

for c in cats:
    check(f"cat name 5 langs: {c['id']}", set(c['name'].keys()) == set(LANGS))
    for it in get_items(c):
        check(f"item 5 langs: {it['id']}", set(it['name'].keys()) == set(LANGS))
        check(f"desc 5 langs: {it['id']}", set(it['description'].keys()) == set(LANGS))
        check(f"price type: {it['id']}", isinstance(it['price'], (int, float)) or it['price'] is None)
        check(f"image path: {it['id']}", it['image'].startswith('images/menu/'))
        check(f"badges list: {it['id']}", isinstance(it['badges'], list))

vegan = next(c for c in cats if c['id'] == 'menu-vegano')
check('vegano badges', all('vegano' in it['badges'] for it in get_items(vegan)))

if failed:
    print('FAIL -', ', '.join(failed[:20]))
    sys.exit(1)
print('PASS')