/* =========================================================
   JEZIEL CAMARA / FEATURED HERO PROJECT

   LARGE WINDOW
   = canonical project website / desktop viewport

   SMALL WINDOW
   = temporary legacy mobile preview

   IMPORTANT:
   The large preview now uses PortfolioProjects.
   The small preview will be migrated in the next step.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const DESKTOP_DESIGN_WIDTH =
    1200;


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const desktopWindow =
    document.querySelector(
      ".window-main"
    );


  const desktopBar =
    desktopWindow?.querySelector(
      ".window-bar"
    );


  const desktopPreview =
    desktopWindow?.querySelector(
      ".window-placeholder"
    );


  const mobileWindow =
    document.querySelector(
      ".window-small"
    );


  const mobileBar =
    mobileWindow?.querySelector(
      ".window-bar"
    );


  const mobilePreview =
    mobileWindow?.querySelector(
      ".window-placeholder"
    );


  if (
    !desktopWindow ||
    !desktopBar ||
    !desktopPreview ||
    !mobileWindow ||
    !mobileBar ||
    !mobilePreview
  ) {
    return;
  }


  /* =======================================================
     STATE
  ======================================================= */

  let featuredProject =
    null;


  let desktopSite =
    null;


  let desktopResizeObserver =
    null;


  let started =
    false;


  /* =======================================================
     NORTH HOME / TEMPORARY MOBILE PREVIEW

     This remains only until the next migration step.
     It will be removed once mobile also uses the
     canonical project website.
  ======================================================= */

  function northMobileMarkup() {

    return `
      <div
        class="nh-mobile-thumb"
        aria-hidden="true"
      >

        <header class="nh-mobile-nav">

          <strong class="nh-mobile-logo">
            North
            <span>
              Home
            </span>
          </strong>


          <span
            class="nh-mobile-menu"
            aria-hidden="true"
          >
            ≡
          </span>

        </header>


        <div class="nh-mobile-hero">


          <span class="nh-mobile-project-tag">
            RESIDENTIAL / METRO MANILA
          </span>


          <div class="nh-mobile-copy">


            <span class="nh-mobile-kicker">
              RESIDENTIAL SERVICES
            </span>


            <strong>
              CARE FOR<br>
              THE HOME<br>
              YOU LIVE IN.
            </strong>


            <p>
              Repairs, maintenance
              and installation for
              modern homes.
            </p>


            <span class="nh-mobile-cta">

              REQUEST A QUOTE

              <span aria-hidden="true">
                ↗
              </span>

            </span>


          </div>


        </div>

      </div>
    `;

  }


  /* =======================================================
     WEBSITE VIEWER
  ======================================================= */

  function openNorthViewer() {

    const viewer =
      document.querySelector(
        "#nh-site-viewer"
      );


    /*
     * Preferred route:
     * open the existing North Home viewer.
     */

    if (viewer) {

      if (!viewer.open) {

        viewer.showModal();


        document.body.classList.add(
          "nh-viewer-open"
        );


        const scrollArea =
          viewer.querySelector(
            ".nh-site-viewer-scroll"
          );


        if (scrollArea) {

          scrollArea.scrollTop =
            0;

        }

      }


      return;

    }


    /*
     * Fallback:
     * north-home.js also wires the desktop
     * wrapper to the website viewer.
     */

    const desktopLauncher =
      document.querySelector(
        ".window-main .window-placeholder.nh-view-launch"
      );


    desktopLauncher?.click();

  }


  /* =======================================================
     LARGE HERO / CANONICAL WEBSITE
  ======================================================= */

  function fitDesktopSite() {

    if (
      !desktopSite ||
      !desktopPreview
    ) {
      return;
    }


    const availableWidth =
      desktopPreview.clientWidth;


    if (
      !availableWidth
    ) {
      return;
    }


    /*
     * North Home is rendered at a real desktop width,
     * then scaled down to fit inside the floating
     * portfolio window.
     *
     * The project itself is not redesigned here.
     */

    const scale =
      Math.min(
        1,
        availableWidth /
        DESKTOP_DESIGN_WIDTH
      );


    desktopSite.style.width =
      `${DESKTOP_DESIGN_WIDTH}px`;


    desktopSite.style.minWidth =
      `${DESKTOP_DESIGN_WIDTH}px`;


    desktopSite.style.maxWidth =
      "none";


    desktopSite.style.margin =
      "0";


    desktopSite.style.transformOrigin =
      "top left";


    desktopSite.style.transform =
      `scale(${scale})`;


    desktopSite.style.pointerEvents =
      "none";


    desktopPreview.dataset.previewScale =
      scale.toFixed(
        4
      );

  }


  function watchDesktopSize() {

    if (
      desktopResizeObserver
    ) {

      desktopResizeObserver.disconnect();

    }


    if (
      "ResizeObserver" in window
    ) {

      desktopResizeObserver =
        new ResizeObserver(
          () => {

            fitDesktopSite();

          }
        );


      desktopResizeObserver.observe(
        desktopPreview
      );


      return;

    }


    /*
     * Older browser fallback.
     */

    window.addEventListener(
      "resize",
      fitDesktopSite,
      {
        passive:
          true
      }
    );

  }


  function renderCanonicalDesktop(
    project
  ) {

    if (
      !window.PortfolioProjects ||
      !window.PortfolioProjects.has(
        project.key
      )
    ) {

      return false;

    }


    desktopBar.innerHTML = `
      <span>
        PROJECT / ${project.index}
      </span>

      <span>
        ${project.type}
      </span>
    `;


    /*
     * Preserve this existing class because
     * north-home.js uses the wrapper itself
     * as the website-viewer launcher.
     */

    desktopPreview.classList.add(
      "has-north-preview",
      "has-canonical-project-preview"
    );


    desktopPreview.classList.remove(
      "has-north-mobile-preview"
    );


    desktopPreview.setAttribute(
      "aria-label",
      `View ${project.name} website`
    );


    /*
     * THIS IS THE IMPORTANT CHANGE.
     *
     * The actual North Home project source is mounted
     * into the hero instead of custom thumbnail markup.
     */

    desktopSite =
      window.PortfolioProjects.mount(
        project.key,
        desktopPreview,
        {

          instance:
            "hero-desktop",

          viewport:
            "desktop",

          viewOnly:
            true

        }
      );


    desktopSite.classList.add(
      "featured-project-site",
      "featured-project-site-desktop"
    );


    desktopWindow.dataset.featuredProject =
      project.key;


    requestAnimationFrame(
      () => {

        fitDesktopSite();
        watchDesktopSize();

      }
    );


    return true;

  }


  /* =======================================================
     MOBILE / TEMPORARY LEGACY VERSION
  ======================================================= */

  function makeNorthMobileLaunchable() {

    if (
      mobilePreview.dataset.viewerBound ===
      "true"
    ) {
      return;
    }


    mobilePreview.dataset.viewerBound =
      "true";


    mobilePreview.classList.add(
      "nh-view-launch"
    );


    mobilePreview.setAttribute(
      "role",
      "button"
    );


    mobilePreview.setAttribute(
      "tabindex",
      "0"
    );


    mobilePreview.setAttribute(
      "aria-label",
      "View the North Home concept website from the mobile preview"
    );


    mobilePreview.addEventListener(
      "click",
      () => {

        openNorthViewer();

      }
    );


    mobilePreview.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !==
            "Enter" &&
          event.key !==
            " "
        ) {

          return;

        }


        event.preventDefault();


        openNorthViewer();

      }
    );

  }


  function renderLegacyNorthMobile(
    project
  ) {

    mobileBar.innerHTML = `
      <span>
        MOBILE / ${project.index}
      </span>

      <span>
        ${project.name.toUpperCase()}
      </span>
    `;


    mobilePreview.classList.remove(
      "has-north-preview"
    );


    mobilePreview.classList.add(
      "has-north-mobile-preview"
    );


    mobilePreview.innerHTML =
      northMobileMarkup();


    mobileWindow.dataset.featuredProject =
      project.key;


    makeNorthMobileLaunchable();

  }


  /* =======================================================
     PROJECT SELECTION

     Uses the shared PortfolioProjects registry.
     No separate featured-project metadata lives here.
  ======================================================= */

  function chooseProject() {

    if (
      !window.PortfolioProjects
    ) {
      return null;
    }


    const projects =
      window.PortfolioProjects
        .listFeatured();


    if (
      !projects.length
    ) {
      return null;
    }


    if (
      projects.length ===
      1
    ) {

      return projects[0];

    }


    let previousKey =
      null;


    try {

      previousKey =
        sessionStorage.getItem(
          "jc-last-featured-project"
        );

    } catch (error) {

      previousKey =
        null;

    }


    const alternatives =
      projects.filter(
        (project) =>
          project.key !==
          previousKey
      );


    const pool =
      alternatives.length
        ? alternatives
        : projects;


    const randomIndex =
      Math.floor(
        Math.random() *
        pool.length
      );


    return pool[
      randomIndex
    ];

  }


  /* =======================================================
     APPLY FEATURE
  ======================================================= */

  function renderFeaturedProject(
    project
  ) {

    if (!project) {
      return false;
    }


    /*
     * For this migration step only North Home
     * is complete and registered.
     */

    if (
      project.key !==
      "north"
    ) {

      return false;

    }


    const desktopRendered =
      renderCanonicalDesktop(
        project
      );


    if (
      !desktopRendered
    ) {
      return false;
    }


    /*
     * Mobile remains on its old implementation
     * until the next step.
     */

    renderLegacyNorthMobile(
      project
    );


    document.documentElement
      .dataset
      .featuredProject =
        project.key;


    try {

      sessionStorage.setItem(
        "jc-last-featured-project",
        project.key
      );

    } catch (error) {

      /*
       * Storage can be unavailable.
       * Featured rendering does not depend on it.
       */

    }


    featuredProject =
      project;


    return true;

  }


  /* =======================================================
     START
  ======================================================= */

  function start(
    attempt = 0
  ) {

    if (
      started
    ) {
      return;
    }


    const project =
      chooseProject();


    if (!project) {

      if (
        attempt <
        60
      ) {

        requestAnimationFrame(
          () => {

            start(
              attempt + 1
            );

          }
        );

      }


      return;

    }


    if (
      renderFeaturedProject(
        project
      )
    ) {

      started =
        true;

    }

  }


  /* =======================================================
     PROJECT EVENTS

     project-north.js dispatches these once the real
     North Home source has been registered.
  ======================================================= */

  document.addEventListener(
    "north:project-ready",
    () => {

      requestAnimationFrame(
        () => {

          start();

        }
      );

    }
  );


  document.addEventListener(
    "portfolio:project-registered",
    () => {

      requestAnimationFrame(
        () => {

          start();

        }
      );

    }
  );


  /* =======================================================
     LOAD FALLBACK
  ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () => {

        requestAnimationFrame(
          () => {

            start();

          }
        );

      },
      {
        once:
          true
      }
    );

  } else {

    requestAnimationFrame(
      () => {

        start();

      }
    );

  }

})();
