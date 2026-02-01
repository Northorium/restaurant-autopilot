# Tone Learning System - How It Actually Works

## The Problem
Every restaurant owner says "just sound like us" but can't explain what that means.

## The Solution
We extract their voice from what they've ALREADY written.

---

# PHASE 1: Extraction (Day 1)

## Step 1: Scrape Their Existing Responses

We pull all their Google review responses:

```
Asker Mathall - 12 owner responses found
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Response 1:**
> "Rob! Great to hear about your experience although your sandwich took a bit more time then expected. It's been a fantastic and busy opening weekend and we will work on tuning the timing and service where needed to get from good to great! Thank you for your review!"

**Response 2:**
> "Craig. Thanks for your great review and hope to see you again :)"

**Response 3:**
> "Neil, so sorry to hear about your experience with your visit. It's been a busy opening weekend however not an excuse not to deliver great food! Hope you will give us a chance again in the future."

**Response 4:**
> "Hi Lise, thank you for visiting us and for leaving feedback. We understand that there is a need to better highlight that we have set up two cleaning stations so that you can take your plates, glasses and cutlery there."

---

## Step 2: AI Analyzes Patterns

```
Analyzing 12 responses...

PATTERN DETECTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 GREETING STYLE:
   "Rob!" (5x) - First name + exclamation
   "Hi Lise," (2x) - Hi + name + comma
   "Craig." (1x) - Just name + period
   
   → Primary: First name + punctuation (no "Dear", no "Hello")

📏 LENGTH:
   Average: 38 words
   Shortest: 12 words ("Craig. Thanks for...")
   Longest: 67 words (complaint response)
   
   → Short for praise, longer for complaints

🎭 TONE MARKERS:
   Positive words: "great" (6x), "thank" (9x), "hope" (5x)
   Never uses: "amazing", "awesome", "fantastic customer"
   Acknowledges problems: "so sorry" (3x), "not an excuse" (2x)
   
   → Warm but not over-the-top. Direct about issues.

😊 EMOJI:
   Total emojis: 2 (both were ":)")
   
   → Rare, only positive closings

🇳🇴/🇬🇧 LANGUAGE:
   English responses: 10
   Norwegian responses: 2
   Responded in English to Norwegian reviews: 4
   
   → Defaults to English, but Norwegian works too

🔄 CLOSING STYLE:
   "Thank you for your review!" (4x)
   "Hope to see you again" (3x)
   "Hope you will give us a chance" (2x)
   
   → Always ends with thanks or invitation
```

---

## Step 3: Generate Voice Profile

```json
{
  "voice_id": "asker-mathall-v1",
  "extracted_from": "12 Google review responses",
  "confidence": 0.85,
  
  "patterns": {
    "greeting": {
      "style": "firstname_direct",
      "examples": ["Rob!", "Neil,", "Hi Lise,"],
      "never": ["Dear", "Hello there", "Hey"]
    },
    
    "length": {
      "positive_reviews": "15-25 words",
      "neutral_reviews": "30-45 words", 
      "negative_reviews": "45-70 words"
    },
    
    "vocabulary": {
      "high_frequency": ["great", "thank", "hope", "experience", "feedback"],
      "moderate": ["appreciate", "glad", "visit"],
      "never": ["amazing", "awesome", "absolutely", "incredible", "best"]
    },
    
    "problem_handling": {
      "acknowledge": true,
      "apologize": "direct, not groveling",
      "excuses": false,
      "example": "not an excuse not to deliver great food"
    },
    
    "emoji": {
      "frequency": "rare",
      "allowed": [":)", "🙏"],
      "never": ["😍", "🔥", "💯", "❤️"]
    },
    
    "closing": {
      "positive": ["Thanks for stopping by", "Hope to see you again"],
      "negative": ["Hope you'll give us another chance"]
    }
  }
}
```

---

# PHASE 2: Validation (Day 1-2)

## The Blind Test

We show the owner 6 responses - 3 real (theirs), 3 AI-generated.

**"Which ones did you write?"**

```
┌─────────────────────────────────────────────────────────────┐
│ RESPONSE A                                                   │
│                                                              │
│ "Rob! Glad you enjoyed the opening weekend buzz. Sorry      │
│ about the wait on your sandwich - we're working on getting  │
│ faster. Thanks for the feedback!"                           │
│                                                              │
│                              [ MINE ]  [ NOT MINE ]          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RESPONSE B                                                   │
│                                                              │
│ "Craig. Thanks for your great review and hope to see you    │
│ again :)"                                                    │
│                                                              │
│                              [ MINE ]  [ NOT MINE ]          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RESPONSE C                                                   │
│                                                              │
│ "Hi Inger! So happy you loved Tomodomo's ramen - it's one  │
│ of our favorites too. Thanks for the kind words, hope to    │
│ see you back soon!"                                          │
│                                                              │
│                              [ MINE ]  [ NOT MINE ]          │
└─────────────────────────────────────────────────────────────┘
```

**Results:**
- If they guess wrong → voice is dialed in ✅
- If they guess right → we learn what's off and adjust

---

## Feedback Loop

When they spot a fake:

```
┌─────────────────────────────────────────────────────────────┐
│ What gave it away?                                          │
│                                                              │
│ [ ] Too formal                                              │
│ [ ] Too casual                                              │
│ [ ] Wrong words                                             │
│ [ ] Too long                                                │
│ [ ] Too short                                               │
│ [ ] Wrong emoji                                             │
│ [ ] Just doesn't sound like us                              │
│                                                              │
│ Notes: _______________________________________________      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# PHASE 3: Live Examples (Both Languages)

## ⭐⭐⭐⭐⭐ 5-Star Review

**Norwegian review:**
> "Fantastisk stemning og knallgod ramen fra Tomodomo! Kommer tilbake 🍜"

