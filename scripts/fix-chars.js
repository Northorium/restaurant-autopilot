// Fix character encoding issues
const fs = require('fs');
const path = require('path');

function fixText(text) {
  if (!text || typeof text !== 'string') return text;
  
  return text
    // Fix Norwegian å
    .replace(/Ǿ/g, 'å')
    // Fix other common issues
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/�/g, '');
}

function processValue(value) {
  if (typeof value === 'string') {
    return fixText(value);
  }
  if (Array.isArray(value)) {
    return value.map(processValue);
  }
  if (value && typeof value === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = processValue(v);
    }
    return result;
  }
  return value;
}

const files = [
  '../clients/essa/ALL-GOOGLE-REVIEWS.json'
];

console.log('\n🔧 Fixing characters...\n');

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  
  if (!fs.existsSync(fullPath)) return;
  
  console.log(`📝 ${path.basename(file)}`);
  
  const content = fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(content);
  const fixed = processValue(data);
  
  fs.writeFileSync(fullPath, JSON.stringify(fixed, null, 4), 'utf8');
  
  // Verify
  const verify = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const sample = (verify.reviews || verify).find(r => r.comment && r.comment.includes('også'));
  
  if (sample) {
    console.log('   ✅ Verified: "...', sample.comment.substring(sample.comment.indexOf('også'), sample.comment.indexOf('også') + 20), '..."');
  } else {
    console.log('   ✅ Fixed');
  }
});

console.log('\n✅ Done!\n');
