import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors = []

for lang in ['', '.it', '.en', '.fr', '.de']:
    path = os.path.join(root, f'index{lang}.html')
    with open(path, encoding='utf-8') as f:
        content = f.read()
    if 'viewport-fit=cover' not in content:
        errors.append(f'index{lang}.html missing viewport-fit=cover')
    if 'sizes=' not in content:
        errors.append(f'index{lang}.html missing sizes= on about image')

with open(os.path.join(root, 'styles', 'print.css'), encoding='utf-8') as f:
    pc = f.read()
if '.mobile-action-bar' not in pc or 'display: none' not in pc:
    errors.append('styles/print.css does not hide .mobile-action-bar')

if errors:
    print('FAIL')
    for e in errors:
        print(' -', e)
    sys.exit(1)
print('PASS')