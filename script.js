import { gsap } from 'gsap'
let isDetailsOpen = false;
const heroTitle = document.querySelector(".title");
const heroSubtitle = document.querySelector(".subtitle");
const plusButton = document.querySelector(".plus-button");
let hasInteracted = false;
let marqueeOffset = 0;
let openShift = 0;
let detailsShift = 0; // 👈 Track de shift voor details centering
let activePill = null;
let isAnimating = false;
const bar = document.querySelector(".bar");
bar.innerHTML += bar.innerHTML;

function getFullExpandedSize() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (w <= 1025) {
    return {
      width: w * 0.95,
      height: h * 0.9
    };
  }

  return {
    width: w - 50,
    height: h * 0.80
  };
}


function getResponsiveFlex() {
  const width = window.innerWidth;

  if (width <= 600) {
    return "0 0 calc(60vw - 25px)";
  } else if (width <= 1025) {
    return "0 0 calc(40vw - 25px)";
  } else {
    return "0 0 calc(25vw - 25px)";
  }
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
  const padding = 100; // 👈 VERHOOGD van 24 naar 80 voor meer ruimte

  const expandedWidth = getExpandedWidth();

  // 📱 Mobile & tablet → hard centreren
  if (viewportWidth <= 1025) {
    const pillCenter = pillRect.left + expandedWidth / 2;
    const marqueeCenter = marqueeRect.left + marqueeRect.width / 2;
    return marqueeCenter - pillCenter;
  }

  // 💻 Desktop → corrigeren indien nodig

  // Links buiten beeld
  if (pillRect.left < marqueeRect.left + padding) {
    return (marqueeRect.left + padding) - pillRect.left;
  }

  // Rechts buiten beeld (⚠️ MET expandedWidth)
  const expandedRight = pillRect.left + expandedWidth;

  if (expandedRight > marqueeRect.right - padding) {
    return (marqueeRect.right - padding) - expandedRight;
  }

  return 0;
}



const plusRotation = gsap.to(".plus-button", {
  rotation: -360,
  duration: 6,
  ease: "none",
  repeat: -1
});

plusButton.addEventListener("mouseenter", () => {
  if (!isDetailsOpen) {
    plusRotation.pause();
    gsap.to(plusButton, {
      rotation: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  }
});

plusButton.addEventListener("mouseleave", () => {
  if (!isDetailsOpen) {
    gsap.to(plusButton, {
      rotation: -360,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => plusRotation.resume()
    });
  }
});


// ============================================
// OVERVIEW PANEL LOGIC
// Voeg dit toe NA de plusRotation definitie en hover listeners,
// en VERVANG de bestaande plusButton click listener
// ============================================

const overviewPanel = document.querySelector(".overview-panel");
let isOverviewOpen = false;

function openOverview() {
  if (isOverviewOpen || isDetailsOpen || isAnimating) return;

  isOverviewOpen = true;

  // Marquee stoppen
  marqueeTween.pause();

  // Plus wordt X
  plusRotation.pause();
  gsap.to(plusButton, {
    rotation: 45,
    top: "3%",
    duration: 0.5,
    ease: "power3.inOut",
    cursor: "pointer"
  });

  // Hero weg
  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.out",
    pointerEvents: "none"
  });

  // Panel zichtbaar
  overviewPanel.classList.add("is-open");

  // Cards staggered fade in
  const cards = overviewPanel.querySelectorAll(".overview-card");
  gsap.fromTo(overviewPanel,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" }
  );

  gsap.fromTo(cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.2
    }
  );
}

function closeOverview() {
  if (!isOverviewOpen) return;

  isOverviewOpen = false;

  const cards = overviewPanel.querySelectorAll(".overview-card");

  // Cards weg
  gsap.to(cards, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.04
  });

  // Panel weg
  gsap.to(overviewPanel, {
    opacity: 0,
    duration: 0.4,
    delay: 0.2,
    ease: "power2.in",
    pointerEvents: "none",
    onComplete: () => {
      overviewPanel.classList.remove("is-open");
      // Reset card transforms voor volgende keer
      gsap.set(cards, { opacity: 1, y: 0 });
    }
  });

  // Plus terug
  gsap.to(plusButton, {
    rotation: 0,
    top: "55%",
    duration: 0.5,
    delay: 0.3,
    ease: "power3.inOut",
    cursor: "default",
    onComplete: () => {
      plusRotation.resume();
    }
  });

  // Hero terug
  gsap.to([heroTitle, heroSubtitle], {
    opacity: 1,
    y: 0,
    duration: 0.4,
    delay: 0.4,
    ease: "power2.out",
    pointerEvents: "auto"
  });

  // Marquee hervatten
  setTimeout(() => marqueeTween.resume(), 600);
}

