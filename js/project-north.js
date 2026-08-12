/* =========================================================
   NORTH HOME / PROJECT REGISTRATION

   ONE PROJECT.
   ONE CANONICAL WEBSITE SOURCE.

   Every presentation of North Home must originate here:

   - hero desktop
   - hero mobile
   - selected work
   - responsive lab
   - website viewer
   - case-study preview

   No portfolio surface should maintain its own
   North Home website design.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "north";


  const SOURCE_SELECTOR =
    ".north-case-study .nh-site";


  const CASE_PREVIEW_SELECTOR =
    ".north-case-preview-browser";


  const CASE_DESIGN_WIDTH =
    1200;


  const CASE_DESIGN_HEIGHT =
    760;


  const MAX_ATTEMPTS =
    90;


  /* =======================================================
     STATE
  ======================================================= */

  let canonicalTemplate =
    null;


  let registered =
    false;


  let casePreviewHost =
    null;


  let casePreviewFrame =
    null;


  let caseResizeObserver =
    null;


  /* =======================================================
     CANONICAL TEMPLATE
  ======================================================= */

  function createCanonicalTemplate(
    sourceWebsite
  ) {

    if (
      !(sourceWebsite instanceof HTMLElement)
    ) {

      return null;

    }


    /*
     * Take one snapshot of the actual North Home website.
     *
     * All portfolio presentations receive fresh clones
     * generated from this exact template.
     */

    const template =
      sourceWebsite.cloneNode(
        true
      );


    template.classList.add(
      "north-project-source"
    );


    template.setAttribute(
      "data-canonical-project",
      PROJECT_KEY
    );


    return template;

  }


  /* =======================================================
     PROJECT FACTORY
  ======================================================= */

  function createNorthSite() {

    if (!canonicalTemplate) {

      throw new Error(
        "North Home canonical template is not available."
      );

    }


    /*
     * Every caller receives a fresh copy of the
     * SAME registered website.
     */

    return canonicalTemplate.cloneNode(
      true
    );

  }


  /* =======================================================
     REMOVE LEGACY THUMBNAILS

     north-home.js historically created separate .nh-thumb
     markup for portfolio previews.

     Those previews are obsolete.

     Remove any generated copies immediately after the
     canonical project becomes available.
  ======================================================= */

  function removeLegacyThumbnails() {

    document
      .querySelectorAll(
        ".nh-thumb"
      )
      .forEach(
        (thumbnail) => {

          thumbnail.remove();

        }
      );


    document.documentElement
      .setAttribute(
        "data-north-legacy-thumbnails",
        "removed"
      );

  }


  /* =======================================================
     CASE STUDY PREVIEW HOST
  ======================================================= */

  function prepareCasePreviewHost() {

    const browser =
      document.querySelector(
        CASE_PREVIEW_SELECTOR
      );


    if (!browser) {

      return null;

    }


    /*
     * Keep the existing browser-style top bar,
     * but remove the old handmade North thumbnail.
     */

    Array.from(
      browser.children
    )
      .forEach(
        (child) => {

          if (
            child.classList.contains(
              "north-case-preview-top"
            )
          ) {

            return;

          }


          child.remove();

        }
      );


    let host =
      browser.querySelector(
        ".north-case-canonical-host"
      );


    if (!host) {

      host =
        document.createElement(
          "div"
        );


      host.className =
        "north-case-canonical-host";


      browser.append(
        host
      );

    }


    /*
     * This is presentation geometry only.
     *
     * No North Home design rules live here.
     */

    host.style.position =
      "relative";


    host.style.width =
      "100%";


    host.style.aspectRatio =
      "16 / 10";


    host.style.minWidth =
      "0";


    host.style.overflow =
      "hidden";


    host.style.background =
      "#ffffff";


    return host;

  }


  /* =======================================================
     CASE PREVIEW FRAME FITTING
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


    /*
     * Render North Home at a real desktop viewport
     * and scale only the presentation.
     *
     * North itself remains untouched.
     */

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
     MOUNT CANONICAL CASE PREVIEW
  ======================================================= */

  function mountCasePreview() {

    if (
      !window.PortfolioProjects ||
      typeof window.PortfolioProjects.mountFrame !==
        "function" ||
      !window.PortfolioProjects.has(
        PROJECT_KEY
      )
    ) {

      return false;

    }


    casePreviewHost =
      prepareCasePreviewHost();


    if (!casePreviewHost) {

      return false;

    }


    /*
     * THIS IS THE IMPORTANT PART.
     *
     * The case-study hero receives exactly the same
     * registered North Home project as every other preview.
     */

    casePreviewFrame =
      window.PortfolioProjects.mountFrame(
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

          label:
            "North Home case-study website preview"

        }
      );


    casePreviewFrame.classList.add(
      "north-case-project-frame"
    );


    casePreviewHost.dataset.canonicalCasePreview =
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
     REGISTER PROJECT
  ======================================================= */

  function registerNorthProject() {

    if (registered) {

      return true;

    }


    if (
      !window.PortfolioProjects
    ) {

      return false;

    }


    /*
     * If registration has already occurred elsewhere,
     * use the existing project instead of creating
     * another entry.
     */

    if (
      window.PortfolioProjects.has(
        PROJECT_KEY
      )
    ) {

      registered =
        true;


      removeLegacyThumbnails();


      requestAnimationFrame(
        mountCasePreview
      );


      return true;

    }


    const sourceWebsite =
      document.querySelector(
        SOURCE_SELECTOR
      );


    if (!sourceWebsite) {

      return false;

    }


    canonicalTemplate =
      createCanonicalTemplate(
        sourceWebsite
      );


    if (!canonicalTemplate) {

      return false;

    }


    /*
     * Register North Home once.
     */

    window.PortfolioProjects.register({

      key:
        PROJECT_KEY,

      name:
        "North Home",

      index:
        "01",

      category:
        "HOME SERVICES",

      type:
        "BUSINESS WEBSITE",

      featured:
        true,

      createSite:
        createNorthSite

    });


    registered =
      true;


    /*
     * The old handmade North preview output is now
     * invalid and must not survive registration.
     */

    removeLegacyThumbnails();


    /*
     * Replace the case-study thumbnail with the
     * canonical website as well.
     */

    requestAnimationFrame(
      mountCasePreview
    );


    document.documentElement
      .setAttribute(
        "data-north-project-source",
        "ready"
      );


    document.dispatchEvent(
      new CustomEvent(
        "north:project-ready",
        {

          detail: {

            key:
              PROJECT_KEY

          }

        }
      )
    );


    return true;

  }


  /* =======================================================
     WAIT FOR SOURCE
  ======================================================= */

  function waitForNorthSource(
    attempt = 0
  ) {

    if (
      registerNorthProject()
    ) {

      return;

    }


    if (
      attempt >=
      MAX_ATTEMPTS
    ) {

      console.warn(
        "North Home project source could not be registered."
      );


      return;

    }


    requestAnimationFrame(
      () => {

        waitForNorthSource(
          attempt + 1
        );

      }
    );

  }


  /* =======================================================
     CASE DIALOG VISIBILITY

     The case preview may be width: 0 while the dialog
     is closed.

     Refit it whenever the North case is opened.
  ======================================================= */

  function bindCaseDialog() {

    const dialog =
      document.querySelector(
        "#case-dialog"
      );


    if (
      !dialog ||
      dialog.dataset.northCanonicalCaseBound ===
        "true"
    ) {

      return;

    }


    dialog.dataset.northCanonicalCaseBound =
      "true";


    dialog.addEventListener(
      "toggle",
      () => {

        if (
          dialog.open
        ) {

          requestAnimationFrame(
            fitCasePreview
          );

        }

      }
    );


    /*
     * Dialog toggle support is not identical across
     * every browser, so clicks on project launchers
     * also trigger a delayed refit.
     */

    document
      .querySelectorAll(
        '.case-open[data-project="north"]'
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              requestAnimationFrame(
                () => {

                  requestAnimationFrame(
                    fitCasePreview
                  );

                }
              );

            }
          );

        }
      );

  }


  /* =======================================================
     START
  ======================================================= */

  function init() {

    bindCaseDialog();

    waitForNorthSource();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once:
          true
      }
    );

  } else {

    init();

  }

})();
