# 🚂 Railway Deployment Guide

## ✅ Project Ready!

Your API is configured and ready to deploy to Railway.

---

## 🚀 Deploy Steps (5 minutes)

### 1. Create Railway Account
👉 **Open:** https://railway.app/
- Click "Login with GitHub"
- Authorize Railway

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your `restaurant-autopilot` repo
- **Root Directory:** Select `api` folder

### 3. Set Environment Variables
In Railway dashboard:
- Click on your service
- Go to "Variables" tab
- Add these:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3000
```

**Important:** Use your real Anthropic API key!

### 4. Deploy!
- Railway auto-deploys on push
- Wait 2-3 minutes for build
- You'll get a URL: `https://your-app.railway.app`

---

## 🔒 Security Checklist

✅ `.env` is in `.gitignore` (already done)
✅ API key set in Railway Variables (you'll do this)
✅ Rate limiting enabled in `server.js` (already done)

---

## 🧪 Test Your Deployment

Once deployed, test it:

```bash
# Health check
curl https://your-app.railway.app/api/reviews/essa

# Generate a reply (replace URL)
curl -X POST https://your-app.railway.app/api/generate-reply \
  -H "Content-Type: application/json" \
  -d '{
    "review": {
      "reviewer": {"displayName": "Test User"},
      "rating": "FIVE",
      "comment": "Great food!"
    },
    "business": "essa"
  }'
```

---

## 💰 Cost

**Railway Free Tier:**
- $5 free credit/month
- ~500 hours of uptime
- Perfect for testing

**Claude API:**
- ~$0.003 per request
- 100 requests = $0.30

**Total monthly cost for testing: ~$0-1**

---

## 🎯 Next Steps After Deploy

1. Update frontend to use Railway URL
2. Test end-to-end flow
3. Show demo to restaurant owners!

---

## 🆘 Need Help?

If deployment fails, check:
- Railway build logs
- Environment variables are set correctly
- `package.json` has all dependencies

Just ask Leon 🦁
