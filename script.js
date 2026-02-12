let hasInteracted = false;
let marqueeOffset = 0;
let openShift = 0;
let activePill = null;
let isAnimating = false;   // 👈 NIEUW
const bar = document.querySelector(".bar");
bar.innerHTML += bar.innerHTML;

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




gsap.to(".plus-button", {
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
  
  pill.addEventListener("click", () => {

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
      tl.to(pill, {
        scale: 0.8,
        duration: 0.6,
        ease: "power3.inOut"
      }, 0);
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
}, "-=0.15");

  // 👉 Daarna ALLE pills tegelijk resetten (met 0.15 overlap)
  tl.to(pills, {
    flex: getResponsiveFlex(),
    height: "clamp(50px, 6vw, 60px)",
    scale: 1,
    borderRadius: 999,
    duration: 0.6,
    ease: "power3.inOut"
  }, "-=0.15");

  // 👉 Titel van actieve pill pas op het einde terug
  if (activePill) {
    const title = activePill.querySelector(".line");

    tl.to(title, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }


}
