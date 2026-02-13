import { gsap } from 'gsap'
let isDetailsOpen = false;
const heroTitle = document.querySelector(".title");
const heroSubtitle = document.querySelector(".subtitle");
const plusButton = document.querySelector(".plus-button");
let hasInteracted = false;
let marqueeOffset = 0;
let openShift = 0;
let activePill = null;
let isAnimating = false;   // 👈 NIEUW
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

  if (w <= 600) return w * 0.9;      // mobile: bijna full width
  if (w <= 1025) return w * 0.85;    // tablet
  return 800;                       // desktop
}


function getPillDelta(pill) {
  const marquee = document.querySelector(".marquee");
  const marqueeRect = marquee.getBoundingClientRect();
  const pillRect = pill.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const padding = 24;

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
  gsap.to(marqueeTween, {
    timeScale: 1,
    duration: 0.6,
    ease: "power2.out"
  });
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

      if (isAnimating) return;   // 👈 blokkeer snelle clicks


    if (activePill === pill) {
      resetPills();
      activePill = null;
      marqueeTween.resume();
      return;
    }

        // 👇 NIEUW: als er al één open is → eerst sluiten
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
  if (!details || isDetailsOpen) return;

  isDetailsOpen = true;

  // details zichtbaar
  details.style.display = "block";

  // hero weg
  gsap.to([heroTitle, heroSubtitle], {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.out",
    pointerEvents: "none"
  });

const moreBtn = pill.querySelector(".more-btn");
if (moreBtn) {
  moreBtn.style.display = "none";
}

  // 🛑 stop draaien
  plusRotation.pause();

  // plus naar boven + kruis
  gsap.to(plusButton, {
    rotation: 45,
    top: "3%",
    duration: 0.5,
    ease: "power3.inOut"
  });

  // pill bijna fullscreen
  gsap.to(pill, {
    flex: `0 0 ${window.innerWidth - 24}px`,
    height: window.innerHeight * 0.8,
    duration: 0.7,
    ease: "power3.inOut"
  });
}


function closeDetails() {
  if (!isDetailsOpen || !activePill) return;

  const details = activePill.querySelector(".details");
  if (details) details.style.display = "none";

  isDetailsOpen = false;

  // hero terug
  gsap.to([heroTitle, heroSubtitle], {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out",
    pointerEvents: "auto"
  });

  const moreBtn = activePill.querySelector(".more-btn");
if (moreBtn) {
  moreBtn.style.display = "block";
}


  // plus terug + draaien hervatten
  gsap.to(plusButton, {
    rotation: 0,
    top: "55%",
    duration: 0.5,
    ease: "power3.inOut"
  });

  plusRotation.resume();

  // pill terug naar normale expanded state
  gsap.to(activePill, {
    flex: `0 0 ${getExpandedWidth()}px`,
    height: 400,
    duration: 0.6,
    ease: "power3.inOut"
  });
}

plusButton.addEventListener("click", () => {
  closeDetails();
});





function expandPill(active) {
  isAnimating = true;


  // 👇 FIX: eerste interactie → layout stabiliseren
  if (!hasInteracted) {
    marqueeTween.pause();
    gsap.set(bar, { x: gsap.getProperty(bar, "x") }); // force reflow
    hasInteracted = true;
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

    isAnimating = true;  // 👈 lock aan



  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;  // 👈 lock uit
      openShift = 0; // 👈 belangrijk: resetten

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

tl.to(bar, {
  x: `-=${openShift}`,
  duration: 0.6,
  ease: "power3.inOut",
  onComplete: () => {
    marqueeOffset -= openShift; // 👈 BELANGRIJK
  }
}, 0);

  // 👉 Daarna ALLE pills tegelijk resetten (met 0.15 overlap)
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

  tl.call(() => {
  gsap.to(marqueeTween, {
    timeScale: 1,
    duration: 0.4,
    ease: "power2.out"
  });
});


}

