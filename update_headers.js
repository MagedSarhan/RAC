const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const startIndex = indexHtml.indexOf('<nav class="navbar navbar-expand-lg navbar-alamah" id="mainNav">');
let endIndex = indexHtml.indexOf('<!-- ═══════════════════════════════════\n       HERO SLIDER');
if (endIndex === -1) endIndex = indexHtml.indexOf('<!-- ═══════════════════════════════════\r\n       HERO SLIDER');

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find header boundaries in index.html");
    process.exit(1);
}

const newHeader = indexHtml.substring(startIndex, endIndex).trimEnd() + '\n\n';

const files = ['contact.html', 'product.html', 'products.html'];
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<nav class="navbar navbar-expand-lg navbar-alamah" id="mainNav">');
    let endStr = '<div style="height:90px;"></div>';
    let end = content.indexOf(endStr);
    
    if (end === -1) {
        endStr = '<!-- SPACER for fixed navbar -->';
        end = content.indexOf(endStr);
    }
    
    if (end === -1) {
        endStr = '<div style="height: 80px;"></div>';
        end = content.indexOf(endStr);
    }

    if (start !== -1 && end !== -1) {
        content = content.substring(0, start) + newHeader + "  " + content.substring(end);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.error(`Could not find header boundaries in ${file}`);
    }
}