// VERVANG de bestaande plusButton click listener:
// plusButton.addEventListener("click", () => { closeDetails(); });
// MET DIT:

plusButton.addEventListener("click", () => {
  if (isDetailsOpen) {
    closeDetails();
  } else if (isOverviewOpen) {
    closeOverview();
  } else {
    // Stage 1 → open overview
    if (!isAnimating) {
      openOverview();
    }
  }
});


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
});


const marquee = document.querySelector(".marquee");

marquee.addEventListener("mouseenter", () => {
  gsap.to(marqueeTween, {
    timeScale: 0,
    duration: 0.6,
    ease: "power2.out"
  });
});

marquee.addEventListener("mouseleave", () => {
  // ✅ Alleen hervatten als er geen pill actief is
  if (!activePill) {
    gsap.to(marqueeTween, {
      timeScale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  }
});



const pills = document.querySelectorAll(".bar-inner");

pills.forEach(pill => {
    const info = pill.querySelector(".info");
  if (!info) return;

  gsap.set(info, {
    opacity: 1,
    visibility: "hidden",
    pointerEvents: "none"
  });

  // force reflow
  info.offsetHeight;

  gsap.set(info, {
    opacity: 0,
    visibility: "visible"
  });
  
  pill.addEventListener("click", (e) => {

      // ⛔️ ALS details open zijn → niks doen
  if (isDetailsOpen) return;

      // ⛔️ ALS op "Meer zien" geklikt → pill NIET sluiten
  if (e.target.closest(".more-btn")) {
    return;
  }

      if (isAnimating) return;


    if (activePill === pill) {
      resetPills();
      activePill = null;
      marqueeTween.resume();
      return;
    }

        // 👇 Als er al één open is → eerst sluiten
    if (activePill) {
      resetPills();
    }

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


function openDetails(pill) {
  const details = pill.querySelector(".details");
  const info = pill.querySelector(".info");
  
  if (!details || isDetailsOpen || isAnimating) return; // 👈 Toegevoegd

  isDetailsOpen = true;
  isAnimating = true; // 👈 Toegevoegd

  // 🎯 Bereken hoeveel we moeten shiften om te centreren
  const pillRect = pill.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  const targetWidth = viewportWidth - 24;
  const viewportCenter = viewportWidth / 2;
  const targetPillCenter = pillRect.left + targetWidth / 2;
  
  detailsShift = viewportCenter - targetPillCenter;

  // hero weg
  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.out",
    pointerEvents: "none"
  });

  // 🛑 stop draaien
  plusRotation.pause();

  // plus naar boven + kruis
  gsap.to(plusButton, {
    rotation: 45,
    top: "3%",
    duration: 0.5,
    ease: "power3.inOut",
    cursor: "pointer"
  });

  // Timeline voor pill expand + centreren
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false; // 👈 Toegevoegd
    }
  });

  // 1️⃣ Info van stage 2 eerst weg
  if (info) {
    tl.to(info, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  }

  // 2️⃣ Pill groeit (start op 0.3s, na info fade)
  tl.to(pill, {
    flex: `0 0 ${targetWidth}px`,
    height: window.innerHeight * 0.8,
    duration: 0.7,
    ease: "power3.inOut"
  }, 0.3);

  // 3️⃣ Bar shift om te centreren (tegelijkertijd met pill grow)
  tl.to(bar, {
    x: `+=${detailsShift}`,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => {
      marqueeOffset += detailsShift;
    }
  }, 0.3);

  // 4️⃣ Details zichtbaar maken NA de expand (op 1.0s = 0.3 + 0.7)
  tl.set(details, {
    display: "block"
  }, 1.0);

  // 5️⃣ Details fade in
  tl.from(details, {
    opacity: 0,
    duration: 0.4,
    ease: "power2.out"
  }, 1.0);

    // 6️⃣ Start video na fade in (op 1.4s)
  tl.call(() => {
    const video = details.querySelector('video');
    if (video) {
      video.currentTime = 0; // Start vanaf begin
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


  // Timeline voor gestructureerde close animatie
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      
      // 🔑 DIRECT NAAR STATE 1
      resetPills();
      activePill = null;
      
      // ✅ Marquee hervatten na reset
      marqueeTween.resume();
    }
  });

  // 1️⃣ Details eerst wegfaden
  if (details) {
    tl.to(details, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0);
    
    // Display op none zetten na fade + opacity resetten
    tl.set(details, {
      display: "none",
      opacity: 1  // 👈 TOEGEVOEGD - reset opacity voor volgende keer
    }, 0.3);
  }

  // 2️⃣ Pill kleiner maken (start op 0.3s)
  tl.to(pill, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
    duration: 0.7,
    ease: "power3.inOut"
  }, 0.3);

  // 3️⃣ Bar terugshiften (tegelijkertijd met pill shrink)
  tl.to(bar, {
    x: `-=${detailsShift}`,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => {
      marqueeOffset -= detailsShift;
      detailsShift = 0;
    }
  }, 0.3);

  // 4️⃣ Hero terug (na pill shrink, op 1.0s)
  tl.to([heroTitle, heroSubtitle], {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out",
    pointerEvents: "auto"
  }, 1.0);

  // 5️⃣ Plus button terug + draaien hervatten (tegelijkertijd met hero)
  tl.to(plusButton, {
    rotation: 0,
    top: "55%",
    duration: 0.5,
    ease: "power3.inOut",
    cursor: "default",
    onComplete: () => {
      plusRotation.resume();
    }
  }, 1.0);

    // 6️⃣ Reset video button (op 1.0s, dus 1 sec vertraagd)
  tl.call(() => {
    const video = details?.querySelector('video');
    const playBtn = details?.querySelector('.video-play-btn');
    if (video && playBtn) {
      video.pause();
      video.currentTime = 0;
      playBtn.style.display = 'none';
      playBtn.textContent = '▶ Afspelen';
    }
  }, null, 1.0);
}





function expandPill(active) {

  // 🔑 active class zetten
pills.forEach(p => p.classList.remove("active"));
active.classList.add("active");

  isAnimating = true;


  // 👇 FIX: eerste interactie → layout stabiliseren
  if (!hasInteracted) {
    marqueeTween.pause();
    gsap.set(bar, { x: gsap.getProperty(bar, "x") }); // force reflow
    hasInteracted = true;
  }

  // 📱 Op mobile/tablet: hero weghalen + plus button verplaatsen
  const viewportWidth = window.innerWidth;
  
  if (viewportWidth <= 1025) {
    gsap.to([heroTitle, heroSubtitle], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: "none"
    });
    
    // Plus button positie aanpassen
    if (viewportWidth <= 600) {
      // 📱 Mobile
      gsap.to(plusButton, {
        top: "82%",
        duration: 0.5,
        ease: "power3.inOut"
      });
    } else {
      // 📱 Tablet (601-1025px)
      gsap.to(plusButton, {
        top: "71%",
        duration: 0.5,
        ease: "power3.inOut"
      });
    }
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    }
  });

  pills.forEach(pill => {
    const info = pill.querySelector(".info");
    const title = pill.querySelector(".line");

    if (pill === active) {

      // 1️⃣ Pill groeit eerst
      tl.to(pill, {
        flex: `0 0 ${getExpandedWidth()}px`,
        height: 400,
        borderRadius: 20,
        duration: 0.6,
        ease: "power3.inOut"
      }, 0);

// 2️⃣ NA expand → bereken shift
tl.call(() => {
  openShift = getPillDelta(active);
}, null, 0.1);

// 3️⃣ Bar schuift mee (IN timeline)
tl.to(bar, {
  x: () => `+=${openShift}`,
  duration: 0.6,
  ease: "power3.inOut",
  onComplete: () => {
    marqueeOffset += openShift;
  }
}, 0.1);


      // 3️⃣ Titel weg
      tl.to(title, {
        opacity: 0,
        duration: 0.3
      }, 0);

      // 4️⃣ Info erin
      if (info) {
        tl.to(info, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4
        }, 0.4);
      }

    } else {
  const isDesktop = window.innerWidth > 1025;

  if (isDesktop) {
    // 💻 Desktop → echte layout shrink
    tl.to(pill, {
      scale: 0.8,
      duration: 0.6,
      ease: "power3.inOut"
    }, 0);
  } else {
    // 📱 Tablet & mobile → visueel schalen
    tl.to(pill, {
      scale: 0.8,
      duration: 0.6,
      ease: "power3.inOut"
    }, 0);
  }
}
  });
}



