# Review Autopilot API

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable APIs:
   - Google My Business Account Management API
   - Google My Business Business Information API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/oauth/callback`
5. Copy Client ID and Client Secret to `.env`

### 4. OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy to `.env` as `OPENAI_API_KEY`

### 5. Run Server
```bash
npm start
```

## OAuth Flow

1. Visit `http://localhost:3000`
2. Click "Connect Google" (if not authenticated)
3. Authorize with your Google Business account
4. Reviews will load automatically

## API Endpoints

- `GET /api/reviews` - Get pending reviews (requires auth)
- `POST /api/reviews/:id/approve` - Approve and post response
- `POST /api/reviews/:id/edit` - Edit AI response
- `POST /api/reviews/:id/reject` - Reject review
- `GET /oauth/url` - Get OAuth authorization URL
- `GET /oauth/callback` - OAuth callback handler
- `GET /api/auth/status` - Check authentication status

## Features

- ✅ Multi-language support (Norwegian/English auto-detection)
- ✅ Unique voice profile per business
- ✅ AI-generated responses using GPT-4o-mini
- ✅ Google My Business API integration
- ✅ OAuth 2.0 authentication
- ✅ Clean Nordic UI design
