// AI Reply Generator using Claude with few-shot learning
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Load real examples for a business
function loadExamples(business) {
  const folderName = business === 'essa' ? 'essa' : 
                     business === 'vespa' ? 'Vespa-Humla' :
                     business === 'smash' ? 'Smash-House' : 'BLOKK-Asker';
  
  const templatesPath = path.join(__dirname, `../clients/${folderName}/REAL-TEMPLATES.json`);
  
  if (fs.existsSync(templatesPath)) {
    return JSON.parse(fs.readFileSync(templatesPath, 'utf8'));
  }
  
  // Fallback: minimal examples
  return {
    FIVE: ['Tusen takk! <3'],
    english: ['Thank you! <3']
  };
}

async function generateReply(review, business = 'essa') {
  const { starRating, comment, reviewer } = review;
  const name = reviewer?.displayName || '';
  const firstName = name.split(' ')[0];
  
  // Detect language
  const isEnglish = /thank you|good|great|nice|amazing|awesome|love|best/i.test(comment);
  const language = isEnglish ? 'English' : 'Norwegian';
  
  // Load real examples
  const examples = loadExamples(business);
  
  // Build few-shot examples
  const fiveStarExamples = (examples.FIVE || []).slice(0, 5).join('\n- ');
  const englishExamples = (examples.english || []).join('\n- ');
  
  // Business context
  const businessContext = {
    essa: 'ESSA er en nordisk restaurant med hygge og kvalitet.',
    vespa: 'Vespa & Humla er en casual pizzeria med lokal mat.',
    smash: 'Smash House er en urban burgerbar med street food vibe.',
    blokk: 'BLOKK Asker er et moderne treningssenter.'
  }[business] || '';
  
  const prompt = `Du svarer på Google-reviews for ${business.toUpperCase()}.

${businessContext}

EKTE ${business.toUpperCase()}-SVAR (5⭐):
- ${fiveStarExamples}

${englishExamples ? `ENGLISH REPLIES:\n- ${englishExamples}\n` : ''}

STIL & REGLER:
- Kort (max 2-3 setninger)
- Naturlig og personlig
- Bruk emoji som i eksemplene (ikke overdrive)
- Personalisér med fornavn hvis passende
- ${language} språk
- INGEN generisk AI-speak ("likte deg hos oss", "gleder oss til å se deg igjen")
- Lyd som et ekte menneske

REVIEW:
Kunde: ${name}
Rating: ${starRating} (${['ONE', 'TWO'].includes(starRating) ? 'negativ' : ['THREE'].includes(starRating) ? 'middels' : 'positiv'})
Kommentar: "${comment}"

Skriv BARE svaret (ingen forklaring):`;

  try {
    console.log(`🤖 Calling Claude for ${business}...`);
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      temperature: 0.8, // More creative
      messages: [{
        role: 'user',
        content: prompt
      }]
    });
    
    const reply = message.content[0].text.trim();
    console.log(`✅ Claude generated: "${reply.substring(0, 50)}..."`);
    
    return reply;
    
  } catch (error) {
    console.error('❌ Claude API error:', error.message);
    
    // Fallback to simple template
    if (starRating === 'FIVE') {
      return isEnglish ? 'Thank you! <3' : 'Tusen takk! <3';
    } else if (['ONE', 'TWO'].includes(starRating)) {
      return isEnglish 
        ? 'We are sorry to hear this. Please contact us directly so we can make it right.'
        : 'Vi beklager. Kontakt oss direkte så vi kan gjøre opp for dette.';
    } else {
      return isEnglish ? 'Thanks for the feedback!' : 'Takk for tilbakemeldingen!';
    }
  }
}

module.exports = { generateReply };
