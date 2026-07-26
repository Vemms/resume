// Reveal elements on scroll
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

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark-mode');
  toggleInput.checked = true;
}

toggleInput.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggleInput.checked);
  localStorage.setItem('theme', toggleInput.checked ? 'dark' : 'light');
});

// === TIME-BASED BACKGROUND GRADIENT ===
function setTimeBasedBackground() {
  const hour = new Date().getHours();
  document.body.classList.remove('sunrise', 'daytime', 'sunset', 'night');
  if (hour >= 5 && hour < 9) document.body.classList.add('sunrise');
  else if (hour >= 9 && hour < 17) document.body.classList.add('daytime');
  else if (hour >= 17 && hour < 20) document.body.classList.add('sunset');
  else document.body.classList.add('night');
}
setTimeBasedBackground();
setInterval(setTimeBasedBackground, 15 * 60 * 1000);

// === ☀️🌙 FLOATING SKY OBJECT (Realtime + Parallax) ===
const sunEl = document.querySelector('#sky-object .sun');
const moonEl = document.querySelector('#sky-object .moon');

function updateSkyObject() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hour * 60 + minutes;
  const position = (totalMinutes / (24 * 60)) * 100;

  if (hour >= 6 && hour < 18) {
    sunEl.classList.add('active');
    moonEl.classList.remove('active');
  } else {
    moonEl.classList.add('active');
    sunEl.classList.remove('active');
  }

  sunEl.style.left = `${position}%`;
  moonEl.style.left = `${position}%`;
}

function handleScroll() {
  const scrollY = window.scrollY;
  const parallaxOffset = scrollY * 0.1;
  const yOffset = 50 - parallaxOffset / 10;
  sunEl.style.top = `${yOffset}%`;
  moonEl.style.top = `${yOffset}%`;
}

updateSkyObject();
handleScroll();
setInterval(updateSkyObject, 60 * 1000);
window.addEventListener('scroll', handleScroll);
