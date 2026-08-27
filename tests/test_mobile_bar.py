import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'script.js'), encoding='utf-8') as f:
    js = f.read()

checks = {
    'buildActionBar': 'buildActionBar' in js,
    'mobile-action-bar class': "className = 'mobile-action-bar'" in js or 'mobile-action-bar' in js,
    'role navigation': "'role', 'navigation'" in js or '"role", "navigation"' in js,
    'tel href': 'tel:+34928765949' in js,
    'whatsapp href': 'phone=34608171862' in js,
    'menu anchor': "'#menu'" in js,
    'contatti anchor': "'#contatti'" in js,
    'lang map': 'document.documentElement.lang' in js,
    'reduced-motion': 'prefers-reduced-motion' in js,
}
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')