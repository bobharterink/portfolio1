const bar = document.querySelector(".bar");
const target = document.querySelector(".bar-target");

const targetRect = target.getBoundingClientRect();

// ✅ Timeline
const tl = gsap.timeline({
  delay: 2
});

// 1️⃣ Move to target
tl.to(bar, {
  top: targetRect.top,
  left: targetRect.left,
  width: targetRect.width,
  height: targetRect.height,
  borderRadius: 30,
  duration: 1.2,
  ease: "power3.inOut"
});

// 2️⃣ Daarna kleur veranderen
tl.to(bar, {
  backgroundColor: "#FDFBFB", /* kies kleur */
  duration: 0.6,
  ease: "power2.out"
});

tl.from(".line span", 1.2, {
  y: 100,
  ease: "power4.out",
  skewY: 7,
  stagger: {
    amount: 0.3
  }
})

gsap.to(".plus-button", {
  rotation: 360,
  duration: 6,       // langzaam
  repeat: -1,        // oneindig
  ease: "linear"     // constant tempo
});

const blocks = document.querySelectorAll(".bar-inner");
let activeBlock = null;

blocks.forEach((block) => {
  block.addEventListener("click", () => {

    // ✅ ALS JEZELFDE BLOK → SLUIT
    if (activeBlock === block) {

      gsap.to(blocks, {
        flexGrow: 1,
        height: "50px",
        duration: 0.6,
        ease: "power3.inOut"
      });

      gsap.to(".info", {
        opacity: 0,
        y: 20,
        duration: 0.3
      });

      gsap.to(".pill-title", {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.3
      });

      blocks.forEach(b => b.classList.remove("open"));

      activeBlock = null;
      return;
    }

    // ✅ ANDERS: RESET ALLES EERST
    activeBlock = block;

    blocks.forEach(b => b.classList.remove("open"));

    gsap.to(blocks, {
      flexGrow: 1,
      height: "50px",
      duration: 0.6,
      ease: "power3.inOut"
    });

    gsap.to(".info", {
      opacity: 0,
      y: 20,
      duration: 0.3
    });

    // ✅ OPEN ACTIVE BLOCK
    block.classList.add("open");

    gsap.to(block, {
      flexGrow: 4,
      height: "420px",
      duration: 0.9,
      ease: "power4.inOut"
    });

    // ✅ TITLES ANIMATION
    blocks.forEach((b) => {
      const title = b.querySelector(".pill-title");
      if (!title) return;

      gsap.to(title, {
        scale: b === block ? 1 : 0.75,
        opacity: b === block ? 0 : 0.4,
        x: b === block ? -20 : 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    // ✅ INFO SHOW
    const info = block.querySelector(".info");

    gsap.to(info, {
      opacity: 1,
      y: 0,
      delay: 0.25,
      duration: 0.6,
      ease: "power3.out"
    });

  });
});

