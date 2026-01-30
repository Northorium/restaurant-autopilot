# 🚀 Restaurant Autopilot - Setup Guide

## Quick Start (2 minutes)

### Step 1: Get Anthropic API Key

1. Go to: https://console.anthropic.com/
2. Sign up / Log in
3. Go to "API Keys"
4. Create new key
5. Copy the key (starts with `sk-ant-...`)

### Step 2: Create .env File

In the `restaurant-autopilot` folder, create a file called `.env`:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3000
```

### Step 3: Run the App

```bash
cd C:\Users\kiman.KIM\clawd\restaurant-autopilot
npm start
```

### Step 4: Open in Browser

Go to: http://localhost:3000

---

## Features

### 📝 Review Response
- Select restaurant
- Choose rating (1-5 stars)
- Paste the review text
- Click "Generate Response"
- Copy and paste to Google

### 📅 Week Content
- Select restaurant
- Click "Generate Week Content"
- Get 7 days of Instagram posts
- Copy and schedule manually (for now)

### ✨ Single Post
- Select restaurant
- Optionally specify post type
- Click "Generate Post"
- Copy caption and use

---

## Folder Structure

```
restaurant-autopilot/
├── .env                  ← Your API key goes here
├── server.js             ← Main server
├── public/
│   └── index.html        ← Web interface
├── src/
│   ├── generator.js      ← AI generation logic
│   └── restaurants.js    ← Restaurant configurations
└── package.json
```

---

## Your Restaurants

| ID | Name | Location |
|----|------|----------|
| blokk | BLOKK | Asker Mathall |
| smashhouse | Smash House | Asker Mathall |
| vespahumla | Vespa & Humla | Grünerløkka |
| essa | Essa | Ljabru Verk |

---

## Cost Estimate

- Anthropic API: ~$0.003 per review response, ~$0.03 per week content
- Running 100 reviews + 4 weeks content = ~$0.50/month

---

## Need Help?

Message Leon on Telegram! 🦁
