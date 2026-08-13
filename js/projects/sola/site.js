/* =========================================================
   SOLA / CANONICAL WEBSITE MODULE

   SELF-INITIATED HOSPITALITY CONCEPT

   NEW MODULAR ARCHITECTURE

   ONE PROJECT.
   ONE WEBSITE SOURCE.

   RESPONSIBILITY
   - Sola canonical website DOM
   - Sola website interactions
   - Sola responsive content structure
   - Sola website lifecycle

   NOT RESPONSIBLE FOR
   - portfolio Hero placement
   - Selected Work placement
   - Responsive Lab placement
   - project iframe creation
   - viewer chrome
   - case-study presentation
   - project registration

   ARCHITECTURAL CHANGES
   - native ES module exports
   - no window.SolaCafeSite global
   - no factory-ready CustomEvent
   - no registration polling
   - explicit cleanup lifecycle
========================================================= */


/* =========================================================
   PROJECT IDENTITY
========================================================= */

export const SOLA_CAFE_KEY =
  "sola";


/* =========================================================
   CANONICAL WEBSITE MARKUP
========================================================= */

const SITE_MARKUP = `
  <div
    class="sola-site"
    data-canonical-project="sola"
  >


    <!-- =================================================
         TOP NOTICE
    ================================================== -->

    <div class="sola-notice">

      <span>
        SELF-INITIATED CAFÉ CONCEPT
      </span>

      <span>
        MAKATI / METRO MANILA
      </span>

      <span>
        COFFEE · FOOD · SLOW MORNINGS
      </span>

    </div>


    <!-- =================================================
         HEADER
    ================================================== -->

    <header class="sola-header">


      <a
        class="sola-brand"
        href="#sola-home"
        aria-label="Sola home"
      >

        <span class="sola-brand-mark">
          S
        </span>


        <span class="sola-brand-name">
          SOLA
        </span>


        <small>
          café & kitchen
        </small>

      </a>


      <nav
        class="sola-nav"
        aria-label="Sola navigation"
      >

        <a href="#sola-menu">
          Menu
        </a>

        <a href="#sola-notebook">
          Notebook
        </a>

        <a href="#sola-gallery">
          Gallery
        </a>

        <a href="#sola-visit">
          Visit
        </a>

      </nav>


      <a
        class="sola-header-note"
        href="#sola-menu"
      >

        <span>
          TODAY
        </span>

        <strong>
          7 — 8
        </strong>

      </a>


    </header>


    <!-- =================================================
         MAIN
    ================================================== -->

    <main>


      <!-- =================================================
           HERO
      ================================================== -->

      <section
        class="sola-hero"
        id="sola-home"
        data-sola-reveal
      >


        <div class="sola-hero-copy">


          <p class="sola-overline">
            COFFEE / FOOD / PLACE
          </p>


          <h1>

            <span>
              Some things
            </span>

            <em>
              are worth
            </em>

            <span>
              keeping.
            </span>

          </h1>


          <p class="sola-hero-intro">
            A neighborhood café concept inspired
            by handwritten recipes, familiar food,
            old table linens, and the way coffee
            anchors a morning.
          </p>


          <div class="sola-hero-actions">

            <a
              class="sola-primary-link"
              href="#sola-menu"
            >
              See today's menu

              <span>
                →
              </span>
            </a>


            <a
              class="sola-text-link"
              href="#sola-visit"
            >
              Plan a visit
            </a>

          </div>


        </div>


        <!-- HERO ART -->

        <div class="sola-hero-art">


          <div
            class="sola-ornament sola-ornament-top"
            aria-hidden="true"
          >
            ❧
          </div>


          <figure class="sola-hero-frame">


            <span
              class="sola-frame-corner sola-frame-corner-tl"
              aria-hidden="true"
            ></span>

            <span
              class="sola-frame-corner sola-frame-corner-tr"
              aria-hidden="true"
            ></span>

            <span
              class="sola-frame-corner sola-frame-corner-bl"
              aria-hidden="true"
            ></span>

            <span
              class="sola-frame-corner sola-frame-corner-br"
              aria-hidden="true"
            ></span>


            <img
              src="https://images.pexels.com/photos/28708577/pexels-photo-28708577.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Coffee, journal, and baked goods arranged on a cafe table"
            >


            <figcaption>

              <span>
                MORNING TABLE / 01
              </span>

              <strong>
                Stay a little longer.
              </strong>

            </figcaption>


          </figure>


          <div class="sola-hero-stamp">

            <span>
              SOLA
            </span>

            <small>
              DAILY
            </small>

            <strong>
              7—8
            </strong>

          </div>


          <p class="sola-hand-note">
            coffee first,<br>
            everything else after
          </p>


        </div>


        <!-- HERO FOOT -->

        <div class="sola-hero-foot">

          <span>
            EST. IN A SKETCHBOOK
          </span>

          <span aria-hidden="true">
            ✦
          </span>

          <span>
            A FICTIONAL HOSPITALITY PROJECT
          </span>

        </div>


      </section>


      <!-- =================================================
           FROM THE TABLE
      ================================================== -->

      <section
        class="sola-table"
        data-sola-reveal
      >


        <div class="sola-section-index">

          <span>
            01
          </span>

          <strong>
            FROM THE TABLE
          </strong>

        </div>


        <div class="sola-table-copy">

          <p class="sola-drop-copy">

            <span>
              A
            </span>

            café does not need a complicated
            story to feel familiar. Sometimes it
            is warm bread, strong coffee, something
            sweet, and enough time to sit down.

          </p>

        </div>


        <div class="sola-table-circles">


          <figure class="sola-circle-card sola-circle-one">

            <img
              src="https://images.pexels.com/photos/6896282/pexels-photo-6896282.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fresh pandesal with ube filling"
              loading="lazy"
            >

            <figcaption>
              PANDESAL / BAKED DAILY
            </figcaption>

          </figure>


          <figure class="sola-circle-card sola-circle-two">

            <img
              src="https://images.pexels.com/photos/26647839/pexels-photo-26647839.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Cup of coffee in a warm neutral setting"
              loading="lazy"
            >

            <figcaption>
              COFFEE / BEFORE ANYTHING
            </figcaption>

          </figure>


          <div class="sola-table-note">

            <span>
              A small rule
            </span>

            <strong>
              Simple things
              still deserve
              attention.
            </strong>

            <i aria-hidden="true">
              ❦
            </i>

          </div>


        </div>


      </section>


      <!-- =================================================
           MENU
      ================================================== -->

      <section
        class="sola-menu"
        id="sola-menu"
        data-sola-reveal
      >


        <header class="sola-menu-heading">


          <div>

            <span class="sola-section-number">
              02
            </span>

            <span>
              THE MENU
            </span>

          </div>


          <h2>
            What we would
            put on the table.
          </h2>


          <p>
            A fictional menu for the Sola concept:
            familiar café staples alongside Filipino
            breakfast and bakery references.
          </p>


        </header>


        <!-- MENU TABS -->

        <div
          class="sola-menu-tabs"
          role="tablist"
          aria-label="Sola menu categories"
        >


          <button
            type="button"
            class="sola-menu-tab active"
            role="tab"
            aria-selected="true"
            data-sola-menu="coffee"
          >
            Coffee
          </button>


          <button
            type="button"
            class="sola-menu-tab"
            role="tab"
            aria-selected="false"
            data-sola-menu="breakfast"
          >
            Breakfast
          </button>


          <button
            type="button"
            class="sola-menu-tab"
            role="tab"
            aria-selected="false"
            data-sola-menu="sweets"
          >
            Sweets
          </button>


        </div>


        <!-- COFFEE -->

        <div
          class="sola-menu-panel active"
          data-sola-panel="coffee"
        >


          <div class="sola-menu-list">


            <article>

              <span>
                01
              </span>

              <div>

                <h3>
                  Sola House Coffee
                </h3>

                <p>
                  Balanced / chocolate / warm spice
                </p>

              </div>

              <strong>
                ₱150
              </strong>

            </article>


            <article>

              <span>
                02
              </span>

              <div>

                <h3>
                  Kapeng Barako
                </h3>

                <p>
                  Strong / aromatic / straightforward
                </p>

              </div>

              <strong>
                ₱145
              </strong>

            </article>


            <article>

              <span>
                03
              </span>

              <div>

                <h3>
                  Café con Leche
                </h3>

                <p>
                  Espresso / steamed milk
                </p>

              </div>

              <strong>
                ₱175
              </strong>

            </article>


            <article>

              <span>
                04
              </span>

              <div>

                <h3>
                  Iced Tablea Mocha
                </h3>

                <p>
                  Espresso / tablea / milk
                </p>

              </div>

              <strong>
                ₱195
              </strong>

            </article>


          </div>


          <aside class="sola-menu-aside">

            <span>
              HOUSE NOTE
            </span>

            <p>
              Start strong.
              Add milk only
              if you want it.
            </p>

            <small>
              written in the margin
            </small>

          </aside>


        </div>


        <!-- BREAKFAST -->

        <div
          class="sola-menu-panel"
          data-sola-panel="breakfast"
          hidden
        >


          <div class="sola-menu-list">


            <article>

              <span>
                01
              </span>

              <div>

                <h3>
                  Pandesal + Butter
                </h3>

                <p>
                  Warm bread / cultured butter
                </p>

              </div>

              <strong>
                ₱150
              </strong>

            </article>


            <article>

              <span>
                02
              </span>

              <div>

                <h3>
                  Longganisa Toast
                </h3>

                <p>
                  Garlic toast / egg / pickled papaya
                </p>

              </div>

              <strong>
                ₱285
              </strong>

            </article>


            <article>

              <span>
                03
              </span>

              <div>

                <h3>
                  Champorado Bowl
                </h3>

                <p>
                  Tablea / rice / milk / toasted cacao
                </p>

              </div>

              <strong>
                ₱240
              </strong>

            </article>


            <article>

              <span>
                04
              </span>

              <div>

                <h3>
                  Kesong Puti Tartine
                </h3>

                <p>
                  Country bread / tomato / local cheese
                </p>

              </div>

              <strong>
                ₱260
              </strong>

            </article>


          </div>


          <aside class="sola-menu-aside">

            <span>
              MORNING RULE
            </span>

            <p>
              Bread should
              arrive warm.
            </p>

            <small>
              preferably with coffee
            </small>

          </aside>


        </div>


        <!-- SWEETS -->

        <div
          class="sola-menu-panel"
          data-sola-panel="sweets"
          hidden
        >


          <div class="sola-menu-list">


            <article>

              <span>
                01
              </span>

              <div>

                <h3>
                  Ube Pandesal
                </h3>

                <p>
                  Soft bread / ube filling
                </p>

              </div>

              <strong>
                ₱120
              </strong>

            </article>


            <article>

              <span>
                02
              </span>

              <div>

                <h3>
                  Tablea Cake
                </h3>

                <p>
                  Dark cacao / muscovado
                </p>

              </div>

              <strong>
                ₱190
              </strong>

            </article>


            <article>

              <span>
                03
              </span>

              <div>

                <h3>
                  Ensaymada
                </h3>

                <p>
                  Butter / sugar / cheese
                </p>

              </div>

              <strong>
                ₱165
              </strong>

            </article>


            <article>

              <span>
                04
              </span>

              <div>

                <h3>
                  Bibingka Butter Cake
                </h3>

                <p>
                  Coconut / salted egg / butter
                </p>

              </div>

              <strong>
                ₱175
              </strong>

            </article>


          </div>


          <aside class="sola-menu-aside">

            <span>
              AFTER
            </span>

            <p>
              Save room.
            </p>

            <small>
              someone always orders cake
            </small>

          </aside>


        </div>


      </section>


      <!-- =================================================
           NOTEBOOK
      ================================================== -->

      <section
        class="sola-notebook"
        id="sola-notebook"
        data-sola-reveal
      >


        <header class="sola-notebook-heading">

          <span>
            03 / FROM THE NOTEBOOK
          </span>

          <h2>
            Things that
            belong in
            the margins.
          </h2>

        </header>


        <div class="sola-scrapbook">


          <figure class="sola-paper-photo sola-paper-photo-recipe">

            <img
              src="https://images.pexels.com/photos/29666875/pexels-photo-29666875.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Bread, coffee, and recipe book on a kitchen table"
              loading="lazy"
            >

            <figcaption>
              flour / coffee / notes
            </figcaption>

          </figure>


          <article class="sola-recipe-card">

            <span class="sola-card-label">
              NOTE / 04
            </span>

            <h3>
              For a slow morning
            </h3>


            <ol>

              <li>
                Put the coffee on.
              </li>

              <li>
                Warm the bread.
              </li>

              <li>
                Sit down before checking anything.
              </li>

              <li>
                Stay for another cup.
              </li>

            </ol>


            <p>
              This is not a real inherited recipe.
              It is a piece of the fictional Sola
              brand world.
            </p>


          </article>


          <figure class="sola-paper-photo sola-paper-photo-interior">

            <img
              src="https://images.pexels.com/photos/14827000/pexels-photo-14827000.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Warm cafe interior with seating and framed wall art"
              loading="lazy"
            >

            <figcaption>
              corner table / afternoon
            </figcaption>

          </figure>


          <blockquote class="sola-written-note">

            <span aria-hidden="true">
              “
            </span>

            Some things
            are worth
            keeping.

            <small>
              — Sola
            </small>

          </blockquote>


          <div
            class="sola-postmark"
            aria-hidden="true"
          >

            <span>
              MANILA
            </span>

            <strong>
              SOLA
            </strong>

            <span>
              MORNING
            </span>

          </div>


        </div>


      </section>


      <!-- =================================================
           GALLERY
      ================================================== -->

      <section
        class="sola-gallery"
        id="sola-gallery"
        data-sola-reveal
      >


        <header class="sola-gallery-heading">

          <div>

            <span>
              04 / SMALL MOMENTS
            </span>

            <h2>
              A café in
              four frames.
            </h2>

          </div>


          <p>
            The visual language treats photography
            like collected prints rather than a
            polished social-media grid.
          </p>

        </header>


        <div class="sola-contact-sheet">


          <figure class="sola-gallery-card sola-gallery-card-large">

            <img
              src="https://images.pexels.com/photos/34304021/pexels-photo-34304021.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Barista preparing coffee"
              loading="lazy"
            >

            <figcaption>

              <span>
                FRAME 01
              </span>

              <strong>
                FIRST POUR
              </strong>

            </figcaption>

          </figure>


          <figure class="sola-gallery-card">

            <img
              src="https://images.pexels.com/photos/28708578/pexels-photo-28708578.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Cafe table with journal and baked goods"
              loading="lazy"
            >

            <figcaption>

              <span>
                FRAME 02
              </span>

              <strong>
                TABLE FOR ONE
              </strong>

            </figcaption>

          </figure>


          <figure class="sola-gallery-card">

            <img
              src="https://images.pexels.com/photos/6896282/pexels-photo-6896282.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Pandesal on a plate"
              loading="lazy"
            >

            <figcaption>

              <span>
                FRAME 03
              </span>

              <strong>
                BAKED THIS MORNING
              </strong>

            </figcaption>

          </figure>


          <figure class="sola-gallery-card sola-gallery-card-wide">

            <img
              src="https://images.pexels.com/photos/24554396/pexels-photo-24554396.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Cafe tables and chairs beneath an outdoor canopy"
              loading="lazy"
            >

            <figcaption>

              <span>
                FRAME 04
              </span>

              <strong>
                OUTSIDE / LATE AFTERNOON
              </strong>

            </figcaption>

          </figure>


        </div>


      </section>


      <!-- =================================================
           VISIT
      ================================================== -->

      <section
        class="sola-visit"
        id="sola-visit"
        data-sola-reveal
      >


        <div class="sola-visit-art">


          <div class="sola-visit-frame">

            <img
              src="https://images.pexels.com/photos/24554396/pexels-photo-24554396.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Outdoor cafe seating"
              loading="lazy"
            >

          </div>


          <span class="sola-visit-caption">
            CONCEPT LOCATION / METRO MANILA
          </span>


        </div>


        <div class="sola-visit-copy">


          <span class="sola-section-number">
            05 / VISIT
          </span>


          <h2>
            Come by.<br>
            Stay awhile.
          </h2>


          <div class="sola-visit-details">


            <div>

              <span>
                LOCATION
              </span>

              <strong>
                Makati<br>
                Metro Manila
              </strong>

              <small>
                concept location
              </small>

            </div>


            <div>

              <span>
                MON — FRI
              </span>

              <strong>
                7:00 — 20:00
              </strong>

              <small>
                concept hours
              </small>

            </div>


            <div>

              <span>
                SAT — SUN
              </span>

              <strong>
                8:00 — 20:00
              </strong>

              <small>
                concept hours
              </small>

            </div>


          </div>


          <a
            class="sola-primary-link"
            href="#sola-home"
          >
            Back to the beginning

            <span>
              ↑
            </span>
          </a>


        </div>


      </section>


    </main>


    <!-- =================================================
         FOOTER
    ================================================== -->

    <footer class="sola-footer">


      <div class="sola-footer-name">
        SOLA
      </div>


      <div class="sola-footer-meta">

        <span>
          COFFEE / FOOD / PLACE
        </span>

        <span>
          SOME THINGS ARE WORTH KEEPING.
        </span>

        <span>
          SELF-INITIATED CONCEPT PROJECT
        </span>

      </div>


    </footer>


  </div>
`;


