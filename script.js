import { gsap } from 'gsap'
import { translations, getCurrentLang } from './translate.js'

let isDetailsOpen = false;
const heroTitle = document.querySelector(".title");
const heroSubtitle = document.querySelector(".subtitle");
const plusButton = document.querySelector(".plus-button");
let marqueeOffset = 0;
let detailsShift = 0;
let activePill = null;
let isAnimating = false;
const bar = document.querySelector(".bar");
const origBarHTML = bar.innerHTML;
bar.innerHTML = origBarHTML + origBarHTML + origBarHTML + origBarHTML;

function getResponsiveFlex() {
  const width = window.innerWidth;
  if (width <= 600) return "0 0 calc(60vw - 25px)";
  if (width <= 1025) return "0 0 calc(40vw - 25px)";
  return "0 0 calc(25vw - 25px)";
}



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
    window.location.href = '/cv/';
  }
});


// ============================================
// MARQUEE
// ============================================

let marqueeTween;
let singleWidth; // breedte van één originele set pills

function initMarquee() {
  if (marqueeTween) marqueeTween.kill();

  // Meet de breedte van de EERSTE helft exact (inclusief gaps)
  // We weten dat bar.innerHTML is gedupliceerd, dus helft = scrollWidth / 2
  // Maar we moeten ook de gap tussen de twee helften aftrekken
  const gap = 20; // moet overeenkomen met .bar { gap: 20px }
  singleWidth = (bar.scrollWidth + gap) / 4;

  let currentX = parseFloat(gsap.getProperty(bar, "x")) || 0;

  // Normaliseer: zorg dat currentX in [-2*singleWidth, -singleWidth] zit
  // zodat er altijd een volle kopie links en rechts beschikbaar is
  currentX = ((currentX + singleWidth) % -singleWidth) - singleWidth;
  if (currentX > -singleWidth) currentX -= singleWidth;
  gsap.set(bar, { x: currentX });

  marqueeTween = gsap.to(bar, {
    x: currentX - singleWidth,
    duration: 60 * (singleWidth / 2000), // schaal duration op breedte
    ease: "none",
    repeat: -1,
    onRepeat() {
      // Harde reset bij elke loop — geen drift mogelijk
      gsap.set(bar, { x: currentX });
    }
  });
}

initMarquee();

window.addEventListener("resize", () => {
  initMarquee();
  if (activePill || isDetailsOpen) {
    marqueeTween.pause();
  }
});


const marquee = document.querySelector(".marquee");

marquee.addEventListener("mouseenter", () => {
  gsap.to(marqueeTween, { timeScale: 0, duration: 0.6, ease: "power2.out" });
});

marquee.addEventListener("mouseleave", () => {
  if (!activePill && !isDetailsOpen && !isDragging) {
    gsap.to(marqueeTween, { timeScale: 1, duration: 0.6, ease: "power2.out" });
  }
});


// ============================================
// DRAG / SWIPE
// ============================================

let isDragging = false;
let wasDragging = false;
let dragCooldownUntil = 0;
let dragStartX = 0;
let dragPrevX = 0;
let dragVelocity = 0;
let dragLastX = 0;
let dragLastTime = 0;

function normalizeX(x) {
  // Houd x altijd in [-2*singleWidth, -singleWidth] zodat er
  // links én rechts altijd een volle kopie beschikbaar is
  const lo = -2 * singleWidth;
  const range = singleWidth;
  x = ((x - lo) % range + range) % range + lo;
  return x;
}

marquee.addEventListener("pointerdown", (e) => {
  if (isDetailsOpen || isAnimating) return;
  if (e.button !== 0 && e.pointerType === "mouse") return;

  dragStartX = e.clientX;
  dragPrevX = e.clientX;
  isDragging = false;
  wasDragging = false;
  dragVelocity = 0;
  dragLastX = e.clientX;
  dragLastTime = performance.now();

  gsap.killTweensOf(bar);
  gsap.killTweensOf(marqueeTween, "timeScale");
  marqueeTween.pause();

  window.addEventListener("pointermove", onMarqueeDrag);
  window.addEventListener("pointerup", onMarqueeDragEnd);
});

function onMarqueeDrag(e) {
  const now = performance.now();
  const dt = now - dragLastTime;
  if (dt > 0) dragVelocity = (e.clientX - dragLastX) / dt;
  dragLastX = e.clientX;
  dragLastTime = now;

  if (!isDragging && Math.abs(e.clientX - dragStartX) > 5) {
    isDragging = true;
    marquee.style.cursor = "grabbing";
  }

  if (isDragging) {
    const dx = e.clientX - dragPrevX;
    gsap.set(bar, { x: normalizeX((parseFloat(gsap.getProperty(bar, "x")) || 0) + dx) });
  }

  dragPrevX = e.clientX;
}

