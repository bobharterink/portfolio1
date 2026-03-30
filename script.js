import { gsap } from 'gsap'
import { translations, getCurrentLang } from './translate.js'

let isDetailsOpen = false;
const heroTitle = document.querySelector(".title");
const heroSubtitle = document.querySelector(".subtitle");
const plusButton = document.querySelector(".plus-button");
let hasInteracted = false;
let marqueeOffset = 0;
let openShift = 0;
let detailsShift = 0;
let activePill = null;
let isAnimating = false;
const bar = document.querySelector(".bar");
bar.innerHTML += bar.innerHTML;

function getResponsiveFlex() {
  const width = window.innerWidth;
  if (width <= 600) return "0 0 calc(60vw - 25px)";
  if (width <= 1025) return "0 0 calc(40vw - 25px)";
  return "0 0 calc(25vw - 25px)";
}

function getExpandedWidth() {
  const w = window.innerWidth;
  if (w <= 600) return w * 0.9;
  if (w <= 1025) return w * 0.85;
  return 800;
}

function getPillDelta(pill) {
  const marquee = document.querySelector(".marquee");
  const marqueeRect = marquee.getBoundingClientRect();
  const pillRect = pill.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const padding = 100;
  const expandedWidth = getExpandedWidth();

  if (viewportWidth <= 1025) {
    const pillCenter = pillRect.left + expandedWidth / 2;
    const marqueeCenter = marqueeRect.left + marqueeRect.width / 2;
    return marqueeCenter - pillCenter;
  }

  if (pillRect.left < marqueeRect.left + padding) {
    return (marqueeRect.left + padding) - pillRect.left;
  }

  const expandedRight = pillRect.left + expandedWidth;
  if (expandedRight > marqueeRect.right - padding) {
    return (marqueeRect.right - padding) - expandedRight;
  }

  return 0;
}

function shouldHideHero() {
  return window.innerWidth <= 1440 || window.innerHeight <= 900;
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
  if (!isDetailsOpen && !isOverviewOpen) {
    plusRotation.pause();
    gsap.to(plusButton, { rotation: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(plusButton, { scale: 1.1, duration: 0.4, ease: "back.out(3)" });
  }
});

plusButton.addEventListener("mouseleave", () => {
  gsap.to(plusButton, { scale: 1, duration: 0.4, ease: "back.out(3)" });

  if (!isDetailsOpen && !isOverviewOpen) {
    gsap.to(plusButton, {
      rotation: -360,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => plusRotation.resume()
    });
  }
});

plusButton.addEventListener("click", () => {
  gsap.killTweensOf(plusButton, "scale");
  gsap.set(plusButton, { scale: 1 });

  if (isDetailsOpen) {
    closeDetails();
  } else if (isOverviewOpen) {
    closeOverview();
  } else if (!isAnimating) {
    openOverview();
  }
});


// ============================================
// OVERVIEW PANEL
// ============================================

const overviewPanel = document.querySelector(".overview-panel");
let isOverviewOpen = false;

function openOverview() {
  if (isOverviewOpen || isDetailsOpen || isAnimating) return;

  isOverviewOpen = true;
  marqueeTween.pause();

  plusRotation.pause();
  gsap.set(plusButton, { rotation: 0 });
  gsap.to(plusButton, { rotation: 45, top: "3%", duration: 0.5, ease: "power3.inOut" });

  gsap.to(".lang-switcher", {
    right: window.innerWidth <= 600 ? 70 : 100,
    duration: 0.5,
    ease: "power3.inOut"
  });

  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0, y: -20, duration: 0.4, ease: "power2.out", pointerEvents: "none"
  });

  overviewPanel.classList.add("is-open");

  const cards = overviewPanel.querySelectorAll(".overview-card");
  gsap.fromTo(overviewPanel,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" }
  );
  gsap.fromTo(cards,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, ease: "none", stagger: 0.07, delay: 0.2 }
  );
}

