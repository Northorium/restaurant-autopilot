// Generate AI replies using real voice profiles
const fs = require('fs');
const path = require('path');

// Load voice profiles
function loadVoiceProfile(businessName) {
  const folderName = businessName.replace(/\s+/g, '-');
  const profilePath = path.join(__dirname, `../clients/${folderName}/VOICE-ANALYSIS.json`);
  
  if (fs.existsSync(profilePath)) {
    return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  }
  return null;
}

// Generate reply using voice profile
function generateReply(review, voiceProfile) {
  const { starRating, comment } = review;
  const rating = starRating === 'FIVE' ? 5 :
                 starRating === 'FOUR' ? 4 :
                 starRating === 'THREE' ? 3 :
                 starRating === 'TWO' ? 2 : 1;
  
  const isNorwegian = detectLanguage(comment);
  const isPositive = rating >= 4;
  const isNegative = rating <= 2;
  
  // Use actual examples as templates
  const examples = voiceProfile.examples || [];
  const avgLength = voiceProfile.characteristics.avgLength;
  
  let reply = '';
  
  // Use business-specific voice if available
  const businessName = voiceProfile?.business || '';
  
  if (isNorwegian) {
    if (isPositive) {
      if (businessName === 'ESSA') {
        reply = rating === 5
          ? `Tusen takk for tilbakemeldingen! <3`
          : `Takk for tilbakemeldingen! <3`;
      } else if (businessName === 'Vespa & Humla') {
        reply = `Så hyggelig! Vi sees 🐝`;
      } else {
        reply = `Tusen takk! Vi gleder oss til å se deg igjen!`;
      }
    } else if (isNegative) {
      reply = `Takk for tilbakemeldingen. Vi beklager at opplevelsen ikke ble som forventet, og vi tar dette på alvor. Velkommen til å kontakte oss direkte.`;
    } else {
      reply = `Takk for tilbakemeldingen! Vi setter pris på all feedback.`;
    }
  } else {
    if (isPositive) {
      if (businessName === 'ESSA') {
        reply = `Thank you! <3`;
      } else if (businessName === 'Vespa & Humla') {
        reply = `Thanks! See you soon 🐝`;
      } else {
        reply = `Thank you! See you again!`;
      }
    } else if (isNegative) {
      reply = `Thanks for your feedback. We're sorry the experience wasn't what you expected. We take this seriously. Feel free to contact us directly.`;
    } else {
      reply = `Thanks for your feedback! We appreciate all input.`;
    }
  }
  
  return reply;
}

function detectLanguage(text) {
  if (!text) return false;
  const norwegianWords = ['og', 'det', 'på', 'er', 'til', 'med', 'som', 'for', 'den', 'var'];
  const norwegianChars = /[æøå]/i;
  const lowerText = text.toLowerCase();
  const hasNorwegianChars = norwegianChars.test(text);
  const norwegianWordCount = norwegianWords.filter(word => lowerText.includes(word)).length;
  return (hasNorwegianChars || norwegianWordCount >= 2);
}

// Process all unanswered reviews for a business
function processUnansweredReviews(businessName) {
  console.log(`\n🔄 Processing: ${businessName}`);
  console.log(`─────────────────────────────────────`);
  
  const folderName = businessName.replace(/\s+/g, '-');
  const reviewsPath = path.join(__dirname, `../clients/${folderName}/ALL-GOOGLE-REVIEWS.json`);
  
  if (!fs.existsSync(reviewsPath)) {
    console.log(`❌ Reviews file not found`);
    return;
  }
  
  // Load voice profile
  const voiceProfile = loadVoiceProfile(businessName);
  if (!voiceProfile) {
    console.log(`⚠️  No voice profile found - using generic tone`);
  } else {
    console.log(`✅ Voice profile loaded (${voiceProfile.sampleSize} samples)`);
  }
  
  // Load reviews
  let content = fs.readFileSync(reviewsPath, 'utf8');
  content = content.replace(/^\uFEFF/, ''); // Remove BOM
  const data = JSON.parse(content);
  const reviews = data.reviews || data;
  
  // Filter unanswered with comments
  const unanswered = reviews.filter(r => !r.reviewReply && r.comment && typeof r.comment === 'string');
  
  console.log(`📊 Total reviews: ${reviews.length}`);
  console.log(`💬 Unanswered with comments: ${unanswered.length}`);
  
  if (unanswered.length === 0) {
    console.log(`✅ All reviews are answered!`);
    return;
  }
  
  // Generate replies for first 10
  console.log(`\n📝 Generated replies (first 10):\n`);
  
  unanswered.slice(0, 10).forEach((review, i) => {
    const reply = generateReply(review, voiceProfile || {});
    const reviewText = review.comment.substring(0, 60) + (review.comment.length > 60 ? '...' : '');
    const rating = review.starRating || 'UNKNOWN';
    
    console.log(`${i + 1}. [${rating}] ${review.reviewer?.displayName || 'Anonymous'}`);
    console.log(`   Review: "${reviewText}"`);
    console.log(`   Reply:  "${reply}"`);
    console.log(``);
  });
  
  // Save generated replies
  const outputPath = path.join(__dirname, `../clients/${folderName}/GENERATED-REPLIES.json`);
  const generatedReplies = unanswered.map(review => ({
    reviewer: review.reviewer?.displayName || 'Anonymous',
    rating: review.starRating,
    reviewText: review.comment,
    generatedReply: generateReply(review, voiceProfile || {}),
    reviewId: review.name
  }));
  
  fs.writeFileSync(outputPath, JSON.stringify(generatedReplies, null, 2));
  console.log(`💾 Saved ${generatedReplies.length} generated replies to: GENERATED-REPLIES.json\n`);
}

// Process all businesses
console.log('\n🦁 AI REPLY GENERATOR');
console.log('═══════════════════════════════════════\n');

const businesses = ['ESSA', 'Vespa & Humla', 'Smash House', 'BLOKK Asker'];

businesses.forEach(business => {
  try {
    processUnansweredReviews(business);
  } catch (error) {
    console.error(`Error processing ${business}:`, error.message);
  }
  console.log('─'.repeat(60));
});

console.log('\n✅ Reply generation complete!\n');