function onMarqueeDragEnd() {
  window.removeEventListener("pointermove", onMarqueeDrag);
  window.removeEventListener("pointerup", onMarqueeDragEnd);

  marquee.style.cursor = "";
  wasDragging = isDragging;
  isDragging = false;

  if (wasDragging && Math.abs(dragVelocity) > 0.3) {
    dragCooldownUntil = Date.now() + 600;
  }

  if (!wasDragging) {
    if (!activePill && !isDetailsOpen) {
      gsap.to(marqueeTween, { timeScale: 1, duration: 0.6, ease: "power2.out" });
    }
    return;
  }

  const currentX = parseFloat(gsap.getProperty(bar, "x")) || 0;
  const proxy = { x: currentX };

  gsap.to(proxy, {
    x: currentX + dragVelocity * 300,
    duration: 0.8,
    ease: "power2.out",
    onUpdate() {
      gsap.set(bar, { x: normalizeX(proxy.x) });
    },
    onComplete: () => {
      if (!activePill && !isDetailsOpen) {
        initMarquee();
      }
    }
  });
}


// ============================================
// PILLS
// ============================================

const pills = document.querySelectorAll(".bar-inner");

pills.forEach(pill => {
  const info = pill.querySelector(".info");
  if (!info) return;

  gsap.set(info, { opacity: 1, visibility: "hidden", pointerEvents: "none" });
  info.offsetHeight; // force reflow
  gsap.set(info, { opacity: 0, visibility: "visible" });

  info.querySelectorAll("button, a").forEach(el => el.setAttribute("tabindex", "-1"));

  pill.addEventListener("click", () => {
    if (wasDragging || Date.now() < dragCooldownUntil) return;
    if (isDetailsOpen) return;
    if (isAnimating) return;

    activePill = pill;
    marqueeTween.pause();
    if (pill.dataset.project === 'dirk') {
      openDirkShowreel(pill);
    } else {
      openDetails(pill);
    }
  });

    pill.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.target.closest(".more-btn") || e.target.closest(".site-btn") || e.target.closest(".video-play-btn")) return;
      e.preventDefault();
      pill.click();
    }
  });

    pill.addEventListener("focus", () => {
    // Voorkom dat de browser naar het element scrollt
    window.scrollTo(0, 0);
  });

  pill.addEventListener("mouseenter", () => {
    if (isDetailsOpen || isAnimating) return;
    const line = pill.querySelector(".line");
    gsap.to(pill, { scale: 1.06, duration: 0.4, ease: "back.out(2)", overwrite: true });
    if (line) gsap.to(line, { scale: 1.1, duration: 0.4, ease: "back.out(2)", overwrite: true });
    pills.forEach(p => {
      if (p !== pill) gsap.to(p, { scale: 0.94, duration: 0.4, ease: "power2.out", overwrite: true });
    });
  });

  pill.addEventListener("mouseleave", () => {
    if (isDetailsOpen || isAnimating) return;
    const line = pill.querySelector(".line");
    if (line) gsap.to(line, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: true });
    pills.forEach(p => gsap.to(p, { scale: 1, duration: 0.5, ease: "back.out(1.5)", overwrite: true }));
  });
});



// ============================================
// DIRK SHOWREEL TRANSITION
// ============================================

