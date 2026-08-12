/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PROJECT SURFACES

   ONE PROJECT SOURCE.
   MULTIPLE REAL VIEWPORTS.

   Current surfaces:
   - featured hero / desktop
   - featured hero / mobile
   - selected work preview

   Project-specific preview HTML must NOT be created here.

   Project-specific viewer logic must NOT be created here.

   Everything is driven by:
   - PortfolioProjects
   - PortfolioProjectViewer
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


  const WORK_VIEWPORT_WIDTH =
    1200;


  const WORK_VIEWPORT_HEIGHT =
    820;


  /* =======================================================
     HERO ELEMENTS
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


  const workFrames =
    new Map();


  const workResizeObservers =
    new Map();


  let started =
    false;


  /* =======================================================
     GENERIC PROJECT VIEWER
  ======================================================= */

  function openProjectViewer(
    projectKey
  ) {

    if (!projectKey) {

      return false;

    }


    /*
     * Preferred route.
     *
     * Every completed project uses the same viewer API.
     */

    if (
      window.PortfolioProjectViewer &&
      typeof window.PortfolioProjectViewer.open ===
        "function"
    ) {

      return window.PortfolioProjectViewer.open(
        projectKey
      );

    }


    /*
     * Temporary compatibility fallback while the old
     * North Home viewer shell still exists.
     *
     * This will disappear once north-home.js is cleaned.
     */

    if (
      projectKey ===
      "north"
    ) {

      const legacyViewer =
        document.querySelector(
          "#nh-site-viewer"
        );


      if (
        legacyViewer &&
        !legacyViewer.open
      ) {

        legacyViewer.showModal();


        document.body.classList.add(
          "nh-viewer-open"
        );


        return true;

      }

    }


    return false;

  }


  /* =======================================================
     GENERIC HERO PREVIEW LAUNCHER
  ======================================================= */

  function makePreviewLaunchable(
    element,
    project
  ) {

    if (
      !element ||
      !project
    ) {

      return;

    }


    const projectKey =
      project.key;


    if (
      element.dataset.viewerProject ===
        projectKey &&
      element.dataset.projectViewerBound ===
        "true"
    ) {

      return;

    }


    element.dataset.viewerProject =
      projectKey;


    element.dataset.projectViewerBound =
      "true";


    element.classList.add(
      "project-view-launch"
    );


    /*
     * Keep the old North class temporarily because
     * existing North CSS still references it.
     *
     * It no longer controls viewer behavior.
     */

    if (
      projectKey ===
      "north"
    ) {

      element.classList.add(
        "nh-view-launch"
      );

    }


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
      `View ${project.name} website`
    );


    element.addEventListener(
      "click",
      () => {

        openProjectViewer(
          projectKey
        );

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


        openProjectViewer(
          projectKey
        );

      }
    );

  }


  /* =======================================================
     HERO / DESKTOP
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
     * The actual project remains at a real desktop width.
     *
     * Only its presentation inside the portfolio window
     * is scaled.
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
      "has-canonical-project-preview",
      "has-canonical-desktop-preview"
    );


    /*
     * Temporary North presentation compatibility.
     */

    if (
      project.key ===
      "north"
    ) {

      desktopPreview.classList.add(
        "has-north-preview"
      );

    }


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
      project
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
     HERO / MOBILE
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
     * The iframe remains at a genuine phone width.
     *
     * Therefore the project's own CSS controls its
     * mobile layout.
     */

    const scale =
      Math.min(
        1,
        availableWidth /
        MOBILE_VIEWPORT_WIDTH
      );


    mobileFrame.style.position =
      "absolute";


    mobileFrame.style.top =
      "0";


    mobileFrame.style.left =
      "0";


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


    mobilePreview.classList.remove(
      "has-north-mobile-preview"
    );


    mobilePreview.classList.add(
      "has-canonical-project-preview",
      "has-canonical-mobile-preview"
    );


    /*
     * Temporary North presentation compatibility.
     */

    if (
      project.key ===
      "north"
    ) {

      mobilePreview.classList.add(
        "has-north-preview"
      );

    }


    mobilePreview.style.position =
      "relative";


    mobilePreview.style.overflow =
      "hidden";


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
      project
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
     SELECTED WORK / FRAME FITTING
  ======================================================= */

  function fitWorkFrame(
    projectKey
  ) {

    const entry =
      workFrames.get(
        projectKey
      );


    if (!entry) {

      return;

    }


    const {
      target,
      frame
    } =
      entry;


    const availableWidth =
      target.clientWidth;


    if (!availableWidth) {

      return;

    }


    /*
     * Selected Work displays the same canonical project
     * at a desktop viewport.
     */

    const scale =
      Math.min(
        1,
        availableWidth /
        WORK_VIEWPORT_WIDTH
      );


    frame.style.position =
      "absolute";


    frame.style.top =
      "0";


    frame.style.left =
      "0";


    frame.style.width =
      `${WORK_VIEWPORT_WIDTH}px`;


    frame.style.minWidth =
      `${WORK_VIEWPORT_WIDTH}px`;


    frame.style.height =
      `${WORK_VIEWPORT_HEIGHT}px`;


    frame.style.maxWidth =
      "none";


    frame.style.margin =
      "0";


    frame.style.transformOrigin =
      "top left";


    frame.style.transform =
      `scale(${scale})`;


    frame.style.pointerEvents =
      "none";


    target.dataset.previewScale =
      scale.toFixed(
        4
      );

  }


  function watchWorkFrame(
    projectKey
  ) {

    const entry =
      workFrames.get(
        projectKey
      );


    if (!entry) {

      return;

    }


    const oldObserver =
      workResizeObservers.get(
        projectKey
      );


    oldObserver?.disconnect();


    if (
      "ResizeObserver" in window
    ) {

      const observer =
        new ResizeObserver(
          () => {

            fitWorkFrame(
              projectKey
            );

          }
        );


      observer.observe(
        entry.target
      );


      workResizeObservers.set(
        projectKey,
        observer
      );


      return;

    }


    window.addEventListener(
      "resize",
      () => {

        fitWorkFrame(
          projectKey
        );

      },
      {
        passive:
          true
      }
    );

  }


  /* =======================================================
     SELECTED WORK / VIEW BUTTON
  ======================================================= */

  function addWorkViewerButton(
    project,
    target
  ) {

    if (
      !project ||
      !target
    ) {

      return;

    }


    let button =
      target.querySelector(
        ".project-view-button"
      );


    if (!button) {

      button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "project-view-button";


      /*
       * Keep North's existing class temporarily so the
       * current UI system continues styling the button.
       */

      if (
        project.key ===
        "north"
      ) {

        button.classList.add(
          "nh-project-view-button"
        );

      }


      button.innerHTML = `
        VIEW WEBSITE

        <span aria-hidden="true">
          ↗
        </span>
      `;


      target.append(
        button
      );

    }


    button.setAttribute(
      "aria-label",
      `View ${project.name} website`
    );


    button.dataset.project =
      project.key;


    if (
      button.dataset.projectViewerBound ===
      "true"
    ) {

      return;

    }


    button.dataset.projectViewerBound =
      "true";


    /*
     * main.js uses pointerdown on the reel for drag.
     *
     * Stop this real button from beginning a reel drag.
     */

    button.addEventListener(
      "pointerdown",
      (event) => {

        event.stopPropagation();

      }
    );


    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        event.stopPropagation();


        openProjectViewer(
          project.key
        );

      }
    );

  }


  /* =======================================================
     SELECTED WORK / CANONICAL PROJECT
  ======================================================= */

  function renderCanonicalWorkPreview(
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


    const projectSlide =
      document.querySelector(
        `.project-slide[data-project="${project.key}"]`
      );


    const target =
      projectSlide?.querySelector(
        ".project-image"
      );


    if (!target) {

      return false;

    }


    /*
     * If this project has already been mounted,
     * make sure its viewer control still exists.
     */

    if (
      target.dataset.canonicalWorkPreview ===
      "true"
    ) {

      addWorkViewerButton(
        project,
        target
      );


      return true;

    }


    target.dataset.canonicalWorkPreview =
      "true";


    target.classList.add(
      "has-canonical-project-preview",
      "has-canonical-work-preview"
    );


    /*
     * Temporary North presentation compatibility.
     */

    if (
      project.key ===
      "north"
    ) {

      target.classList.add(
        "has-north-preview"
      );

    }


    target.style.position =
      "relative";


    target.style.display =
      "block";


    target.style.alignItems =
      "";


    target.style.justifyContent =
      "";


    target.style.padding =
      "0";


    target.style.overflow =
      "hidden";


    /*
     * The Work preview receives the exact same project
     * source as every other portfolio surface.
     */

    const frame =
      window.PortfolioProjects.mountFrame(
        project.key,
        target,
        {

          instance:
            "selected-work",

          viewport:
            "desktop",

          width:
            WORK_VIEWPORT_WIDTH,

          height:
            WORK_VIEWPORT_HEIGHT,

          label:
            `${project.name} selected work preview`

        }
      );


    frame.classList.add(
      "portfolio-work-project-frame"
    );


    workFrames.set(
      project.key,
      {

        target,
        frame

      }
    );


    /*
     * Add the explicit generic website viewer control
     * after mountFrame(), because mountFrame replaces
     * the target's children.
     */

    addWorkViewerButton(
      project,
      target
    );


    requestAnimationFrame(
      () => {

        fitWorkFrame(
          project.key
        );


        watchWorkFrame(
          project.key
        );

      }
    );


    return true;

  }


  /* =======================================================
     RENDER ALL REGISTERED WORK
  ======================================================= */

  function renderRegisteredWorkPreviews() {

    if (
      !window.PortfolioProjects
    ) {

      return;

    }


    window.PortfolioProjects
      .list()
      .forEach(
        (project) => {

          renderCanonicalWorkPreview(
            project
          );

        }
      );

  }


  /* =======================================================
     FEATURED PROJECT SELECTION
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


    /*
     * Avoid repeating the project from the previous
     * page load whenever another completed project exists.
     */

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
     FEATURED PROJECT RENDER
  ======================================================= */

  function renderFeaturedProject(
    project
  ) {

    if (!project) {

      return false;

    }


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
       * Storage is optional.
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

    /*
     * Selected Work is independent from the featured
     * project chosen for the Hero.
     */

    renderRegisteredWorkPreviews();


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
     PROJECT REGISTRATION EVENTS
  ======================================================= */

  document.addEventListener(
    "portfolio:project-registered",
    () => {

      requestAnimationFrame(
        () => {

          /*
           * Any future registered project automatically
           * gains a Selected Work canonical preview.
           */

          renderRegisteredWorkPreviews();


          start();

        }
      );

    }
  );


  /* =======================================================
     VIEWER READY

     If viewer initialization happens after project preview
     rendering, no rerender is needed.

     The launchers call the generic API at click time.
  ======================================================= */

  document.addEventListener(
    "portfolio:viewer-ready",
    () => {

      renderRegisteredWorkPreviews();

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
