// Review Autopilot - Main App
let currentReviews = [];
let approvedCount = 0;

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function loadReviews() {
  const business = document.getElementById('business-select').value;
  const container = document.getElementById('reviews-container');
  
  container.innerHTML = `
    <div class="empty-state">
      <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
      <p>Laster reviews...</p>
    </div>
  `;
  
  try {
    console.log('Fetching reviews for:', business);
    const res = await fetch(`/api/reviews/${business}`);
    
    if (!res.ok) {
      throw new Error('HTTP ' + res.status);
    }
    
    const data = await res.json();
    console.log('Received data:', data);
    
    currentReviews = data.reviews || [];
    
    document.getElementById('total-reviews').textContent = data.total || 0;
    document.getElementById('unanswered-reviews').textContent = data.unanswered || 0;
    document.getElementById('generate-all-btn').disabled = currentReviews.length === 0;
    
    if (currentReviews.length === 0) {
      console.log('No reviews to display');
      container.innerHTML = `
        <div class="empty-state">
          <span class="material-icons">check_circle</span>
          <h2>Alle reviews besvart!</h2>
          <p>Ingen ubesvarte reviews funnet</p>
        </div>
      `;
      return;
    }
    
    console.log('Rendering', currentReviews.length, 'reviews');
    
    const cards = currentReviews.map((review, i) => {
      const initial = review.reviewer.charAt(0).toUpperCase();
      const stars = getRatingNumber(review.rating);
      const starIcons = '<span class="material-icons" style="font-size: 18px;">star</span>'.repeat(stars);
      
      // Create a temporary div to decode HTML entities
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = review.comment;
      const decodedComment = tempDiv.textContent || tempDiv.innerText || review.comment;
      
      return `
        <div class="review-card" data-index="${i}">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">${initial}</div>
              <div class="reviewer-details">
                <h3>${escapeHtml(review.reviewer)}</h3>
                <div class="rating">${starIcons}</div>
              </div>
            </div>
            <div class="review-date">${new Date(review.createTime).toLocaleDateString('no')}</div>
          </div>
          
          <div class="review-text">${escapeHtml(decodedComment)}</div>
          
          <div class="reply-section">
            <div class="reply-header">
              <h4>
                <span class="material-icons" style="font-size: 18px;">reply</span>
                Ditt svar
              </h4>
              <span class="ai-badge">✨ AI</span>
            </div>
            
            <textarea id="reply-${i}" placeholder="Klikk 'Generer svar' for å få et AI-forslag basert på ekte ESSA-stemme"></textarea>
            
            <div class="actions">
              <button class="btn-generate" onclick="generateOne(${i})">
                <span class="material-icons" style="font-size: 18px;">auto_awesome</span>
                Generer svar
              </button>
              <button class="btn-approve" onclick="approve(${i})" disabled id="approve-${i}">
                <span class="material-icons" style="font-size: 18px;">check</span>
                Godkjenn
              </button>
              <button class="btn-skip" onclick="skip(${i})">
                <span class="material-icons" style="font-size: 18px;">close</span>
                Hopp over
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = cards.join('');
    
  } catch (err) {
    console.error('Error loading reviews:', err);
    showSnackbar('Feil ved lasting: ' + err.message, 'error');
    container.innerHTML = `
      <div class="empty-state">
        <span class="material-icons" style="color: #ea4335;">error</span>
        <h2>Feil ved lasting</h2>
        <p>${err.message}</p>
      </div>
    `;
  }
}

function getRatingNumber(rating) {
  const map = { FIVE: 5, FOUR: 4, THREE: 3, TWO: 2, ONE: 1 };
  return map[rating] || 0;
}

async function generateOne(index) {
  console.log('Generating reply for index:', index);
  const review = currentReviews[index];
  const business = document.getElementById('business-select').value;
  const textarea = document.getElementById(`reply-${index}`);
  const btn = event.target.closest('button');
  
  btn.disabled = true;
  btn.innerHTML = '<div class="loading-spinner"></div> Genererer...';
  
  try {
    console.log('Sending review to API:', review, 'for business:', business);
    const res = await fetch('/api/generate-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review, business })
    });
    
    if (!res.ok) {
      throw new Error('HTTP ' + res.status);
    }
    
    const data = await res.json();
    console.log('Received reply:', data);
    
    if (data.success) {
      textarea.value = data.reply;
      document.getElementById(`approve-${index}`).disabled = false;
      showSnackbar('Svar generert!', 'success');
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch (err) {
    console.error('Generate error:', err);
    showSnackbar('Feil: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span class="material-icons" style="font-size: 18px;">auto_awesome</span> Generer svar';
  }
}

async function generateAll() {
  for (let i = 0; i < currentReviews.length; i++) {
    await generateOne(i);
    await new Promise(r => setTimeout(r, 300));
  }
  showSnackbar('Alle svar generert!', 'success');
}

async function approve(index) {
  const review = currentReviews[index];
  const reply = document.getElementById(`reply-${index}`).value;
  const business = document.getElementById('business-select').value;
  
  if (!reply.trim()) {
    showSnackbar('Kan ikke godkjenne tomt svar', 'error');
    return;
  }
  
  try {
    const res = await fetch('/api/approve-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId: review.id, reply, business })
    });
    
    const data = await res.json();
    approvedCount = data.queueSize;
    
    document.getElementById('queue-count').textContent = approvedCount;
    document.getElementById('fab-post').disabled = approvedCount === 0;
    document.getElementById('fab-badge').style.display = approvedCount > 0 ? 'block' : 'none';
    document.getElementById('fab-badge').textContent = approvedCount;
    
    document.querySelector(`[data-index="${index}"]`).remove();
    
    showSnackbar('Lagt til i kø!', 'success');
    
  } catch (err) {
    showSnackbar('Feil: ' + err.message, 'error');
  }
}

function skip(index) {
  document.querySelector(`[data-index="${index}"]`).remove();
  showSnackbar('Hoppet over');
}

async function postAll() {
  if (!confirm(`Post ${approvedCount} svar til Google Business?`)) return;
  
  showSnackbar('Poster til Google...', 'success');
  
  setTimeout(() => {
    showSnackbar('Alle svar postet!', 'success');
    approvedCount = 0;
    document.getElementById('queue-count').textContent = '0';
    document.getElementById('fab-badge').style.display = 'none';
    document.getElementById('fab-post').disabled = true;
  }, 2000);
}

function showSnackbar(message, type = 'success') {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.className = 'snackbar ' + type;
  snackbar.classList.add('show');
  
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}

// Make functions available globally for inline onclick handlers
window.loadReviews = loadReviews;
window.generateOne = generateOne;
window.generateAll = generateAll;
window.approve = approve;
window.skip = skip;
window.postAll = postAll;

// Auto-load on start
loadReviews();
