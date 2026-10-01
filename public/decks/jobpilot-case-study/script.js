const progressBar = document.querySelector('.progress i');
const reveals = [...document.querySelectorAll('.reveal')];
const chapters = [...document.querySelectorAll('[data-nav]')];
const navLinks = [...document.querySelectorAll('.topbar nav a')];
const videos = [...document.querySelectorAll('video')];

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progressBar.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
}

document.querySelectorAll('.chapter').forEach((chapter) => {
  chapter.querySelectorAll('.reveal').forEach((item, index) => {
    item.style.setProperty('--delay', `${Math.min(index, 5) * 70}ms`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

reveals.forEach((item) => revealObserver.observe(item));

function updateActiveNav() {
  const marker = window.innerHeight * 0.36;
  const activeChapter = chapters.reduce((current, chapter) => {
    return chapter.getBoundingClientRect().top <= marker ? chapter : current;
  }, chapters[0]);
  const id = activeChapter.dataset.nav;
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.play().catch(() => {});
    } else {
      entry.target.pause();
    }
  });
}, { threshold: 0.35 });

videos.forEach((video) => videoObserver.observe(video));

window.addEventListener('scroll', () => {
  updateProgress();
  updateActiveNav();
}, { passive: true });
window.addEventListener('resize', () => {
  updateProgress();
  updateActiveNav();
});
updateProgress();
updateActiveNav();