/* =========================================================
   CREATE FRESH WEBSITE
========================================================= */

export function createSolaSite() {

  const template =
    document.createElement(
      "template"
    );


  template.innerHTML =
    SITE_MARKUP.trim();


  const site =
    template.content
      .firstElementChild;


  if (
    !site ||
    site.nodeType !==
      1
  ) {

    throw new Error(
      "Sola website factory could not create the site."
    );

  }


  return site;

}


/* =========================================================
   INITIALIZE WEBSITE

   Interactive behavior is activated only for interactive
   ProjectFrame instances.

   Returning cleanup() gives the frame engine ownership of
   listeners, observers and temporary interaction state.
========================================================= */

export function initializeSolaSite(
  root,
  options = {}
) {

  if (
    !root ||
    root.nodeType !==
      1
  ) {

    return null;

  }


  if (
    root.dataset.solaInitialized ===
      "true"
  ) {

    return root;

  }


  root.dataset.solaInitialized =
    "true";


  const doc =
    root.ownerDocument ||
    document;


  const windowObject =
    doc.defaultView ||
    window;


  const prefersReducedMotion =
    windowObject.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches ||
    false;


  const cleanups =
    [];


  let revealObserver =
    null;


  let cleaned =
    false;


  /* =======================================================
     EVENT LIFECYCLE
  ======================================================= */

  function on(
    target,
    type,
    listener,
    eventOptions
  ) {

    if (
      !target ||
      typeof target.addEventListener !==
        "function"
    ) {

      return;

    }


    target.addEventListener(
      type,
      listener,
      eventOptions
    );


    cleanups.push(
      () => {

        target.removeEventListener(
          type,
          listener,
          eventOptions
        );

      }
    );

  }


  function cleanup() {

    if (cleaned) {

      return;

    }


    cleaned =
      true;


    revealObserver?.disconnect();


    revealObserver =
      null;


    while (
      cleanups.length
    ) {

      const dispose =
        cleanups.pop();


      try {

        dispose();

      } catch (error) {

        console.warn(
          "[Sola] Cleanup failed.",
          error
        );

      }

    }


    root
      .querySelectorAll(
        ".sola-gallery-card"
      )
      .forEach(
        (card) => {

          card.style.removeProperty(
            "--sola-photo-x"
          );


          card.style.removeProperty(
            "--sola-photo-y"
          );

        }
      );


    const heroFrame =
      root.querySelector(
        ".sola-hero-frame"
      );


    if (heroFrame) {

      heroFrame.style.transform =
        "";

    }


    delete root.dataset
      .solaInitialized;

  }


  /* =======================================================
     FRAME ABORT SIGNAL
  ======================================================= */

  const signal =
    options.signal;


  if (
    signal &&
    typeof signal.addEventListener ===
      "function"
  ) {

    if (
      signal.aborted
    ) {

      cleanup();


      return cleanup;

    }


    on(
      signal,
      "abort",
      cleanup,
      {
        once:
          true
      }
    );

  }


  /* =======================================================
     INTERNAL NAVIGATION
  ======================================================= */

  root
    .querySelectorAll(
      'a[href^="#sola-"]'
    )
    .forEach(
      (link) => {

        on(
          link,
          "click",
          (event) => {

            const selector =
              link.getAttribute(
                "href"
              );


            if (!selector) {

              return;

            }


            let target =
              null;


            try {

              target =
                root.querySelector(
                  selector
                );

            } catch (error) {

              target =
                null;

            }


            if (!target) {

              return;

            }


            event.preventDefault();


            target.scrollIntoView(
              {
                behavior:
                  prefersReducedMotion
                    ? "auto"
                    : "smooth",

                block:
                  "start"
              }
            );

          }
        );

      }
    );


  /* =======================================================
     MENU SWITCHER
  ======================================================= */

  const menuTabs =
    Array.from(
      root.querySelectorAll(
        "[data-sola-menu]"
      )
    );


  const menuPanels =
    Array.from(
      root.querySelectorAll(
        "[data-sola-panel]"
      )
    );


  function selectMenu(
    key,
    animate = true
  ) {

    if (!key) {

      return;

    }


    menuTabs.forEach(
      (tab) => {

        const active =
          tab.dataset.solaMenu ===
          key;


        tab.classList.toggle(
          "active",
          active
        );


        tab.setAttribute(
          "aria-selected",
          String(
            active
          )
        );

      }
    );


    menuPanels.forEach(
      (panel) => {

        const active =
          panel.dataset.solaPanel ===
          key;


        panel.hidden =
          !active;


        panel.classList.toggle(
          "active",
          active
        );


        if (
          active &&
          animate &&
          !prefersReducedMotion &&
          typeof panel.animate ===
            "function"
        ) {

          panel.animate(
            [
              {
                opacity:
                  0,

                transform:
                  "translateY(12px)"
              },

              {
                opacity:
                  1,

                transform:
                  "translateY(0)"
              }
            ],
            {
              duration:
                420,

              easing:
                "cubic-bezier(.2,.75,.25,1)"
            }
          );

        }

      }
    );

  }


  menuTabs.forEach(
    (tab) => {

      on(
        tab,
        "click",
        () => {

          selectMenu(
            tab.dataset.solaMenu
          );

        }
      );

    }
  );


  selectMenu(
    "coffee",
    false
  );


  /* =======================================================
     POINTER CAPABILITY
  ======================================================= */

  const hasFinePointer =
    windowObject.matchMedia?.(
      "(pointer: fine)"
    ).matches ||
    false;


  /* =======================================================
     GALLERY PHOTO RESPONSE
  ======================================================= */

  const galleryCards =
    root.querySelectorAll(
      ".sola-gallery-card"
    );


  if (
    hasFinePointer &&
    !prefersReducedMotion
  ) {

    galleryCards.forEach(
      (card) => {

        on(
          card,
          "pointermove",
          (event) => {

            const rect =
              card.getBoundingClientRect();


            if (
              !rect.width ||
              !rect.height
            ) {

              return;

            }


            const x =
              (
                event.clientX -
                rect.left
              ) /
              rect.width -
              .5;


            const y =
              (
                event.clientY -
                rect.top
              ) /
              rect.height -
              .5;


            card.style.setProperty(
              "--sola-photo-x",
              `${x * 5}px`
            );


            card.style.setProperty(
              "--sola-photo-y",
              `${y * 5}px`
            );

          }
        );


        on(
          card,
          "pointerleave",
          () => {

            card.style.setProperty(
              "--sola-photo-x",
              "0px"
            );


            card.style.setProperty(
              "--sola-photo-y",
              "0px"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     REVEALS
  ======================================================= */

  const revealItems =
    root.querySelectorAll(
      "[data-sola-reveal]"
    );


  const suppliedRevealRoot =
    options.revealRoot &&
    options.revealRoot.nodeType ===
      1
      ? options.revealRoot
      : null;


  if (
    "IntersectionObserver" in
      windowObject &&
    !prefersReducedMotion
  ) {

    revealObserver =
      new windowObject.IntersectionObserver(
        (
          entries,
          instance
        ) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "sola-visible"
              );


              instance.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            .06,

          root:
            suppliedRevealRoot,

          rootMargin:
            "0px 0px -5% 0px"
        }
      );


    revealItems.forEach(
      (item) => {

        revealObserver.observe(
          item
        );

      }
    );

  } else {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "sola-visible"
        );

      }
    );

  }


  /* =======================================================
     HERO FRAME RESPONSE
  ======================================================= */

  const heroFrame =
    root.querySelector(
      ".sola-hero-frame"
    );


  if (
    heroFrame &&
    hasFinePointer &&
    !prefersReducedMotion
  ) {

    on(
      heroFrame,
      "pointermove",
      (event) => {

        const rect =
          heroFrame
            .getBoundingClientRect();


        if (
          !rect.width ||
          !rect.height
        ) {

          return;

        }


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          .5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          .5;


        heroFrame.style.transform =
          `
            rotate(${x * .8}deg)
            translate(
              ${x * 3}px,
              ${y * 3}px
            )
          `;

      }
    );


    on(
      heroFrame,
      "pointerleave",
      () => {

        heroFrame.style.transform =
          "";

      }
    );

  }


  return cleanup;

}