**AI Response (norsk):**
> Så hyggelig å høre! Tomodomo sin ramen er en favoritt her også. Takk for besøket – sees snart igjen!

**English review:**
> "Amazing vibe and great ramen from Tomodomo! Will be back 🍜"

**AI Response (english):**
> Great to hear! Tomodomo's ramen is a favorite here too. Thanks for stopping by – hope to see you again soon!

---

## ⭐⭐⭐⭐ 4-Star Review

**Norwegian review:**
> "Fin atmosfære, god mat fra Desi Bites. Litt rotete med bestilling og henting, men ellers bra!"

**AI Response (norsk):**
> Takk for tilbakemeldingen! Glad du likte Desi Bites. Du har rett i at bestillingsflyten kan bli bedre – vi jobber med det. Håper du stikker innom igjen!

**English review:**
> "Nice atmosphere, good food from Desi Bites. Bit confusing with ordering and pickup, but otherwise solid!"

**AI Response (english):**
> Thanks for the feedback! Glad you enjoyed Desi Bites. You're right that the ordering flow could be smoother – we're working on it. Hope to see you again!

---

## ⭐⭐⭐ 3-Star Review

**Norwegian review:**
> "Ok konsept, men prisene er stive og porsjonene små. Hadde forventet mer for pengene."

**AI Response (norsk):**
> Takk for at du deler dette. Vi hører deg på pris vs. porsjon – det er viktig feedback. Håper du vil teste oss igjen og se om vi treffer bedre neste gang.

**English review:**
> "Decent concept, but prices are steep and portions small. Expected more for the money."

**AI Response (english):**
> Thanks for sharing this. We hear you on price vs. portion – that's important feedback. Hope you'll give us another try and see if we hit the mark better next time.

---

## ⭐⭐ 2-Star Review

**Norwegian review:**
> "Lang ventetid, maten var lunken da den kom. Skuffende."

**AI Response (norsk):**
> Det er ikke bra nok. Beklager ventetiden og at maten ikke var varm – ingen unnskyldning for det. Håper du gir oss en ny sjanse.

**English review:**
> "Long wait, food was lukewarm when it arrived. Disappointing."

**AI Response (english):**
> That's not good enough. Sorry about the wait and the lukewarm food – no excuse for that. Hope you'll give us another chance.

---

## ⭐ 1-Star Review

**Norwegian review:**
> "Fryktelig opplevelse. Frekk betjening på Meraki, maten var dårlig og dyr. Kommer aldri tilbake."

**AI Response (norsk):**
> Tusen takk for at du tar deg tid til å skrive dette, selv om opplevelsen var dårlig. Dette er ikke greit, og vi beklager virkelig. Vi tar dette opp med teamet på Meraki. Hvis du vil gi oss en sjanse til å rette opp, send oss en DM så finner vi en løsning.

**English review:**
> "Terrible experience. Rude staff at Meraki, food was bad and overpriced. Never coming back."

**AI Response (english):**
> Thank you for taking the time to write this, even though the experience was poor. This isn't okay, and we're truly sorry. We're addressing this with the Meraki team. If you'd like to give us a chance to make it right, send us a DM and we'll find a solution.

---

# PHASE 4: Continuous Learning

## Every Response = Training Data

```
┌─────────────────────────────────────────────────────────────┐
│ NEW REVIEW from Anders K. ⭐⭐⭐⭐                            │
│ "God burger fra Smash House, men litt salt"                 │
├─────────────────────────────────────────────────────────────┤
│ AI SUGGESTION:                                              │
│ "Anders! Glad du likte burgeren. Litt for salt er god       │
│ feedback – vi tar det med til kjøkkenet. Takk for besøket!" │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [ ✅ Godkjenn ]  [ ✏️ Rediger ]  [ ❌ Forkast ]             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**If edited:**
```
Original: "Glad du likte burgeren"
Changed to: "Digg at burgeren traff"

→ System learns: They prefer "digg" over "glad", more casual
→ Updates voice profile
```

**After 20 edits:**
```
Voice profile updated:
- Added "digg" to high-frequency words
- Lowered formality score from 3 to 2.5
- Added "traff" as preferred positive verb
```

---

# PHASE 5: Quality Metrics

## Dashboard Stats

```
ASKER MATHALL - Voice Performance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reviews responded:     34/34 (100%) ✅
Avg response time:     2.4 hours
                       (was 18 hours before Autopilot)

AI Accuracy:
├─ Approved as-is:     72%
├─ Minor edits:        21%
├─ Major rewrites:     5%
└─ Rejected:           2%

Voice Consistency:     94%
Language match:        100%

Top edit reasons:
1. "Litt for formelt" (4x)
2. "Feil emoji" (2x)
3. "For langt" (1x)
```

---

# Summary: The Learning Loop

```
┌─────────────┐
│   SCRAPE    │ ← Pull existing responses
└──────┬──────┘
       ▼
┌─────────────┐
│   ANALYZE   │ ← AI finds patterns
└──────┬──────┘
       ▼
┌─────────────┐
│   PROFILE   │ ← Generate voice JSON
└──────┬──────┘
       ▼
┌─────────────┐
│  VALIDATE   │ ← Blind test with owner
└──────┬──────┘
       ▼
┌─────────────┐
│  GENERATE   │ ← AI writes responses
└──────┬──────┘
       ▼
┌─────────────┐
│  FEEDBACK   │ ← Owner approves/edits
└──────┬──────┘
       │
       └──────→ Loop back, voice improves
```

**Week 1:** 60% approved as-is
**Week 4:** 85% approved as-is
**Month 3:** 95% approved as-is → basically autopilot

---

*The longer they use it, the more it sounds like them.*
*That's the moat.*
