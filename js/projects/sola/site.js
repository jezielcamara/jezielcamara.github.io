/* =========================================================
   SOLA / CANONICAL WEBSITE MODULE

   A self-contained editorial cafe website. The portfolio
   mounts this same source in Hero, Work, Viewer, Lab, and
   the Sola case study.
========================================================= */

export const SOLA_CAFE_KEY = "sola";

const SITE_MARKUP = `
  <div class="sola-site" data-canonical-project="sola">
    <header class="sola-header">
      <a class="sola-wordmark" href="#sola-home" aria-label="Sola home">
        <span class="sola-wordmark-mark" aria-hidden="true">S</span>
        <span class="sola-wordmark-copy">
          <strong>SOLA</strong>
          <small>NEIGHBORHOOD CAFE</small>
        </span>
      </a>

      <p class="sola-header-edition">MAKATI / MMXXVI</p>

      <button
        class="sola-menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="sola-navigation"
        data-sola-menu-toggle
      >
        <span class="sola-menu-toggle-label">INDEX</span>
        <span class="sola-menu-toggle-lines" aria-hidden="true"><i></i><i></i></span>
      </button>

      <nav class="sola-navigation" id="sola-navigation" aria-label="Sola navigation" data-sola-navigation>
        <div class="sola-navigation-number">01—04</div>
        <a href="#sola-story"><span>01</span>Our story</a>
        <a href="#sola-menu"><span>02</span>Menu</a>
        <a href="#sola-notes"><span>03</span>Field notes</a>
        <a href="#sola-visit"><span>04</span>Visit</a>
        <p>COFFEE / FOOD / A ROOM TO STAY</p>
      </nav>
    </header>

    <main id="sola-home">
      <section class="sola-hero" aria-labelledby="sola-hero-title">
        <div class="sola-hero-copy" data-sola-reveal>
          <p class="sola-kicker">ROASTED DAILY / SERVED SLOWLY</p>
          <h1 id="sola-hero-title">
            <span>THE</span>
            <span>QUIET</span>
            <span>CUP</span>
          </h1>
          <div class="sola-hero-hours" aria-label="Open 7 AM to 6 PM">
            <span>0700</span><i></i><span>1800</span>
          </div>
        </div>

        <figure class="sola-hero-object" data-sola-reveal>
          <img
            src="images/sola/sola-engraved-pour-over.webp"
            alt="Engraved ceramic pour-over, coffee cup, and coffee branch"
          >
          <figcaption>PLATE NO. 02 / THE DAILY POUR</figcaption>
        </figure>

        <figure class="sola-hero-landscape" data-sola-reveal>
          <img
            src="images/sola/sola-engraved-landscape.webp"
            alt="Engraved coffee-growing landscape opening into a neighborhood cafe"
          >
          <figcaption>
            <span>FROM THE HILLS TO THE TABLE</span>
            <span>14.5547° N / 121.0244° E</span>
          </figcaption>
        </figure>
      </section>

      <section class="sola-intro" id="sola-story">
        <div class="sola-section-index" data-sola-reveal>
          <span>01</span>
          <span>OUR MEASURE OF A GOOD DAY</span>
        </div>
        <div class="sola-intro-copy" data-sola-reveal>
          <h2>A neighborhood room for the hours between.</h2>
          <p>
            Sola is a fictional cafe shaped around the familiar rituals of Metro Manila mornings:
            coffee poured by hand, warm bread passed across the table, and enough time to stay for one more cup.
          </p>
        </div>
      </section>

      <section class="sola-editorial-grid" aria-label="The Sola philosophy">
        <article class="sola-grid-card sola-grid-card--statement" data-sola-reveal>
          <p class="sola-card-label">HOUSE PRINCIPLE / I</p>
          <h3>Nothing hurried.<br>Nothing hidden.</h3>
          <p>Thoughtful sourcing, direct flavors, and hospitality that never needs to announce itself.</p>
        </article>

        <figure class="sola-grid-card sola-grid-card--art" data-sola-reveal>
          <img
            src="images/sola/sola-engraved-pour-over.webp"
            alt="Detail of an engraved coffee pour-over"
          >
          <figcaption>THE VESSEL / STUDY IN CLAY</figcaption>
        </figure>

        <article class="sola-grid-card sola-grid-card--dark" data-sola-reveal>
          <p class="sola-card-label">HOUSE PRINCIPLE / II</p>
          <blockquote>“Good coffee should leave room for conversation.”</blockquote>
          <span>— SOLA NOTEBOOK, ENTRY 07</span>
        </article>

        <article class="sola-grid-card sola-grid-card--origin" data-sola-reveal>
          <p class="sola-card-label">THE NAME</p>
          <h3>Sola</h3>
          <p>
            Drawn from the feeling of sun finding a quiet table. A small name for warmth,
            clarity, and the everyday comfort of being welcomed back.
          </p>
        </article>

        <figure class="sola-grid-card sola-grid-card--landscape" data-sola-reveal>
          <img
            src="images/sola/sola-engraved-landscape.webp"
            alt="Detail of an engraved Philippine coffee landscape"
          >
          <figcaption>THE LONG WAY HOME / ORIGIN STUDY</figcaption>
        </figure>
      </section>

      <section class="sola-menu" id="sola-menu">
        <header class="sola-menu-heading" data-sola-reveal>
          <div class="sola-section-index">
            <span>02</span>
            <span>THE DAY'S OFFERING</span>
          </div>
          <h2>Menu,<br>by the hour.</h2>
          <p>A compact fictional menu built around morning appetite, familiar ingredients, and the ritual of a second cup.</p>
        </header>

        <div class="sola-menu-book" data-sola-reveal>
          <div class="sola-menu-tabs" role="tablist" aria-label="Sola menu categories">
            <button type="button" role="tab" aria-selected="true" data-sola-menu="coffee">Coffee</button>
            <button type="button" role="tab" aria-selected="false" data-sola-menu="kitchen">Kitchen</button>
            <button type="button" role="tab" aria-selected="false" data-sola-menu="bakes">Bakes</button>
          </div>

          <div class="sola-menu-panel" role="tabpanel" data-sola-panel="coffee">
            <div class="sola-menu-row"><div><strong>House Pour</strong><small>single origin / daily roast</small></div><span>150</span></div>
            <div class="sola-menu-row"><div><strong>Salted Muscovado Latte</strong><small>espresso / fresh milk / muscovado</small></div><span>190</span></div>
            <div class="sola-menu-row"><div><strong>Long Black</strong><small>double espresso / hot water</small></div><span>145</span></div>
            <div class="sola-menu-row"><div><strong>Cacao Cloud</strong><small>local tablea / espresso / cream</small></div><span>205</span></div>
          </div>

          <div class="sola-menu-panel" role="tabpanel" data-sola-panel="kitchen" hidden>
            <div class="sola-menu-row"><div><strong>Soft Egg &amp; Rice</strong><small>garlic rice / soy egg / herbs</small></div><span>260</span></div>
            <div class="sola-menu-row"><div><strong>Kesong Puti Toast</strong><small>sourdough / tomato / basil</small></div><span>245</span></div>
            <div class="sola-menu-row"><div><strong>Longganisa Plate</strong><small>house sausage / atchara / egg</small></div><span>295</span></div>
            <div class="sola-menu-row"><div><strong>Market Greens</strong><small>seasonal leaves / calamansi dressing</small></div><span>225</span></div>
          </div>

          <div class="sola-menu-panel" role="tabpanel" data-sola-panel="bakes" hidden>
            <div class="sola-menu-row"><div><strong>Pandesal &amp; Butter</strong><small>warm roll / cultured butter</small></div><span>120</span></div>
            <div class="sola-menu-row"><div><strong>Guava Danish</strong><small>laminated pastry / guava jam</small></div><span>165</span></div>
            <div class="sola-menu-row"><div><strong>Banana Cacao Loaf</strong><small>dark cacao / sea salt</small></div><span>155</span></div>
            <div class="sola-menu-row"><div><strong>Day's Cake</strong><small>ask what came out of the oven</small></div><span>180</span></div>
          </div>
        </div>
      </section>

      <section class="sola-notes" id="sola-notes">
        <header class="sola-notes-heading" data-sola-reveal>
          <div class="sola-section-index">
            <span>03</span>
            <span>FIELD NOTES</span>
          </div>
          <h2>Small observations,<br>kept close.</h2>
        </header>

        <div class="sola-note-list">
          <article data-sola-reveal>
            <span>01 / BEANS</span>
            <h3>Why we let the pour take its time</h3>
            <p>A short note on bloom, temperature, and the value of waiting thirty more seconds.</p>
            <time datetime="2026-07-18">18.07.26</time>
          </article>
          <article data-sola-reveal>
            <span>02 / TABLE</span>
            <h3>The corner seat at eight in the morning</h3>
            <p>Before the city gets loud, light moves slowly across the room and everyone speaks a little softer.</p>
            <time datetime="2026-06-02">02.06.26</time>
          </article>
          <article data-sola-reveal>
            <span>03 / KITCHEN</span>
            <h3>On warm bread and familiar things</h3>
            <p>Our fictional kitchen starts with recipes that feel remembered, then edits only what it needs.</p>
            <time datetime="2026-05-12">12.05.26</time>
          </article>
        </div>
      </section>

      <section class="sola-visit" id="sola-visit">
        <div class="sola-visit-art" data-sola-reveal>
          <img
            src="images/sola/sola-engraved-landscape.webp"
            alt="Engraved Sola cafe and surrounding coffee landscape"
          >
        </div>
        <div class="sola-visit-copy" data-sola-reveal>
          <div class="sola-section-index">
            <span>04</span>
            <span>COME BY</span>
          </div>
          <h2>Find a table<br>in the sun.</h2>
          <div class="sola-visit-details">
            <p><strong>ADDRESS</strong><span>Legazpi Village<br>Makati, Metro Manila</span></p>
            <p><strong>HOURS</strong><span>Mon—Fri / 7—6<br>Sat—Sun / 8—7</span></p>
            <p><strong>CONTACT</strong><span>hello@sola.cafe<br>+63 2 8000 2026</span></p>
          </div>
          <a class="sola-direction-link" href="#sola-menu">
            <span>VIEW THE MENU</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="sola-footer">
      <a href="#sola-home" aria-label="Back to top">SOLA</a>
      <p>COFFEE / FOOD / A ROOM TO STAY</p>
      <p>SELF-INITIATED HOSPITALITY CONCEPT / 2026</p>
    </footer>
  </div>
`;

