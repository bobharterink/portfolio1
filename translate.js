// ============================================
// TRANSLATIONS
// ============================================

const translations = {
  nl: {
    // Hero
    "hero.title": "👋 Ik ben Bob Harterink",
    "hero.subtitle": "Front-End Developer with full-stack experience",

    // Buttons (gedeeld)
    "btn.meer": "Meer zien",
    "btn.site": "Site",
    "btn.bezoek": "Bezoek site",
    "btn.afspelen": "▶ Afspelen",
    "btn.opnieuw": "↻ Opnieuw afspelen",

    // Footer
    "footer.mail": "Mail",

    // ── STUDIO HARTERINK ──
    "studio.pill": "Studio Harterink",
    "studio.context.h3": "Context",
    "studio.context.p": "Studio Harterink is ontstaan vanuit een reeks modulaire vazen die ik zelf heb ontworpen en gemaakt. De vazen passen door de brievenbus en worden door de gebruiker zelf geassembleerd, zodat het voelt alsof je het object ook écht zelf hebt gemaakt. Diezelfde ervaring wilde ik vertalen naar een digitale omgeving.\n\nHet doel van de website was niet alleen het tonen van producten, maar het nabootsen van het fysieke assemblageproces in een interactieve webervaring.",
    "studio.concept.h3": "Concept & interactie",
    "studio.concept.p": "Tijdens het scrollen wordt de vaas digitaal opgebouwd vanuit een 3d omgeving. Elk onderdeel verschijnt door het scrollen hierdoor krijgt de gebruiker het gevoel alsof die het object zelf samen stelt. Scrollen wordt zo een essentieel onderdeel van de beleving, niet enkel een navigatie-actie. Wanneer je de andere versie's aanclickt gaat het scroll event verder met de nieuwe vaas. Je scrollt door het hele process.\nDe vaas heb ik ook uit andere materiaal gemaakt, en wordt gebruikt als lamp, Hiervoor heb ik een andere pagina aangemaakt, om meer het gevoel van luxe materiaal te voelen. Hier maak ik gebruik van veel dezelfde technieken.",
    "studio.tech.h3": "Technische uitwerking",
    "studio.tech.li1": "Opzetten van een custom scroll-gedreven interactie",
    "studio.tech.li2": "Integratie van 3D-objecten met Three.js",
    "studio.tech.li3": "Performance-bewuste rendering van 3D content in de browser",
    "studio.tech.li4": "Volledig custom frontend zonder frameworks",
    "studio.tech.li5": "Focus op responsive gedrag en vloeiende animaties",
    "studio.tech.li6": "Intergratie van Stripe op producten te verkopen",
    "studio.iter.h3": "Iteratie",
    "studio.iter.p": "lamp versie: meer detail, verfijnde animaties en extra objecten",
    "studio.why.h3": "Waarom dit project?",
    "studio.why.p": "Dit project laat zien hoe ik:",
    "studio.why.li1": "abstracte concepten vertaal naar concrete interacties",
    "studio.why.li2": "design en techniek combineer in één geheel",
    "studio.why.li3": "verder denk dan een standaard \"productpagina\"",
    "studio.overview.desc": "Studio Harterink is ontstaan vanuit een reeks modulaire vazen die ik zelf heb ontworpen en gemaakt. De vazen passen door de brievenbus en worden door de gebruiker zelf geassembleerd, zodat het voelt alsof je het object ook écht zelf hebt gemaakt. Diezelfde ervaring wilde ik vertalen naar een digitale omgeving.\n\nHet doel van de website was niet alleen het tonen van producten, maar het nabootsen van het fysieke assemblageproces in een interactieve webervaring.",

    // ── FIZZI ──
    "fizzi.context.h3": "Context",
    "fizzi.context.p": "fizzi is een professioneel opgebouwde website waarin ik onderzocht aan de hand van een tutorial hoe interactieve frontend samen met next.js, gsap en three/r3f kan samengaan met dynamische content vanuit een CMS.\nHet uitgangspunt was om een visueel rijke website te bouwen die niet hard-gecodeerd is, maar waarbij content eenvoudig aangepast kan worden door de gebruiker.",
    "fizzi.concept.h3": "Concept & interactie",
    "fizzi.concept.p": "Bij het laden van de website zakken de blikjes langzaam naar beneden en bewegen ze door de hele site. Met behulp van scrolleffecten worden de blikjes geleidelijk samengebracht, terwijl er informatie over de frisdrank wordt verteld. Daarnaast zorgen click-events ervoor dat de gebruiker interactie heeft met de 3D-modellen en het verschillende aanbod kan ontdekken.",
    "fizzi.tech.h3": "Technische uitwerking",
    "fizzi.tech.li1": "Opzet van een component-gedreven frontend in Next.js",
    "fizzi.tech.li2": "Koppeling met Prismic CMS voor dynamische content",
    "fizzi.tech.li3": "Gebruik van GSAP voor scroll- en micro-interacties",
    "fizzi.tech.li4": "Integratie van Three.js voor 3D-objecten binnen de layout",
    "fizzi.why.h3": "Waarom dit project?",
    "fizzi.why.p": "Dit project toont mijn manier van werken in een realistische frontend-omgeving:",
    "fizzi.why.li1": "werken met een moderne stack",
    "fizzi.why.li2": "rekening houden met schaalbaarheid en onderhoud",
    "fizzi.why.li3": "visuele interacties inzetten zonder het functionele aspect te verliezen",
    "fizzi.overview.desc": "fizzi is een professioneel opgebouwde website waarin ik onderzocht aan de hand van een tutorial hoe interactieve frontend samen met next.js, gsap en three/r3f kan samengaan met dynamische content vanuit een CMS.\nHet uitgangspunt was om een visueel rijke website te bouwen die niet hard-gecodeerd is, maar waarbij content eenvoudig aangepast kan worden door de gebruiker.",

    // ── FRIDGEPICK ──
    "fridge.context.h3": "Context",
    "fridge.context.p": "Fridgepick vertrekt vanuit een herkenbaar probleem: je hebt nog ingrediënten in huis, maar geen idee wat je ermee kunt koken. De webapp helpt gebruikers door ingrediënten die nog in de koelkast liggen te koppelen aan passende recepten. De focus lag op het ontwikkelen van een toegankelijke en gebruiksvriendelijke applicatie waarin inspiratie centraal staat.",
    "fridge.concept.h3": "Concept & interactie",
    "fridge.concept.p": "Op de website kun je in de header ingrediënten toevoegen. Op basis van deze ingrediënten krijg je vervolgens twee maaltijden te zien die je ermee kunt bereiden. Dit gebeurt via een API die de recepten genereert.\n\nAls vervolgfunctie zou de gebruiker kunnen inloggen om recepten op te slaan en een 'pro'-abonnement af te sluiten, waarmee meer gerechten beschikbaar komen. De rest van de website staat in het teken van voedselverspilling en laat zien hoe deze webapp helpt om verspilling tegen te gaan.",
    "fridge.tech.h3": "Technische uitwerking",
    "fridge.tech.li1": "Opzet van de frontend in Next.js",
    "fridge.tech.li2": "Gebruik van API routes voor communicatie tussen frontend en database",
    "fridge.tech.li3": "Focus op duidelijke UI-flows en snelle interactie",
    "fridge.tech.li4": "'Pro' modus voor meer gerechten",
    "fridge.why.h3": "Waarom dit project?",
    "fridge.why.p": "Fridgepick was mijn eerste project waarin ik bewust full-stack features combineerde met een sterke frontend focus. Het project markeert mijn overgang van puur frontend werk naar het begrijpen en bouwen van complete webapplicaties, zonder de gebruikservaring uit het oog te verliezen.",
    "fridge.overview.desc": "Fridgepick vertrekt vanuit een herkenbaar probleem: je hebt nog ingrediënten in huis, maar geen idee wat je ermee kunt koken. De webapp helpt gebruikers door ingrediënten die nog in de koelkast liggen te koppelen aan passende recepten. De focus lag op het ontwikkelen van een toegankelijke en gebruiksvriendelijke applicatie waarin inspiratie centraal staat.",

    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Context",
    "dirk.context.p": "Dirk Nielandt is een kinderboekenschrijver die zijn werk online zichtbaar wilde maken. Naast een overzicht van zijn boeken was er behoefte aan betere vindbaarheid, duidelijke informatie per boek en een laagdrempelig contactpunt.\nHet doel was een eenvoudige, onderhoudbare website die zelfstandig beheerd kan worden door de auteur.",
    "dirk.concept.h3": "Concept & interactie",
    "dirk.concept.p": "De website van Dirk Nielandt is vormgegeven in een stijl die past bij zijn werk als kinderboekenschrijver. De uitstraling sluit aan bij de doelgroep en de sfeer van zijn boeken. Voor de schrijver is het eenvoudig om boeken toe te voegen, te verwijderen of extra onder de aandacht te brengen, bijvoorbeeld wanneer een boek een prijs wint of net is uitgebracht.\n\nCraft CMS kan hij gemakkelijk tags toekennen om te bepalen waar een boek op de website wordt weergegeven en welke informatie daarbij hoort. De website is bewust eenvoudig gehouden, maar bevat subtiele, speelse effecten, zoals hover-animaties bij bekroonde boeken en een bewegend oog in het logo dat elke tien seconden tot leven komt.",
    "dirk.tech.h3": "Technische uitwerking",
    "dirk.tech.li1": "Opzet van een custom frontend in HTML, CSS en JavaScript",
    "dirk.tech.li2": "Implementatie van Craft CMS voor contentbeheer",
    "dirk.tech.li3": "Opzetten van gestructureerde contenttypes voor boeken",
    "dirk.tech.li4": "Mogelijkheid om per boek:",
    "dirk.tech.li4a": "leeftijdscategorie toe te kennen",
    "dirk.tech.li4b": "plaatsing op specifieke pagina's te bepalen",
    "dirk.tech.li4c": "een optionele \"sticker\" met eigen tekst toe te voegen",
    "dirk.tech.li5": "Focus op duidelijke contenthiërarchie en onderhoudbaarheid",
    "dirk.why.h3": "Waarom dit project?",
    "dirk.why.p": "Dit project laat zien hoe ik:",
    "dirk.why.li1": "abstracte concepten vertaal naar concrete interacties",
    "dirk.why.li2": "design en techniek combineer in één geheel",
    "dirk.why.li3": "verder denk dan een standaard \"productpagina\"",
    "dirk.overview.desc": "Dirk Nielandt is een kinderboekenschrijver die zijn werk online zichtbaar wilde maken. Naast een overzicht van zijn boeken was er behoefte aan betere vindbaarheid, duidelijke informatie per boek en een laagdrempelig contactpunt.\nHet doel was een eenvoudige, onderhoudbare website die zelfstandig beheerd kan worden door de auteur.",
  },

  en: {
    // Hero
    "hero.title": "👋 I'm Bob Harterink",
    "hero.subtitle": "Front-End Developer with full-stack experience",

    // Buttons
    "btn.meer": "See more",
    "btn.site": "Site",
    "btn.bezoek": "Visit site",
    "btn.afspelen": "▶ Play",
    "btn.opnieuw": "↻ Play again",

    // Footer
    "footer.mail": "Mail",

    // ── STUDIO HARTERINK ──
    "studio.pill": "Studio Harterink",
    "studio.context.h3": "Context",
    "studio.context.p": "Studio Harterink originated from a series of modular vases that I designed and made myself. The vases fit through a letterbox and are assembled by the user, so it feels as though you truly made the object yourself. I wanted to translate that same experience into a digital environment.\n\nThe goal of the website was not only to showcase products, but to replicate the physical assembly process as an interactive web experience.",
    "studio.concept.h3": "Concept & interaction",
    "studio.concept.p": "As you scroll, the vase is digitally assembled within a 3D environment. Each part appears through scrolling, giving the user the feeling of putting the object together themselves. Scrolling becomes an essential part of the experience, not just a navigation action. When you click another version, the scroll event continues with the new vase, you scroll through the entire process.\nI also made the vase from a different material, used as a lamp, for which I created a separate page to evoke a sense of luxury material. Many of the same techniques are used there.",
    "studio.tech.h3": "Technical implementation",
    "studio.tech.li1": "Setting up a custom scroll-driven interaction",
    "studio.tech.li2": "Integration of 3D objects with Three.js",
    "studio.tech.li3": "Performance-conscious rendering of 3D content in the browser",
    "studio.tech.li4": "Fully custom frontend without frameworks",
    "studio.tech.li5": "Focus on responsive behaviour and smooth animations",
    "studio.tech.li6": "Integration of Stripe to sell products",
    "studio.iter.h3": "Iteration",
    "studio.iter.p": "Lamp version: more detail, refined animations and additional objects",
    "studio.why.h3": "Why this project?",
    "studio.why.p": "This project shows how I:",
    "studio.why.li1": "translate abstract concepts into concrete interactions",
    "studio.why.li2": "combine design and technology into a single whole",
    "studio.why.li3": "think beyond a standard \"product page\"",
    "studio.overview.desc": "Studio Harterink originated from a series of modular vases that I designed and made myself. The vases fit through a letterbox and are assembled by the user, so it feels as though you truly made the object yourself. I wanted to translate that same experience into a digital environment.\n\nThe goal of the website was not only to showcase products, but to replicate the physical assembly process as an interactive web experience.",

    // ── FIZZI ──
    "fizzi.context.h3": "Context",
    "fizzi.context.p": "Fizzi is a professionally built website in which I explored — following a tutorial — how interactive frontend using Next.js, GSAP and Three.js/R3F can work together with dynamic content from a CMS.\nThe starting point was to build a visually rich website that is not hard-coded, but where content can easily be updated by the user.",
    "fizzi.concept.h3": "Concept & interaction",
    "fizzi.concept.p": "When the website loads, the cans slowly drop down and move throughout the site. Using scroll effects, the cans are gradually brought together while information about the drink is revealed. Click events also allow the user to interact with the 3D models and discover the different offerings.",
    "fizzi.tech.h3": "Technical implementation",
    "fizzi.tech.li1": "Component-driven frontend setup in Next.js",
    "fizzi.tech.li2": "Prismic CMS integration for dynamic content",
    "fizzi.tech.li3": "Use of GSAP for scroll and micro-interactions",
    "fizzi.tech.li4": "Integration of Three.js for 3D objects within the layout",
    "fizzi.why.h3": "Why this project?",
    "fizzi.why.p": "This project demonstrates my way of working in a realistic frontend environment:",
    "fizzi.why.li1": "working with a modern stack",
    "fizzi.why.li2": "considering scalability and maintainability",
    "fizzi.why.li3": "applying visual interactions without losing the functional aspect",
    "fizzi.overview.desc": "Fizzi is a professionally built website in which I explored how interactive frontend using Next.js, GSAP and Three.js/R3F can work together with dynamic content from a CMS.\nThe starting point was to build a visually rich website that is not hard-coded, but where content can easily be updated by the user.",

    // ── FRIDGEPICK ──
    "fridge.context.h3": "Context",
    "fridge.context.p": "FridgePick starts from a familiar problem: you have ingredients at home but no idea what to cook with them. The web app helps users by matching leftover fridge ingredients to suitable recipes. The focus was on developing an accessible and user-friendly application where inspiration takes centre stage.",
    "fridge.concept.h3": "Concept & interaction",
    "fridge.concept.p": "On the website you can add ingredients in the header. Based on those ingredients, two meals you can prepare with them are shown. This happens via an API that generates the recipes.\n\nAs a follow-up feature, users could log in to save recipes and subscribe to a 'pro' plan that unlocks more dishes. The rest of the website focuses on food waste and shows how this app helps reduce it.",
    "fridge.tech.h3": "Technical implementation",
    "fridge.tech.li1": "Frontend setup in Next.js",
    "fridge.tech.li2": "Use of API routes for communication between frontend and database",
    "fridge.tech.li3": "Focus on clear UI flows and fast interaction",
    "fridge.tech.li4": "'Pro' mode for more dishes",
    "fridge.why.h3": "Why this project?",
    "fridge.why.p": "FridgePick was my first project in which I consciously combined full-stack features with a strong frontend focus. The project marks my transition from purely frontend work to understanding and building complete web applications, without losing sight of the user experience.",
    "fridge.overview.desc": "FridgePick starts from a familiar problem: you have ingredients at home but no idea what to cook with them. The web app helps users by matching leftover fridge ingredients to suitable recipes. The focus was on developing an accessible and user-friendly application where inspiration takes centre stage.",

    // ── DIRK NIELANDT ──
    "dirk.context.h3": "Context",
    "dirk.context.p": "Dirk Nielandt is a children's book author who wanted to make his work visible online. Beyond an overview of his books, there was a need for better discoverability, clear information per book and an accessible point of contact.\nThe goal was a simple, maintainable website that the author could manage independently.",
    "dirk.concept.h3": "Concept & interaction",
    "dirk.concept.p": "The Dirk Nielandt website is styled to match his work as a children's book author. The look and feel connects to his target audience and the atmosphere of his books. It is easy for the author to add, remove or highlight books — for example when a book wins an award or has just been released.\n\nWith Craft CMS he can easily assign tags to control where a book appears on the website and what information is shown. The website is intentionally kept simple, but includes subtle, playful effects such as hover animations for award-winning books and an animated eye in the logo that comes to life every ten seconds.",
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
    "dirk.why.p": "This project shows how I:",
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

// Sluit dropdown bij klik buiten
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
// INIT — geselecteerde taal of NL als default
// ============================================

const savedLang = localStorage.getItem("lang") || "nl";
setLanguage(savedLang);

// 👈 Exporteer beide
export { translations };
export function getCurrentLang() {
  return localStorage.getItem("lang") || "nl";
}