// Tone Analyzer - Extract voice profile from existing replies
const fs = require('fs');
const path = require('path');

function analyzeExistingReplies(businessName, reviews) {
  console.log(`\n📊 Analyzing tone for: ${businessName}`);
  console.log(`─────────────────────────────────────────`);
  
  // Filter reviews with owner replies
  const withReplies = reviews.filter(r => r.reviewReply && r.reviewReply.comment);
  
  if (withReplies.length === 0) {
    console.log('❌ No existing replies found');
    return null;
  }
  
  console.log(`✅ Found ${withReplies.length} existing replies\n`);
  
  // Analyze patterns
  const analysis = {
    totalReplies: withReplies.length,
    avgLength: 0,
    useEmojis: false,
    emojiCount: 0,
    commonPhrases: {},
    tone: {
      formal: 0,
      casual: 0,
      warm: 0,
      professional: 0
    },
    examples: []
  };
  
  let totalChars = 0;
  
  withReplies.forEach(review => {
    const reply = review.reviewReply.comment;
    totalChars += reply.length;
    
    // Check for emojis
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
    const emojis = reply.match(emojiRegex);
    if (emojis) {
      analysis.useEmojis = true;
      analysis.emojiCount += emojis.length;
    }
    
    // Detect tone indicators
    if (reply.match(/tusen takk|takk for|så hyggelig/i)) analysis.tone.warm++;
    if (reply.match(/velkommen tilbake|gleder oss|ses/i)) analysis.tone.casual++;
    if (reply.match(/vi beklager|vi skal|vi tar/i)) analysis.tone.professional++;
    if (reply.match(/!/)) analysis.tone.casual++;
    
    // Store examples (up to 5)
    if (analysis.examples.length < 5) {
      analysis.examples.push({
        rating: review.starRating,
        reply: reply,
        length: reply.length
      });
    }
  });
  
  analysis.avgLength = Math.round(totalChars / withReplies.length);
  
  // Determine primary tone
  const toneScores = Object.entries(analysis.tone)
    .sort((a, b) => b[1] - a[1]);
  
  console.log(`📏 Average reply length: ${analysis.avgLength} characters`);
  console.log(`😀 Uses emojis: ${analysis.useEmojis ? 'Yes' : 'No'} (${analysis.emojiCount} total)`);
  console.log(`\n🎭 Tone breakdown:`);
  toneScores.forEach(([tone, count]) => {
    console.log(`   ${tone.padEnd(15)}: ${'█'.repeat(count)} (${count})`);
  });
  
  console.log(`\n📝 Example replies:\n`);
  analysis.examples.forEach((ex, i) => {
    console.log(`${i + 1}. [${ex.rating}⭐] "${ex.reply.substring(0, 80)}${ex.reply.length > 80 ? '...' : ''}"`);
  });
  
  return analysis;
}

// Load and analyze all businesses
const businesses = [
  { name: 'ESSA', path: '../clients/essa/ALL-GOOGLE-REVIEWS.json' },
  { name: 'Vespa & Humla', path: '../clients/Vespa-Humla/ALL-GOOGLE-REVIEWS.json' },
  { name: 'Smash House', path: '../clients/Smash-House/ALL-GOOGLE-REVIEWS.json' },
  { name: 'BLOKK Asker', path: '../clients/BLOKK-Asker/ALL-GOOGLE-REVIEWS.json' }
];

console.log('\n🦁 REVIEW TONE ANALYZER');
console.log('═══════════════════════════════════════════\n');

businesses.forEach(business => {
  try {
    const filePath = path.join(__dirname, business.path);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/^\uFEFF/, ''); // Remove BOM
      const data = JSON.parse(content);
      const reviews = data.reviews || data;
      
      const analysis = analyzeExistingReplies(business.name, reviews);
      
      if (analysis) {
        // Save voice profile
        const voiceProfile = {
          business: business.name,
          analyzedAt: new Date().toISOString(),
          sampleSize: analysis.totalReplies,
          characteristics: {
            avgLength: analysis.avgLength,
            useEmojis: analysis.useEmojis,
            avgEmojisPerReply: analysis.emojiCount / analysis.totalReplies,
            primaryTone: Object.entries(analysis.tone)
              .sort((a, b) => b[1] - a[1])[0][0],
            toneScores: analysis.tone
          },
          examples: analysis.examples
        };
        
        const outputPath = path.join(__dirname, `../clients/${business.name.replace(/\s+/g, '-')}/VOICE-ANALYSIS.json`);
        fs.writeFileSync(outputPath, JSON.stringify(voiceProfile, null, 2));
        console.log(`\n💾 Saved voice profile to: ${path.basename(outputPath)}\n`);
      }
    }
  } catch (error) {
    console.error(`Error analyzing ${business.name}:`, error.message);
  }
  
  console.log('\n' + '─'.repeat(60) + '\n');
});

console.log('✅ Analysis complete!\n');