function closeOverview() {
  if (!isOverviewOpen) return;

  isOverviewOpen = false;

  const cards = overviewPanel.querySelectorAll(".overview-card");

  gsap.to(cards, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in", stagger: 0.04 });

  gsap.to(overviewPanel, {
    opacity: 0,
    duration: 0.4,
    delay: 0.2,
    ease: "power2.in",
    pointerEvents: "none",
    onComplete: () => {
      overviewPanel.classList.remove("is-open");
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  });

  if (activePill) {
    resetPills();
    activePill = null;
  }

  gsap.to(plusButton, {
    rotation: 0, top: "55%", duration: 0.5, delay: 0.3, ease: "power3.inOut",
    onComplete: () => plusRotation.resume()
  });

  gsap.to(".lang-switcher", {
    right: window.innerWidth <= 600 ? 15 : 40,
    duration: 0.5,
    delay: 0.3,
    ease: "power3.inOut"
  });

  gsap.to([heroTitle, heroSubtitle], {
    opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out", pointerEvents: "auto"
  });

  setTimeout(() => {
    normalizeMarqueePosition();
    marqueeTween.resume();
  }, 600);
}


// ============================================
// MARQUEE
// ============================================

let marqueeTween;

function initMarquee() {
  if (marqueeTween) {
    marqueeOffset = gsap.getProperty(bar, "x");
    marqueeTween.kill();
  }

  const totalWidth = bar.scrollWidth / 2;
  const gap = 10;

  marqueeTween = gsap.to(bar, {
    x: marqueeOffset - (totalWidth + gap),
    duration: 20,
    ease: "none",
    repeat: -1
  });
}

initMarquee();

window.addEventListener("resize", () => {
  initMarquee();
  if (activePill || isDetailsOpen || isOverviewOpen) {
    marqueeTween.pause();
  }
});

function normalizeMarqueePosition() {
  const totalWidth = bar.scrollWidth / 2;
  let currentX = gsap.getProperty(bar, "x");
  currentX = currentX % -totalWidth;
  if (currentX > 0) currentX -= totalWidth;
  gsap.set(bar, { x: currentX });
  marqueeOffset = currentX;
}

const marquee = document.querySelector(".marquee");

marquee.addEventListener("mouseenter", () => {
  gsap.to(marqueeTween, { timeScale: 0, duration: 0.6, ease: "power2.out" });
});

marquee.addEventListener("mouseleave", () => {
  if (!activePill && !isDetailsOpen && !isOverviewOpen) {
    gsap.to(marqueeTween, { timeScale: 1, duration: 0.6, ease: "power2.out" });
  }
});


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

  pill.addEventListener("click", (e) => {
    if (isDetailsOpen) return;
    if (e.target.closest(".more-btn")) return;
    if (isAnimating) return;

    if (activePill === pill) {
      resetPills();
      activePill = null;
      marqueeTween.resume();
      return;
    }

    if (activePill) resetPills(true);

    activePill = pill;
    marqueeTween.pause();
    expandPill(pill);
  });
});

document.querySelectorAll(".more-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const pill = btn.closest(".bar-inner");
    if (!pill) return;
    activePill = pill;
    openDetails(pill);
  });
});


// ============================================
// DETAILS
// ============================================

function openDetails(pill) {
  const details = pill.querySelector(".details");
  const info = pill.querySelector(".info");

  if (!details || isDetailsOpen || isAnimating) return;

  isDetailsOpen = true;
  isAnimating = true;

  const pillRect = pill.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const targetWidth = viewportWidth - 24;
  const viewportCenter = viewportWidth / 2;
  const targetPillCenter = pillRect.left + targetWidth / 2;

  detailsShift = viewportCenter - targetPillCenter;

  pill.classList.add("activedt");

  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0, y: -20, duration: 0.4, ease: "power2.out", pointerEvents: "none"
  });

  plusRotation.pause();
  gsap.to(plusButton, { rotation: 45, top: "3%", duration: 0.5, ease: "power3.inOut" });
  gsap.to(".lang-switcher", {
    right: window.innerWidth <= 600 ? 70 : 100,
    duration: 0.5,
    ease: "power3.inOut"
  });

  const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });

  if (info) {
    tl.to(info, { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.out" }, 0);
  }

  tl.to(pill, {
    flex: `0 0 ${targetWidth}px`,
    height: window.innerHeight * 0.8,
    duration: 0.7,
    ease: "power3.inOut"
  }, 0.3);

  tl.to(bar, {
    x: `+=${detailsShift}`,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => { marqueeOffset += detailsShift; }
  }, 0.3);

  tl.set(details, { display: "block" }, 1.0);
  tl.from(details, { opacity: 0, duration: 0.4, ease: "power2.out" }, 1.0);

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

function closeDetails() {
  if (!isDetailsOpen || !activePill || isAnimating) return;

  const pill = activePill;
  const details = pill.querySelector(".details");

  isDetailsOpen = false;
  isAnimating = true;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      resetPills();
      activePill = null;
      pill.classList.remove("activedt");
      normalizeMarqueePosition();
      marqueeTween.resume();
    }
  });

  if (details) {
    tl.to(details, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0);
    tl.set(details, { display: "none", opacity: 1 }, 0.3);
  }

  tl.to(pill, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
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

  tl.to(".lang-switcher", {
    right: window.innerWidth <= 600 ? 15 : 40,
    duration: 0.5,
    ease: "power3.inOut"
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
  }, null, 1.0);
}


// ============================================
// EXPAND / RESET PILLS
// ============================================

