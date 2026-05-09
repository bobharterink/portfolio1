import { gsap } from 'gsap'
import { translations, getCurrentLang } from './translate.js'

let isDetailsOpen = false;
const heroInner = document.querySelector(".hero-inner");
const plusButton = document.querySelector(".plus-button");
let activePill = null;
let isAnimating = false;


// ============================================
// PLUS BUTTON
// ============================================

const plusRotation = gsap.to(".plus-button", {
  rotation: -360,
  duration: 6,
  ease: "none",
  repeat: -1
});

plusButton.addEventListener("mouseenter", () => {
  if (!isDetailsOpen) {
    plusRotation.pause();
    gsap.to(plusButton, { rotation: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(plusButton, { scale: 1.1, duration: 0.4, ease: "back.out(3)" });
  }
});

plusButton.addEventListener("mouseleave", () => {
  gsap.to(plusButton, { scale: 1, duration: 0.4, ease: "back.out(3)" });
  if (!isDetailsOpen) {
    gsap.to(plusButton, {
      rotation: -360,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => plusRotation.resume()
    });
  }
});

plusButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    plusButton.click();
  }
});

plusButton.addEventListener("click", () => {
  gsap.killTweensOf(plusButton, "scale");
  gsap.set(plusButton, { scale: 1 });
  if (isDetailsOpen) {
    closeDetails();
  } else if (!isAnimating) {
    isAnimating = true;
    gsap.to(heroInner, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' });
    gsap.to(".card-face", { opacity: 0, duration: 0.3, ease: 'power2.out' });
    plusRotation.pause();
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:var(--bg);opacity:0;z-index:9999;pointer-events:none;';
    document.body.appendChild(overlay);
    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    tl.call(() => { window.location.href = '/cv/?from=home'; }, null, 0.55);
  }
});


// ============================================
// CURSOR BROWSER PREVIEWS
// ============================================

const cursorPreviews = {
  fizzi:      document.getElementById('cursorPreviewFizzi'),
  beestenbos: document.getElementById('cursorPreviewBeestenbos'),
  dirk:       document.getElementById('cursorPreviewDirk'),
  oog:        document.getElementById('cursorPreviewOog'),
};

document.addEventListener('mousemove', (e) => {
  Object.values(cursorPreviews).forEach(el => {
    if (!el) return;
    el.style.left = (e.clientX + 28) + 'px';
    el.style.top = e.clientY + 'px';
  });
});

function showCursorPreview(key) {
  const el = cursorPreviews[key];
  if (!el) return;
  if (key === 'fizzi') {
    const iframe = el.querySelector('iframe');
    if (iframe) { const src = iframe.src; iframe.src = ''; iframe.src = src; }
  }
  el.classList.add('is-visible');
}
function hideCursorPreview(key) {
  cursorPreviews[key]?.classList.remove('is-visible');
}

// ============================================
// PILLS
// ============================================

const pills = document.querySelectorAll(".bar-inner");

pills.forEach(pill => {
  pill.addEventListener("click", (e) => {
    if (isDetailsOpen || isAnimating) return;
    if (pill.dataset.project === 'studio') return;
    if (e.target.closest('.site-btn') || e.target.closest('.video-play-btn')) return;

    activePill = pill;
    openProject(pill);
  });

  pill.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pill.click();
    }
  });

  if (window.matchMedia('(hover: hover)').matches) {
    pill.addEventListener("mouseenter", () => {
      if (isDetailsOpen || isAnimating) return;
      if (cursorPreviews[pill.dataset.project]) showCursorPreview(pill.dataset.project);
    });

    pill.addEventListener("mouseleave", () => {
      if (cursorPreviews[pill.dataset.project]) hideCursorPreview(pill.dataset.project);
    });
  }

});


// ============================================
// PROJECT PAGE TRANSITION
// ============================================

const projectUrls = {
  studio:     '/studio-harterink/',
  oog:        '/door-het-oog-van-de-maker/',
  fizzi:      '/fizzi/',
  dirk:       '/dirk-nielandt/',
  beestenbos: '/cafe-beestenbos-cashup/',
};

