// ============================================
// TRANSLATIONS
// ============================================

const translations = {
  nl: {
    // Hero
    "hero.title": "👋 Ik ben Bob Harterink",
    "hero.subtitle": "Front-End Developer with full-stack experience",

    // Buttons
    "btn.meer": "Meer zien",
    "btn.site": "Website bekijken",
    "btn.afspelen": "▶ Afspelen",
    "btn.opnieuw": "↻ Opnieuw afspelen",

    // ── STUDIO HARTERINK ──
    "studio.context.h3": "Eigen webshop",
    "studio.context.p": "Studio Harterink ontstond vanuit modulaire vazen die door de brievenbus passen en door de gebruiker zelf worden geassembleerd. Dat gevoel van eigenaarschap en maakproces is vertaald naar een interactieve website, waarin het fysieke assemblageproces digitaal wordt ervaren.",
    "studio.concept.h3": "Concept & interactie",
    "studio.concept.p": "Tijdens het scrollen wordt de vaas digitaal opgebouwd in een 3D-omgeving. Elk onderdeel verschijnt stap voor stap, waardoor de gebruiker het gevoel krijgt het object zelf samen te stellen. Scrollen wordt zo een essentieel onderdeel van de ervaring, in plaats van enkel navigatie. Bij het aanklikken van andere versies loopt het scroll-proces naadloos door met een nieuwe vaas. Daarnaast is er een aparte pagina voor varianten in luxere materialen, waaronder een lamp, waarin met dezelfde technieken een verfijndere sfeer wordt neergezet.",
    "studio.tech.h3": "Technische uitwerking",
    "studio.tech.li1": "Opzetten van een custom scroll-gedreven interactie",
    "studio.tech.li2": "Integratie van 3D-objecten met Three.js",
    "studio.tech.li3": "Performance-bewuste rendering van 3D content in de browser",
    "studio.tech.li4": "Volledig custom frontend zonder frameworks",
    "studio.tech.li5": "Focus op responsive gedrag en vloeiende animaties",
    "studio.tech.li6": "Intergratie van Stripe op producten te verkopen",
    "studio.iter.h3": "Iteratie",
    "studio.iter.p": "Met hetzelfde concept heb ik ook lampen ontworpen. Hiervoor heb ik een aparte website ontwikkeld:",
    "studio.iter.btn": "Iteratie Bezoeken",
    "studio.why.h3": "Waarom dit project?",
    "studio.why.li1": "Abstracte concepten vertaal naar concrete interacties",
    "studio.why.li2": "Design en techniek combineer in één geheel",
    "studio.why.li3": "Verder denk dan een standaard \"productpagina\"",
    "studio.overview.desc": "Studio Harterink is ontstaan vanuit een reeks modulaire vazen die ik zelf heb ontworpen en gemaakt. De vazen passen door de brievenbus en worden door de gebruiker zelf geassembleerd, zodat het voelt alsof je het object ook écht zelf hebt gemaakt. Diezelfde ervaring wilde ik vertalen naar een digitale omgeving.\n\nHet doel van de website was niet alleen het tonen van producten, maar het nabootsen van het fysieke assemblageproces in een interactieve webervaring.",

    // ── FIZZI ──
    "fizzi.context.h3": "Cursus",
    "fizzi.context.p": "Fizzi is een professioneel opgebouwde website, ontwikkeld aan de hand van een cursus, waarin ik onderzocht hoe interactieve front-end met Next.js, GSAP en Three/R3F kan samengaan met dynamische content uit een CMS. Het resultaat is een visueel rijke site met flexibel beheerbare content.",
    "fizzi.concept.h3": "Concept & interactie",
    "fizzi.concept.p": "Bij het laden van de website zakken de blikjes langzaam naar beneden en bewegen ze door de hele site. Met behulp van scrolleffecten worden de blikjes geleidelijk samengebracht, terwijl er informatie over de frisdrank wordt verteld. Daarnaast zorgen click-events ervoor dat de gebruiker interactie heeft met de 3D-modellen en het verschillende aanbod kan ontdekken.",
    "fizzi.tech.h3": "Technische uitwerking",
    "fizzi.tech.li1": "Opzet van een component-gedreven frontend in Next.js",
    "fizzi.tech.li2": "Koppeling met Prismic CMS voor dynamische content",
    "fizzi.tech.li3": "Gebruik van GSAP voor scroll- en micro-interacties",
    "fizzi.tech.li4": "Integratie van Three.js voor 3D-objecten binnen de layout",
    "fizzi.why.h3": "Waarom dit project?",
    "fizzi.why.li1": "Werken met een moderne stack",
    "fizzi.why.li2": "Rekening houden met schaalbaarheid en onderhoud",
    "fizzi.why.li3": "Visuele interacties inzetten zonder het functionele aspect te verliezen",
    "fizzi.overview.desc": "fizzi is een professioneel opgebouwde website waarin ik onderzocht aan de hand van een tutorial hoe interactieve frontend samen met next.js, gsap en three/r3f kan samengaan met dynamische content vanuit een CMS.\nHet uitgangspunt was om een visueel rijke website te bouwen die niet hard-gecodeerd is, maar waarbij content eenvoudig aangepast kan worden door de gebruiker.",

    // ── FRIDGEPICK ──
    "fridge.context.h3": "Eigen project",
    "fridge.context.p": "Fridgepick speelt in op een herkenbaar probleem: ingrediënten in huis, maar geen kookidee. De webapp koppelt wat er nog in de koelkast ligt aan passende recepten, met een sterke focus op gebruiksvriendelijkheid en inspiratie.",
    "fridge.concept.h3": "Concept & interactie",
    "fridge.concept.p": "Op de website voeg je ingrediënten toe via de header, waarna je direct maaltijden te zien krijgt die je ermee kunt bereiden. Recepten worden gegenereerd via een API. De webapp is opgezet met uitbreidingsmogelijkheden zoals het opslaan van recepten en een pro-abonnement. De rest van de website focust op het tegengaan van voedselverspilling en laat zien hoe Fridgepick daarbij helpt.",
    "fridge.tech.h3": "Technische uitwerking",
    "fridge.tech.li1": "Opzet van de frontend in Next.js",
    "fridge.tech.li2": "Gebruik van API routes voor communicatie tussen frontend en database",
    "fridge.tech.li3": "Focus op duidelijke UI-flows en snelle interactie",
    "fridge.tech.li4": "'Pro' modus voor meer gerechten",
    "fridge.why.h3": "Waarom dit project?",
    "fridge.why.p": "Fridgepick was mijn eerste project waarin ik bewust full-stack features combineerde met een sterke frontend focus. Het project markeert mijn overgang van puur frontend werk naar het begrijpen en bouwen van complete webapplicaties, zonder de gebruikservaring uit het oog te verliezen.",
    "fridge.overview.desc": "Fridgepick vertrekt vanuit een herkenbaar probleem: je hebt nog ingrediënten in huis, maar geen idee wat je ermee kunt koken. De webapp helpt gebruikers door ingrediënten die nog in de koelkast liggen te koppelen aan passende recepten. De focus lag op het ontwikkelen van een toegankelijke en gebruiksvriendelijke applicatie waarin inspiratie centraal staat.",

    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Betaalde opdracht",
    "dirk.context.p": "Dirk Nielandt is een kinderboekenschrijver die zijn werk online beter zichtbaar wilde maken. De website biedt een overzicht van zijn boeken, duidelijke informatie per titel en een laagdrempelig contactpunt, binnen een eenvoudig en zelfstandig te beheren platform.",
    "dirk.concept.h3": "Concept & interactie",
    "dirk.concept.p": "De website van Dirk Nielandt is vormgegeven in een stijl die aansluit bij zijn werk als kinderboekenschrijver en de belevingswereld van zijn doelgroep. Via Craft CMS kan hij eenvoudig boeken beheren, uitlichten en taggen, bijvoorbeeld bij een nieuwe release of prijs. De website is bewust overzichtelijk gehouden, met subtiele speelse details zoals hover-animaties bij bekroonde boeken en een logo-oog dat periodiek tot leven komt.",
    "dirk.tech.h3": "Technische uitwerking",
    "dirk.tech.li1": "Opzet van een custom frontend in HTML, CSS en JavaScript",
    "dirk.tech.li2": "Implementatie van Craft CMS voor contentbeheer",
    "dirk.tech.li3": "Opzetten van gestructureerde contenttypes voor boeken",
    "dirk.tech.li4": "Mogelijkheid om per boek:",
    "dirk.tech.li4a": "Leeftijdscategorie toe te kennen",
    "dirk.tech.li4b": "Plaatsing op specifieke pagina's te bepalen",
    "dirk.tech.li4c": "Een optionele \"sticker\" met eigen tekst toe te voegen",
    "dirk.tech.li5": "Focus op duidelijke contenthiërarchie en onderhoudbaarheid",
    "dirk.why.h3": "Waarom dit project?",
    "dirk.why.li1": "Abstracte concepten vertaal naar concrete interacties",
    "dirk.why.li2": "Design en techniek combineer in één geheel",
    "dirk.why.li3": "Verder denk dan een standaard \"productpagina\"",
    "dirk.overview.desc": "Dirk Nielandt is een kinderboekenschrijver die zijn werk online zichtbaar wilde maken. Naast een overzicht van zijn boeken was er behoefte aan betere vindbaarheid, duidelijke informatie per boek en een laagdrempelig contactpunt.\nHet doel was een eenvoudige, onderhoudbare website die zelfstandig beheerd kan worden door de auteur.",
  },

  en: {
    // Hero
    "hero.title": "👋 I'm Bob Harterink",
    "hero.subtitle": "Front-End Developer with full-stack experience",

    // Buttons
    "btn.meer": "See more",
    "btn.site": "Visit website",
    "btn.afspelen": "▶ Play",
    "btn.opnieuw": "↻ Play again",

    // ── STUDIO HARTERINK ──
    "studio.context.h3": "My online store",
    "studio.context.p": "Studio Harterink originated from a series of modular vases that fit through the mailbox and are assembled by the user. That sense of ownership and making is translated into an interactive website, where the physical assembly process is experienced digitally.",
    "studio.concept.h3": "Concept & interaction",
    "studio.concept.p": "As the user scrolls, the vase is digitally assembled within a 3D environment. Each component appears step by step, giving the user the feeling of assembling the object themselves. Scrolling becomes an essential part of the experience rather than just a navigation action. When selecting other versions, the scroll-driven process continues seamlessly with a new vase. In addition, a separate page presents variants in more luxurious materials, including a lamp, using the same techniques to create a more refined atmosphere.",
    "studio.tech.h3": "Technical implementation",
    "studio.tech.li1": "Setting up a custom scroll-driven interaction",
    "studio.tech.li2": "Integration of 3D objects with Three.js",
    "studio.tech.li3": "Performance-conscious rendering of 3D content in the browser",
    "studio.tech.li4": "Fully custom frontend without frameworks",
    "studio.tech.li5": "Focus on responsive behaviour and smooth animations",
    "studio.tech.li6": "Integration of Stripe to sell products",
    "studio.iter.h3": "Iteration",
    "studio.iter.p": "Using the same concept, I also designed lamps. For this, I developed a separate website:",
    "studio.iter.btn": "Visit Iteration",
    "studio.why.h3": "Why this project?",
    "studio.why.li1": "Translate abstract concepts into concrete interactions",
    "studio.why.li2": "Combine design and technology into a single whole",
    "studio.why.li3": "Think beyond a standard \"product page\"",
    "studio.overview.desc": "Studio Harterink originated from a series of modular vases that I designed and made myself. The vases fit through a letterbox and are assembled by the user, so it feels as though you truly made the object yourself. I wanted to translate that same experience into a digital environment.\n\nThe goal of the website was not only to showcase products, but to replicate the physical assembly process as an interactive web experience.",

    // ── FIZZI ──
    "fizzi.context.h3": "Course",
    "fizzi.context.p": "Fizzi is a professionally built website, developed as part of a course, in which I explored how interactive front-end development with Next.js, GSAP, and Three/R3F can integrate with dynamic content from a CMS. The result is a visually rich site with flexible, easily manageable content.",
    "fizzi.concept.h3": "Concept & interaction",
    "fizzi.concept.p": "When the website loads, the cans slowly drop down and move throughout the site. Using scroll effects, the cans are gradually brought together while information about the drink is revealed. Click events also allow the user to interact with the 3D models and discover the different offerings.",
    "fizzi.tech.h3": "Technical implementation",
    "fizzi.tech.li1": "Component-driven frontend setup in Next.js",
    "fizzi.tech.li2": "Prismic CMS integration for dynamic content",
    "fizzi.tech.li3": "Use of GSAP for scroll and micro-interactions",
    "fizzi.tech.li4": "Integration of Three.js for 3D objects within the layout",
    "fizzi.why.h3": "Why this project?",
    "fizzi.why.li1": "Working with a modern stack",
    "fizzi.why.li2": "Considering scalability and maintainability",
    "fizzi.why.li3": "Applying visual interactions without losing the functional aspect",
    "fizzi.overview.desc": "Fizzi is a professionally built website in which I explored how interactive frontend using Next.js, GSAP and Three.js/R3F can work together with dynamic content from a CMS.\nThe starting point was to build a visually rich website that is not hard-coded, but where content can easily be updated by the user.",

    // ── FRIDGEPICK ──
    "fridge.context.h3": "My project",
    "fridge.context.p": "Fridgepick addresses a familiar problem: having ingredients at home but no idea what to cook. The web app matches what's left in the fridge with suitable recipes, with a strong focus on usability and inspiration.",
    "fridge.concept.h3": "Concept & interaction",
    "fridge.concept.p": "On the website, users add ingredients via the header and immediately receive meals they can prepare with them. Recipes are generated through an API. The web app is designed with future features in mind, such as saving recipes and a pro subscription. The rest of the website focuses on reducing food waste and shows how Fridgepick helps prevent it.",
    "fridge.tech.h3": "Technical implementation",
    "fridge.tech.li1": "Frontend setup in Next.js",
    "fridge.tech.li2": "Use of API routes for communication between frontend and database",
    "fridge.tech.li3": "Focus on clear UI flows and fast interaction",
    "fridge.tech.li4": "'Pro' mode for more dishes",
    "fridge.why.h3": "Why this project?",
    "fridge.why.p": "FridgePick was my first project in which I consciously combined full-stack features with a strong frontend focus. The project marks my transition from purely frontend work to understanding and building complete web applications, without losing sight of the user experience.",
    "fridge.overview.desc": "FridgePick starts from a familiar problem: you have ingredients at home but no idea what to cook with them. The web app helps users by matching leftover fridge ingredients to suitable recipes. The focus was on developing an accessible and user-friendly application where inspiration takes centre stage.",

    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Paid assignment",
    "dirk.context.p": "Dirk Nielandt is a children's book author who wanted to make his work more visible online. The website provides an overview of his books, clear information per title, and an accessible point of contact, all within a simple, independently manageable platform.",
    "dirk.concept.h3": "Concept & interaction",
    "dirk.concept.p": "The website for Dirk Nielandt is designed in a style that reflects his work as a children's book author and the world of his audience. Using Craft CMS, he can easily manage, highlight, and tag books, for example for new releases or award winners. The site is intentionally kept simple, with subtle playful details such as hover animations on awarded books and an eye in the logo that comes to life periodically.",
    "dirk.tech.h3": "Technical implementation",
    "dirk.tech.li1": "Custom frontend setup in HTML, CSS and JavaScript",
    "dirk.tech.li2": "Craft CMS implementation for content management",
    "dirk.tech.li3": "Setting up structured content types for books",
    "dirk.tech.li4": "Ability to assign per book:",
    "dirk.tech.li4a": "age category",
    "dirk.tech.li4b": "placement on specific pages",
    "dirk.tech.li4c": "an optional \"sticker\" with custom text",
    "dirk.tech.li5": "Focus on clear content hierarchy and maintainability",
    "dirk.why.h3": "Why this project?",
    "dirk.why.li1": "translate abstract concepts into concrete interactions",
    "dirk.why.li2": "combine design and technology into a single whole",
    "dirk.why.li3": "think beyond a standard \"product page\"",
    "dirk.overview.desc": "Dirk Nielandt is a children's book author who wanted to make his work visible online. Beyond an overview of his books, there was a need for better discoverability, clear information per book and an accessible point of contact.\nThe goal was a simple, maintainable website that the author could manage independently.",
  }
};

// ============================================
// DROPDOWN TOGGLE
// ============================================

const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
  langDropdown.classList.remove("open");
});

langDropdown.querySelectorAll("button[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
    langDropdown.classList.remove("open");
  });
});

// ============================================
// TAAL TOEPASSEN
// ============================================

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = translations[lang]?.[key];
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  langToggle.textContent = lang.toUpperCase() + " ▾";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "nl" ? "nl-be" : "en";
}

// ============================================
// INIT
// ============================================

const savedLang = localStorage.getItem("lang") || "nl";
setLanguage(savedLang);

export { translations };
export function getCurrentLang() {
  return localStorage.getItem("lang") || "nl";
}