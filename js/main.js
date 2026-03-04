// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    mainNav.classList.toggle('nav--open');
  });

  // Close nav when clicking a link (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Sticky Header Shadow on Scroll =====
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ===== Active Nav Link Highlighting =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.form-error').forEach(el => {
      el.style.display = 'none';
    });

    // Check required fields
    const nom = contactForm.querySelector('#nom');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    const rgpd = contactForm.querySelector('#rgpd');

    if (!nom.value.trim()) {
      showError(nom, 'Veuillez entrer votre nom.');
      valid = false;
    }

    if (!email.value.trim() || !email.value.includes('@')) {
      showError(email, 'Veuillez entrer une adresse email valide.');
      valid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Veuillez entrer votre message.');
      valid = false;
    }

    if (rgpd && !rgpd.checked) {
      showError(rgpd, 'Veuillez accepter la politique de confidentialité.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(field, msg) {
    let errorEl = field.parentElement.querySelector('.form-error');
    if (!errorEl) {
      errorEl = field.closest('.checkbox-group')?.querySelector('.form-error');
    }
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }
}

// ===== Google Maps Consent Wrapper =====
const mapConsent = document.getElementById('map-consent');
if (mapConsent) {
  mapConsent.addEventListener('click', () => {
    const wrapper = document.getElementById('map-wrapper');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.5!2d7.74!3d48.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2+Rue+Fr%C3%A9d%C3%A9ric+Vl%C3%A8s%2C+67000+Strasbourg!5e0!3m2!1sfr!2sfr';
    iframe.width = '100%';
    iframe.height = '400';
    iframe.style.border = '0';
    iframe.style.borderRadius = 'var(--border-radius)';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    mapConsent.style.display = 'none';
    wrapper.style.display = 'block';
  });
}
