# Brand Voice System - Full Research & Plan

## The Problem

Every restaurant sounds the same on social media because:
- Owners can't articulate their voice
- AI defaults to generic marketing speak
- No system to capture and enforce consistency

**Our solution:** A structured voice capture + implementation system that makes AI output sound like the actual brand.

---

## Part 1: Voice Capture Process

### Step 1: Onboarding Interview (30 min with owner/manager)

**Identity Questions:**
- "If your restaurant was a person, who would it be?"
- "Describe your place in 3 words"
- "What makes you different from [competitor]?"
- "What would you NEVER say or do?"

**Customer Questions:**
- "Describe your ideal customer"
- "What do regulars say about you?"
- "What vibe do people feel when they walk in?"

**Communication Style:**
- "Do you use emojis? Which ones?"
- "Formal or casual? Funny or serious?"
- "Norwegian, English, or mix?"
- "Short punchy or longer storytelling?"

**The Anti-Voice (equally important):**
- "What marketing phrases make you cringe?"
- "What do competitors do that you hate?"
- "What's overdone in your industry?"

### Step 2: Content Audit

Scrape and analyze their existing content:

```
Sources to collect:
- Instagram posts (last 50)
- Facebook posts (last 50)
- Google review responses (all)
- Website copy
- Menu descriptions
- Any printed materials
```

**Analyze for:**
- Word frequency (what words do they repeat?)
- Sentence length (short punchy vs flowing?)
- Emoji patterns (which ones, how often?)
- Hashtag style
- How they handle complaints
- Humor attempts (do they land?)
- Norwegian vs English ratio

### Step 3: Voice Workshop (15 min exercise)

Show them 5 different AI-generated posts about the same thing.
Ask: "Which one sounds most like you? Least like you?"

Example for a pizza place:
```
A: "Our margherita is crafted with San Marzano tomatoes and fresh mozzarella di bufala 🍕✨"

B: "PIZZA. FRESH. HOT. NOW. 🔥"

C: "Made a margherita today. Turned out pretty nice actually."

D: "Fun fact: We import our tomatoes from the slopes of Mount Vesuvius because we're extra like that 🌋"

E: "Hei! Dagens pizza er margherita - enkel og god 🇳🇴"
```

Their choices reveal more than any questionnaire.

---

## Part 2: Voice Profile Structure

Store as JSON for each restaurant:

```json
{
  "restaurant_id": "blokk",
  "voice_profile": {
    "personality": {
      "traits": ["confident", "urban", "unpretentious"],
      "archetype": "The cool friend who knows good food",
      "energy": "chill but passionate"
    },
    "language": {
      "primary": "norwegian",
      "english_ratio": 0.2,
      "formality": 3,  // 1=very casual, 5=formal
      "humor": 4,      // 1=serious, 5=very playful
      "sentence_length": "short"  // short/medium/long
    },
    "vocabulary": {
      "favorite_words": ["digg", "fresh", "crispy", "Detroit-style"],
      "banned_words": ["yummy", "delicious", "perfect", "amazing"],
      "signature_phrases": ["Kvadratisk og kvalitet", "Edge game strong"],
      "emoji_set": ["🍕", "🔥", "💪", "🧀"],
      "emoji_frequency": "moderate",  // none/rare/moderate/heavy
      "hashtags": ["#detroitpizza", "#blokkpizza", "#askermathall"]
    },
    "responses": {
      "positive_review_style": "grateful but not gushing",
      "negative_review_style": "own it, fix it, no excuses",
      "complaint_handling": "direct apology, offer solution",
      "thank_you_variation": ["Takk!", "Digger at du digger det!", "🙏🔥"]
    },
    "anti_voice": {
      "never_say": ["world-famous", "best in town", "mouth-watering", "foodie heaven"],
      "never_do": ["excessive exclamation marks", "begging for follows", "corporate speak"],
      "avoid_topics": ["politics", "competitor bashing"]
    },
    "examples": {
      "approved_posts": [
        "Fredagspizza? Detroit-style med crispy cheese edges. Du vet du vil. 🍕🔥",
        "Ny uke, samme edge game. Kom innom 💪"
      ],
      "approved_review_responses": [
        "Takk for besøket! Glad du likte the crispy edges 🧀🔥",
        "Uff, beklager det! Ikke greit. DM oss så fikser vi det 🙏"
      ]
    }
  }
}
```

---

## Part 3: AI Implementation

### Prompt Engineering Structure

Every AI generation uses this template:

```
SYSTEM PROMPT:
You are writing as {restaurant_name}. 

VOICE PROFILE:
- Personality: {traits} - "{archetype}"
- Tone: {formality}/5 formal, {humor}/5 playful
- Language: {primary_language}, {english_ratio}% English words OK
- Sentence style: {sentence_length} sentences
- Use these emojis sparingly: {emoji_set}
- Signature phrases you can use: {signature_phrases}

NEVER USE:
- Words: {banned_words}
- Phrases: {never_say}
- Style: {never_do}

EXAMPLES OF YOUR VOICE:
{approved_posts}

---

USER REQUEST:
{task}
```

### Few-Shot Learning

Include 3-5 approved examples in every prompt:
- 2 similar to the current task
- 1 showing how to handle edge cases

This grounds the AI in actual approved content.

### Feedback Loop System

```
1. AI generates content
2. Client sees it in dashboard with options:
   [✅ Approve] [✏️ Edit] [❌ Reject] [🎯 Almost - tweak voice]
   
3. If edited or rejected, client can tag WHY:
   - "Too formal"
   - "We wouldn't say this word"
   - "Wrong emoji vibe"
   - "Too long"
   - Custom note
   
4. System logs feedback:
   {
     "original": "...",
     "action": "edited",
     "edited_to": "...",
     "feedback_tags": ["too formal"],
     "note": "We never use exclamation marks"
   }

5. Every 10 pieces of feedback → auto-update voice profile
6. Monthly: human review of voice drift
```

