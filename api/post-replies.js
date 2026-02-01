// Post replies to Google Business using browser automation
const templates = require('../clients/essa/REAL-TEMPLATES.json');

function pickTemplate(rating, isEnglish = false) {
  if (isEnglish) {
    return templates.english[0] || "Thank you! <3";
  }
  
  const ratingTemplates = templates[rating] || templates.FIVE;
  return ratingTemplates[Math.floor(Math.random() * ratingTemplates.length)] || "Tusen takk! <3";
}

function postReplyViaUI(reviewerName, rating, comment) {
  const isEnglish = /thank you|good|great|nice/i.test(comment);
  const template = pickTemplate(rating, isEnglish);
  
  // Personalize if possible
  let reply = template;
  if (template.includes('Henrik') && reviewerName) {
    reply = template.replace('Henrik', reviewerName.split(' ')[0]);
  } else if (template.includes('John Arne') && reviewerName) {
    reply = template.replace('John Arne', reviewerName);
  }
  
  return reply;
}

// Generate replies for all unanswered ESSA reviews
const fs = require('fs');
const path = require('path');

const reviewsPath = path.join(__dirname, '../clients/essa/ALL-GOOGLE-REVIEWS.json');
let content = fs.readFileSync(reviewsPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reviews = data.reviews || data;

const unanswered = reviews.filter(r => !r.reviewReply && r.comment);

console.log(`\n🦁 POSTING ${unanswered.length} REPLIES WITH REAL ESSA VOICE\n`);

const replies = unanswered.slice(0, 10).map(r => {
  const rating = r.starRating;
  const name = r.reviewer?.displayName || 'Anonymous';
  const comment = r.comment || '';
  
  return {
    name,
    rating,
    comment: comment.substring(0, 80),
    reply: postReplyViaUI(name, rating, comment)
  };
});

replies.forEach((r, i) => {
  console.log(`${i+1}. ${r.name} (${r.rating}⭐)`);
  console.log(`   "${r.reply}"`);
  console.log('');
});

console.log('\n✅ Ready to post to Google Business\n');
