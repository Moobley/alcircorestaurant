import os, sys, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'styles.css'), encoding='utf-8') as f:
    css = f.read()

checks = {
    'dvh hero': '100dvh' in css,
    'clamp typography': 'clamp(' in css,
    'safe-area bar': 'env(safe-area-inset-bottom' in css,
    'action bar styles': '.mobile-action-bar' in css,
    'tap target 44px': '44px' in css,
    'min-width 640': '@media (min-width: 640px)' in css,
    'min-width 1024': '@media (min-width: 1024px)' in css,
    'min-width 1440': '@media (min-width: 1440px)' in css,
    'reduced motion': 'prefers-reduced-motion' in css,
    'only narrow-phone max-width': re.findall(r'@media \(max-width: (\d+)px\)', css) == ['359'],
    'print bar hidden': '.mobile-action-bar' in css.split('@media print')[1] if '@media print' in css else False,
}
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')