---

## Part 4: Voice Consistency Checks

### Automated Checks Before Publishing

```python
def voice_check(content, voice_profile):
    issues = []
    
    # Check banned words
    for word in voice_profile.banned_words:
        if word.lower() in content.lower():
            issues.append(f"Contains banned word: {word}")
    
    # Check emoji frequency
    emoji_count = count_emojis(content)
    if voice_profile.emoji_frequency == "rare" and emoji_count > 1:
        issues.append("Too many emojis for this brand")
    
    # Check sentence length
    avg_length = average_sentence_length(content)
    if voice_profile.sentence_length == "short" and avg_length > 10:
        issues.append("Sentences too long for brand voice")
    
    # Check formality score (use another AI call)
    formality = assess_formality(content)
    if abs(formality - voice_profile.formality) > 1.5:
        issues.append(f"Formality mismatch: expected {voice_profile.formality}, got {formality}")
    
    return issues
```

### Human Calibration

Monthly "voice audit":
1. Pull 10 random generated pieces
2. Mix with 5 pieces the client actually wrote
3. Ask client to identify which is which
4. If they can't tell → voice is dialed in
5. If obvious → analyze what's off

---

## Part 5: Scaling to Multiple Restaurants

### Voice Templates by Category

Start with base templates:

```
FAST_CASUAL_BASE = {
  "formality": 2,
  "humor": 4,
  "emoji_frequency": "moderate",
  "sentence_length": "short"
}

FINE_DINING_BASE = {
  "formality": 4,
  "humor": 2,
  "emoji_frequency": "rare",
  "sentence_length": "medium"
}

FAMILY_RESTAURANT_BASE = {
  "formality": 3,
  "humor": 3,
  "emoji_frequency": "moderate",
  "sentence_length": "medium"
}
```

Then customize per client. Faster onboarding.

### Voice Similarity Scoring

Prevent two clients from sounding identical:

```python
def voice_similarity(profile_a, profile_b):
    # Compare key attributes
    # Flag if >80% similar
    # Suggest differentiators
```

---

## Part 6: Onboarding Flow (Client-Facing)

### Self-Service Option (Basic)

Web form they fill out:
1. Upload logo + brand colors
2. 10-question voice quiz
3. Paste 3 examples of content they like
4. Pick from style samples
5. AI generates voice profile draft
6. They review and tweak

Time: 15-20 minutes
Output: 70% accurate voice profile

### Done-For-You Option (Premium)

1. We scrape their existing content
2. 30-min video call with questionnaire
3. We build voice profile
4. Generate 5 sample posts
5. They give feedback
6. We refine
7. Final approval

Time: 1-2 hours total
Output: 95% accurate voice profile

---

## Part 7: Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Voice System                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐     ┌──────────────────────────┐ │
│  │   Onboarding │────▶│    Voice Profile DB      │ │
│  │   Module     │     │   (JSON per restaurant)  │ │
│  └──────────────┘     └──────────────────────────┘ │
│                                │                    │
│                                ▼                    │
│  ┌──────────────┐     ┌──────────────────────────┐ │
│  │   Content    │────▶│   Prompt Builder         │ │
│  │   Request    │     │   (injects voice)        │ │
│  └──────────────┘     └──────────────────────────┘ │
│                                │                    │
│                                ▼                    │
│                       ┌──────────────────────────┐ │
│                       │   AI Generation          │ │
│                       │   (Claude/GPT)           │ │
│                       └──────────────────────────┘ │
│                                │                    │
│                                ▼                    │
│  ┌──────────────┐     ┌──────────────────────────┐ │
│  │   Voice      │◀───│   Generated Content      │ │
│  │   Checker    │     └──────────────────────────┘ │
│  └──────────────┘                                  │
│         │                                          │
│         ▼                                          │
│  ┌──────────────┐     ┌──────────────────────────┐ │
│  │   Client     │────▶│   Feedback Loop          │ │
│  │   Dashboard  │     │   (improves profile)     │ │
│  └──────────────┘     └──────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Priority

### MVP (Week 1-2)
- [ ] Voice profile JSON schema
- [ ] Basic onboarding questionnaire (web form)
- [ ] Prompt builder with voice injection
- [ ] Simple approve/reject feedback

### V1.1 (Week 3-4)
- [ ] Content audit scraper (Instagram)
- [ ] Automated voice checks
- [ ] Feedback tags and logging
- [ ] Voice drift detection

### V2 (Month 2)
- [ ] Self-service onboarding flow
- [ ] Voice similarity scoring
- [ ] Auto-profile updates from feedback
- [ ] A/B testing different voice variations

---

## Success Metrics

**Voice Accuracy:**
- Client can't distinguish AI from human-written: >80% of the time
- Rejected content rate: <10%
- Edit rate: <25%

**Efficiency:**
- Onboarding time: <30 min (self-service), <2 hours (premium)
- Time to first approved content: <24 hours

**Client Satisfaction:**
- "Sounds like us" rating: >4/5
- NPS on voice specifically: >50

---

## Competitive Advantage

Most AI content tools:
- Use generic prompts
- No voice customization
- One-size-fits-all

We offer:
- Deep voice capture process
- Continuous learning from feedback
- Consistency enforcement
- Voice that's actually THEIRS

This is our moat. The longer they use us, the better their voice profile gets.

---

*Document created: 2026-01-31*
*Author: Leon 🦁*
