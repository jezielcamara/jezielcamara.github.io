/* =========================================================
   SOLA CAFE / CASE STUDY PRESENTATION

   SELF-INITIATED HOSPITALITY CONCEPT

   RESPONSIBILITY:
   - Sola case-study narrative
   - Sola case Hero preview
   - Sola live website presentation
   - Sola-specific shared-dialog mode

   WEBSITE SOURCE:
   PortfolioProjects -> sola

   IMPORTANT:
   The website itself is NEVER recreated here.

   Both case surfaces request the registered canonical
   Sola website through PortfolioProjects.

   HERO PREVIEW:
   isolated / decorative iframe

   LIVE WEBSITE:
   isolated / interactive iframe
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "sola";


  const PREVIEW_WIDTH =
    1200;


  const PREVIEW_HEIGHT =
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


  let casePreviewHost =
    null;


  let casePreviewFrame =
    null;


  let caseLiveHost =
    null;


  let caseLiveFrame =
    null;


  let previewResizeObserver =
    null;


  let titleObserver =
    null;


  /* =======================================================
     CASE HERO PRESENTATION
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

              <span data-sola-case-index>
                CONCEPT / 02
              </span>

              <span data-sola-project-url>
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
     CASE STUDY NARRATIVE
  ======================================================= */

  function solaCaseStudyMarkup() {

    return `
      <div class="sola-case-study">


        <!-- ===============================================
             IDEA
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
              Build a café
              website that feels
              assembled, not laid out.
            </h3>

            <p>
              Sola is a fictional neighborhood café concept
              inspired by old restaurant websites, recipe
              books, printed menus, family-kitchen ephemera,
              faded photographs and the visual clutter of a
              desk where useful things have accumulated over
              time.
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
                Make the café memorable and easy to visit
              </strong>

            </div>


            <div>

              <span>
                ART DIRECTION
              </span>

              <strong>
                Antique tableau / collected ephemera
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
                Strategy / Design / Front-end
              </strong>

            </div>

          </div>

        </section>


        <!-- ===============================================
             VISUAL LANGUAGE
        ================================================ -->

        <section class="sola-case-references">

          <div class="sola-case-reference-heading">

            <span class="sola-case-label">
              02 / VISUAL LANGUAGE
            </span>

            <h3>
              A small world
              made from old
              material.
            </h3>

            <p>
              The reference direction is intentionally
              different from a contemporary hospitality
              template. Sola treats the screen like a
              physical surface covered with collected
              objects and printed material.
            </p>

          </div>


          <div class="sola-case-reference-grid">

            <article>

              <span>
                01
              </span>

              <strong>
                TABLEAU
              </strong>

              <p>
                The opening composition is centered like an
                antique illustration rather than divided into
                the standard copy-left, image-right business
                website pattern.
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
                Parchment surfaces, imperfect edges,
                ornamental rules and muted ink create the
                feeling of printed material that has been
                handled over time.
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
                Photographs behave like found prints.
                Notes, stamps and small ornamental marks
                occupy the screen as physical objects rather
                than interface decoration.
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
                Center the world,
                not a conversion funnel.
              </h4>

              <p>
                North Home uses the clarity of a conventional
                service-business Hero. Sola deliberately
                rejects that structure. Its identity,
                typography and collected objects form one
                central composition.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                02
              </span>

              <h4>
                Make photography
                feel found.
              </h4>

              <p>
                Images are smaller, faded, tilted and framed
                like prints on a desk. They support the brand
                world instead of becoming a full-width
                photographic Hero.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                03
              </span>

              <h4>
                Treat the menu
                like a ledger.
              </h4>

              <p>
                The interactive menu keeps useful category
                switching while the visual system behaves
                like one large printed page rather than a
                collection of modern UI cards.
              </p>

            </article>


            <article class="sola-case-decision">

              <span>
                04
              </span>

              <h4>
                Let mobile become
                a pocket scrapbook.
              </h4>

              <p>
                The same canonical website reorganizes its
                overlapping desktop compositions into a
                sequential collection of paper, photographs,
                menu entries and practical visit information.
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
              Faded paper.
              Dark ink.
              Small traces
              of color.
            </h3>

          </div>


          <div class="sola-case-palette">

            <div
              class="sola-case-swatch"
              style="--swatch:#E4CCA2"
            >

              <span>
                AGED PAPER
              </span>

              <strong>
                #E4CCA2
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#F3E7CC"
            >

              <span>
                WARM IVORY
              </span>

              <strong>
                #F3E7CC
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#38251A"
            >

              <span>
                DARK INK
              </span>

              <strong>
                #38251A
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#253427"
            >

              <span>
                DEEP GREEN
              </span>

              <strong>
                #253427
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#79463B"
            >

              <span>
                FADED RED
              </span>

              <strong>
                #79463B
              </strong>

            </div>


            <div
              class="sola-case-swatch"
              style="--swatch:#9B7A46"
            >

              <span>
                AGED BRASS
              </span>

              <strong>
                #9B7A46
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
              Traditional serif typography carries the main
              voice. Italics and small annotations provide
              the imperfect human layer, while a restrained
              sans-serif is reserved for functional labels.
            </p>

          </div>

        </section>


        <!-- ===============================================
             LIVE CANONICAL WEBSITE
        ================================================ -->

        <section class="sola-case-live">

          <div class="sola-case-live-heading">

            <div>

              <span class="sola-case-label">
                05 / LIVE FRONT-END
              </span>

              <h3>
                One café website.
                Running inside
                every surface.
              </h3>

            </div>

            <p>
              This interactive frame uses the exact canonical
              Sola project registered with PortfolioProjects.
              It is isolated from the portfolio dialog so its
              responsive layout is determined by the website
              viewport itself.
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

              <span data-sola-project-url>
                solacafe.example
              </span>

              <strong>
                INTERACTIVE CONCEPT
              </strong>

            </div>

            <div
              class="sola-case-live-project-host"
              data-sola-live-project-host
              aria-label="Interactive Sola Cafe website"
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
            Same developer.
            Completely different
            visual grammar.
          </h3>


          <div class="sola-case-outcome-grid">

            <article>

              <strong>
                ART DIRECTION
              </strong>

              <span>
                A specific historical reference language is
                translated into an original brand world
                rather than reduced to generic vintage colors.
              </span>

            </article>


            <article>

              <strong>
                RESPONSIVE DESIGN
              </strong>

              <span>
                Overlapping antique desktop compositions
                reorganize into readable sequential mobile
                layouts from the same canonical DOM.
              </span>

            </article>


            <article>

              <strong>
                FRONT-END
              </strong>

              <span>
                Menu interaction, navigation, responsive
                behavior and presentation all originate from
                one registered project implementation.
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
      typeof registry.mountFrame !==
        "function"
    ) {

      return null;

    }


    return registry;

  }


  /* =======================================================
     METADATA
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
     HERO PREVIEW FITTING

     The case Hero is deliberately a fixed desktop snapshot.

     It scales the 1200px canonical desktop frame into the
     available case-study presentation surface.
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
        PREVIEW_WIDTH
      );


    casePreviewFrame.style.position =
      "absolute";


    casePreviewFrame.style.top =
      "0";


    casePreviewFrame.style.left =
      "0";


    casePreviewFrame.style.width =
      `${PREVIEW_WIDTH}px`;


    casePreviewFrame.style.minWidth =
      `${PREVIEW_WIDTH}px`;


    casePreviewFrame.style.maxWidth =
      "none";


    casePreviewFrame.style.height =
      `${PREVIEW_HEIGHT}px`;


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
     PREVIEW RESIZE
  ======================================================= */

  function watchCasePreview() {

    previewResizeObserver?.disconnect();


    if (!casePreviewHost) {

      return;

    }


    if (
      "ResizeObserver" in window
    ) {

      previewResizeObserver =
        new ResizeObserver(
          () => {

            requestAnimationFrame(
              fitCasePreview
            );

          }
        );


      previewResizeObserver.observe(
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
     MOUNT CASE HERO

     Decorative isolated desktop viewport.
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
      "#f3e7cc";


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
            PREVIEW_WIDTH,

          height:
            PREVIEW_HEIGHT,

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
     LIVE WEBSITE

     IMPORTANT CHANGE:

     Previous implementation used registry.mount(), which
     placed Sola directly into the portfolio dialog DOM.

     The live case now uses an interactive SAME-SOURCE
     iframe instead.

     Benefits:
     - no portfolio CSS contamination
     - no dialog layout contamination
     - genuine project viewport
     - responsive container width
     - internal scrolling
     - same canonical website
     - same registered interactions
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


    caseLiveHost.style.position =
      "relative";


    caseLiveHost.style.width =
      "100%";


    caseLiveHost.style.minWidth =
      "0";


    caseLiveHost.style.overflow =
      "hidden";


    caseLiveHost.style.background =
      "#f3e7cc";


    caseLiveFrame =
      registry.mountFrame(
        PROJECT_KEY,
        caseLiveHost,
        {

          instance:
            "sola-case-study-live",

          viewport:
            "responsive",

          width:
            1200,

          height:
            820,

          interactive:
            true,

          label:
            `${project.name} interactive case-study website`

        }
      );


    caseLiveFrame.classList.add(
      "sola-case-live-frame"
    );


    /*
     * Override PortfolioProjects' initial fixed frame
     * dimensions.
     *
     * The iframe now occupies its actual case-study host.
     * Its internal layout viewport therefore follows the
     * rendered width of this browser surface.
     */

    caseLiveFrame.style.width =
      "100%";


    caseLiveFrame.style.minWidth =
      "0";


    caseLiveFrame.style.maxWidth =
      "100%";


    caseLiveFrame.style.height =
      "clamp(520px, 72vh, 820px)";


    caseLiveFrame.style.margin =
      "0";


    caseLiveFrame.style.transform =
      "none";


    caseLiveFrame.style.transformOrigin =
      "top left";


    caseLiveFrame.style.pointerEvents =
      "auto";


    caseLiveHost
      .dataset
      .canonicalLiveProject =
        "true";


    return true;

  }


  /* =======================================================
     MOUNT ALL CASE SURFACES
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
     ACTIVE PROJECT CHECK
  ======================================================= */

  function isSolaCase() {

    const caseTitle =
      caseDialog?.querySelector(
        "#case-title"
      );


    return (
      caseTitle?.textContent
        .trim() ===
      "Sola Cafe"
    );

  }


  /* =======================================================
     CASE MODE
  ======================================================= */

  function applySolaCaseMode() {

    if (!caseDialog) {

      return;

    }


    const active =
      isSolaCase();


    caseDialog.classList.toggle(
      "sola-active",
      active
    );


    if (!active) {

      return;

    }


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


    if (caseType) {

      caseType.textContent =
        "SELF-INITIATED / HOSPITALITY";

    }


    if (caseSummary) {

      caseSummary.textContent =
        "A fictional neighborhood café built as an antique tabletop composition of typography, collected photography, paper, menus and everyday ephemera.";

    }


    if (caseGoal) {

      caseGoal.textContent =
        "Create a memorable café identity while keeping menu, hours and visit information practical on every screen.";

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
      caseDialog.dataset
        .solaCaseModeBound ===
      "true"
    ) {

      return;

    }


    caseDialog.dataset
      .solaCaseModeBound =
        "true";


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


    /*
     * main.js controls project switching and updates the
     * generic case title.
     *
     * Watching that title makes Sola mode independent from
     * click timing and also catches Next Project changes.
     */

    const caseTitle =
      caseDialog.querySelector(
        "#case-title"
      );


    if (
      caseTitle &&
      "MutationObserver" in window
    ) {

      titleObserver?.disconnect();


      titleObserver =
        new MutationObserver(
          () => {

            requestAnimationFrame(
              applySolaCaseMode
            );

          }
        );


      titleObserver.observe(
        caseTitle,
        {
          childList:
            true,

          characterData:
            true,

          subtree:
            true
        }
      );

    }

  }


  /* =======================================================
     BUILD PRESENTATION
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


    /* -----------------------------------------------------
       HERO PREVIEW
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CASE BODY
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CACHE HOSTS
    ----------------------------------------------------- */

    casePreviewHost =
      caseDialog.querySelector(
        "[data-sola-case-preview-host]"
      );


    caseLiveHost =
      caseDialog.querySelector(
        "[data-sola-live-project-host]"
      );


    if (
      !casePreviewHost ||
      !caseLiveHost
    ) {

      return false;

    }


    return true;

  }


  /* =======================================================
     INITIALIZE
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
     PROJECT EVENTS
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
