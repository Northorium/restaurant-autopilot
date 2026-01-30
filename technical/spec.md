# Restaurant Autopilot - Technical Specification

## Overview

Automated marketing system for restaurants that handles:
1. Review response generation and posting
2. Social media content generation and scheduling

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     RESTAURANT AUTOPILOT                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │   Reviews   │    │   Content   │    │  Dashboard  │       │
│  │   Module    │    │   Module    │    │   (Admin)   │       │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘       │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
│                    ┌───────┴───────┐                         │
│                    │   AI Engine   │                         │
│                    │   (Claude)    │                         │
│                    └───────────────┘                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Module 1: Review Response System

### Flow
```
1. FETCH: Pull new reviews from Google Business API
2. DETECT: Identify restaurant and sentiment
3. GENERATE: AI creates personalized response
4. QUEUE: Add to approval queue
5. APPROVE: Manual approval in dashboard
6. POST: Publish response via API
```

### Components

#### 1.1 Review Fetcher
```javascript
// Cron job: Every 30 minutes
async function fetchNewReviews(restaurantId) {
  const reviews = await googleBusiness.reviews.list({
    parent: `accounts/${accountId}/locations/${locationId}`,
    pageSize: 50,
    orderBy: 'updateTime desc'
  });
  
  // Filter for new reviews (not yet processed)
  const newReviews = reviews.filter(r => !isProcessed(r.reviewId));
  
  return newReviews;
}
```

#### 1.2 Response Generator
```javascript
async function generateResponse(review, restaurant) {
  const prompt = buildPrompt(review, restaurant);
  
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: prompt }],
    system: getSystemPrompt(restaurant)
  });
  
  return response.content[0].text;
}

function buildPrompt(review, restaurant) {
  return `
    Restaurant: ${restaurant.name}
    Brand Voice: ${restaurant.brand.tone}
    
    Review:
    Rating: ${review.starRating} stars
    Text: ${review.comment}
    Reviewer: ${review.reviewer.displayName}
    
    Generate a response that:
    1. Matches the brand voice
    2. Addresses specific points mentioned
    3. Is appropriate for the rating
    4. Is in Norwegian
    5. Includes relevant emoji sparingly
    6. Is 2-4 sentences
  `;
}
```

#### 1.3 Approval Queue
```javascript
// Simple JSON storage or database
const queue = {
  pending: [
    {
      id: 'uuid',
      restaurantId: 'blokk',
      reviewId: 'google-review-id',
      review: { /* original review */ },
      generatedResponse: 'Tusen takk for...',
      createdAt: '2026-01-30T10:00:00Z',
      status: 'pending' // pending | approved | rejected | posted
    }
  ]
};
```

#### 1.4 Response Poster
```javascript
async function postResponse(queueItem) {
  await googleBusiness.reviews.reply({
    name: `accounts/${accountId}/locations/${locationId}/reviews/${queueItem.reviewId}`,
    requestBody: {
      comment: queueItem.generatedResponse
    }
  });
  
  queueItem.status = 'posted';
  queueItem.postedAt = new Date().toISOString();
}
```

### Google Business API Setup

1. Create Google Cloud Project
2. Enable Google My Business API
3. Create OAuth 2.0 credentials
4. Get refresh token via OAuth flow
5. Store credentials securely

```javascript
// Required scopes
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage'
];
```

---

## Module 2: Social Content System

### Flow
```
1. TRIGGER: Weekly cron (Sunday evening)
2. LOAD: Fetch restaurant profile and context
3. GENERATE: AI creates week's content
4. REVIEW: Optional manual review
5. SCHEDULE: Queue posts with timing
6. PUBLISH: Auto-post at scheduled times
```

### Components

#### 2.1 Content Generator
```javascript
async function generateWeekContent(restaurant) {
  const prompt = `
    Restaurant: ${restaurant.name}
    Type: ${restaurant.type}
    Brand Voice: ${restaurant.brand.tone}
    Tagline: ${restaurant.brand.tagline}
    Key Points: ${restaurant.content.uniquePoints.join(', ')}
    Hashtags: ${restaurant.content.hashtags.join(' ')}
    
    Generate 7 Instagram posts for the week:
    - Monday: Product/food focus
    - Tuesday: Behind the scenes
    - Wednesday: Educational/informative
    - Thursday: Engagement (question/poll)
    - Friday: Weekend invitation
    - Saturday: Atmosphere/vibe
    - Sunday: Relaxed/weekly wrap-up
    
    For each post provide:
    1. Image suggestion
    2. Caption (Norwegian, 100-200 words)
    3. Hashtags (mix of always + rotating)
    4. Best posting time
    
    Match the brand voice exactly.
  `;
  
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: prompt }]
  });
  
  return parseContentResponse(response);
}
```

#### 2.2 Content Scheduler
```javascript
const schedule = {
  restaurantId: 'blokk',
  weekStarting: '2026-02-03',
  posts: [
    {
      id: 'uuid',
      dayOfWeek: 'monday',
      scheduledTime: '2026-02-03T17:00:00+01:00',
      platform: 'instagram',
      content: {
        caption: 'Crispy cheese edges...',
        hashtags: ['#blokkpizza', ...],
        imageSuggestion: 'Close-up of pizza...'
      },
      status: 'scheduled' // scheduled | posted | failed
    }
  ]
};
```

#### 2.3 Auto-Publisher
```javascript
// Cron: Every 15 minutes
async function checkAndPublish() {
  const now = new Date();
  const duePosts = await getScheduledPosts({
    scheduledTime: { $lte: now },
    status: 'scheduled'
  });
  
  for (const post of duePosts) {
    try {
      await publishToInstagram(post);
      post.status = 'posted';
    } catch (error) {
      post.status = 'failed';
      post.error = error.message;
    }
  }
}
```

