// ========================================
// Restaurant Autopilot - Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDashboardTabs();
  initAnimations();
  initDemoInteractions();
});

// Smooth scroll navigation
function initNavigation() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.85)';
    }
    
    lastScroll = currentScroll;
  });
}

// Dashboard tab switching
function initDashboardTabs() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Show notification for demo
      showNotification(`Switched to ${item.querySelector('span').textContent}`);
    });
  });

  // Restaurant selection
  const rItems = document.querySelectorAll('.r-item');
  rItems.forEach(item => {
    item.addEventListener('click', () => {
      rItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const name = item.querySelector('span:last-child').textContent;
      showNotification(`Selected ${name}`);
    });
  });
}

// Scroll animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.feature-card, .restaurant-card, .pricing-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS for animated state
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Stagger animation delay
  document.querySelectorAll('.features-grid .feature-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  
  document.querySelectorAll('.restaurants-grid .restaurant-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.stats-grid .stat-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
}

// Demo interactions
function initDemoInteractions() {
  // Approve/Edit/Reject buttons
  document.querySelectorAll('.btn-approve').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.review-item');
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        item.remove();
        showNotification('Response approved and posted! ✓', 'success');
        updateBadge();
      }, 300);
    });
  });

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      showNotification('Edit modal would open here...', 'info');
    });
  });

  document.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.review-item');
      item.style.transition = 'opacity 0.3s ease';
      item.style.opacity = '0.3';
      showNotification('Response discarded', 'warning');
    });
  });

  // Generate button
  document.querySelectorAll('.btn-generate, .cal-post.ai').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
      
      showNotification('✨ Generating AI content...', 'info');
      
      // Simulate generation
      setTimeout(() => {
        showNotification('Content generated successfully!', 'success');
      }, 2000);
    });
  });

  // Chart filter buttons
  document.querySelectorAll('.chart-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Animate chart bars
      document.querySelectorAll('.chart-bar').forEach(bar => {
        const newHeight = Math.floor(Math.random() * 60) + 40;
        bar.style.setProperty('--height', `${newHeight}%`);
      });
    });
  });

  // Calendar navigation
  document.querySelectorAll('.calendar-nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      showNotification('Calendar navigation demo', 'info');
    });
  });
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#6bcb77' : type === 'warning' ? '#ffd93d' : '#4d96ff'};
    color: #000;
    border-radius: 12px;
    font-weight: 500;
    font-size: 0.9rem;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease;
  `;

  // Add animation keyframes if not exists
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(20px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Update pending badge count
function updateBadge() {
  const badge = document.querySelector('.nav-badge');
  if (badge) {
    const current = parseInt(badge.textContent);
    if (current > 1) {
      badge.textContent = current - 1;
    } else {
      badge.style.display = 'none';
    }
  }
  
  const panelBadge = document.querySelector('.panel-badge');
  if (panelBadge) {
    const reviews = document.querySelectorAll('.review-item');
    panelBadge.textContent = `${reviews.length} awaiting`;
  }
}

// Show dashboard section
function showDashboard() {
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value, .stat-number');
  
  counters.forEach(counter => {
    const target = counter.textContent;
    const isNumber = /^\d+/.test(target);
    
    if (isNumber) {
      const num = parseInt(target);
      const suffix = target.replace(/[\d.]+/, '');
      let current = 0;
      const increment = num / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    }
  });
}

// Initialize counters when visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎮 Konami Code activated! You found the easter egg!', 'success');
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Console signature
console.log('%c🚀 Restaurant Autopilot', 'font-size: 24px; font-weight: bold; color: #ff6b6b;');
console.log('%cBuilt with ❤️ in Oslo', 'font-size: 12px; color: #888;');
