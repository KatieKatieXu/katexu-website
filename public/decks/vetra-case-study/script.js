const bar = document.querySelector('.progress i');
const reveals = document.querySelectorAll('.reveal');

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  bar.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: .18 });

reveals.forEach((el) => observer.observe(el));
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
