// ============================================
// TRANSLATIONS
// ============================================

const translations = {
  nl: {
    // Hero
    "hero.eyebrow": "Front-End Developer",
    "hero.subtitle": "Three.js · GSAP · Next.js · R3F",
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
    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Webdesign & CMS",
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
    // ── BEESTENBOS TIP ──
    "beestenbos.context.h3": "PWA Kassatoepassing",
    "beestenbos.concept.h3": "Concept & functionaliteit",
    "beestenbos.concept.p": "Beestenbos Tip is een intern fooibeheersysteem, gebouwd in opdracht van een horecazaak. Medewerkers kunnen fooien invoeren per datum; deze worden automatisch verdeeld onder de aanwezige werknemers. Een adminpaneel geeft inzicht in de verdeling en stelt beheerders in staat medewerkers te beheren.",
    "beestenbos.tech.h3": "Technische uitwerking",
    "beestenbos.tech.li1": "Full-stack applicatie opgezet in Next.js 15 met App Router",
    "beestenbos.tech.li2": "MongoDB met Mongoose voor opslag van fooien en medewerkers",
    "beestenbos.tech.li3": "TypeScript door het hele project voor type-veiligheid",
    "beestenbos.tech.li4": "UI opgebouwd met Tailwind CSS en shadcn/ui componenten",
    "beestenbos.tech.li5": "Adminpaneel met authenticatie voor beheer van medewerkers",
    "beestenbos.tech.li6": "Server Actions voor directe communicatie met de database",
    "beestenbos.why.h3": "Waarom dit project?",
    "beestenbos.why.li1": "Een volledig productierijpe full-stack applicatie bouwen",
    "beestenbos.why.li2": "Werken met een echte opdrachtgever en concrete use case",
    "beestenbos.why.li3": "Database-design en serverlogica combineren met een strakke UI",
    // ── DOOR HET OOG VAN DE MAKER ──
    "picturemod.context.h3": "Masterproef",
    "picturemod.context.p": "Door het oog van de maker verbindt de digitale wereld met het tastbare. Bezoekers worden actieve deelnemers en ontdekken mijn fascinatie voor moiré-patronen door zelf een unieke postkaart te ontwerpen. Zo komen digitale structuren spelenderwijs tot leven in de fysieke wereld.",
    "picturemod.concept.h3": "Concept & interactie",
    "picturemod.concept.p": "Het project vertrekt vanuit mijn fascinatie voor moiré-patronen, die ik wil delen met de bezoeker. Via de website maken bezoekers een wazige foto met hun camera, waarop cirkels, vierkanten en lijnen reageren op lichte en donkere zones. Met sliders kan het ontwerp volledig worden aangepast: vorm, intensiteit en kleur. Bij het printen worden de kleurlagen opgesplitst en één voor één naar de AxiDraw gestuurd, waarna de bezoeker telkens de juiste kleur plaatst. Zo ontstaat een uniek, zelfgemaakt moiré-postkaartje.",
    "picturemod.tech.h3": "Technische uitwerking",
    "picturemod.tech.li1": "Web-based interface gebouwd met HTML, CSS en JavaScript",
    "picturemod.tech.li2": "Gebruik van de device camera om een wazige foto te maken",
    "picturemod.tech.li3": "Analyse van licht- en donkerwaarden in de afbeelding",
    "picturemod.tech.li4": "Realtime aanpasbaar ontwerp via sliders (vorm, intensiteit, dichtheid)",
    "picturemod.tech.li5": "Automatische opsplitsing van het ontwerp in kleur-lagen",
    "picturemod.tech.li6": "Elke kleurlaag wordt sequentieel naar de AxiDraw gestuurd",
    "picturemod.tech.li7": "Handmatige kleurwissel door de gebruiker tijdens het plotten",
    "picturemod.extra.h3": "Extra",
    "picturemod.extra.p": "Pssst! Shift+klik op de site om de Docs in het menu te zien!",
    "picturemod.extra.btn1": "Bekijk de Docs",
    "picturemod.extra.btn2": "Bekijk de media",
    "picturemod.why.h3": "Waarom dit project?",
    "picturemod.why.p": "Door het oog van de maker is een project waarin front- en back-end samenkomen, verschillende systemen met elkaar samenwerken en data en databases worden geïntegreerd binnen een interactief creatief proces.",
  },

  en: {
    // Hero
    "hero.eyebrow": "Front-End Developer",
    "hero.subtitle": "Three.js · GSAP · Next.js · R3F",
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
    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Webdesign & CMS",
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
    // ── BEESTENBOS TIP ──
    "beestenbos.context.h3": "PWA POS application",
    "beestenbos.concept.h3": "Concept & functionality",
    "beestenbos.concept.p": "Beestenbos Tip is an internal tip management system, built on commission for a hospitality venue. Staff can log tips per date; these are automatically distributed among the employees present. An admin panel provides insight into the distribution and allows managers to manage staff.",
    "beestenbos.tech.h3": "Technical implementation",
    "beestenbos.tech.li1": "Full-stack application built with Next.js 15 and App Router",
    "beestenbos.tech.li2": "MongoDB with Mongoose for storing tips and employees",
    "beestenbos.tech.li3": "TypeScript throughout the project for type safety",
    "beestenbos.tech.li4": "UI built with Tailwind CSS and shadcn/ui components",
    "beestenbos.tech.li5": "Admin panel with authentication for managing employees",
    "beestenbos.tech.li6": "Server Actions for direct database communication",
    "beestenbos.why.h3": "Why this project?",
    "beestenbos.why.li1": "Building a fully production-ready full-stack application",
    "beestenbos.why.li2": "Working with a real client and a concrete use case",
    "beestenbos.why.li3": "Combining database design and server logic with a clean UI",
    // ── DOOR HET OOG VAN DE MAKER ──
    "picturemod.context.h3": "Master’s thesis",
    "picturemod.context.p": "Through the Eye of the Maker connects the digital world with the tangible. Visitors become active participants, exploring my fascination with moiré patterns by designing their own unique postcard. In this way, digital structures playfully come to life in the physical world.",
    "picturemod.concept.h3": "Concept & interaction",
    "picturemod.concept.p": "The project originated from my interest in moiré patterns, a fascination I aim to share with the visitor. Through the website, visitors use their camera to capture a blurred image, to which circles, squares, and lines respond based on light and dark areas. Using sliders, the design can be fully customized in shape, intensity, and color. When print is pressed, the color layers are separated and sent one by one to the AxiDraw, resulting in a self-made moiré postcard.",
    "picturemod.tech.h3": "Technical implementation",
    "picturemod.tech.li1": "Web-based interface built with HTML, CSS, and JavaScript",
    "picturemod.tech.li2": "Use of the device camera to capture a blurred image",
    "picturemod.tech.li3": "Analysis of light and dark values within the image",
    "picturemod.tech.li4": "Real-time adjustable design via sliders (shape, intensity, density)",
    "picturemod.tech.li5": "Automatic separation of the design into color layers",
    "picturemod.tech.li6": "Each color layer is sent sequentially to the AxiDraw",
    "picturemod.tech.li7": "Manual color changes by the user during the plotting process",
    "picturemod.extra.h3": "Extra",
    "picturemod.extra.p": "Pssst! Click on Shift+click on the site to see the Docs in the menu!",
    "picturemod.extra.btn1": "View the Docs",
    "picturemod.extra.btn2": "View the Media",
    "picturemod.why.h3": "Why this project?",
    "picturemod.why.p": "Through the Eye of the Maker is a project in which front-end and back-end come together, multiple systems interact, and data and databases are integrated within an interactive creative process.",
  }
};

// ============================================
// TOGGLE
// ============================================

const langToggle = document.getElementById("langToggle");

langToggle.addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "nl";
  setLanguage(current === "nl" ? "en" : "nl");
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

  langToggle.textContent = lang.toUpperCase();
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