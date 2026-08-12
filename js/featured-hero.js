/* =========================================================
   JEZIEL CAMARA / FEATURED HERO PROJECT

   ONE PROJECT SOURCE.
   TWO REAL VIEWPORTS.

   LARGE WINDOW
   = canonical project website / desktop viewport

   SMALL WINDOW
   = canonical project website / mobile viewport

   No project-specific preview HTML is created here.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     VIEWPORT SETTINGS
  ======================================================= */

  const DESKTOP_DESIGN_WIDTH =
    1200;


  const MOBILE_VIEWPORT_WIDTH =
    390;


  const MOBILE_VIEWPORT_HEIGHT =
    1000;


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

  let desktopSite =
    null;


  let mobileFrame =
    null;


  let desktopResizeObserver =
    null;


  let mobileResizeObserver =
    null;


  let started =
    false;


  /* =======================================================
     WEBSITE VIEWER
  ======================================================= */

  function openNorthViewer() {

    const viewer =
      document.querySelector(
        "#nh-site-viewer"
      );


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
     * use the existing North Home viewer launcher.
     */

    const existingLauncher =
      document.querySelector(
        '.project-slide[data-project="north"] .project-image.nh-view-launch'
      );


    existingLauncher?.click();

  }


  /* =======================================================
     PREVIEW LAUNCHER
  ======================================================= */

  function makePreviewLaunchable(
    element,
    label
  ) {

    if (!element) {
      return;
    }


    if (
      element.dataset.featuredViewerBound ===
      "true"
    ) {
      return;
    }


    element.dataset.featuredViewerBound =
      "true";


    element.classList.add(
      "nh-view-launch"
    );


    element.setAttribute(
      "role",
      "button"
    );


    element.setAttribute(
      "tabindex",
      "0"
    );


    element.setAttribute(
      "aria-label",
      label
    );


    element.addEventListener(
      "click",
      () => {

        openNorthViewer();

      }
    );


    element.addEventListener(
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


  /* =======================================================
     DESKTOP PREVIEW
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


    if (!availableWidth) {
      return;
    }


    /*
     * Render North Home at its intended desktop width.
     *
     * Scale only the presentation.
     * Never redesign the project for the portfolio window.
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


    desktopPreview.classList.remove(
      "has-north-mobile-preview"
    );


    desktopPreview.classList.add(
      "has-north-preview",
      "has-canonical-project-preview",
      "has-canonical-desktop-preview"
    );


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


    makePreviewLaunchable(
      desktopPreview,
      `View ${project.name} website`
    );


    requestAnimationFrame(
      () => {

        fitDesktopSite();
        watchDesktopSize();

      }
    );


    return true;

  }


  /* =======================================================
     MOBILE PREVIEW
  ======================================================= */

  function fitMobileFrame() {

    if (
      !mobileFrame ||
      !mobilePreview
    ) {
      return;
    }


    const availableWidth =
      mobilePreview.clientWidth;


    if (!availableWidth) {
      return;
    }


    /*
     * The iframe itself stays 390px wide.
     *
     * Therefore North Home's real mobile media queries
     * respond to a genuine 390px viewport.
     *
     * We scale only the finished viewport so that it fits
     * inside the small draggable portfolio window.
     */

    const scale =
      Math.min(
        1,
        availableWidth /
        MOBILE_VIEWPORT_WIDTH
      );


    mobileFrame.style.width =
      `${MOBILE_VIEWPORT_WIDTH}px`;


    mobileFrame.style.minWidth =
      `${MOBILE_VIEWPORT_WIDTH}px`;


    mobileFrame.style.height =
      `${MOBILE_VIEWPORT_HEIGHT}px`;


    mobileFrame.style.maxWidth =
      "none";


    mobileFrame.style.margin =
      "0";


    mobileFrame.style.transformOrigin =
      "top left";


    mobileFrame.style.transform =
      `scale(${scale})`;


    mobileFrame.style.pointerEvents =
      "none";


    mobilePreview.dataset.previewScale =
      scale.toFixed(
        4
      );

  }


  function watchMobileSize() {

    if (
      mobileResizeObserver
    ) {

      mobileResizeObserver.disconnect();

    }


    if (
      "ResizeObserver" in window
    ) {

      mobileResizeObserver =
        new ResizeObserver(
          () => {

            fitMobileFrame();

          }
        );


      mobileResizeObserver.observe(
        mobilePreview
      );


      return;

    }


    window.addEventListener(
      "resize",
      fitMobileFrame,
      {
        passive:
          true
      }
    );

  }


  function renderCanonicalMobile(
    project
  ) {

    if (
      !window.PortfolioProjects ||
      !window.PortfolioProjects.has(
        project.key
      ) ||
      typeof window.PortfolioProjects.mountFrame !==
        "function"
    ) {

      return false;

    }


    mobileBar.innerHTML = `
      <span>
        MOBILE / ${project.index}
      </span>

      <span>
        ${project.name.toUpperCase()}
      </span>
    `;


    /*
     * Remove the old handmade mobile-preview state.
     */

    mobilePreview.classList.remove(
      "has-north-mobile-preview"
    );


    mobilePreview.classList.add(
      "has-north-preview",
      "has-canonical-project-preview",
      "has-canonical-mobile-preview"
    );


    /*
     * THIS IS THE IMPORTANT CHANGE.
     *
     * Mobile receives exactly the same registered
     * project source as desktop.
     *
     * The only difference is the viewport width.
     */

    mobileFrame =
      window.PortfolioProjects.mountFrame(
        project.key,
        mobilePreview,
        {

          instance:
            "hero-mobile",

          viewport:
            "mobile",

          width:
            MOBILE_VIEWPORT_WIDTH,

          height:
            MOBILE_VIEWPORT_HEIGHT,

          label:
            `${project.name} mobile website preview`

        }
      );


    mobileFrame.classList.add(
      "featured-project-frame",
      "featured-project-frame-mobile"
    );


    mobileWindow.dataset.featuredProject =
      project.key;


    makePreviewLaunchable(
      mobilePreview,
      `View ${project.name} website`
    );


    requestAnimationFrame(
      () => {

        fitMobileFrame();
        watchMobileSize();

      }
    );


    return true;

  }


  /* =======================================================
     PROJECT SELECTION
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
     FEATURE RENDER
  ======================================================= */

  function renderFeaturedProject(
    project
  ) {

    if (!project) {
      return false;
    }


    /*
     * Only completed projects should ever reach this list.
     *
     * North is currently the only completed project.
     */

    const desktopRendered =
      renderCanonicalDesktop(
        project
      );


    const mobileRendered =
      renderCanonicalMobile(
        project
      );


    if (
      !desktopRendered ||
      !mobileRendered
    ) {

      return false;

    }


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
       * Featured rendering still works.
       */

    }


    return true;

  }


  /* =======================================================
     START
  ======================================================= */

  function start(
    attempt = 0
  ) {

    if (started) {
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
