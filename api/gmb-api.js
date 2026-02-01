// Google My Business API Integration
const { google } = require('googleapis');

// OAuth2 credentials will be set via environment
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth/callback'
);

// My Business API
const mybusinessaccountmanagement = google.mybusinessaccountmanagement('v1');
const mybusinessbusinessinformation = google.mybusinessbusinessinformation('v1');

// Business IDs mapping
const BUSINESS_IDS = {
  'ESSA': 'locations/11717195200126145618',
  'Vespa & Humla': 'locations/9986552087174552778',
  'BLOKK Asker': 'locations/16552531314958664675',
  'Smash House': 'locations/13781791519842778600'
};

// Get reviews for a location
async function getReviews(locationId) {
  try {
    const response = await mybusinessaccountmanagement.locations.reviews.list({
      parent: locationId,
      auth: oauth2Client
    });
    return response.data.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    throw error;
  }
}

// Reply to a review
async function replyToReview(reviewName, comment) {
  try {
    const response = await mybusinessaccountmanagement.locations.reviews.updateReply({
      name: reviewName,
      requestBody: {
        comment: comment
      },
      auth: oauth2Client
    });
    return response.data;
  } catch (error) {
    console.error('Error replying to review:', error.message);
    throw error;
  }
}

// Delete a review reply
async function deleteReply(reviewName) {
  try {
    await mybusinessaccountmanagement.locations.reviews.deleteReply({
      name: reviewName,
      auth: oauth2Client
    });
  } catch (error) {
    console.error('Error deleting reply:', error.message);
    throw error;
  }
}

// Set access token (from OAuth flow)
function setAccessToken(tokens) {
  oauth2Client.setCredentials(tokens);
}

// Get authorization URL
function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/business.manage']
  });
}

// Exchange code for tokens
async function getTokensFromCode(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

module.exports = {
  getReviews,
  replyToReview,
  deleteReply,
  setAccessToken,
  getAuthUrl,
  getTokensFromCode,
  BUSINESS_IDS
};
