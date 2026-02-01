// Fix encoding issues in JSON files
const fs = require('fs');
const path = require('path');

const files = [
  '../clients/essa/ALL-GOOGLE-REVIEWS.json',
  '../clients/Vespa-Humla/ALL-GOOGLE-REVIEWS.json',
  '../clients/Smash-House/ALL-GOOGLE-REVIEWS.json',
  '../clients/BLOKK-Asker/ALL-GOOGLE-REVIEWS.json'
];

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  Skipping: ${path.basename(filePath)} (not found)`);
    return;
  }
  
  console.log(`\n🔧 Processing: ${path.basename(filePath)}`);
  
  // Read as buffer first
  const buffer = fs.readFileSync(fullPath);
  
  // Try to detect and fix encoding
  // If file starts with UTF-16 LE BOM, convert properly
  let content;
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    console.log('   Detected UTF-16 LE BOM');
    content = buffer.toString('utf16le');
  } else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    console.log('   Detected UTF-8 BOM');
    content = buffer.toString('utf8').substring(1); // Skip BOM
  } else {
    console.log('   No BOM, assuming UTF-8');
    content = buffer.toString('utf8');
  }
  
  // Parse and re-stringify to ensure valid JSON
  try {
    const data = JSON.parse(content);
    const clean = JSON.stringify(data, null, 4);
    
    // Save with UTF-8 encoding (no BOM)
    fs.writeFileSync(fullPath, clean, { encoding: 'utf8' });
    
    console.log('   ✅ Fixed and saved');
    
    // Show sample
    const reviews = data.reviews || data;
    if (reviews.length > 0 && reviews[0].comment) {
      const sample = reviews[0].comment.substring(0, 60);
      console.log(`   Sample: "${sample}..."`);
    }
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
});

console.log('\n✅ Encoding fix complete!\n');
