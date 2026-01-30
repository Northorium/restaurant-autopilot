const Anthropic = require("@anthropic-ai/sdk");
const restaurants = require("./restaurants");

const client = new Anthropic();

// Generate a review response
async function generateReviewResponse(restaurantId, review) {
  const restaurant = restaurants[restaurantId];
  if (!restaurant) {
    throw new Error(`Unknown restaurant: ${restaurantId}`);
  }

  const prompt = `You are responding to a Google review for ${restaurant.fullName}.

RESTAURANT INFO:
- Name: ${restaurant.name}
- Type: ${restaurant.type}
- Location: ${restaurant.location}
- Brand Voice: ${restaurant.tone}
- Tagline: "${restaurant.tagline}"
- Contact: ${restaurant.instagram || restaurant.email || ""}

REVIEW TO RESPOND TO:
Rating: ${review.rating} stars
Review text: "${review.text}"
Reviewer name: ${review.reviewerName || "Guest"}

INSTRUCTIONS:
1. Write a response in Norwegian that matches the brand voice
2. Keep it 2-4 sentences
3. Be genuine and specific to what they mentioned
4. Include 1-2 relevant emoji (don't overdo it)
5. For negative reviews (1-3 stars), be apologetic and offer to make it right
6. For positive reviews (4-5 stars), be grateful and invite them back
7. Sign off naturally (no formal signatures)

Write ONLY the response text, nothing else.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].text;
}

// Generate social content for a week
async function generateWeekContent(restaurantId) {
  const restaurant = restaurants[restaurantId];
  if (!restaurant) {
    throw new Error(`Unknown restaurant: ${restaurantId}`);
  }

  const prompt = `Generate 7 Instagram posts for ${restaurant.fullName} for the upcoming week.

RESTAURANT INFO:
- Name: ${restaurant.name}
- Type: ${restaurant.type}  
- Location: ${restaurant.location}
- Brand Voice: ${restaurant.tone}
- Tagline: "${restaurant.tagline}"
- Keywords: ${restaurant.keywords.join(", ")}
- Emoji style: ${restaurant.emoji}
- Hashtags to use: ${restaurant.hashtags.join(" ")}

CONTENT CALENDAR:
- Monday: Product/food focus
- Tuesday: Behind the scenes or process
- Wednesday: Educational or fun fact
- Thursday: Engagement (question or poll idea)
- Friday: Weekend invitation
- Saturday: Atmosphere/vibe
- Sunday: Relaxed/weekly wrap-up

For EACH day, provide:
1. POST TYPE (what kind of content)
2. IMAGE IDEA (what to photograph)
3. CAPTION (in Norwegian, 50-150 words, include emoji naturally)
4. HASHTAGS (5-8 relevant ones)
5. BEST TIME TO POST

Format each day clearly with headers. Write in Norwegian. Match the brand voice exactly.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].text;
}

// Generate a single post
async function generateSinglePost(restaurantId, postType) {
  const restaurant = restaurants[restaurantId];
  if (!restaurant) {
    throw new Error(`Unknown restaurant: ${restaurantId}`);
  }

  const prompt = `Generate ONE Instagram post for ${restaurant.fullName}.

RESTAURANT INFO:
- Name: ${restaurant.name}
- Type: ${restaurant.type}
- Brand Voice: ${restaurant.tone}
- Tagline: "${restaurant.tagline}"
- Emoji style: ${restaurant.emoji}

POST TYPE: ${postType || "general food/product post"}

Provide:
1. IMAGE IDEA: What to photograph
2. CAPTION: In Norwegian, 50-150 words, with natural emoji use
3. HASHTAGS: 5-8 relevant ones

Match the brand voice. Be creative and engaging.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].text;
}

module.exports = {
  generateReviewResponse,
  generateWeekContent,
  generateSinglePost,
  restaurants,
};
