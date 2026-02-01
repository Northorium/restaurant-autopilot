// Extract REAL reply templates from existing answers
const fs = require('fs');
const path = require('path');

const reviewsPath = path.join(__dirname, '../clients/essa/ALL-GOOGLE-REVIEWS.json');
let content = fs.readFileSync(reviewsPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reviews = data.reviews || data;

// Get all existing replies
const withReplies = reviews.filter(r => r.reviewReply?.comment);

const templates = {
  FIVE: [],
  FOUR: [],
  THREE: [],
  TWO: [],
  ONE: [],
  english: []
};

withReplies.forEach(r => {
  const reply = r.reviewReply.comment;
  const rating = r.starRating;
  
  // Check if English
  if (reply.match(/thank you|merry christmas|welcome back/i)) {
    templates.english.push(reply);
  } else {
    templates[rating]?.push(reply);
  }
});

console.log('🦁 EKTE ESSA-SVAR\n');
console.log('5⭐ SVAR:');
templates.FIVE.forEach(r => console.log(`  "${r}"`));
console.log('\n4⭐ SVAR:');
templates.FOUR.forEach(r => console.log(`  "${r}"`));
console.log('\n3⭐ SVAR:');
templates.THREE.forEach(r => console.log(`  "${r}"`));
console.log('\n1⭐ SVAR:');
templates.ONE.forEach(r => console.log(`  "${r}"`));
console.log('\nENGLISH:');
templates.english.forEach(r => console.log(`  "${r}"`));

// Save templates
fs.writeFileSync(
  path.join(__dirname, '../clients/essa/REAL-TEMPLATES.json'),
  JSON.stringify(templates, null, 2)
);

console.log('\n💾 Saved to REAL-TEMPLATES.json');
