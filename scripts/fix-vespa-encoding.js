const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../clients/Vespa-Humla/REAL-TEMPLATES.json');
let content = fs.readFileSync(filePath, 'utf8');

// Fix mojibake
content = content
  .replace(/Ã¥/g, 'å')
  .replace(/Ã¦/g, 'æ')
  .replace(/Ã¸/g, 'ø')
  .replace(/ðŸ™ðŸ½/g, '🙏')
  .replace(/â¤ï¸/g, '❤️')
  .replace(/ðŸ˜Š/g, '😊')
  .replace(/ðŸ¤—/g, '🤗')
  .replace(/ðŸ'›/g, '💛')
  .replace(/ðŸ§¡/g, '🧡')
  .replace(/ðŸ"/g, '🍕');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed Vespa templates encoding!');
