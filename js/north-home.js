/* =========================================================
   NORTH HOME / CASE STUDY PRESENTATION

   Self-initiated residential-services concept.

   RESPONSIBILITY:
   - build the North Home case-study narrative
   - build the North Home case-study browser shells
   - mount the registered canonical North Home project
     into those shells
   - manage North-specific case-dialog presentation

   NOT RESPONSIBLE FOR:
   - North Home website HTML
   - North Home website interactions
   - project registration
   - portfolio Hero previews
   - Selected Work previews
   - Responsive Lab previews
   - website viewer infrastructure

   WEBSITE SOURCE:
   PortfolioProjects -> "north"

   CASE STUDY:
   Presentation only.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "north";


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
     CASE HERO PREVIEW SHELL

     The actual website is mounted later through
     PortfolioProjects.

     No project-specific website HTML exists here.
  ======================================================= */

  function northCasePreviewMarkup() {

    return `
      <div class="north-case-preview">

        <div class="north-case-preview-browser">

          <div class="north-case-preview-top">

            <span
              data-north-case-index
            >
              CONCEPT / 01
            </span>

            <span
              data-north-project-url
            >
              northhome.example
            </span>

          </div>


          <div
            class="north-case-canonical-host"
            data-north-case-preview-host
            aria-label="North Home website preview"
          ></div>

        </div>

      </div>
    `;

  }


  /* =======================================================
     CASE STUDY MARKUP

     This contains only case-study presentation.

     The live website area is an empty mount target.
     PortfolioProjects supplies the actual North Home site.
  ======================================================= */

  function northCaseStudyMarkup() {

    return `
      <div class="north-case-study">


        <!-- ===============================================
             BRIEF
        ================================================ -->

        <section class="nh-case-brief">

          <span class="nh-case-label">
            01 / THE BRIEF
          </span>


          <div class="nh-case-brief-main">

            <span>
              SELF-INITIATED CONCEPT / RESIDENTIAL SERVICES
            </span>

            <h3>
              Make home services
              feel as considered
              as the home itself.
            </h3>

            <p>
              North Home is a fictional residential-services
              business for homeowners, condo residents and
              small property managers across Metro Manila.
              The concept focuses on clarity, trust and a
              premium residential experience rather than the
              visual language of a traditional contractor.
            </p>

          </div>


          <div class="nh-case-facts">


            <div>

              <span>
                BUSINESS
              </span>

              <strong>
                Residential home services
              </strong>

            </div>


            <div>

              <span>
                AUDIENCE
              </span>

              <strong>
                Homeowners + property managers
              </strong>

            </div>


            <div>

              <span>
                PRIMARY GOAL
              </span>

              <strong>
                Generate quote inquiries
              </strong>

            </div>


            <div>

              <span>
                POSITIONING
              </span>

              <strong>
                Premium but approachable
              </strong>

            </div>


            <div>

              <span>
                SCOPE
              </span>

              <strong>
                Home / Services / About / Contact
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
             DESIGN DIRECTION
        ================================================ -->

        <section class="nh-case-decisions">

          <span class="nh-case-label">
            02 / DESIGN DIRECTION
          </span>


          <div class="nh-case-decisions-list">


            <article class="nh-case-decision">

              <span>
                01
              </span>

              <h4>
                Residential,
                not industrial.
              </h4>

              <p>
                The visual system uses generous imagery,
                soft surfaces, restrained typography and
                warm neutral colors so the business feels
                appropriate inside a well-designed home.
              </p>

            </article>


            <article class="nh-case-decision">

              <span>
                02
              </span>

              <h4>
                Show the environment,
                not just the work.
              </h4>

              <p>
                Photography takes the lead. Services are
                presented through the homes customers care
                about rather than a page filled with tools,
                vans and construction graphics.
              </p>

            </article>


            <article class="nh-case-decision">

              <span>
                03
              </span>

              <h4>
                Make every service
                easy to understand.
              </h4>

              <p>
                Repairs, maintenance and installation remain
                clear choices. Visitors can switch between
                them without navigating away from the page.
              </p>

            </article>


            <article class="nh-case-decision">

              <span>
                04
              </span>

              <h4>
                Keep one clear
                conversion path.
              </h4>

              <p>
                Requesting a quote stays visible throughout
                the experience without turning every section
                into another oversized call-to-action.
              </p>

            </article>

          </div>

        </section>


        <!-- ===============================================
             LIVE WEBSITE
        ================================================ -->

        <section class="nh-live">

          <div class="nh-live-heading">

            <div>

              <span class="nh-case-label">
                03 / LIVE FRONT-END
              </span>

              <h3>
                A complete website
                inside the portfolio.
              </h3>

            </div>


            <p>
              The concept remains entirely front-end.
              Visitors can navigate the page, switch
              services and test the inquiry interaction
              without leaving the portfolio.
            </p>

          </div>


          <div class="nh-browser">


            <!-- BROWSER BAR -->

            <div class="nh-browserbar">

              <div
                class="nh-browser-dots"
                aria-hidden="true"
              >
                <i></i>
                <i></i>
                <i></i>
              </div>


              <span
                data-north-project-url
              >
                northhome.example
              </span>


              <strong>
                LIVE CONCEPT
              </strong>

            </div>


            <!-- ===========================================
                 CANONICAL PROJECT MOUNT TARGET

                 PortfolioProjects.mount("north", ...)
                 supplies the actual website here.
            ============================================ -->

            <div
              class="nh-live-project-host"
              data-north-live-project-host
            ></div>

          </div>

        </section>


        <!-- ===============================================
             CASE OUTCOME
        ================================================ -->

        <section class="nh-case-outcome">

          <span class="nh-case-label">
            04 / WHAT THIS PROJECT SHOWS
          </span>

          <h3>
            One portfolio.
            A completely different
            visual identity.
          </h3>


          <div class="nh-case-outcome-grid">


            <div class="nh-case-outcome-item">

              <strong>
                POSITIONING
              </strong>

              <span>
                The business is presented
                as thoughtful residential care,
                not a generic contractor.
              </span>

            </div>


            <div class="nh-case-outcome-item">

              <strong>
                DESIGN
              </strong>

              <span>
                Photography, serif typography
                and soft residential colors create
                a visual language distinct from
                the portfolio itself.
              </span>

            </div>


            <div class="nh-case-outcome-item">

              <strong>
                FRONT-END
              </strong>

              <span>
                Responsive layouts, service
                switching, smooth navigation
                and an inquiry demonstration
                complete the concept.
              </span>

            </div>

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
     PROJECT METADATA

     The visible browser labels follow the registered
     project definition instead of maintaining another
     independent URL/index definition here.
  ======================================================= */

  function syncProjectMetadata(
    project
  ) {

    if (!project) {

      return;

    }


    document
      .querySelectorAll(
        "[data-north-project-url]"
      )
      .forEach(
        (element) => {

          element.textContent =
            project.url;

        }
      );


    document
      .querySelectorAll(
        "[data-north-case-index]"
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

     The project remains at a real 1200px desktop viewport.

     Only the portfolio presentation is scaled.
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


    if (
      !casePreviewHost
    ) {

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

     View-only isolated viewport.
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
      "#ffffff";


    casePreviewFrame =
      registry.mountFrame(
        PROJECT_KEY,
        casePreviewHost,
        {

          instance:
            "case-preview",

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
      "north-case-project-frame"
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
     MOUNT LIVE CASE-STUDY WEBSITE

     This is a real interactive instance of the exact
     registered project.

     No website HTML is recreated by the case study.
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
            "case-study-live",

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
      "north-case-live-site"
    );


    caseLiveHost
      .dataset
      .canonicalLiveProject =
        "true";


    return true;

  }


  /* =======================================================
     MOUNT ALL NORTH CASE SURFACES
  ======================================================= */

  function mountNorthCaseSurfaces() {

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
        "data-north-case-project",
        "mounted"
      );


    return true;

  }


  /* =======================================================
     NORTH CASE MODE

     main.js owns the generic case-study dialog.

     This file only activates North's custom presentation
     when the currently populated project is North Home.
  ======================================================= */

  function applyNorthCaseMode() {

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


    const isNorth =
      caseTitle?.textContent
        .trim() ===
      "North Home";


    caseDialog.classList.toggle(
      "north-active",
      isNorth
    );


    if (!isNorth) {

      return;

    }


    /*
     * Preserve the existing North-specific case-study copy.
     */

    if (caseType) {

      caseType.textContent =
        "SELF-INITIATED / RESIDENTIAL SERVICES";

    }


    if (caseSummary) {

      caseSummary.textContent =
        "A premium residential-services concept designed to make home maintenance feel clear, trustworthy and appropriate for a modern home.";

    }


    if (caseGoal) {

      caseGoal.textContent =
        "Explain the services quickly, create residential trust, and make requesting help feel straightforward.";

    }


    if (casePages) {

      casePages.textContent =
        "Home / Services / About / Contact";

    }


    /*
     * Ensure the canonical project is mounted before the
     * custom case presentation becomes visible.
     */

    mountNorthCaseSurfaces();


    /*
     * The dialog may have been display:none while the
     * preview frame was created.

     * Recalculate presentation scale after opening.
     */

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
      caseDialog.dataset.northCaseModeBound ===
      "true"
    ) {

      return;

    }


    caseDialog.dataset.northCaseModeBound =
      "true";


    /*
     * main.js handles the actual generic case opening first.

     * This listener runs afterward and reads the project
     * that main.js populated into the dialog.
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
                applyNorthCaseMode
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
          applyNorthCaseMode
        );

      }
    );


    /*
     * Modern dialog implementations emit toggle when modal
     * visibility changes.

     * The click handlers above remain the compatibility
     * path for browsers where dialog toggle timing differs.
     */

    caseDialog.addEventListener(
      "toggle",
      () => {

        if (
          !caseDialog.open
        ) {

          return;

        }


        requestAnimationFrame(
          applyNorthCaseMode
        );

      }
    );


    caseDialog.addEventListener(
      "close",
      () => {

        caseDialog.classList.remove(
          "north-active"
        );

      }
    );

  }


  /* =======================================================
     BUILD CASE PRESENTATION
  ======================================================= */

  function buildNorthCaseStudy() {

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
       CASE HERO
    ===================================================== */

    caseHeroMedia
      .querySelectorAll(
        ".north-case-preview"
      )
      .forEach(
        (element) => {

          element.remove();

        }
      );


    caseHeroMedia.insertAdjacentHTML(
      "beforeend",
      northCasePreviewMarkup()
    );


    /* =====================================================
       CASE BODY
    ===================================================== */

    caseDialog
      .querySelectorAll(
        ".north-case-study"
      )
      .forEach(
        (element) => {

          element.remove();

        }
      );


    caseFooter.insertAdjacentHTML(
      "beforebegin",
      northCaseStudyMarkup()
    );


    /* =====================================================
       CACHE PRESENTATION TARGETS
    ===================================================== */

    caseStudy =
      caseDialog.querySelector(
        ".north-case-study"
      );


    casePreviewHost =
      caseDialog.querySelector(
        "[data-north-case-preview-host]"
      );


    caseLiveHost =
      caseDialog.querySelector(
        "[data-north-live-project-host]"
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

  function initNorthHomeCaseStudy() {

    if (initialized) {

      return;

    }


    if (
      !buildNorthCaseStudy()
    ) {

      return;

    }


    initialized =
      true;


    bindCaseMode();


    /*
     * Under the current defer order, project-north.js
     * registers before DOMContentLoaded finishes.

     * This immediate registry check also makes initialization
     * resilient if that ordering changes later.
     */

    mountNorthCaseSurfaces();


    document.dispatchEvent(
      new CustomEvent(
        "north:case-study-ready",
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

     project-north.js may register before or after the case
     markup is initialized.

     Both execution orders are supported.
  ======================================================= */

  document.addEventListener(
    "north:project-ready",
    () => {

      if (!initialized) {

        return;

      }


      mountNorthCaseSurfaces();

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


      mountNorthCaseSurfaces();

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
      initNorthHomeCaseStudy,
      {
        once:
          true
      }
    );

  } else {

    initNorthHomeCaseStudy();

  }

})();
