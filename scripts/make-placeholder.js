// images/menu/placeholder.png - 1x1 cream pixel (#F5F0E1), scales with object-fit
const fs = require('fs');
const path = require('path');
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
fs.writeFileSync(path.join(__dirname, '..', 'images', 'menu', 'placeholder.png'), Buffer.from(b64, 'base64'));
console.log('placeholder written');