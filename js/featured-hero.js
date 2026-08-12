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


    if (
      !window.PortfolioProjectViewer ||
      typeof window.PortfolioProjectViewer.open !==
        "function"
    ) {

      return false;

    }


    return window.PortfolioProjectViewer.open(
      projectKey
    );

  }


  /* =======================================================
     GENERIC PREVIEW LAUNCHER
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
     * The project remains at a genuine desktop width.
     *
     * Only its presentation inside the floating portfolio
     * window is scaled.
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

    desktopResizeObserver?.disconnect();


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


    /*
     * Generic presentation classes only.
     *
     * There is no project-specific Hero preview class.
     */

    desktopPreview.classList.add(
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
     * The project's own responsive CSS therefore controls
     * the mobile design.
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

    mobileResizeObserver?.disconnect();


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
     * Generic presentation classes only.
     */

    mobilePreview.classList.add(
      "has-canonical-project-preview",
      "has-canonical-mobile-preview"
    );


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
     * Selected Work renders the same canonical project at
     * a desktop viewport.
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
     * main.js uses pointerdown on the reel for dragging.
     *
     * The viewer button must not begin a reel drag.
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
     * If this project was already mounted, only ensure its
     * generic website-viewer control still exists.
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


    /*
     * Generic presentation classes only.
     *
     * North, Sola, Avance and future projects all receive
     * the same portfolio surface.
     */

    target.classList.add(
      "has-canonical-project-preview",
      "has-canonical-work-preview"
    );


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
     * mountFrame() replaces the target's children, so add
     * the viewer control after mounting.
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
     RENDER REGISTERED WORK
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
     * Avoid repeating the previously featured project when
     * another registered featured project is available.
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
     * Selected Work is independent from whichever project
     * happens to be featured in the Hero.
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
     PROJECT REGISTRATION
  ======================================================= */

  document.addEventListener(
    "portfolio:project-registered",
    () => {

      requestAnimationFrame(
        () => {

          /*
           * Any future registered project automatically
           * gains a canonical Selected Work preview when a
           * matching project slide exists.
           */

          renderRegisteredWorkPreviews();

          start();

        }
      );

    }
  );


  /* =======================================================
     VIEWER READY
  ======================================================= */

  document.addEventListener(
    "portfolio:viewer-ready",
    () => {

      renderRegisteredWorkPreviews();

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