function resetPills() {

    isAnimating = true;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      openShift = 0; // 👈 belangrijk: resetten
      detailsShift = 0; // 👈 Ook detailsShift resetten
      pills.forEach(p => p.classList.remove("active"));
    }
  });

  // 👉 Eerst alleen info van actieve pill weg
  if (activePill) {
    const info = activePill.querySelector(".info");

    tl.to(info, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // 👉 Bar terugshiften (BEIDE shifts)
  const totalShift = openShift + detailsShift;
  
  tl.to(bar, {
    x: `-=${totalShift}`,
    duration: 0.6,
    ease: "power3.inOut",
    onComplete: () => {
      marqueeOffset -= totalShift;
    }
  }, 0);

  // 👉 Daarna ALLE pills tegelijk resetten
  tl.to(pills, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
    scale: 1,
    borderRadius: 999,
    duration: 0.6,
    ease: "power3.inOut"
  }, 0);

  // 👉 Titel van actieve pill pas op het einde terug
  if (activePill) {
    const title = activePill.querySelector(".line");

    tl.to(title, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // 📱 Op mobile/tablet: hero terughalen + plus button reset (als details niet open zijn)
  if (window.innerWidth <= 1025 && !isDetailsOpen) {
    tl.to([heroTitle, heroSubtitle], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: "auto"
    }, 0.3);
    
    // Plus button terug naar 55%
    tl.to(plusButton, {
      top: "55%",
      duration: 0.5,
      ease: "power3.inOut"
    }, 0);
  }

  // ✅ Marquee timescale herstellen na reset animatie (niet resume - dat gebeurt elders)
  tl.call(() => {
    gsap.to(marqueeTween, {
      timeScale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  });
}

// Video controls
document.querySelectorAll('.details-image').forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.video-play-btn');
    
    if (!video || !playBtn) return;
    
    // Button standaard verbergen
    playBtn.style.display = 'none';
    
    // Toon button wanneer video klaar is
    video.addEventListener('ended', () => {
        playBtn.style.display = 'block';
        playBtn.textContent = '↻ Opnieuw afspelen';
    });
    
    // Play functionaliteit
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


// Alles eerst verbergen
gsap.set([heroTitle, heroSubtitle], { opacity: 0, y: 20 });
gsap.set(pills, { opacity: 0, scale: 0.8 });
gsap.set(".footer-socials", { opacity: 0 });
gsap.set(".plus-button", { opacity: 0, scale: 0 });

// Intro timeline
const introTl = gsap.timeline({
  delay: 0.3,
  onComplete: () => {
    isAnimating = false; // 🔓 Sta interacties toe na intro
  }
});

// 1️⃣ Pills animeren (met stagger voor golf-effect)
introTl.to(pills, {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: "back.out(1.2)",
  stagger: 0.08 // Elke pill 0.08s later
}, 0);

// 2️⃣ Hero tekst fade in (na pills)
introTl.to(heroTitle, {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power2.out"
}, 0.6);

introTl.to(heroSubtitle, {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power2.out"
}, 0.7);

// 3️⃣ Plus button en footer (subtiel erna)
introTl.to(".plus-button", {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "back.out(1.5)"
}, 1.0);

introTl.to(".footer-socials", {
  opacity: 1,
  duration: 0.5,
  ease: "power2.out"
}, 1.1);

// Mobile card tap om uit te klappen
document.querySelectorAll(".overview-card").forEach(card => {
  card.addEventListener("click", (e) => {
    if (window.innerWidth > 600) return; // alleen mobile
    
    // Voorkom dat link opent als card nog niet expanded is
    if (!card.classList.contains("expanded")) {
      e.preventDefault();
      // Sluit andere open cards
      document.querySelectorAll(".overview-card.expanded").forEach(c => {
        c.classList.remove("expanded");
      });
      card.classList.add("expanded");
    }
    // Als al expanded → link mag gewoon openen (via de knop)
  });
});