function openProject(pill) {
  const url = projectUrls[pill.dataset.project];
  if (!url) return;
  isAnimating = true;
  window.updateActiveChip?.(pill.dataset.project);

  gsap.to(heroInner, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' });
  gsap.to(".card-face", { opacity: 0, duration: 0.3, ease: 'power2.out' });
  plusRotation.pause();

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:var(--bg);opacity:0;z-index:9999;pointer-events:none;';
  document.body.appendChild(overlay);

  const tl = gsap.timeline();
  tl.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
  tl.call(() => { window.location.href = url; }, null, 0.55);
}


// ============================================
// DETAILS
// ============================================

function openDetails(pill) {
  const details = pill.querySelector(".details");
  if (!details || isDetailsOpen || isAnimating) return;

  isDetailsOpen = true;
  isAnimating = true;
  window.updateActiveChip?.(pill.dataset.project);

  pill.classList.add("activedt");
  if (pill.dataset.project === 'studio') window.dispatchEvent(new Event('studio-details-open'));
  if (pill.dataset.project === 'fizzi') window.dispatchEvent(new Event('fizzi-details-open'));

  gsap.to(heroInner, { opacity: 0, y: -20, duration: 0.4, ease: "power2.out", pointerEvents: "none" });
  gsap.to(".card-face", { opacity: 0.15, duration: 0.3 });
  gsap.to(pill.querySelector(".card-face"), { opacity: 0, duration: 0.2 });

  plusRotation.pause();
  gsap.to(plusButton, { rotation: 45, duration: 0.5, ease: "power3.inOut" });
  document.body.style.overflowY = "hidden";

  gsap.set(details, { display: "block" });

  const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });
  tl.fromTo(details, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });

  tl.call(() => {
    document.querySelectorAll('a, button, [tabindex]').forEach(el => {
      if (
        !details.contains(el) &&
        !el.closest('.hud') &&
        !el.closest('.plus-button') &&
        !el.closest('.footer-socials')
      ) {
        el.dataset.prevTabindex = el.getAttribute('tabindex') ?? '';
        el.setAttribute('tabindex', '-1');
      }
    });
    const video = details.querySelector('video');
    const playBtn = details.querySelector('.video-play-btn');
    if (!video) return;
    video.currentTime = 0;
    if (window.innerWidth <= 1025) {
      if (playBtn) playBtn.style.display = 'block';
    } else {
      video.play();
    }
  }, null, 0.4);
}


// ============================================
// CLOSE DETAILS
// ============================================

function closeDetails() {
  if (!isDetailsOpen || !activePill || isAnimating) return;

  const pill = activePill;
  const details = pill.querySelector(".details");

  isDetailsOpen = false;
  isAnimating = true;
  window.updateActiveChip?.(null);
  document.body.style.overflowY = "";

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      activePill = null;
      pill.classList.remove("activedt");
      if (pill.dataset.project === 'studio') window.dispatchEvent(new Event('studio-details-close'));
      if (pill.dataset.project === 'fizzi') window.dispatchEvent(new Event('fizzi-details-close'));
      if (details) gsap.set(details, { display: "none", opacity: 1, y: 0 });
    }
  });

  if (details) {
    tl.to(details, { opacity: 0, y: 40, duration: 0.35, ease: "power2.in" }, 0);
  }

  tl.to(heroInner, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", pointerEvents: "auto" }, 0.2);
  tl.to(".card-face", { opacity: 1, duration: 0.4 }, 0.2);
  tl.to(plusButton, {
    rotation: 0, duration: 0.5, ease: "power3.inOut",
    onComplete: () => plusRotation.resume()
  }, 0.2);

  tl.call(() => {
    const video = details?.querySelector('video');
    const playBtn = details?.querySelector('.video-play-btn');
    if (video && playBtn) {
      video.pause();
      video.currentTime = 0;
      playBtn.style.display = 'none';
      playBtn.textContent = translations[getCurrentLang()]['btn.afspelen'];
    }
    document.querySelectorAll('[data-prev-tabindex]').forEach(el => {
      const prev = el.dataset.prevTabindex;
      if (prev === '') { el.removeAttribute('tabindex'); } else { el.setAttribute('tabindex', prev); }
      delete el.dataset.prevTabindex;
    });
  }, null, 0.3);
}


