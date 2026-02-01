// Fix mojibake (UTF-8 bytes misinterpreted as Windows-1252)
const fs = require('fs');
const path = require('path');

// Common mojibake patterns and their fixes
// UTF-8 → Windows-1252 mojibake
const fixes = {
  // Norwegian characters
  '\u01FE': 'å',  // Ǿ → å
  '\u01FC': 'Å',  // Ǿ → Å  
  '\u00F8': 'ø',  // Already correct
  '\u00D8': 'Ø',  // Already correct
  '\u00E6': 'æ',  // Already correct
  '\u00C6': 'Æ',  // Already correct
  'pǾ': 'på',
  'Ǿ': 'å',
  // Smart quotes and dashes
  'â€™': "'",
  'â€œ': '"',
  'â€': '"',
  'â€"': '—',
  'â€"': '–',
  'â€¦': '…',
  // Replacement char
  '�': '',
};

function fixMojibake(text) {
  if (!text || typeof text !== 'string') return text;
  
  let fixed = text;
  
  // Apply common fixes
  for (const [wrong, right] of Object.entries(fixes)) {
    fixed = fixed.split(wrong).join(right);
  }
  
  return fixed;
}

function processObject(obj) {
  if (typeof obj === 'string') {
    return fixMojibake(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(processObject);
  }
  
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = processObject(value);
    }
    return result;
  }
  
  return obj;
}

const files = [
  '../clients/essa/ALL-GOOGLE-REVIEWS.json',
  '../clients/Vespa-Humla/ALL-GOOGLE-REVIEWS.json',
  '../clients/Smash-House/ALL-GOOGLE-REVIEWS.json',
  '../clients/BLOKK-Asker/ALL-GOOGLE-REVIEWS.json'
];

console.log('\n🔧 MOJIBAKE FIXER\n');

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  ${path.basename(filePath)} - not found`);
    return;
  }
  
  console.log(`📝 ${path.basename(filePath)}`);
  
  try {
    // Read file
    const content = fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, '');
    const data = JSON.parse(content);
    
    // Fix all strings recursively
    const fixed = processObject(data);
    
    // Save
    fs.writeFileSync(fullPath, JSON.stringify(fixed, null, 4), 'utf8');
    
    // Show sample
    const reviews = fixed.reviews || fixed;
    if (reviews.length > 0) {
      const sampleReview = reviews.find(r => r.comment && r.comment.includes('å'));
      if (sampleReview) {
        console.log(`   ✅ Sample: "${sampleReview.comment.substring(0, 60)}..."`);
      } else {
        console.log(`   ✅ Fixed`);
      }
    }
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
});

console.log('\n✅ Done!\n');
