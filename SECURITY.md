# 🔒 Security Overview

## ✅ Current Security Status

### What's Secure

**Local Operation**
- ✅ Runs only on `localhost:3000` (not exposed to internet)
- ✅ No cloud storage or external services
- ✅ Reviews stored locally on your machine

**API Keys**
- ✅ Claude API key in `.env` (not hardcoded)
- ✅ `.env` protected by `.gitignore`
- ✅ Not committed to git

**Data**
- ✅ Client reviews protected in `.gitignore`
- ✅ No sensitive data sent anywhere except Claude API

---

## ⚠️ Security Considerations

### 1. API Key Protection

**Risk:** Claude API key could be exposed if `.env` is shared or committed

**Mitigation:**
- `.env` is in `.gitignore`
- Never commit `.env` to git
- Never share `.env` file
- Rotate key if exposed

**Check your key is safe:**
```bash
git check-ignore api/.env  # Should return "api/.env"
```

---

### 2. Claude API Usage

**What gets sent to Claude:**
- Customer review text
- Reviewer name
- Rating (1-5 stars)
- Example replies from your business

**NOT sent:**
- Email addresses
- Phone numbers
- Payment information

**Privacy:**
- Claude API processes data according to [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy)
- No training on your data (with API key)

---

### 3. Google Business Reviews

**Current status:**
- Reviews loaded from local JSON files (Google Takeout export)
- **Posting NOT implemented yet**

**When posting is added:**
- Will require Google OAuth authentication
- Will use official Google My Business API
- Only post replies (never edit/delete reviews)

---

### 4. Local Files

**Sensitive files protected by `.gitignore`:**
- `api/.env` - API keys
- `clients/*/ALL-GOOGLE-REVIEWS.json` - Customer reviews
- `clients/*/GENERATED-REPLIES.json` - AI-generated replies

**Not protected (safe to commit):**
- `api/server.js` - Server code
- `api/public/*` - Frontend code
- `scripts/*` - Utility scripts

---

## 🚨 What To Do If Compromised

### If API Key is Exposed

1. **Immediately** go to [Anthropic Console](https://console.anthropic.com/)
2. Delete the exposed key
3. Generate new key
4. Update `api/.env` with new key
5. Check git history for leaks: `git log --all --full-history -- api/.env`

### If Git Repo is Public

1. Make repo private immediately
2. Rotate all API keys
3. Review git history for sensitive data
4. Consider using [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove secrets from history

---

## ✅ Best Practices

### Before Committing
```bash
# Check what you're about to commit
git status

# Make sure .env is NOT listed
# Should see "api/.env" when you run:
git check-ignore api/.env
```

### Production Deployment (when ready)

- [ ] Use environment variables (not `.env` file)
- [ ] Enable HTTPS
- [ ] Add authentication (login required)
- [ ] Rate limiting on API endpoints
- [ ] Audit logging
- [ ] Regular security updates

---

## 📞 Questions?

If you're unsure about security, **ask before proceeding**.

Better safe than sorry 🦁
