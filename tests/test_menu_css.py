import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'styles.css'), encoding='utf-8') as f:
    css = f.read()
with open(os.path.join(root, 'styles', 'print.css'), encoding='utf-8') as f:
    print_css = f.read()

checks = {
    'subcategory title': '.menu-subcategory-title' in css,
    'item image': '.menu-item-image' in css,
    'image width': '.menu-item-image' in css and 'width:' in css,
    'image object-fit': 'object-fit: cover' in css,
    'grid item image flow': '.menu-items-grid' in css,
    'print item image': '.menu-item-image' in print_css,
}
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')