// ============================================
// VIDEO CONTROLS
// ============================================

document.querySelectorAll('.details-image').forEach(container => {
  const video = container.querySelector('video');
  const playBtn = container.querySelector('.video-play-btn');

  if (!video || !playBtn) return;

  playBtn.style.display = 'none';

  video.addEventListener('ended', () => {
    playBtn.style.display = 'block';
    playBtn.textContent = translations[getCurrentLang()]['btn.opnieuw'];
  });

  playBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    playBtn.style.display = 'none';
  });
});


// ============================================
// INTRO ANIMATIE
// ============================================

isAnimating = true;

// Set initial states
gsap.set(".hero-eyebrow", { opacity: 0, y: 12 });
gsap.set(".title", { y: "115%" });        // clip reveal — starts below
gsap.set(".card-face", { opacity: 0, y: 20 });
gsap.set(".footer-socials", { opacity: 0 });
gsap.set(".hud > *", { opacity: 0, y: -14 });

const fromShowreel = new URLSearchParams(location.search).get('from') === 'showreel';
if (fromShowreel) history.replaceState(null, '', '/');

if (fromShowreel) {
  const __backOverlay = document.getElementById('__back-overlay');
  if (__backOverlay) {
    gsap.to(__backOverlay, { opacity: 0, duration: 0.4, delay: 0.05, ease: 'power2.out', onComplete: () => __backOverlay.remove() });
  }
  gsap.to(".hero-inner", { opacity: 1, duration: 0.5, delay: 0.1 });
  gsap.to(".title", { y: "0%", duration: 0.6, ease: "power3.out", stagger: 0, delay: 0.1 });
  gsap.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.15 });
  gsap.to(".card-face", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
  gsap.to(".footer-socials", { opacity: 1, duration: 0.5, delay: 0.1 });
  gsap.to(".hud > *", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07, delay: 0.1, onComplete: () => {
    isAnimating = false;
    window.dispatchEvent(new Event('intro-complete'));
  }});
} else {
  const introTl = gsap.timeline({
    delay: 0.2,
    onComplete: () => { isAnimating = false; }
  });
  // Eyebrow first
  introTl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
  // Clip-reveal: titles slide up from behind overflow:hidden wrappers
  introTl.to(".title", { y: "0%", duration: 1.0, ease: "power4.out", stagger: 0.08 }, 0.1);
  // Project rows stagger in
  introTl.to(".card-face", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.07 }, 0.55);
  introTl.to(".hud > *", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 }, 0.7);
  introTl.call(() => { window.dispatchEvent(new Event('intro-complete')); }, null, 0.8);
  introTl.to(".footer-socials", { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.0);
}


// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  function setTheme(t) {
    if (t === 'light') {
      document.documentElement.classList.add('light');
      themeToggle.textContent = '☽';
    } else {
      document.documentElement.classList.remove('light');
      themeToggle.textContent = '☀';
    }
    localStorage.setItem('theme', t);
  }
  themeToggle.addEventListener('click', () => {
    setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light');
  });
  setTheme(localStorage.getItem('theme') || 'light');
}


// ============================================
// PROJECT CHIPS IN HUD
// ============================================

const projectChipsEl = document.getElementById('projectChips');
if (projectChipsEl) {
  const projects = [
    { key: 'fizzi',       label: 'Fizzi' },
    { key: 'beestenbos',  label: 'Beestenbos' },
    { key: 'studio',      label: 'Studio' },
    { key: 'dirk',        label: 'Dirk' },
    { key: 'oog',         label: 'Oog' },
  ];

  const chipEls = {};
  projects.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      if (key === 'studio') return;
      if (isAnimating || isDetailsOpen) return;
      const pill = document.querySelector(`.bar-inner[data-project="${key}"]`);
      if (!pill) return;
      activePill = pill;
      openProject(pill);
    });
    chipEls[key] = btn;
    projectChipsEl.appendChild(btn);
  });

  window.updateActiveChip = (project) => {
    Object.values(chipEls).forEach(b => b.classList.remove('is-active'));
    if (project && chipEls[project]) chipEls[project].classList.add('is-active');
  };
}
