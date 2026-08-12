/* =========================================================
   SOLA CAFE / CASE STUDY PRESENTATION

   Self-initiated hospitality concept.

   RESPONSIBILITY:
   - build the Sola case-study narrative
   - build the Sola case-study browser shells
   - mount the registered canonical Sola project
     into those shells
   - manage Sola-specific case-dialog presentation

   NOT RESPONSIBLE FOR:
   - Sola website HTML
   - Sola website interactions
   - project registration
   - portfolio Hero previews
   - Selected Work previews
   - Responsive Lab previews
   - website viewer infrastructure

   WEBSITE SOURCE:
   PortfolioProjects -> "sola"

   CASE STUDY:
   Presentation only.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "sola";


  const CASE_DESIGN_WIDTH =
    1200;


  const CASE_DESIGN_HEIGHT =
    760;


  /* =======================================================
     STATE
  ======================================================= */

  let initialized =
    false;


  let caseDialog =
    null;


  let caseHeroMedia =
    null;


  let caseFooter =
    null;


  let caseStudy =
    null;


  let casePreviewHost =
    null;


  let casePreviewFrame =
    null;


  let caseLiveHost =
    null;


  let caseLiveSite =
    null;


  let caseResizeObserver =
    null;


  /* =======================================================
     CASE HERO PREVIEW

     The real Sola website is mounted into the empty host
     through PortfolioProjects.

     This file never recreates Sola website markup.
  ======================================================= */

  function solaCasePreviewMarkup() {

    return `
      <div class="sola-case-preview">

        <div class="sola-case-preview-paper">


          <div
            class="sola-case-preview-ornament"
            aria-hidden="true"
          >
            ❦
          </div>


          <div class="sola-case-preview-browser">


            <div class="sola-case-preview-top">

              <span
                data-sola-case-index
              >
                CONCEPT / 02
              </span>


              <span
                data-sola-project-url
              >
                solacafe.example
              </span>

            </div>


            <div
              class="sola-case-preview-host"
              data-sola-case-preview-host
              aria-label="Sola Cafe website preview"
            ></div>


          </div>


          <div
            class="sola-case-preview-note"
            aria-hidden="true"
          >
            some things<br>
            are worth keeping
          </div>


        </div>

      </div>
    `;

  }


  /* =======================================================
     CASE STUDY MARKUP

     This contains case-study narrative only.

     The canonical website itself is mounted through
     PortfolioProjects.
  ======================================================= */

  function solaCaseStudyMarkup() {

    return `
      <div class="sola-case-study">


        <!-- ===============================================
             BRIEF
        ================================================ -->

        <section class="sola-case-brief">


          <span class="sola-case-label">
            01 / THE IDEA
          </span>


          <div class="sola-case-brief-main">


            <span class="sola-case-kicker">
              SELF-INITIATED CONCEPT / HOSPITALITY
            </span>


            <h3>
              Make nostalgia
              feel useful,
              not decorative.
            </h3>


            <p>
              Sola is a fictional neighborhood café concept
              inspired by the visual memory of old recipe
              books, handwritten household notes, printed
              menus, familiar food, and slow mornings.
              The goal was not to reproduce an old website.
              It was to translate that tactile material into
              a contemporary responsive café experience.
            </p>


          </div>


          <div class="sola-case-facts">


            <div>

              <span>
                BUSINESS
              </span>

              <strong>
                Neighborhood café
              </strong>

            </div>


            <div>

              <span>
                AUDIENCE
              </span>

              <strong>
                Coffee, breakfast and café visitors
              </strong>

            </div>


            <div>

              <span>
                PRIMARY GOAL
              </span>

              <strong>
                Turn atmosphere into a reason to visit
              </strong>

            </div>


            <div>

              <span>
                POSITIONING
              </span>

              <strong>
                Familiar, tactile and contemporary
              </strong>

            </div>


            <div>

              <span>
                SCOPE
              </span>

              <strong>
                Menu / Notebook / Gallery / Visit
              </strong>

            </div>


            <div>

              <span>
                ROLE
              </span>

              <strong>
                Strategy / Art direction / Front-end
              </strong>

            </div>


          </div>


        </section>


        <!-- ===============================================
             VISUAL REFERENCES
        ================================================ -->

        <section class="sola-case-references">


          <div class="sola-case-reference-heading">

            <span class="sola-case-label">
              02 / VISUAL LANGUAGE
            </span>


            <h3>
              Old material.
              Modern structure.
            </h3>


            <p>
              The references pointed toward ornate restaurant
              framing, warm bakery editorial layouts, and
              scrapbook-like personal sites. Sola keeps those
              qualities while removing the dated interaction
              patterns that came with them.
            </p>

          </div>


          <div class="sola-case-reference-grid">


            <article>

              <span>
                01
              </span>

              <strong>
                ORNAMENT
              </strong>

              <p>
                Decorative borders, small flourishes and
                framed images bring the feeling of old menus
                and printed hospitality material.
              </p>

            </article>


            <article>

              <span>
                02
              </span>

              <strong>
                PAPER
              </strong>

              <p>
                Warm ivory, aged beige and faded ink replace
                polished white surfaces and create the sense
                of something handled rather than generated.
              </p>

            </article>


            <article>

              <span>
                03
              </span>

              <strong>
                EPHEMERA
              </strong>

              <p>
                Recipe cards, postmarks, handwritten notes
                and imperfect photo angles make the identity
                feel collected rather than templated.
              </p>

            </article>


          </div>


        </section>


        <!-- ===============================================
             DESIGN DECISIONS
        ================================================ -->

        <section class="sola-case-decisions">


          <span class="sola-case-label">
            03 / DESIGN DECISIONS
          </span>


          <div class="sola-case-decisions-list">


            <article class="sola-case-decision">

              <span>
                01
              </span>

              <h4>
                Atmosphere first.
                Information close behind.
              </h4>

              <p>
                The opening establishes mood immediately,
                but practical details such as the menu,
                opening hours and visit information never
                sit more than a short scroll or navigation
                jump away.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                02
              </span>

              <h4>
                Use heritage language
                without inventing heritage.
              </h4>

              <p>
                Sola borrows the visual language of recipe
                books and domestic memory without claiming
                a fake family history, founding date,
                inherited recipe, or real-world legacy.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                03
              </span>

              <h4>
                Let the menu
                behave like print.
              </h4>

              <p>
                The menu is structured through rules,
                typography and aligned prices rather than
                a grid of rounded food cards. Category
                switching keeps it useful without losing
                the printed-menu character.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                04
              </span>

              <h4>
                Let mobile become
                a pocket notebook.
              </h4>

              <p>
                The same website collapses into a simpler
                vertical composition on phones. The scrapbook
                becomes sequential, navigation simplifies,
                and practical café information becomes easier
                to scan on the move.
              </p>

            </article>


          </div>


        </section>


        <!-- ===============================================
             BRAND SYSTEM
        ================================================ -->

        <section class="sola-case-system">


          <div class="sola-case-system-heading">

            <span class="sola-case-label">
              04 / BRAND SYSTEM
            </span>


            <h3>
              A palette that
              feels found,
              not manufactured.
            </h3>

          </div>


          <div class="sola-case-palette">


            <div
              class="sola-case-swatch"
              style="--swatch:#E8D3AF"
            >

              <span>
                AGED PAPER
              </span>

              <strong>
                #E8D3AF
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#F4E9D3"
            >

              <span>
                WARM IVORY
              </span>

              <strong>
                #F4E9D3
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#352317"
            >

              <span>
                ESPRESSO
              </span>

              <strong>
                #352317
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#243D2B"
            >

              <span>
                DEEP FOREST
              </span>

              <strong>
                #243D2B
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#71382D"
            >

              <span>
                OXBLOOD
              </span>

              <strong>
                #71382D
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#A5824B"
            >

              <span>
                MUTED BRASS
              </span>

              <strong>
                #A5824B
              </strong>

            </div>


          </div>


          <div class="sola-case-type-sample">


            <span>
              TYPOGRAPHY
            </span>


            <strong>
              Some things
              are worth keeping.
            </strong>


            <p>
              Editorial serif display type carries the
              emotional voice. A restrained sans-serif
              handles information, while handwriting appears
              only as an annotation layer.
            </p>


          </div>


        </section>


        <!-- ===============================================
             LIVE WEBSITE
        ================================================ -->

        <section class="sola-case-live">


          <div class="sola-case-live-heading">


            <div>

              <span class="sola-case-label">
                05 / LIVE FRONT-END
              </span>


              <h3>
                The entire café
                website, not a mockup.
              </h3>

            </div>


            <p>
              This is the same canonical Sola website used
              in the portfolio Hero, Selected Work preview,
              responsive presentation and full website
              viewer. The case study does not contain a
              second Sola design.
            </p>


          </div>


          <div class="sola-case-browser">


            <div class="sola-case-browserbar">


              <div
                class="sola-case-browser-dots"
                aria-hidden="true"
              >
                <i></i>
                <i></i>
                <i></i>
              </div>


              <span
                data-sola-project-url
              >
                solacafe.example
              </span>


              <strong>
                LIVE CONCEPT
              </strong>


            </div>


            <div
              class="sola-case-live-project-host"
              data-sola-live-project-host
            ></div>


          </div>


        </section>


        <!-- ===============================================
             OUTCOME
        ================================================ -->

        <section class="sola-case-outcome">


          <span class="sola-case-label">
            06 / WHAT THIS PROJECT SHOWS
          </span>


          <h3>
            The same developer.
            A completely different
            design language.
          </h3>


          <div class="sola-case-outcome-grid">


            <article>

              <strong>
                ART DIRECTION
              </strong>

              <span>
                Historical visual references are translated
                into an original café identity rather than
                copied as a retro theme.
              </span>

            </article>


            <article>

              <strong>
                RESPONSIVE DESIGN
              </strong>

              <span>
                Dense editorial compositions reorganize into
                useful mobile sequences without requiring a
                second website implementation.
              </span>

            </article>


            <article>

              <strong>
                FRONT-END
              </strong>

              <span>
                Menu switching, internal navigation,
                responsive layouts and tactile interactions
                all come from one canonical project source.
              </span>

            </article>


          </div>


        </section>


      </div>
    `;

  }


  /* =======================================================
     REGISTRY
  ======================================================= */

  function getRegistry() {

    const registry =
      window.PortfolioProjects;


    if (
      !registry ||
      typeof registry.get !==
        "function" ||
      typeof registry.has !==
        "function" ||
      typeof registry.mount !==
        "function" ||
      typeof registry.mountFrame !==
        "function"
    ) {

      return null;

    }


    return registry;

  }


  /* =======================================================
     REGISTERED METADATA
  ======================================================= */

  function syncProjectMetadata(
    project
  ) {

    if (!project) {

      return;

    }


    document
      .querySelectorAll(
        "[data-sola-project-url]"
      )
      .forEach(
        (element) => {

          element.textContent =
            project.url;

        }
      );


    document
      .querySelectorAll(
        "[data-sola-case-index]"
      )
      .forEach(
        (element) => {

          element.textContent =
            `CONCEPT / ${project.index}`;

        }
      );

  }


  /* =======================================================
     CASE PREVIEW GEOMETRY
  ======================================================= */

  function fitCasePreview() {

    if (
      !casePreviewHost ||
      !casePreviewFrame
    ) {

      return;

    }


    const availableWidth =
      casePreviewHost.clientWidth;


    if (!availableWidth) {

      return;

    }


    const scale =
      Math.min(
        1,
        availableWidth /
        CASE_DESIGN_WIDTH
      );


    casePreviewFrame.style.position =
      "absolute";


    casePreviewFrame.style.top =
      "0";


    casePreviewFrame.style.left =
      "0";


    casePreviewFrame.style.width =
      `${CASE_DESIGN_WIDTH}px`;


    casePreviewFrame.style.minWidth =
      `${CASE_DESIGN_WIDTH}px`;


    casePreviewFrame.style.height =
      `${CASE_DESIGN_HEIGHT}px`;


    casePreviewFrame.style.maxWidth =
      "none";


    casePreviewFrame.style.margin =
      "0";


    casePreviewFrame.style.transformOrigin =
      "top left";


    casePreviewFrame.style.transform =
      `scale(${scale})`;


    casePreviewFrame.style.pointerEvents =
      "none";


    casePreviewHost.dataset.previewScale =
      scale.toFixed(
        4
      );

  }


  /* =======================================================
     CASE PREVIEW RESIZE
  ======================================================= */

  function watchCasePreview() {

    caseResizeObserver?.disconnect();


    if (!casePreviewHost) {

      return;

    }


    if (
      "ResizeObserver" in window
    ) {

      caseResizeObserver =
        new ResizeObserver(
          () => {

            requestAnimationFrame(
              fitCasePreview
            );

          }
        );


      caseResizeObserver.observe(
        casePreviewHost
      );


      return;

    }


    window.addEventListener(
      "resize",
      fitCasePreview,
      {
        passive:
          true
      }
    );

  }


  /* =======================================================
     MOUNT CASE HERO PREVIEW

     Decorative, isolated, view-only viewport.
  ======================================================= */

  function mountCasePreview(
    registry,
    project
  ) {

    if (
      !registry ||
      !project ||
      !casePreviewHost
    ) {

      return false;

    }


    if (
      casePreviewHost
        .dataset
        .canonicalCasePreview ===
      "true"
    ) {

      requestAnimationFrame(
        fitCasePreview
      );


      return true;

    }


    casePreviewHost.style.position =
      "relative";


    casePreviewHost.style.width =
      "100%";


    casePreviewHost.style.aspectRatio =
      "16 / 10";


    casePreviewHost.style.minWidth =
      "0";


    casePreviewHost.style.overflow =
      "hidden";


    casePreviewHost.style.background =
      "#f4e9d3";


    casePreviewFrame =
      registry.mountFrame(
        PROJECT_KEY,
        casePreviewHost,
        {

          instance:
            "sola-case-preview",

          viewport:
            "desktop",

          width:
            CASE_DESIGN_WIDTH,

          height:
            CASE_DESIGN_HEIGHT,

          interactive:
            false,

          label:
            `${project.name} case-study website preview`

        }
      );


    casePreviewFrame.classList.add(
      "sola-case-project-frame"
    );


    casePreviewHost
      .dataset
      .canonicalCasePreview =
        "true";


    requestAnimationFrame(
      () => {

        fitCasePreview();

        watchCasePreview();

      }
    );


    return true;

  }


  /* =======================================================
     MOUNT LIVE WEBSITE

     Interactive instance of the exact registered project.
  ======================================================= */

  function mountLiveCaseWebsite(
    registry,
    project
  ) {

    if (
      !registry ||
      !project ||
      !caseLiveHost
    ) {

      return false;

    }


    if (
      caseLiveHost
        .dataset
        .canonicalLiveProject ===
      "true"
    ) {

      return true;

    }


    caseLiveSite =
      registry.mount(
        PROJECT_KEY,
        caseLiveHost,
        {

          instance:
            "sola-case-study-live",

          viewport:
            "responsive",

          preserveIds:
            true,

          interactive:
            true,

          revealRoot:
            caseDialog

        }
      );


    caseLiveSite.classList.add(
      "sola-case-live-site"
    );


    caseLiveHost
      .dataset
      .canonicalLiveProject =
        "true";


    return true;

  }


  /* =======================================================
     MOUNT ALL SOLA CASE SURFACES
  ======================================================= */

  function mountSolaCaseSurfaces() {

    if (!initialized) {

      return false;

    }


    const registry =
      getRegistry();


    if (
      !registry ||
      !registry.has(
        PROJECT_KEY
      )
    ) {

      return false;

    }


    const project =
      registry.get(
        PROJECT_KEY
      );


    if (!project) {

      return false;

    }


    syncProjectMetadata(
      project
    );


    mountCasePreview(
      registry,
      project
    );


    mountLiveCaseWebsite(
      registry,
      project
    );


    document.documentElement
      .setAttribute(
        "data-sola-case-project",
        "mounted"
      );


    return true;

  }


  /* =======================================================
     SOLA CASE MODE

     main.js owns the generic dialog and project switching.

     This file only controls Sola-specific presentation.
  ======================================================= */

  function applySolaCaseMode() {

    if (!caseDialog) {

      return;

    }


    const caseTitle =
      caseDialog.querySelector(
        "#case-title"
      );


    const caseType =
      caseDialog.querySelector(
        "#case-type"
      );


    const caseSummary =
      caseDialog.querySelector(
        "#case-summary"
      );


    const caseGoal =
      caseDialog.querySelector(
        "#case-goal"
      );


    const casePages =
      caseDialog.querySelector(
        "#case-pages"
      );


    const isSola =
      caseTitle?.textContent
        .trim() ===
      "Sola Cafe";


    caseDialog.classList.toggle(
      "sola-active",
      isSola
    );


    if (!isSola) {

      return;

    }


    /*
     * This copy supersedes the older generic Sola
     * placeholder copy in main.js while preserving the
     * generic dialog system.
     */

    if (caseType) {

      caseType.textContent =
        "SELF-INITIATED / HOSPITALITY";

    }


    if (caseSummary) {

      caseSummary.textContent =
        "A contemporary Filipino café concept built from the visual language of recipe books, printed menus, collected photographs and slow domestic rituals.";

    }


    if (caseGoal) {

      caseGoal.textContent =
        "Create a café identity worth remembering while keeping menu, opening hours and visit information immediately useful.";

    }


    if (casePages) {

      casePages.textContent =
        "Menu / Notebook / Gallery / Visit";

    }


    mountSolaCaseSurfaces();


    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          fitCasePreview
        );

      }
    );

  }


  /* =======================================================
     CASE MODE EVENTS
  ======================================================= */

  function bindCaseMode() {

    if (!caseDialog) {

      return;

    }


    if (
      caseDialog.dataset.solaCaseModeBound ===
      "true"
    ) {

      return;

    }


    caseDialog.dataset.solaCaseModeBound =
      "true";


    /*
     * main.js receives the click first and populates the
     * generic dialog.

     * This listener then activates Sola presentation on the
     * following animation frame.
     */

    document
      .querySelectorAll(
        ".case-open"
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              requestAnimationFrame(
                applySolaCaseMode
              );

            }
          );

        }
      );


    const nextButton =
      caseDialog.querySelector(
        "#case-next"
      );


    nextButton?.addEventListener(
      "click",
      () => {

        requestAnimationFrame(
          applySolaCaseMode
        );

      }
    );


    caseDialog.addEventListener(
      "toggle",
      () => {

        if (
          !caseDialog.open
        ) {

          return;

        }


        requestAnimationFrame(
          applySolaCaseMode
        );

      }
    );


    caseDialog.addEventListener(
      "close",
      () => {

        caseDialog.classList.remove(
          "sola-active"
        );

      }
    );

  }


  /* =======================================================
     BUILD CASE PRESENTATION
  ======================================================= */

  function buildSolaCaseStudy() {

    caseDialog =
      document.querySelector(
        "#case-dialog"
      );


    caseHeroMedia =
      document.querySelector(
        "#case-hero-media"
      );


    caseFooter =
      document.querySelector(
        ".case-footer"
      );


    if (
      !caseDialog ||
      !caseHeroMedia ||
      !caseFooter
    ) {

      return false;

    }


    /* =====================================================
       HERO PRESENTATION
    ===================================================== */

    caseHeroMedia
      .querySelectorAll(
        ".sola-case-preview"
      )
      .forEach(
        (element) => {

          element.remove();

        }
      );


    caseHeroMedia.insertAdjacentHTML(
      "beforeend",
      solaCasePreviewMarkup()
    );


    /* =====================================================
       CASE STUDY BODY
    ===================================================== */

    caseDialog
      .querySelectorAll(
        ".sola-case-study"
      )
      .forEach(
        (element) => {

          element.remove();

        }
      );


    caseFooter.insertAdjacentHTML(
      "beforebegin",
      solaCaseStudyMarkup()
    );


    /* =====================================================
       CACHE TARGETS
    ===================================================== */

    caseStudy =
      caseDialog.querySelector(
        ".sola-case-study"
      );


    casePreviewHost =
      caseDialog.querySelector(
        "[data-sola-case-preview-host]"
      );


    caseLiveHost =
      caseDialog.querySelector(
        "[data-sola-live-project-host]"
      );


    if (
      !caseStudy ||
      !casePreviewHost ||
      !caseLiveHost
    ) {

      return false;

    }


    return true;

  }


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  function initSolaCaseStudy() {

    if (initialized) {

      return;

    }


    if (
      !buildSolaCaseStudy()
    ) {

      return;

    }


    initialized =
      true;


    bindCaseMode();


    /*
     * Mount immediately if Sola is already registered.

     * Otherwise the registration events below complete it.
     */

    mountSolaCaseSurfaces();


    document.dispatchEvent(
      new CustomEvent(
        "sola:case-study-ready",
        {
          detail: {
            key:
              PROJECT_KEY
          }
        }
      )
    );

  }


  /* =======================================================
     PROJECT READY
  ======================================================= */

  document.addEventListener(
    "sola:project-ready",
    () => {

      if (!initialized) {

        return;

      }


      mountSolaCaseSurfaces();

    }
  );


  document.addEventListener(
    "portfolio:project-registered",
    (event) => {

      if (
        event.detail?.key !==
          PROJECT_KEY ||
        !initialized
      ) {

        return;

      }


      mountSolaCaseSurfaces();

    }
  );


  /* =======================================================
     LOAD
  ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initSolaCaseStudy,
      {
        once:
          true
      }
    );

  } else {

    initSolaCaseStudy();

  }

})();
