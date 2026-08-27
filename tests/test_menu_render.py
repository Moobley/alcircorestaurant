import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'script.js'), encoding='utf-8') as f:
    js = f.read()

checks = {
    'subcategories branch': 'subcategories' in js,
    'render subcategory title': "className = 'menu-subcategory-title'" in js,
    'render item image': "className = 'menu-item-image'" in js,
    'image src assignment': '.src' in js and 'item.image' in js,
    'priceFrom branch': 'priceFrom' in js,
    'Da price prefix': "'Da '" in js,
    'placeholder fallback': 'placeholder' in js,
}
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')