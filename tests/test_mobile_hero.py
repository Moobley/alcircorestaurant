import os, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
path = os.path.join(root, 'images', 'hero-circus-mobile.jpg')
if not os.path.exists(path):
    print('FAIL - hero-circus-mobile.jpg missing')
    sys.exit(1)
size = os.path.getsize(path)
big = os.path.getsize(os.path.join(root, 'images', 'hero-circus.jpg'))
if size >= big:
    print('FAIL - mobile hero is not smaller than desktop hero')
    sys.exit(1)
print(f'PASS ({size} bytes < {big} bytes)')