/**
 * ASTRUM SHAH ALAM - Main JavaScript
 * Features: Navigation, Chatbot, Form Validation, Animations
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    whatsappNumber: '60123456789', // Update with actual number
    projectName: 'Astrum Shah Alam',
    chatbotAutoPopupDelay: 5000, // 5 seconds
    scrollRevealThreshold: 0.1
  };

  // ============================================
  // DOM Elements
  // ============================================
  const DOM = {
    header: document.querySelector('.header'),
    menuToggle: document.querySelector('.menu-toggle'),
    nav: document.querySelector('.nav'),
    navLinks: document.querySelectorAll('.nav__link'),
    chatbotTrigger: document.querySelector('.chatbot-trigger'),
    chatbotPreview: document.querySelector('.chatbot-preview'),
    chatbotPreviewClose: document.querySelector('.chatbot-preview__close'),
    chatbotPanel: document.querySelector('.chatbot-panel'),
    chatbotPanelClose: document.querySelector('.chatbot-panel__close'),
    chatbotCategories: document.querySelectorAll('.chatbot-category'),
    chatbotQuestions: document.querySelectorAll('.chatbot-question'),
    chatbotAnswer: document.querySelector('.chatbot-answer'),
    contactForm: document.querySelector('#contact-form'),
    revealElements: document.querySelectorAll('.reveal')
  };

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeaderScroll() {
    if (!DOM.header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        DOM.header.classList.add('scrolled');
      } else {
        DOM.header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // Mobile Navigation
  // ============================================
  function initMobileNav() {
    if (!DOM.menuToggle || !DOM.nav) return;

    DOM.menuToggle.addEventListener('click', () => {
      DOM.menuToggle.classList.toggle('active');
      DOM.nav.classList.toggle('active');
      document.body.style.overflow = DOM.nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        DOM.menuToggle.classList.remove('active');
        DOM.nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!DOM.nav.contains(e.target) && !DOM.menuToggle.contains(e.target)) {
        DOM.menuToggle.classList.remove('active');
        DOM.nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // FAQ Chatbot
  // ============================================
  const FAQ_DATA = {
    pricing: [
      {
        q: "What is the starting price for units at Astrum Shah Alam?",
        a: "Astrum Shah Alam offers units starting from an attractive price point. For the latest pricing and promotional packages, please contact our sales team via WhatsApp or visit our sales gallery at SACC Mall, Shah Alam."
      },
      {
        q: "What payment schemes are available?",
        a: "We offer flexible payment schemes including bank financing up to 90%, and various developer packages. Our sales consultants can help you find the best financing option for your budget."
      },
      {
        q: "Are there any early bird discounts?",
        a: "Yes! Early bird buyers enjoy special rebates and exclusive packages. Contact us now to learn about current promotions and lock in the best deal."
      },
      {
        q: "What is the booking fee?",
        a: "The booking fee varies based on current promotions. Typically, a nominal booking fee secures your preferred unit. Contact our sales team for exact figures and booking procedures."
      },
      {
        q: "Is there a Bumiputera discount?",
        a: "Yes, Bumiputera buyers are entitled to special discounts as per government guidelines. Please speak with our sales team for more details on Bumiputera packages."
      }
    ],
    units: [
      {
        q: "What unit types are available?",
        a: "Astrum Shah Alam offers 8 distinct unit types:<br><br>• Type A: 1,054 sqft (4 Bed, 3 Bath)<br>• Type B: 775 sqft (3 Bed, 2 Bath)<br>• Type B1: 796 sqft (3 Bed, 2 Bath)<br>• Type B2: 1,022 sqft (3 Bed, 2 Bath)<br>• Type B3: 1,054 sqft (3 Bed, 2 Bath)<br>• Type C: 1,054 sqft (3 Bed, 2 Bath + Ensuite)<br>• Type D: 1,065 sqft (3 Bed, 2 Bath + Ensuite)<br>• Type E: 570 sqft (2 Bed, 2 Bath)"
      },
      {
        q: "Which unit is best for families?",
        a: "For families, we recommend Type A (1,054 sqft, 4 Bed 3 Bath) which provides ample space for multigenerational living, or Type C/D (1,054-1,065 sqft) with ensuite rooms for added privacy."
      },
      {
        q: "Which unit is best for investment?",
        a: "Type E (570 sqft, 2 Bed 2 Bath) in the Metro Tower is ideal for investors, offering the most affordable entry point with strong rental potential due to proximity to Dato' Menteri LRT and UiTM."
      },
      {
        q: "How many car parks per unit?",
        a: "Each unit comes with 1 dedicated car park. Additional car parks may be available for purchase subject to availability."
      },
      {
        q: "What are the tower names?",
        a: "Astrum Shah Alam consists of 3 towers:<br>• Metro Tower - 407 units (Type E only)<br>• Horizon Tower - 451 units (Types A, B, B1, C, D)<br>• Apex Tower - 394 units (Types A, B, B2, B3)"
      }
    ],
    location: [
      {
        q: "Where is Astrum Shah Alam located?",
        a: "Astrum Shah Alam is strategically located in Section 14, Shah Alam, Selangor - right in the heart of Shah Alam's Golden Triangle. The development is directly connected to Dato' Menteri LRT station."
      },
      {
        q: "How far is the nearest LRT station?",
        a: "Dato' Menteri LRT station is literally at your doorstep! Just a few steps from Astrum Shah Alam, providing direct access to the Kelana Jaya Line and MRT Kajang Line."
      },
      {
        q: "What highways are accessible?",
        a: "Astrum Shah Alam enjoys excellent connectivity via 9 major highways:<br><br>• LKSA - 300m<br>• Federal Highway - 800m<br>• NNKSB - 6.6km<br>• KESAS - 6.6km<br>• GCE - 7.8km<br>• NKVE - 8.2km<br>• ELITE - 10km<br>• WCE - 12km<br>• DASH - 16km"
      },
      {
        q: "What amenities are nearby?",
        a: "Within walking distance:<br>• SACC Mall - 140m<br>• Avisena Hospital - 35m<br>• UTC Shah Alam - 20m<br>• Taman Tasik Shah Alam - 350m<br>• DWI Emas International School - 400m<br>• Blue Mosque - 900m"
      },
      {
        q: "How long to KL city centre?",
        a: "By LRT: Approximately 40 minutes to KLCC (20 stops)<br>By car: Approximately 35 minutes via Federal Highway<br><br>Key destinations:<br>• Bandar Utama - 10 mins (8 LRT stops)<br>• KL Sentral - 25 mins (14 LRT stops)<br>• Bukit Bintang - 30 mins (17 LRT stops)"
      }
    ],
    facilities: [
      {
        q: "What facilities are available?",
        a: "Astrum Shah Alam features over 50 facilities on Level 9 podium, including:<br><br>🏊 Aquatic: 50m Lap Pool, Jacuzzi, Kids Pool, Sun Deck<br>💪 Fitness: Smart Gym, Yoga Deck, Semi-Outdoor Fitness<br>👨‍👩‍👧 Family: Children's Playground, Kids Pool Slide, Games Room<br>🎉 Social: Party Room, BBQ Terrace, Co-Working Space<br>🎬 Entertainment: Karaoke Room, Dance Room, Outdoor Movie"
      },
      {
        q: "Is there a swimming pool?",
        a: "Yes! Astrum Shah Alam features a stunning 50-meter lap pool, perfect for serious swimmers. There's also a jacuzzi, shallow lounge pool, children's pool with slide, and sun deck areas."
      },
      {
        q: "Is there a gym?",
        a: "Absolutely! The development includes a state-of-the-art Smart Gym with modern equipment, separate male and female changing rooms with saunas, and anti-oxidant rooms for recovery."
      },
      {
        q: "What security features are provided?",
        a: "Astrum Shah Alam implements 5-tier security:<br><br>1. RFID Car Plate Recognition<br>2. 24/7 CCTV Surveillance<br>3. Security Patrolling<br>4. Access Control System<br>5. Smart Digital Door Lock Set"
      },
      {
        q: "Is there a surau?",
        a: "Yes, a dedicated surau is provided for Muslim residents on the facilities level."
      }
    ],
    developer: [
      {
        q: "Who is the developer?",
        a: "Astrum Shah Alam is developed by Astrum Shah Alam Sdn Bhd, a subsidiary of Setia Awan Group. With over two decades of experience in property development, Setia Awan has delivered quality homes across Perak, Klang Valley, Negeri Sembilan, and Malacca."
      },
      {
        q: "What is the expected completion date?",
        a: "The expected completion date is targeted for 2027-2028. Please contact our sales team for the exact timeline and project milestones."
      },
      {
        q: "What other projects has the developer completed?",
        a: "Setia Awan has successfully completed numerous projects including:<br>• Unisuites Kampar, Perak<br>• Residensi Seri Serindit, Melaka<br>• Kemayan Heights, Seremban<br>• Brezza Hill, Bukit Ampang Permai"
      },
      {
        q: "Is this a freehold or leasehold property?",
        a: "Astrum Shah Alam is a leasehold property with a tenure period as specified by the state authority."
      },
      {
        q: "What is the total number of units?",
        a: "Astrum Shah Alam comprises 1,252 residential units across 3 towers (Metro, Horizon, and Apex), plus 24 retail shop lots (13 units 2-storey and 11 units 3-storey)."
      }
    ],
    booking: [
      {
        q: "How do I book a unit?",
        a: "Booking is simple:<br><br>1. Visit our sales gallery at SACC Mall, Shah Alam<br>2. Choose your preferred unit type and facing<br>3. Pay the booking fee<br>4. Sign the booking form<br>5. Complete documentation within 14 days<br><br>Or contact us via WhatsApp to start the process!"
      },
      {
        q: "Where is the sales gallery?",
        a: "Our sales gallery is conveniently located at:<br><br>📍 SACC Mall, Section 14<br>Shah Alam, Selangor<br><br>Opening Hours: 10am - 6pm daily<br>Contact: Click the WhatsApp button to chat with us!"
      },
      {
        q: "Can I view the show unit?",
        a: "Yes! We have beautifully designed show units available for viewing at our sales gallery. Schedule your appointment via WhatsApp for a personalized tour with our sales consultant."
      }
    ]
  };

  let chatbotAutoPopupShown = false;

  function initChatbot() {
    // Auto-popup after delay (only once per session)
    if (DOM.chatbotPreview && !sessionStorage.getItem('chatbotPopupShown')) {
      setTimeout(() => {
        if (!chatbotAutoPopupShown) {
          DOM.chatbotPreview.classList.add('show');
          chatbotAutoPopupShown = true;
          sessionStorage.setItem('chatbotPopupShown', 'true');
        }
      }, CONFIG.chatbotAutoPopupDelay);
    }

    // Close preview
    if (DOM.chatbotPreviewClose) {
      DOM.chatbotPreviewClose.addEventListener('click', () => {
        DOM.chatbotPreview.classList.remove('show');
      });
    }

    // Open chatbot panel from preview
    const previewBtn = document.querySelector('.chatbot-preview__btn');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        DOM.chatbotPreview.classList.remove('show');
        openChatbotPanel();
      });
    }

    // Toggle chatbot panel
    if (DOM.chatbotTrigger) {
      DOM.chatbotTrigger.addEventListener('click', () => {
        DOM.chatbotPreview.classList.remove('show');
        toggleChatbotPanel();
      });
    }

    // Close chatbot panel
    if (DOM.chatbotPanelClose) {
      DOM.chatbotPanelClose.addEventListener('click', closeChatbotPanel);
    }

    // Category selection
    DOM.chatbotCategories.forEach(category => {
      category.addEventListener('click', () => {
        DOM.chatbotCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        loadQuestions(category.dataset.category);
      });
    });

    // Load default category questions
    loadQuestions('pricing');
  }

  function openChatbotPanel() {
    if (DOM.chatbotPanel) {
      DOM.chatbotPanel.classList.add('open');
      DOM.chatbotTrigger.style.display = 'none';
    }
  }

  function closeChatbotPanel() {
    if (DOM.chatbotPanel) {
      DOM.chatbotPanel.classList.remove('open');
      DOM.chatbotTrigger.style.display = 'flex';
    }
  }

  function toggleChatbotPanel() {
    if (DOM.chatbotPanel.classList.contains('open')) {
      closeChatbotPanel();
    } else {
      openChatbotPanel();
    }
  }

  function loadQuestions(category) {
    const questionsContainer = document.querySelector('.chatbot-questions');
    const answerContainer = document.querySelector('.chatbot-answer');
    
    if (!questionsContainer || !FAQ_DATA[category]) return;

    // Hide answer
    if (answerContainer) {
      answerContainer.classList.remove('show');
    }

    // Generate questions
    questionsContainer.innerHTML = FAQ_DATA[category].map((item, index) => `
      <button class="chatbot-question" data-category="${category}" data-index="${index}">
        ${item.q}
      </button>
    `).join('');

    // Add click handlers
    questionsContainer.querySelectorAll('.chatbot-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;
        const idx = parseInt(btn.dataset.index);
        showAnswer(FAQ_DATA[cat][idx]);
      });
    });
  }

  function showAnswer(faq) {
    const answerContainer = document.querySelector('.chatbot-answer');
    if (!answerContainer) return;

    answerContainer.innerHTML = `
      <h5>${faq.q}</h5>
      <p>${faq.a}</p>
      <button class="btn btn--outline btn--small" onclick="loadQuestions('${document.querySelector('.chatbot-category.active')?.dataset.category || 'pricing'}')">
        ← Back to questions
      </button>
    `;
    answerContainer.classList.add('show');

    // Hide questions
    document.querySelector('.chatbot-questions').style.display = 'none';
    
    // Show questions again when clicking back
    answerContainer.querySelector('button').addEventListener('click', () => {
      answerContainer.classList.remove('show');
      document.querySelector('.chatbot-questions').style.display = 'flex';
    });
  }

  // Make loadQuestions globally accessible
  window.loadQuestions = loadQuestions;

  // ============================================
  // WhatsApp Integration
  // ============================================
 /* function initWhatsApp() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const message = btn.dataset.message || `Hi, I'm interested in ${CONFIG.projectName}. Please send me more information.`;
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      });
    });
  } */
  function initWhatsApp() {
  const whatsappButtons = document.querySelectorAll('[data-whatsapp]');

  whatsappButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const message =
        btn.dataset.message ||
        `Hi, I'm interested in ${CONFIG.projectName}. Please send me more information.`;

      // ✅ Allow per-button override, fallback to CONFIG
      const phone =
        btn.dataset.phone ||
        btn.getAttribute("href")?.match(/wa\.me\/(\d+)/)?.[1] ||
        CONFIG.whatsappNumber;

      if (!phone) {
        console.error("WhatsApp phone number missing. Set CONFIG.whatsappNumber or data-phone.");
        return;
      }

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}


  // ============================================
  // Form Validation
  // ============================================
  function initFormValidation() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        removeError(field);
        
        if (!field.value.trim()) {
          showError(field, 'This field is required');
          isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          showError(field, 'Please enter a valid email address');
          isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
          showError(field, 'Please enter a valid phone number');
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });

    // Real-time validation
    DOM.contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });

      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });
  }

  function validateField(field) {
    removeError(field);

    if (field.required && !field.value.trim()) {
      showError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      showError(field, 'Please enter a valid email address');
      return false;
    }

    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
      showError(field, 'Please enter a valid phone number');
      return false;
    }

    return true;
  }

  function showError(field, message) {
    field.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 4px; display: block;';
    field.parentNode.appendChild(errorEl);
  }

  function removeError(field) {
    field.classList.remove('error');
    const errorEl = field.parentNode.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{8,}$/.test(phone);
  }

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function initScrollReveal() {
    if (!DOM.revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: CONFIG.scrollRevealThreshold,
      rootMargin: '0px 0px -50px 0px'
    });

    DOM.revealElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // Floor Plan Tabs
  // ============================================
  function initFloorPlanTabs() {
    const tabs = document.querySelectorAll('.floorplans__tab');
    const cards = document.querySelectorAll('.unit-card');

    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================
  // Initialize All
  // ============================================
  function init() {
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initChatbot();
    initWhatsApp();
    initFormValidation();
    initScrollReveal();
    initFloorPlanTabs();

    // Add reveal class to elements
    document.querySelectorAll('section > .container').forEach(el => {
      if (!el.closest('.hero')) {
        el.classList.add('reveal');
      }
    });

    // Re-init scroll reveal after adding classes
    initScrollReveal();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
