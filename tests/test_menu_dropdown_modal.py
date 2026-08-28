import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'script.js'), encoding='utf-8') as f:
    js = f.read()
with open(os.path.join(root, 'styles.css'), encoding='utf-8') as f:
    css = f.read()

toggle_start = js.find("categoryToggle.addEventListener('click'")
toggle_click = js[toggle_start:] if toggle_start != -1 else ''

checks = {
    'toggle class': "'menu-category-toggle'" in js,
    'collapse class': "'menu-category-collapse'" in js,
    'aria-expanded attr': 'aria-expanded' in js,
    'aria-controls attr': 'aria-controls' in js,
    'initial closed': "'aria-expanded', 'false'" in js,
    'open class': "'is-open'" in js,
    'chevron class': "'menu-category-chevron'" in js,
    'handler aria-expanded write': "setAttribute('aria-expanded'" in toggle_click,
    'handler is-open toggle': "classList.toggle('is-open'" in toggle_click,
    'css toggle': '.menu-category-toggle' in css,
    'css collapse': '.menu-category-collapse' in css,
    'css open state': '.menu-category-collapse.is-open' in css,
    'css chevron': '.menu-category-chevron' in css,
    'css reduced-motion': 'prefers-reduced-motion' in css,
    'modal class': "'menu-modal'" in js,
    'openMenuModal fn': 'openMenuModal' in js,
    'dialog role': "'role', 'dialog'" in js,
    'aria-modal': 'aria-modal' in js,
    'escape close': "'Escape'" in js,
    'body lock': "'menu-modal-open'" in js,
    'card role button': 'aria-haspopup' in js,
    'dataset name': 'dataset.name' in js,
    'css modal': '.menu-modal' in css,
    'css modal image': '.menu-modal-image' in css,
    'css modal close': '.menu-modal-close' in css,
    'css body lock': '.menu-modal-open' in css,
}
failed = [k for k, ok in checks.items() if not ok]
if failed:
    print('FAIL -', ', '.join(failed))
    sys.exit(1)
print('PASS')