export function createSolaSite() {
  const template = document.createElement("template");
  template.innerHTML = SITE_MARKUP.trim();

  const site = template.content.firstElementChild;

  if (!site || site.nodeType !== 1) {
    throw new Error("Sola website factory could not create the site.");
  }

  return site;
}

export function initializeSolaSite(root, options = {}) {
  if (!root || root.nodeType !== 1) {
    return null;
  }

  if (root.dataset.solaInitialized === "true") {
    return root;
  }

  root.dataset.solaInitialized = "true";

  const doc = root.ownerDocument || document;
  const win = doc.defaultView || window;
  const reducedMotion = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
  const cleanups = [];
  let revealObserver = null;
  let cleaned = false;

  function on(target, type, listener, eventOptions) {
    if (!target?.addEventListener) {
      return;
    }

    target.addEventListener(type, listener, eventOptions);
    cleanups.push(() => target.removeEventListener(type, listener, eventOptions));
  }

  const menuToggle = root.querySelector("[data-sola-menu-toggle]");
  const navigation = root.querySelector("[data-sola-navigation]");

  function setNavigation(open) {
    root.classList.toggle("sola-navigation-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    navigation?.setAttribute("aria-hidden", String(!open));
  }

  if (menuToggle && navigation) {
    navigation.setAttribute("aria-hidden", "true");
    on(menuToggle, "click", () => setNavigation(!root.classList.contains("sola-navigation-open")));
    on(doc, "keydown", (event) => {
      if (event.key === "Escape") {
        setNavigation(false);
      }
    });
  }

  root.querySelectorAll('a[href^="#sola-"]').forEach((link) => {
    on(link, "click", (event) => {
      const selector = link.getAttribute("href");
      const target = selector ? root.querySelector(selector) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      setNavigation(false);
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const menuTabs = Array.from(root.querySelectorAll("[data-sola-menu]"));
  const menuPanels = Array.from(root.querySelectorAll("[data-sola-panel]"));

  function selectMenu(key) {
    menuTabs.forEach((tab) => {
      const active = tab.dataset.solaMenu === key;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    menuPanels.forEach((panel) => {
      const active = panel.dataset.solaPanel === key;
      panel.hidden = !active;
      panel.classList.toggle("sola-menu-panel--active", active);
    });
  }

  menuTabs.forEach((tab, index) => {
    on(tab, "click", () => selectMenu(tab.dataset.solaMenu));
    on(tab, "keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + menuTabs.length) % menuTabs.length;
      menuTabs[next].focus();
      selectMenu(menuTabs[next].dataset.solaMenu);
    });
  });

  if (menuTabs.length) {
    selectMenu(menuTabs[0].dataset.solaMenu);
  }

  const revealItems = Array.from(root.querySelectorAll("[data-sola-reveal]"));

  if (reducedMotion || typeof win.IntersectionObserver !== "function") {
    revealItems.forEach((item) => item.classList.add("sola-revealed"));
  } else {
    revealObserver = new win.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("sola-revealed");
        revealObserver?.unobserve(entry.target);
      });
    }, { root: options.revealRoot || null, rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (options.signal?.addEventListener) {
    if (options.signal.aborted) {
      cleanup();
      return cleanup;
    }

    on(options.signal, "abort", cleanup, { once: true });
  }

  function cleanup() {
    if (cleaned) {
      return;
    }

    cleaned = true;
    revealObserver?.disconnect();
    revealObserver = null;

    while (cleanups.length) {
      try {
        cleanups.pop()();
      } catch (error) {
        console.warn("[Sola] Cleanup failed.", error);
      }
    }

    root.classList.remove("sola-navigation-open");
    delete root.dataset.solaInitialized;
  }

  return cleanup;
}