function expandPill(active) {
  pills.forEach(p => p.classList.remove("active"));
  active.classList.add("active");
  isAnimating = true;

  if (!hasInteracted) {
    marqueeTween.pause();
    gsap.set(bar, { x: gsap.getProperty(bar, "x") });
    hasInteracted = true;
  }

  const viewportWidth = window.innerWidth;

  // Hide hero title/subtitle if screen is narrow OR not tall enough
  if (shouldHideHero()) {
    gsap.to([heroTitle, heroSubtitle], {
      opacity: 0, y: -20, duration: 0.4, ease: "power2.out", pointerEvents: "none"
    });
    gsap.to(plusButton, {
      top: viewportWidth <= 600 ? "82%" : "71%",
      duration: 0.5,
      ease: "power3.inOut"
    });
  }

  const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });

  pills.forEach(pill => {
    const info = pill.querySelector(".info");
    const title = pill.querySelector(".line");

    if (pill === active) {
      tl.to(pill, {
        flex: `0 0 ${getExpandedWidth()}px`,
        height: 400,
        borderRadius: 20,
        duration: 0.6,
        ease: "power3.inOut"
      }, 0);

      tl.call(() => { openShift = getPillDelta(active); }, null, 0.1);

      tl.to(bar, {
        x: () => `+=${openShift}`,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => { marqueeOffset += openShift; }
      }, 0.1);

      tl.to(title, { opacity: 0, duration: 0.3 }, 0);

      if (info) {
        tl.to(info, { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 0.4);
      }
    } else {
      tl.to(pill, { scale: 0.8, duration: 0.6, ease: "power3.inOut" }, 0);
    }
  });
}

function resetPills(isSwitch = false) { 
  isAnimating = true;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      openShift = 0;
      detailsShift = 0;
      pills.forEach(p => p.classList.remove("active"));
    }
  });

  if (activePill) {
    const info = activePill.querySelector(".info");
    tl.to(info, { opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power2.out" });
  }

  const totalShift = openShift + detailsShift;
  tl.to(bar, {
    x: `-=${totalShift}`,
    duration: 0.6,
    ease: "power3.inOut",
    onComplete: () => { marqueeOffset -= totalShift; }
  }, 0);

  tl.to(pills, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
    scale: 1,
    borderRadius: 999,
    duration: 0.6,
    ease: "power3.inOut"
  }, 0);

  if (activePill) {
    const title = activePill.querySelector(".line");
    tl.to(title, { opacity: 1, duration: 0.3, ease: "power2.out" });
  }

  // Restore hero title/subtitle when closing, same condition as hiding
  if (!isSwitch && !isDetailsOpen && shouldHideHero()) {
    tl.to([heroTitle, heroSubtitle], {
      opacity: 1, y: 0, duration: 0.4, ease: "power2.out", pointerEvents: "auto"
    }, 0.3);
    tl.to(plusButton, { top: "55%", duration: 0.5, ease: "power3.inOut" }, 0);
  }

  tl.call(() => {
    gsap.to(marqueeTween, { timeScale: 1, duration: 0.4, ease: "power2.out" });
  });
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
gsap.set(".lang-switcher", { opacity: 0, y: 20 });

const introTl = gsap.timeline({
  delay: 0.3,
  onComplete: () => { isAnimating = false; }
});

introTl.to(pills, { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out", stagger: 0.08 }, 0);
introTl.to(heroTitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.6);
introTl.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.7);
introTl.to(".plus-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 1.0);
introTl.to(".lang-switcher", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.5);
introTl.call(() => { window.dispatchEvent(new Event('intro-complete')); }, null, 1.5);
introTl.to(".footer-socials", { opacity: 1, duration: 0.5, ease: "power2.out" }, 2);


// ============================================
// MOBILE OVERVIEW CARDS
// ============================================

let isCardAnimating = false;
let activeCard = null;

document.querySelectorAll(".overview-card").forEach(card => {
  card.addEventListener("click", (e) => {
    if (window.innerWidth > 600) return;
    if (isCardAnimating) return;

    const tags = card.querySelector(".overview-tags");
    const desc = card.querySelector(".overview-desc");
    const link = card.querySelector("a");
    const isOpen = card.classList.contains("expanded");

    if (activeCard && activeCard !== card) {
      isCardAnimating = true;
      const prevTags = activeCard.querySelector(".overview-tags");
      const prevDesc = activeCard.querySelector(".overview-desc");
      const prevLink = activeCard.querySelector("a");

      gsap.to([prevTags, prevDesc, prevLink], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(activeCard, {
            height: 50,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => {
              activeCard.classList.remove("expanded");
              gsap.set([prevTags, prevDesc, prevLink], { display: "none", opacity: 0 });
              activeCard = null;
              openCard(card, tags, desc, link);
            }
          });
        }
      });
      return;
    }

    if (isOpen) {
      isCardAnimating = true;
      gsap.to([tags, desc, link], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(card, {
            height: 50,
            duration: 0.4,
            ease: "power3.inOut",
            onComplete: () => {
              card.classList.remove("expanded");
              gsap.set([tags, desc, link], { display: "none", opacity: 0 });
              activeCard = null;
              isCardAnimating = false;
            }
          });
        }
      });
    } else {
      openCard(card, tags, desc, link);
    }
  });
});

function openCard(card, tags, desc, link) {
  isCardAnimating = true;
  activeCard = card;
  card.classList.add("expanded");

  gsap.set([tags, desc, link], { display: "flex", opacity: 0 });
  gsap.set(desc, { display: "block" });

  gsap.set(card, { height: "auto" });
  const openHeight = card.offsetHeight;
  gsap.set(card, { height: 60 });

  gsap.to(card, {
    height: openHeight,
    duration: 0.5,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.set(card, { height: "auto" });
      gsap.to([tags, desc, link], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.08,
        onComplete: () => { isCardAnimating = false; }
      });
    }
  });
}