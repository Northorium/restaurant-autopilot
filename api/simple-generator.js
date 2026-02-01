// Advanced template-based generator with variety
const fs = require('fs');
const path = require('path');

// Cache for templates per business
const templatesCache = {};

// Track used replies to avoid repetition
const usedReplies = new Map();

// Load templates for a specific business
function loadTemplates(business) {
  if (templatesCache[business]) {
    return templatesCache[business];
  }
  
  const folderName = business === 'essa' ? 'essa' : 
                     business === 'vespa' ? 'Vespa-Humla' :
                     business === 'smash' ? 'Smash-House' : 'BLOKK-Asker';
  
  const templatesPath = path.join(__dirname, `../clients/${folderName}/REAL-TEMPLATES.json`);
  
  if (fs.existsSync(templatesPath)) {
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));
    templatesCache[business] = templates;
    return templates;
  }
  
  // Fallback: generic templates
  console.log(`⚠️  No templates for ${business}, using generic`);
  return {
    FIVE: ['Tusen takk! <3', 'Thank you! <3'],
    FOUR: ['Takk for tilbakemeldingen! <3'],
    THREE: ['Takk for tilbakemeldingen!'],
    TWO: ['Takk for tilbakemeldingen. Vi tar dette på alvor.'],
    ONE: ['Vi beklager. Kontakt oss direkte så vi kan gjøre opp for dette.'],
    english: ['Thank you! <3']
  };
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Dynamic reply components per business
function getComponents(business) {
  // Business-specific variations
  const businessComponents = {
    essa: {
      norwegian: {
        thanks: ['Tusen takk', 'Så hyggelig', 'Takk', 'Tusen hjertelig takk'],
        emoji: ['<3', '😎', '🧡']
      },
      english: {
        thanks: ['Thank you', 'Thanks', 'Thank you so much'],
        emoji: ['<3', '😊']
      }
    },
    vespa: {
      norwegian: {
        thanks: ['Tusen takk', 'Så hyggelig', 'Takk'],
        emoji: ['🧡', '🐝', '😊']
      },
      english: {
        thanks: ['Thank you', 'Thanks'],
        emoji: ['🧡', '🐝']
      }
    },
    smash: {
      norwegian: {
        thanks: ['Takk', 'Kult', 'Nice'],
        emoji: ['🔥', '💪', '🍔']
      },
      english: {
        thanks: ['Thanks', 'Awesome', 'Cool'],
        emoji: ['🔥', '💪']
      }
    }
  };
  
  return businessComponents[business] || businessComponents.essa;
}

function buildCustomReply(rating, isEnglish, firstName, business) {
  const components = getComponents(business);
  const lang = isEnglish ? components.english : components.norwegian;
  
  if (rating === 'FIVE') {
    const thanks = pickRandom(lang.thanks);
    const positive = pickRandom(lang.positive);
    const emoji = pickRandom(lang.emoji);
    
    // Sometimes add name, sometimes not
    if (firstName && Math.random() > 0.5) {
      return `${thanks}, ${firstName}! ${emoji}`;
    }
    
    // Sometimes short, sometimes with full phrase
    if (Math.random() > 0.6) {
      return `${thanks} ${positive}! ${emoji}`;
    } else {
      return `${thanks}! ${emoji}`;
    }
  }
  
  if (rating === 'FOUR') {
    return isEnglish 
      ? `${pickRandom(lang.thanks)} ${pickRandom(lang.positive)}! ${pickRandom(lang.emoji)}`
      : `${pickRandom(lang.thanks)} ${pickRandom(lang.positive)}! ${pickRandom(lang.emoji)}`;
  }
  
  // For lower ratings, use templates
  return null;
}

function generateReply(review, business = 'essa') {
  const { starRating, comment, reviewer } = review;
  const name = reviewer?.displayName || '';
  const firstName = name.split(' ')[0];
  
  const isEnglish = /thank you|good|great|nice|amazing|awesome|love|best/i.test(comment);
  
  // Load business-specific templates
  const templates = loadTemplates(business);
  
  // For high ratings, try building custom reply
  if (starRating === 'FIVE' || starRating === 'FOUR') {
    const custom = buildCustomReply(starRating, isEnglish, firstName, business);
    if (custom) {
      // Check if we've used this exact reply recently
      const hash = `${business}-${starRating}-${custom}`;
      if (!usedReplies.has(hash) || usedReplies.get(hash) < Date.now() - 60000) {
        usedReplies.set(hash, Date.now());
        return custom;
      }
    }
  }
  
  // Fallback to templates
  let template;
  
  if (isEnglish) {
    template = pickRandom(templates.english) || "Thank you! <3";
  } else {
    const ratingTemplates = templates[starRating] || templates.FIVE;
    
    if (ratingTemplates.length === 0) {
      template = "Tusen takk! <3";
    } else {
      // Filter out recently used templates
      const available = ratingTemplates.filter(t => {
        const hash = `${business}-${starRating}-${t}`;
        return !usedReplies.has(hash) || usedReplies.get(hash) < Date.now() - 120000;
      });
      
      template = pickRandom(available.length > 0 ? available : ratingTemplates);
      
      // Mark as used
      const hash = `${business}-${starRating}-${template}`;
      usedReplies.set(hash, Date.now());
    }
  }
  
  // Personalize if contains name placeholder
  if (firstName) {
    template = template
      .replace(/Henrik/g, firstName)
      .replace(/John Arne/g, name)
      .replace(/Anders/g, firstName)
      .replace(/Egil/g, firstName)
      .replace(/Anette/g, firstName)
      .replace(/Christian/g, firstName)
      .replace(/Knut Olav/g, name)
      .replace(/Leszek/g, firstName)
      .replace(/Mona/g, firstName)
      .replace(/Merete/g, firstName);
  }
  
  return template;
}

module.exports = { generateReply };