function openDirkShowreel(pill) {
  isAnimating = true;

  const pillRect = pill.getBoundingClientRect();
  const targetWidth = window.innerWidth - 24;
  const shift = window.innerWidth / 2 - (pillRect.left + targetWidth / 2);

  gsap.set(pills, { scale: 1 });

  const stage = document.querySelector('.stage');
  stage.style.overflow = 'visible';
  document.body.style.overflowY = 'hidden';

  const line = pill.querySelector('.line');
  const info = pill.querySelector('.info');

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:#0e0e10;opacity:0;z-index:9999;pointer-events:none;';
  document.body.appendChild(overlay);

  plusRotation.pause();
  gsap.to([heroTitle, heroSubtitle], { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' });

  const tl = gsap.timeline();

  if (line) tl.to(line, { y: 70, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);
  if (info) tl.to(info, { opacity: 0, pointerEvents: 'none', duration: 0.3, ease: 'power2.out' }, 0);

  tl.to(pill, {
    flex: `0 0 ${window.innerWidth}px`,
    height: window.innerHeight,
    borderRadius: 0,
    duration: 0.7,
    ease: 'power3.inOut'
  }, 0.3);

  tl.to(bar, { x: `+=${shift}`, duration: 0.7, ease: 'power3.inOut' }, 0.3);

  tl.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.in' }, 0.75);

  tl.call(() => { window.location.href = '/dirk-showreel/'; }, null, 1.15);
}


// ============================================
// DETAILS
// ============================================

function openDetails(pill) {
  const details = pill.querySelector(".details");
  const info = pill.querySelector(".info");

  if (!details || isDetailsOpen || isAnimating) return;

  isDetailsOpen = true;
  isAnimating = true;
  window.updateActiveChip?.(pill.dataset.project);

  gsap.set(pills, { scale: 1 });

  const pillRect = pill.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const targetWidth = viewportWidth - 24;
  const viewportCenter = viewportWidth / 2;
  const targetPillCenter = pillRect.left + targetWidth / 2;

  detailsShift = viewportCenter - targetPillCenter;

  pill.classList.add("activedt");
  if (pill.dataset.project === 'studio') window.dispatchEvent(new Event('studio-details-open'));

  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0, y: -20, duration: 0.4, ease: "power2.out", pointerEvents: "none"
  });

  plusRotation.pause();
  gsap.to(plusButton, { rotation: 45, top: "3%", duration: 0.5, ease: "power3.inOut" });

  const line = pill.querySelector(".line");

  const tl = gsap.timeline({ onComplete: () => { isAnimating = false; setupDetailScroll(pill); } });

  if (line) {
    tl.to(line, { y: 70, opacity: 0, duration: 0.35, ease: "power2.in" }, 0);
  }

  if (info) {
    tl.to(info, { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.out" }, 0);
  }

  tl.to(pill, {
    flex: `0 0 ${targetWidth}px`,
    height: window.innerHeight * 0.8,
    borderRadius: 20,
    duration: 0.7,
    ease: "power3.inOut"
  }, 0.3);

  tl.to(bar, {
    x: `+=${detailsShift}`,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => { marqueeOffset += detailsShift; }
  }, 0.3);

  tl.set(details, { display: "block" }, 1.3);
  tl.fromTo(details, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 1.3);

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
}, null, 1.0);

  tl.call(() => {
    const video = details.querySelector('video');
    const playBtn = details.querySelector('.video-play-btn');
    if (!video) return;
    video.currentTime = 0;
    if (window.innerWidth <= 1025) {
      if (playBtn) playBtn.style.display = 'block';
    } else {
      video.play();
    }
  }, null, 1.4);
}

let detailScrollCleanup = null;

function setupDetailScroll(pill) {
  const details = pill.querySelector('.details');
  if (!details) return;

  const stage = document.querySelector('.stage');
  const savedOverflow = stage.style.overflow;
  stage.style.overflow = 'visible';
  document.body.style.overflowY = 'hidden';

  const openWidth = window.innerWidth - 24;
  const openHeight = window.innerHeight * 0.8;
  const scrollDist = 120;
  const baseBarX = parseFloat(gsap.getProperty(bar, 'x')) || 0;
  const baseBarY = parseFloat(gsap.getProperty(bar, 'y')) || 0;
  const pillTop = pill.getBoundingClientRect().top;
  const topGap = pillTop - (window.innerHeight - openHeight) / 2;

  let scrollbarTimeout;

  function onScroll() {
    const p = Math.min(details.scrollTop / scrollDist, 1);
    const newWidth = openWidth + (window.innerWidth - openWidth) * p;
    gsap.set(pill, {
      flex: `0 0 ${newWidth}px`,
      height: openHeight + (window.innerHeight - openHeight) * p,
      borderRadius: 20 * (1 - p)
    });
    gsap.set(bar, {
      x: baseBarX - (newWidth - openWidth) / 2,
      y: baseBarY - topGap * p
    });

    details.classList.add('is-scrolling');
    clearTimeout(scrollbarTimeout);
    scrollbarTimeout = setTimeout(() => details.classList.remove('is-scrolling'), 800);
  }

  details.addEventListener('scroll', onScroll, { passive: true });

  detailScrollCleanup = () => {
    details.removeEventListener('scroll', onScroll);
    clearTimeout(scrollbarTimeout);
    details.classList.remove('is-scrolling');
    stage.style.overflow = savedOverflow;
    document.body.style.overflowY = '';
    gsap.set(pill, { flex: `0 0 ${openWidth}px`, height: openHeight, borderRadius: 20 });
    gsap.set(bar, { x: baseBarX, y: baseBarY });
    gsap.set(bar, { x: baseBarX });
  };
}

function closeDetails() {
  if (!isDetailsOpen || !activePill || isAnimating) return;

  if (detailScrollCleanup) { detailScrollCleanup(); detailScrollCleanup = null; }

  const pill = activePill;
  const details = pill.querySelector(".details");

  isDetailsOpen = false;
  isAnimating = true;
  window.updateActiveChip?.(null);

  const line = pill.querySelector(".line");

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      activePill = null;
      pill.classList.remove("activedt");
      if (pill.dataset.project === 'studio') window.dispatchEvent(new Event('studio-details-close'));
      if (line) gsap.set(line, { scale: 1, y: 0, opacity: 1 });
      initMarquee();
    }
  });

  if (details) {
    tl.to(details, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0);
    tl.set(details, { display: "none", opacity: 1 }, 0.3);
  }

  tl.to(pill, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
    borderRadius: 999,
    duration: 0.7,
    ease: "power3.inOut"
  }, 0.3);

  tl.to(bar, {
    x: `-=${detailsShift}`,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => { marqueeOffset -= detailsShift; detailsShift = 0; }
  }, 0.3);

  tl.to([heroTitle, heroSubtitle], {
    opacity: 1, y: 0, duration: 0.4, ease: "power2.out", pointerEvents: "auto"
  }, 1.0);

  tl.to(plusButton, {
    rotation: 0, top: "55%", duration: 0.5, ease: "power3.inOut",
    onComplete: () => plusRotation.resume()
  }, 1.0);


