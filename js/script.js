// Reveal elements on scroll
const faders = document.querySelectorAll('.fade-in, .slide-up, .pop');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Reveal animations
const faders = document.querySelectorAll('.fade-in, .slide-up, .pop');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// === DARK MODE TOGGLE (with switch animation) ===
const toggleInput = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load stored theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark-mode');
  toggleInput.checked = true;
}

// Toggle listener
toggleInput.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggleInput.checked);
  localStorage.setItem('theme', toggleInput.checked ? 'dark' : 'light');
});

// === TIME-BASED BACKGROUND GRADIENT ===
function setTimeBasedBackground() {
  const hour = new Date().getHours();
  document.body.classList.remove('sunrise', 'daytime', 'sunset', 'night');

  if (hour >= 5 && hour < 9) {
    document.body.classList.add('sunrise');
  } else if (hour >= 9 && hour < 17) {
    document.body.classList.add('daytime');
  } else if (hour >= 17 && hour < 20) {
    document.body.classList.add('sunset');
  } else {
    document.body.classList.add('night');
  }
}

// Call it once on load
setTimeBasedBackground();

// Optional: update every 15 minutes in case user keeps the tab open
setInterval(setTimeBasedBackground, 15 * 60 * 1000);

// === ☀️🌙 FLOATING SKY OBJECT (Realtime + Parallax) ===
const sunEl = document.querySelector('#sky-object .sun');
const moonEl = document.querySelector('#sky-object .moon');

// Update time-based position
function updateSkyObject() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hour * 60 + minutes;
  const position = (totalMinutes / (24 * 60)) * 100;

  // Determine which to show
  if (hour >= 6 && hour < 18) {
    sunEl.classList.add('active');
    moonEl.classList.remove('active');
  } else {
    moonEl.classList.add('active');
    sunEl.classList.remove('active');
  }

  // Move horizontally
  sunEl.style.left = `${position}%`;
  moonEl.style.left = `${position}%`;
}

// Handle parallax effect on scroll
function handleScroll() {
  const scrollY = window.scrollY;
  const parallaxOffset = scrollY * 0.1; // Moves slower than page
  const yOffset = 50 - parallaxOffset / 10; // Adjust vertical position
  sunEl.style.top = `${yOffset}%`;
  moonEl.style.top = `${yOffset}%`;
}

// Initialize
updateSkyObject();
handleScroll();

// Update hourly & on scroll
setInterval(updateSkyObject, 60 * 1000); // update every minute for smoothness
window.addEventListener('scroll', handleScroll);

// === ☀️🌙 FLOATING SKY OBJECT ===
const sunEl = document.querySelector('#sky-object .sun');
const moonEl = document.querySelector('#sky-object .moon');

function updateSkyObject() {
  const hour = new Date().getHours();
  const totalHours = 24;
  const position = (hour / totalHours) * 100; // horizontal percentage

  // Move across screen
  const x = position;
  sunEl.style.left = `${x}%`;
  moonEl.style.left = `${x}%`;

  // Determine which one is visible
  if (hour >= 6 && hour < 18) {
    sunEl.classList.add('active');
    moonEl.classList.remove('active');
  } else {
    moonEl.classList.add('active');
    sunEl.classList.remove('active');
  }
}

// Run on load and every hour
updateSkyObject();
setInterval(updateSkyObject, 60 * 60 * 1000);