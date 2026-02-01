require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// Use AI-powered generator with few-shot learning
const { generateReply } = require('./ai-reply-generator');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Load reviews with proper UTF-8 handling
function loadReviews(business = 'essa') {
  const folderName = business === 'essa' ? 'essa' : 
                     business === 'vespa' ? 'Vespa-Humla' :
                     business === 'smash' ? 'Smash-House' : 'BLOKK-Asker';
  
  const filePath = path.join(__dirname, `../clients/${folderName}/ALL-GOOGLE-REVIEWS.json`);
  
  if (!fs.existsSync(filePath)) {
    return { reviews: [] };
  }
  
  // Read with explicit UTF-8 encoding and remove BOM
  let content = fs.readFileSync(filePath, { encoding: 'utf8' });
  content = content.replace(/^\uFEFF/, ''); // Remove BOM if present
  
  const data = JSON.parse(content);
  return { reviews: data.reviews || data };
}

// Get unanswered reviews
app.get('/api/reviews/:business', (req, res) => {
  const { business } = req.params;
  console.log(`📥 Loading reviews for: ${business}`);
  
  try {
    const { reviews } = loadReviews(business);
    
    const unanswered = reviews
      .filter(r => !r.reviewReply && r.comment)
      // Filter out translated reviews (Google adds "(Translated by Google)" marker)
      .filter(r => !r.comment.includes('(Translated by Google)'))
      .filter(r => !r.comment.includes('(Original)'))
      .map(r => ({
        id: r.name,
        reviewer: r.reviewer?.displayName || 'Anonymous',
        rating: r.starRating,
        comment: r.comment,
        createTime: r.createTime
      }));
    
    console.log(`✅ Found ${reviews.length} total, ${unanswered.length} unanswered`);
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({
      total: reviews.length,
      unanswered: unanswered.length,
      reviews: unanswered.slice(0, 20) // First 20
    });
  } catch (error) {
    console.error('❌ Error loading reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate AI reply
app.post('/api/generate-reply', async (req, res) => {
  try {
    const { review, business } = req.body;
    console.log(`🤖 Generating reply for ${review.reviewer} (${review.rating}⭐) [${business}]`);
    
    const reply = await generateReply(review, business);
    console.log(`✅ Generated: "${reply.substring(0, 50)}..."`);
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json({ 
      success: true, 
      reply 
    });
  } catch (error) {
    console.error('❌ Generation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Save approved reply
const approvedReplies = [];

app.post('/api/approve-reply', (req, res) => {
  const { reviewId, reply, business } = req.body;
  
  approvedReplies.push({
    reviewId,
    reply,
    business,
    approvedAt: new Date().toISOString()
  });
  
  res.json({ success: true, queueSize: approvedReplies.length });
});

// Get approved queue
app.get('/api/queue', (req, res) => {
  res.json({ queue: approvedReplies });
});

// Post to Google (placeholder)
app.post('/api/post-reply', async (req, res) => {
  const { reviewId, reply } = req.body;
  
  // TODO: Browser automation to actually post
  console.log(`Would post to ${reviewId}: "${reply}"`);
  
  res.json({ 
    success: true, 
    message: 'Reply posted to Google Business' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🦁 Review Autopilot running on http://localhost:${PORT}\n`);
});