tl.call(() => {
  const video = details?.querySelector('video');
  const playBtn = details?.querySelector('.video-play-btn');
  if (video && playBtn) {
    video.pause();
    video.currentTime = 0;
    playBtn.style.display = 'none';
    playBtn.textContent = translations[getCurrentLang()]['btn.afspelen'];
  }

  // Herstel alle tabindexen
  document.querySelectorAll('[data-prev-tabindex]').forEach(el => {
    const prev = el.dataset.prevTabindex;
    if (prev === '') {
      el.removeAttribute('tabindex');
    } else {
      el.setAttribute('tabindex', prev);
    }
    delete el.dataset.prevTabindex;
  });
}, null, 1.0);
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

gsap.set([heroTitle, heroSubtitle], { opacity: 0, y: 20 });
gsap.set(pills, { opacity: 0, scale: 0.8 });
gsap.set(".footer-socials", { opacity: 0 });
gsap.set(".plus-button", { opacity: 0, scale: 0 });
gsap.set(".hud", { opacity: 0, y: 20 });

const fromShowreel = new URLSearchParams(location.search).get('from') === 'showreel';
if (fromShowreel) history.replaceState(null, '', '/');

if (fromShowreel) {
  const __backOverlay = document.getElementById('__back-overlay');
  if (__backOverlay) {
    gsap.to(__backOverlay, { opacity: 0, duration: 0.4, delay: 0.05, ease: 'power2.out', onComplete: () => __backOverlay.remove() });
  }
  gsap.to([heroTitle, heroSubtitle, ".footer-socials"], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
  gsap.to(pills, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.1 });
  gsap.to(".plus-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.1 });
  gsap.to(".hud", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1, onComplete: () => {
    isAnimating = false;
    window.dispatchEvent(new Event('intro-complete'));
  }});
} else {
  const introTl = gsap.timeline({
    delay: 0.3,
    onComplete: () => { isAnimating = false; }
  });
  introTl.to(pills, { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out", stagger: 0.08 }, 0);
  introTl.to(heroTitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.6);
  introTl.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.7);
  introTl.to(".plus-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 1.0);
  introTl.to(".hud", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.5);
  introTl.call(() => { window.dispatchEvent(new Event('intro-complete')); }, null, 1.5);
  introTl.to(".footer-socials", { opacity: 1, duration: 0.5, ease: "power2.out" }, 2);
}

// Theme toggle
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
  setTheme(localStorage.getItem('theme') || 'dark');
}

// Project chips in HUD
const projectChipsEl = document.getElementById('projectChips');
if (projectChipsEl) {
  const projects = [
    { key: 'studio', label: 'Studio' },
    { key: 'oog',    label: 'Oog' },
    { key: 'fizzi',  label: 'Fizzi' },
    { key: 'dirk',   label: 'Dirk' },
  ];

  const chipEls = {};
  projects.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      if (isAnimating || isDetailsOpen) return;
      const pill = document.querySelector(`.bar-inner[data-project="${key}"]`);
      if (!pill) return;
      activePill = pill;
      marqueeTween.pause();
      if (key === 'dirk') {
        openDirkShowreel(pill);
      } else {
        openDetails(pill);
      }
    });
    chipEls[key] = btn;
    projectChipsEl.appendChild(btn);
  });

  window.updateActiveChip = (project) => {
    Object.values(chipEls).forEach(b => b.classList.remove('is-active'));
    if (project && chipEls[project]) chipEls[project].classList.add('is-active');
  };
}
