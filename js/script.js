// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year helper
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Scroll-triggered animation system using IntersectionObserver.
const animatedNodes = document.querySelectorAll('[data-animate]');
const staggerGroups = document.querySelectorAll('.stagger-group');

// Apply stagger delays to children inside groups.
staggerGroups.forEach((group) => {
  const children = group.querySelectorAll('[data-animate]');
  children.forEach((child, index) => {
    const customDelay = child.getAttribute('data-delay');
    const delay = customDelay ? Number(customDelay) : index * 80;
    child.style.setProperty('--anim-delay', `${delay}ms`);
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );

  animatedNodes.forEach((node) => observer.observe(node));
} else {
  animatedNodes.forEach((node) => node.classList.add('in-view'));
}

// Placeholder form handler for static portfolio usage.
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks! Connect this form to Formspree, Netlify Forms, or your backend endpoint.');
    contactForm.reset();
  });
}
