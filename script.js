let activePill = null;
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

gsap.to(".plus-button", {
  rotation: -360,
  duration: 6,
  ease: "none",
  repeat: -1
});

let marqueeTween;

function initMarquee() {

  if (marqueeTween) {
    marqueeTween.kill();
    gsap.set(bar, { x: 0 });
  }

const totalWidth = bar.scrollWidth / 2;
const gap = 10;

marqueeTween = gsap.to(bar, {
  x: -(totalWidth+gap),
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
  pill.addEventListener("click", () => {

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

  pills.forEach(pill => {

    const info = pill.querySelector(".info");
    const title = pill.querySelector(".line");

    // Pill groeit
    if (pill === active) {
      gsap.to(pill, {
        flex: "0 0 800px",
        height: 400,
        borderRadius: 20,
        duration: 0.6,
        ease: "power3.inOut"
      });


      // Titel fade out
      gsap.to(title, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Info fade in
      if (info) {
gsap.to(info, {
  opacity: 1,
  pointerEvents: "auto",
  duration: 0.4,
  delay: 0.5
});
      }


    } else {
      gsap.to(pill, {
        scale: 0.8,
        duration: 0.6,
        ease: "power3.inOut"
      });
    }

  });

}

function resetPills() {

  const tl = gsap.timeline();

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
