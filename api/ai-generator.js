// AI Response Generator with Voice Profiles
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Voice profiles per business
const VOICE_PROFILES = {
  'ESSA': {
    norwegian: {
      tone: 'warm, direct, neighborhood-focused',
      style: 'casual, emoji-friendly, inviting',
      examples: [
        'Å, tusen takk! 🙏 Det varmer hjertet å høre at du koste deg hos oss.',
        'Så fint å høre! Vi gleder oss til å se deg igjen! 🍔',
        'Takk for besøket! Velkommen tilbake! ✨'
      ]
    },
    english: {
      tone: 'warm, direct, neighborhood-focused',
      style: 'casual, friendly, inviting',
      examples: [
        'Thank you so much! 🙏 So happy you enjoyed it!',
        'We can\'t wait to see you again! 🍔',
        'Thanks for visiting! Welcome back! ✨'
      ]
    }
  },
  'Vespa & Humla': {
    norwegian: {
      tone: 'warm, professional, cafe-style',
      style: 'friendly but polished, nordic minimalism',
      examples: [
        'Så hyggelig! Takk for besøket 🐝',
        'Velkommen tilbake til oss!',
        'Vi setter pris på tilbakemeldingen. Takk!'
      ]
    },
    english: {
      tone: 'warm, professional, cafe-style',
      style: 'friendly but polished, nordic minimalism',
      examples: [
        'Thank you for your feedback 🐝',
        'We appreciate your visit!',
        'We\'re continuously working to improve.'
      ]
    }
  },
  'BLOKK Asker': {
    norwegian: {
      tone: 'casual, street-food vibe, energetic',
      style: 'young, urban, fire emojis',
      examples: [
        'Digg! 🔥 Takk for besøket!',
        'Så bra! Ses snart!',
        'Takk! Velkommen tilbake! 🍕'
      ]
    },
    english: {
      tone: 'casual, street-food vibe, energetic',
      style: 'young, urban, fire emojis',
      examples: [
        'Thanks for visiting! 🔥',
        'So glad you loved it! See you soon!',
        'Thanks! Welcome back! 🍕'
      ]
    }
  },
  'Smash House': {
    norwegian: {
      tone: 'urban, burger-focused, hype',
      style: 'casual, energetic, slang-friendly',
      examples: [
        'Takk! 🍔 Stay lit!',
        'Digg! Kommer tilbake? 🔥',
        'Beste burgeren! Takk bro!'
      ]
    },
    english: {
      tone: 'urban, burger-focused, hype',
      style: 'casual, energetic, slang-friendly',
      examples: [
        'Thanks! 🍔 Best burgers in Oslo!',
        'Stay lit bro! 🔥',
        'Thanks for visiting! Come back soon!'
      ]
    }
  }
};

// Detect language from review text
function detectLanguage(text) {
  // Simple detection - look for Norwegian characters/words
  const norwegianWords = ['og', 'det', 'på', 'er', 'til', 'med', 'som', 'for', 'den', 'var'];
  const norwegianChars = /[æøå]/i;
  
  const lowerText = text.toLowerCase();
  const hasNorwegianChars = norwegianChars.test(text);
  const norwegianWordCount = norwegianWords.filter(word => lowerText.includes(word)).length;
  
  return (hasNorwegianChars || norwegianWordCount >= 2) ? 'norwegian' : 'english';
}

// Generate AI response
async function generateResponse(business, reviewText, rating) {
  const language = detectLanguage(reviewText);
  const profile = VOICE_PROFILES[business]?.[language] || VOICE_PROFILES['ESSA'][language];
  
  const sentiment = rating >= 4 ? 'positive' : (rating <= 2 ? 'negative' : 'neutral');
  
  const systemPrompt = `You are responding to a Google review for ${business}.

Voice profile:
- Tone: ${profile.tone}
- Style: ${profile.style}
- Language: ${language === 'norwegian' ? 'Norwegian (Bokmål)' : 'English'}

Examples of your voice:
${profile.examples.map(ex => `- "${ex}"`).join('\n')}

Guidelines:
- Keep responses SHORT (1-3 sentences max)
- Match the tone to the review sentiment
- For negative reviews: acknowledge, apologize if warranted, offer solution
- For positive reviews: thank warmly, invite back
- Use emojis naturally but sparingly (max 2-3)
- Sound authentic, not corporate
- Respond in ${language === 'norwegian' ? 'Norwegian' : 'English'}`;

  const userPrompt = `Review rating: ${rating}/5
Review text: "${reviewText}"

Generate a brief, authentic response.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 150
    });

    return {
      response: completion.choices[0].message.content.trim(),
      language,
      sentiment
    };
  } catch (error) {
    console.error('Error generating AI response:', error.message);
    // Fallback response
    return {
      response: language === 'norwegian' 
        ? 'Takk for tilbakemeldingen!' 
        : 'Thank you for your feedback!',
      language,
      sentiment
    };
  }
}

module.exports = {
  generateResponse,
  detectLanguage,
  VOICE_PROFILES
};
