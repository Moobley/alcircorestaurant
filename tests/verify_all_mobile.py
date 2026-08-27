import json, os, subprocess, sys, time, urllib.request

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors = []

def check(cond, msg):
    if not cond:
        errors.append(msg)

# 1. All HTML files have viewport-fit=cover and sizes= on about image
for lang in ['', '.it', '.en', '.fr', '.de']:
    with open(os.path.join(root, f'index{lang}.html'), encoding='utf-8') as f:
        content = f.read()
    check('viewport-fit=cover' in content, f'index{lang}.html missing viewport-fit=cover')
    check('sizes=' in content, f'index{lang}.html missing sizes=')

# 2. JS syntax OK
r = subprocess.run(['node', '--check', os.path.join(root, 'script.js')], capture_output=True, text=True)
check(r.returncode == 0, f'script.js syntax error: {r.stderr}')

# 3. menu.json valid and complete
with open(os.path.join(root, 'data/menu.json'), encoding='utf-8') as f:
    menu = json.load(f)
check(len(menu['categories']) == 11, 'menu.json should have 11 categories')

# 4. Local server smoke test: index and all variants return 200, menu.json loads
server = subprocess.Popen(
    ['python', '-m', 'http.server', '8754', '--directory', root],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
time.sleep(2)
try:
    for path in ['index.html', 'index.it.html', 'index.en.html', 'index.fr.html', 'index.de.html',
                 'styles.css', 'script.js', 'data/menu.json', 'images/hero-circus-mobile.jpg']:
        try:
            resp = urllib.request.urlopen(f'http://localhost:8754/{path}')
            check(resp.status == 200, f'GET /{path} returned {resp.status}')
            resp.read()
        except Exception as e:
            check(False, f'GET /{path} failed: {e}')
finally:
    server.terminate()
    server.wait()

if errors:
    print('FAIL')
    for e in errors:
        print(' -', e)
    sys.exit(1)
print('PASS')