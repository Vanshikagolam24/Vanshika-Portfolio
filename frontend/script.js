const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const progressRing = document.getElementById('progressRing');
const pageLoader = document.getElementById('pageLoader');
const typingText = document.getElementById('typingText');

const messages = ['clean code.', 'modern interfaces.', 'reliable backend.', 'mobile-ready apps.'];
let index = 0;
let charIndex = 0;
let typingForward = true;

function typeLoop() {
  const current = messages[index];
  if (typingForward) {
    charIndex += 1;
    typingText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typingForward = false;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    typingText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typingForward = true;
      index = (index + 1) % messages.length;
    }
  }
  setTimeout(typeLoop, typingForward ? 120 : 40);
}

function openMenu() {
  navMenu.classList.toggle('open');
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolioTheme', nextTheme);
  themeToggle.textContent = nextTheme === 'light' ? '☾' : '☀';
}

function applySavedTheme() {
  const storedTheme = localStorage.getItem('portfolioTheme');
  const initialTheme = storedTheme || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  themeToggle.textContent = initialTheme === 'light' ? '☾' : '☀';
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  const progressHeight = pageHeight > 0 ? (scrollTop / pageHeight) * window.innerHeight : 0;
  progressRing.style.height = `${progressHeight}px`;
  if (scrollTop > 360) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

function showToast(message, status = 'success') {
  formStatus.textContent = message;
  formStatus.style.color = status === 'success' ? '#8ce99a' : '#ff8c8c';
}

async function submitContact(event) {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill out all fields before sending.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unable to send your message.');
    }

    showToast(result.message || 'Message sent successfully.');
    contactForm.reset();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.fade-up');
  const threshold = window.innerHeight * 0.85;
  revealElements.forEach(element => {
    const top = element.getBoundingClientRect().top;
    if (top < threshold) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('load', () => {
  applySavedTheme();
  typeLoop();
  revealOnScroll();
  setTimeout(() => pageLoader.classList.add('hidden'), 600);
});

window.addEventListener('scroll', () => {
  updateScrollUI();
  revealOnScroll();
});

menuToggle.addEventListener('click', openMenu);
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', submitContact);
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
