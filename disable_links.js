const fs = require('fs');

// Update index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(/href="products\.html\?cat=[^"]+"/g, 'href="javascript:void(0)"');
fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Updated index.html');

// Update main.js
let mainJsContent = fs.readFileSync('js/main.js', 'utf8');
mainJsContent = mainJsContent.replace(/href="product\.html\?id=\$\{[^}]+\}"/g, 'href="javascript:void(0)"');
mainJsContent = mainJsContent.replace(/href="products\.html\?cat=\$\{[^}]+\}"/g, 'href="javascript:void(0)"');
fs.writeFileSync('js/main.js', mainJsContent, 'utf8');
console.log('Updated js/main.js');

