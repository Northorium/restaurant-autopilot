# Restaurant Autopilot MVP

**Created:** 2026-01-30
**Status:** In Development

## Overview

AI-powered marketing automation for restaurants. Starting with 4 test restaurants:

1. **Blokk** - Detroit-style pizza @ Asker Mathall
2. **Smash House** - Smash burgers @ Asker Mathall  
3. **Vespa & Humla** - Pizza/brunch/brewery @ Grünerløkka
4. **Essa** - Local restaurant @ Ljabru Verk

## Features (MVP)

### Phase 1: Review Response
- Pull new Google reviews
- AI generates personalized responses
- Simple approval flow
- Auto-post approved responses

### Phase 2: Social Content
- Generate weekly content per restaurant
- Brand-specific tone and style
- Auto-schedule to Instagram/Facebook

## Folder Structure

```
restaurant-autopilot/
├── README.md
├── restaurants/
│   ├── blokk.json
│   ├── smash-house.json
│   ├── vespa-humla.json
│   └── essa.json
├── templates/
│   ├── review-responses/
│   └── social-content/
├── content/
│   └── week-1/
└── technical/
    └── spec.md
```

## Tech Stack

- **AI:** Claude API
- **Backend:** Node.js
- **APIs:** Google Business, Meta Graph
- **Storage:** JSON/Supabase
- **Scheduling:** Cron or n8n

## Next Steps

1. Review generated content
2. Set up Google Business API access
3. Build simple approval dashboard
4. Test with one restaurant first
5. Expand to all 4