### Meta Graph API Setup

1. Create Meta Developer App
2. Get Instagram Business Account connected
3. Generate long-lived access token
4. Request permissions: instagram_basic, instagram_content_publish

```javascript
async function publishToInstagram(post) {
  // Step 1: Upload media
  const mediaResponse = await fetch(
    `https://graph.facebook.com/v18.0/${igUserId}/media`,
    {
      method: 'POST',
      body: JSON.stringify({
        image_url: post.imageUrl,
        caption: `${post.content.caption}\n\n${post.content.hashtags.join(' ')}`,
        access_token: accessToken
      })
    }
  );
  
  const { id: creationId } = await mediaResponse.json();
  
  // Step 2: Publish media
  await fetch(
    `https://graph.facebook.com/v18.0/${igUserId}/media_publish`,
    {
      method: 'POST',
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken
      })
    }
  );
}
```

---

## Module 3: Dashboard (MVP)

### Simple Web Interface

```
/dashboard
├── /reviews
│   ├── Pending approval list
│   ├── Approve/Edit/Reject buttons
│   └── History of posted responses
│
├── /content
│   ├── This week's scheduled posts
│   ├── Preview posts
│   ├── Edit/reschedule options
│   └── Generate new week button
│
└── /settings
    ├── Restaurant profiles
    ├── API credentials
    └── Notification preferences
```

### Tech Stack Options

**Option A: Simple (Recommended for MVP)**
- Frontend: Next.js or simple HTML/CSS
- Backend: Node.js Express
- Database: JSON files or SQLite
- Hosting: Vercel or Railway

**Option B: More Robust**
- Frontend: Next.js
- Backend: Node.js
- Database: Supabase (Postgres)
- Hosting: Vercel + Supabase

---

## Data Models

### Restaurant
```typescript
interface Restaurant {
  id: string;
  name: string;
  fullName: string;
  type: string;
  location: {
    address: string;
    area: string;
    city: string;
  };
  contact: {
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  googleBusiness: {
    accountId?: string;
    locationId?: string;
    placeId?: string;
  };
  meta: {
    igUserId?: string;
    fbPageId?: string;
  };
  brand: {
    tagline: string;
    description: string;
    tone: string;
    keywords: string[];
    emoji: string;
  };
  content: {
    bestSellers: string[];
    uniquePoints: string[];
    hashtags: string[];
  };
}
```

### ReviewQueueItem
```typescript
interface ReviewQueueItem {
  id: string;
  restaurantId: string;
  reviewId: string;
  platform: 'google' | 'tripadvisor';
  review: {
    rating: number;
    text: string;
    reviewerName: string;
    createdAt: string;
  };
  generatedResponse: string;
  status: 'pending' | 'approved' | 'rejected' | 'posted';
  createdAt: string;
  approvedAt?: string;
  postedAt?: string;
}
```

### ScheduledPost
```typescript
interface ScheduledPost {
  id: string;
  restaurantId: string;
  platform: 'instagram' | 'facebook';
  scheduledTime: string;
  content: {
    caption: string;
    hashtags: string[];
    imageSuggestion: string;
    imageUrl?: string;
  };
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  postedAt?: string;
  error?: string;
}
```

---

## Implementation Phases

### Phase 1: MVP (Week 1-2)
- [ ] Set up project structure
- [ ] Implement review fetcher (Google API)
- [ ] Implement AI response generator
- [ ] Create simple approval interface
- [ ] Manual posting (copy/paste)

### Phase 2: Automation (Week 3-4)
- [ ] Auto-post approved responses
- [ ] Implement content generator
- [ ] Create content calendar view
- [ ] Set up scheduling system

### Phase 3: Polish (Week 5-6)
- [ ] Add all 4 restaurants
- [ ] Improve dashboard UI
- [ ] Add analytics/reporting
- [ ] Optimize AI prompts

### Phase 4: Scale (Month 2+)
- [ ] Onboard external customers
- [ ] Payment integration
- [ ] Multi-user support
- [ ] White-label options

---

## Environment Variables

```env
# Claude API
ANTHROPIC_API_KEY=sk-ant-...

# Google Business
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...

# Meta/Instagram
META_APP_ID=...
META_APP_SECRET=...
META_ACCESS_TOKEN=...

# Database
DATABASE_URL=...

# App
NODE_ENV=development
PORT=3000
```

---

## Quick Start Commands

```bash
# Initialize project
mkdir restaurant-autopilot
cd restaurant-autopilot
npm init -y
npm install express @anthropic-ai/sdk googleapis

# Run development
npm run dev

# Deploy
vercel deploy
```

---

## Security Considerations

1. **API Keys**: Never commit to git, use environment variables
2. **OAuth Tokens**: Store encrypted, refresh automatically
3. **User Data**: Comply with GDPR
4. **Rate Limits**: Respect API limits (Google: 60/min, Meta: varies)
5. **Content Review**: Keep human in the loop for responses

---

## Cost Estimates

| Service | Estimated Monthly Cost |
|---------|----------------------|
| Claude API | ~$20-50 (depends on volume) |
| Hosting (Vercel) | Free tier |
| Database (Supabase) | Free tier |
| Google APIs | Free (within limits) |
| Meta APIs | Free |
| **Total** | **~$20-50/month** |

---

## Next Steps

1. Kim reviews this spec
2. Set up development environment
3. Get Google Business API access
4. Build review fetcher first
5. Test with one restaurant
6. Iterate and expand
