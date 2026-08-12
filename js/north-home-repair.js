/* =========================================================
   PORTFOLIO PROJECT VIEWER

   Compatibility filename:
   js/north-home-repair.js

   This file no longer redesigns North Home.

   RESPONSIBILITY:
   - reuse the existing website-viewer dialog shell
   - mount canonical registered projects into that shell
   - provide one generic PortfolioProjectViewer API
   - preserve North Home launch controls

   IMPORTANT ARCHITECTURE RULE:

   The viewer must never create project-specific website
   markup or project-specific responsive styling.

   It asks PortfolioProjects for the project and gives that
   project a real isolated viewport.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const DEFAULT_PROJECT_KEY =
    "north";


  const MAX_START_ATTEMPTS =
    90;


  const DEFAULT_VIEWPORT_WIDTH =
    1080;


  const DEFAULT_VIEWPORT_HEIGHT =
    820;


  /* =======================================================
     STATE
  ======================================================= */

  let viewer =
    null;


  let canvas =
    null;


  let browserFrame =
    null;


  let projectFrame =
    null;


  let currentProjectKey =
    null;


  let started =
    false;


  /* =======================================================
     VIEWER SHELL CSS

     Only the portfolio viewer shell is styled here.

     Nothing inside the actual project is redesigned.
  ======================================================= */

  const viewerCSS = `

    /* =====================================================
       PROJECT VIEWER
    ===================================================== */

    .nh-site-viewer {
      width:
        min(
          76vw,
          1180px
        ) !important;

      height:
        88vh !important;

      max-width:
        none !important;

      max-height:
        none !important;

      margin:
        auto !important;

      padding:
        0 !important;

      overflow:
        hidden !important;

      color:
        #fff;

      background:
        #171a1e !important;

      border:
        1px
        solid
        rgba(
          255,
          255,
          255,
          .18
        ) !important;

      border-radius:
        18px !important;

      box-shadow:
        0
        45px
        140px
        rgba(
          0,
          0,
          0,
          .75
        ) !important;
    }


    .nh-site-viewer::backdrop {
      background:
        rgba(
          0,
          0,
          0,
          .9
        ) !important;

      backdrop-filter:
        blur(4px) !important;

      -webkit-backdrop-filter:
        blur(4px) !important;
    }


    .nh-site-viewer[open] {
      animation:
        portfolio-project-viewer-in
        260ms
        cubic-bezier(
          .18,
          .78,
          .22,
          1
        )
        both;
    }


    @keyframes portfolio-project-viewer-in {

      from {
        opacity:
          0;

        transform:
          translateY(16px)
          scale(.985);
      }


      to {
        opacity:
          1;

        transform:
          translateY(0)
          scale(1);
      }

    }


    /* =====================================================
       SHELL
    ===================================================== */

    .nh-site-viewer-shell {
      width:
        100%;

      height:
        100%;

      min-width:
        0;

      min-height:
        0;

      display:
        grid;

      grid-template-rows:
        auto
        minmax(
          0,
          1fr
        );

      overflow:
        hidden;
    }


    /* =====================================================
       TOP BAR
    ===================================================== */

    .nh-site-viewer-topbar {
      min-height:
        58px;

      display:
        flex;

      align-items:
        center;

      justify-content:
        space-between;

      gap:
        24px;

      padding:
        0
        20px;

      color:
        rgba(
          255,
          255,
          255,
          .68
        );

      background:
        #111417;

      border-bottom:
        1px
        solid
        rgba(
          255,
          255,
          255,
          .1
        );

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;
    }


    .nh-site-viewer-topbar
    > div {
      min-width:
        0;

      display:
        flex;

      align-items:
        center;

      gap:
        16px;
    }


    .nh-site-viewer-topbar
    > div
    > span {
      color:
        #fff;

      font-size:
        .66rem;

      font-weight:
        600;

      white-space:
        nowrap;
    }


    .nh-site-viewer-topbar
    small {
      overflow:
        hidden;

      color:
        rgba(
          255,
          255,
          255,
          .4
        );

      font-size:
        .49rem;

      letter-spacing:
        .07em;

      text-overflow:
        ellipsis;

      white-space:
        nowrap;
    }


    .nh-site-viewer-close {
      flex:
        0
        0
        auto;

      display:
        inline-flex;

      align-items:
        center;

      gap:
        12px;

      padding:
        10px
        0;

      color:
        #fff;

      background:
        transparent;

      border:
        0;

      cursor:
        pointer;

      font:
        inherit;

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .6rem;
    }


    .nh-site-viewer-close
    span {
      font-size:
        1rem;

      font-weight:
        400;
    }


    /* =====================================================
       VIEWER AREA
    ===================================================== */

    .nh-site-viewer-scroll {
      width:
        100%;

      height:
        100%;

      min-width:
        0;

      min-height:
        0;

      overflow:
        hidden;

      padding:
        16px;

      background:
        #20242a;

      overscroll-behavior:
        contain;
    }


    /* =====================================================
       BROWSER FRAME
    ===================================================== */

    .nh-site-viewer-browser {
      width:
        100%;

      height:
        100%;

      max-width:
        1080px;

      min-width:
        0;

      min-height:
        0;

      display:
        grid;

      grid-template-rows:
        auto
        minmax(
          0,
          1fr
        );

      margin:
        0
        auto;

      overflow:
        hidden;

      background:
        #fbfaf7;

      border-radius:
        14px;

      box-shadow:
        0
        24px
        70px
        rgba(
          0,
          0,
          0,
          .34
        );
    }


    .nh-site-viewer-browserbar {
      min-height:
        38px;

      display:
        grid;

      grid-template-columns:
        1fr
        auto
        1fr;

      gap:
        18px;

      align-items:
        center;

      padding:
        0
        14px;

      color:
        #74777a;

      background:
        #ece9e2;

      border-bottom:
        1px
        solid
        rgba(
          23,
          27,
          33,
          .1
        );

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .48rem;

      letter-spacing:
        .05em;
    }


    .nh-site-viewer-browserbar
    > div {
      display:
        flex;

      gap:
        5px;
    }


    .nh-site-viewer-browserbar
    i {
      width:
        6px;

      height:
        6px;

      display:
        block;

      border:
        1px
        solid
        #929292;

      border-radius:
        50%;
    }


    .nh-site-viewer-browserbar
    > span {
      justify-self:
        center;
    }


    .nh-site-viewer-browserbar
    strong {
      justify-self:
        end;

      color:
        #182433;

      font-weight:
        600;
    }


    /* =====================================================
       CANONICAL PROJECT VIEWPORT
    ===================================================== */

    .nh-site-viewer-canvas {
      position:
        relative;

      width:
        100%;

      height:
        100%;

      min-width:
        0;

      min-height:
        0;

      overflow:
        hidden;

      background:
        #fff;
    }


    /*
     * The iframe is only the viewport.
     *
     * Its contents are controlled entirely by the
     * registered project's own HTML and CSS.
     */

    .nh-site-viewer-canvas
    > .portfolio-project-frame {
      position:
        absolute !important;

      inset:
        0 !important;

      width:
        100% !important;

      height:
        100% !important;

      min-width:
        0 !important;

      min-height:
        0 !important;

      max-width:
        none !important;

      margin:
        0 !important;

      padding:
        0 !important;

      border:
        0 !important;

      transform:
        none !important;

      transform-origin:
        top
        left !important;

      pointer-events:
        auto !important;

      background:
        #fff;
    }


    /* =====================================================
       SELECTED WORK LAUNCH CONTROL
    ===================================================== */

    .project-slide[data-project="north"]
    .project-image {
      cursor:
        zoom-in !important;
    }


    .project-slide[data-project="north"]
    .project-image::after {
      content:
        "";

      position:
        absolute;

      inset:
        0;

      z-index:
        8;

      pointer-events:
        none;

      border:
        1px
        solid
        transparent;

      transition:
        border-color
        180ms
        ease;
    }


    .project-slide[data-project="north"]
    .project-image:hover::after {
      border-color:
        var(--blue);
    }


    .nh-project-view-button {
      position:
        absolute;

      z-index:
        30;

      right:
        22px;

      bottom:
        22px;

      min-height:
        40px;

      display:
        inline-flex;

      align-items:
        center;

      gap:
        14px;

      padding:
        0
        14px;

      cursor:
        pointer;

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .54rem;

      font-weight:
        600;
    }


    .nh-project-title-launch {
      cursor:
        pointer;
    }


    .nh-project-title-launch:hover {
      text-decoration:
        underline;

      text-decoration-thickness:
        1px;

      text-underline-offset:
        5px;
    }


    /*
     * Old badge from north-home.js is no longer needed.
     */

    .project-slide[data-project="north"]
    .nh-view-badge {
      display:
        none !important;
    }


    /*
     * Old hero badge from north-home.js is also unnecessary
     * because the project window itself remains clickable.
     */

    .nh-hero-view-badge {
      display:
        none !important;
    }


    /* =====================================================
       LAPTOP
    ===================================================== */

    @media (
      max-width: 1100px
    ) {

      .nh-site-viewer {
        width:
          86vw !important;

        height:
          88vh !important;
      }

    }


    /* =====================================================
       MOBILE VIEWER SHELL

       These rules resize only the portfolio viewer.

       The project itself responds naturally because the
       iframe becomes narrower.
    ===================================================== */

    @media (
      max-width: 700px
    ) {

      .nh-site-viewer {
        width:
          calc(
            100vw - 20px
          ) !important;

        height:
          calc(
            100dvh - 20px
          ) !important;

        border-radius:
          13px !important;
      }


      .nh-site-viewer::backdrop {
        background:
          rgba(
            0,
            0,
            0,
            .93
          ) !important;
      }


      .nh-site-viewer-topbar {
        min-height:
          52px;

        padding:
          0
          13px;
      }


      .nh-site-viewer-topbar
      small {
        display:
          none;
      }


      .nh-site-viewer-scroll {
        padding:
          7px;
      }


      .nh-site-viewer-browser {
        border-radius:
          10px;
      }


      .nh-site-viewer-browserbar {
        grid-template-columns:
          1fr
          auto;
      }


      .nh-site-viewer-browserbar
      strong {
        display:
          none;
      }


      .nh-site-viewer-browserbar
      > span {
        justify-self:
          end;
      }


      .nh-project-view-button {
        right:
          14px;

        bottom:
          14px;
      }

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (
      prefers-reduced-motion:
      reduce
    ) {

      .nh-site-viewer[open] {
        animation:
          none !important;
      }

    }

  `;


  /* =======================================================
     STYLE INSTALLATION
  ======================================================= */

  function addViewerStyles() {

    const oldStyles =
      document.querySelector(
        "#north-home-repair-styles"
      );


    if (oldStyles) {

      oldStyles.remove();

    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "north-home-repair-styles";


    style.textContent =
      viewerCSS;


    document.head.append(
      style
    );

  }


  /* =======================================================
     PROJECT HELPERS
  ======================================================= */

  function getProjectUrl(
    project
  ) {

    switch (
      project.key
    ) {

      case "north":
        return "northhome.example";

      case "sola":
        return "solacafe.example";

      case "avance":
        return "avance.example";

      default:
        return `${project.key}.example`;

    }

  }


  function getViewerElements() {

    viewer =
      document.querySelector(
        "#nh-site-viewer"
      );


    canvas =
      viewer?.querySelector(
        ".nh-site-viewer-canvas"
      ) || null;


    browserFrame =
      viewer?.querySelector(
        ".nh-site-viewer-browser"
      ) || null;


    return Boolean(
      viewer &&
      canvas &&
      browserFrame
    );

  }


  /* =======================================================
     VIEWER IDENTITY
  ======================================================= */

  function updateViewerIdentity(
    project
  ) {

    if (!viewer) {
      return;
    }


    const title =
      viewer.querySelector(
        ".nh-site-viewer-topbar > div > span"
      );


    const description =
      viewer.querySelector(
        ".nh-site-viewer-topbar small"
      );


    const url =
      viewer.querySelector(
        ".nh-site-viewer-browserbar > span"
      );


    const state =
      viewer.querySelector(
        ".nh-site-viewer-browserbar strong"
      );


    const closeButton =
      viewer.querySelector(
        ".nh-site-viewer-close"
      );


    if (title) {

      title.textContent =
        project.name.toUpperCase();

    }


    if (description) {

      description.textContent =
        "WEBSITE PREVIEW / CONCEPT PROJECT";

    }


    if (url) {

      url.textContent =
        getProjectUrl(
          project
        );

    }


    if (state) {

      state.textContent =
        "VIEW-ONLY CONCEPT";

    }


    if (closeButton) {

      closeButton.setAttribute(
        "aria-label",
        `Close ${project.name} website preview`
      );

    }


    viewer.setAttribute(
      "aria-label",
      `${project.name} website preview`
    );


    viewer.dataset.project =
      project.key;

  }


  /* =======================================================
     CANONICAL VIEWER MOUNT
  ======================================================= */

  function configureProjectFrame(
    frame
  ) {

    if (!frame) {
      return;
    }


    /*
     * createFrame() defaults decorative previews to
     * scrolling="no".
     *
     * The full website viewer is different: visitors need
     * to be able to vertically scroll through the site.
     */

    frame.removeAttribute(
      "scrolling"
    );


    frame.removeAttribute(
      "aria-hidden"
    );


    frame.setAttribute(
      "tabindex",
      "0"
    );


    frame.style.position =
      "absolute";


    frame.style.inset =
      "0";


    frame.style.width =
      "100%";


    frame.style.height =
      "100%";


    frame.style.minWidth =
      "0";


    frame.style.minHeight =
      "0";


    frame.style.maxWidth =
      "none";


    frame.style.margin =
      "0";


    frame.style.padding =
      "0";


    frame.style.border =
      "0";


    frame.style.transform =
      "none";


    frame.style.pointerEvents =
      "auto";

  }


  function mountProject(
    key
  ) {

    if (
      !window.PortfolioProjects ||
      typeof window.PortfolioProjects.mountFrame !==
        "function"
    ) {

      return false;

    }


    if (
      !getViewerElements()
    ) {

      return false;

    }


    const project =
      window.PortfolioProjects.get(
        key
      );


    if (!project) {

      return false;

    }


    /*
     * If this exact project is already mounted correctly,
     * do not rebuild the iframe.
     */

    const existingFrame =
      canvas.querySelector(
        ".portfolio-project-frame"
      );


    if (
      currentProjectKey ===
        project.key &&
      existingFrame
    ) {

      projectFrame =
        existingFrame;


      configureProjectFrame(
        projectFrame
      );


      updateViewerIdentity(
        project
      );


      return true;

    }


    updateViewerIdentity(
      project
    );


    /*
     * THIS IS THE IMPORTANT CHANGE.
     *
     * The old .nh-site-view-only clone is removed by
     * mountFrame() because mountFrame replaces all canvas
     * children.
     *
     * The viewer now receives the same registered project
     * source used by Hero, Work and Responsive Lab.
     */

    projectFrame =
      window.PortfolioProjects.mountFrame(
        project.key,
        canvas,
        {

          instance:
            "website-viewer",

          viewport:
            "responsive",

          width:
            DEFAULT_VIEWPORT_WIDTH,

          height:
            DEFAULT_VIEWPORT_HEIGHT,

          label:
            `${project.name} website viewer`

        }
      );


    configureProjectFrame(
      projectFrame
    );


    currentProjectKey =
      project.key;


    canvas.dataset.canonicalViewer =
      "true";


    return true;

  }


  /* =======================================================
     OPEN / CLOSE
  ======================================================= */

  function openProject(
    key = DEFAULT_PROJECT_KEY
  ) {

    const mounted =
      mountProject(
        key
      );


    if (
      !mounted ||
      !viewer
    ) {

      return false;

    }


    if (
      !viewer.open
    ) {

      viewer.showModal();

    }


    document.body.classList.add(
      "portfolio-viewer-open",
      "nh-viewer-open"
    );


    /*
     * Reset the embedded project's own scroll position.
     *
     * The iframe may not yet have completed loading on the
     * first open, so attempt this again after load.
     */

    function resetFrameScroll() {

      try {

        projectFrame
          ?.contentWindow
          ?.scrollTo(
            0,
            0
          );

      } catch (error) {

        /*
         * Sandboxed iframe access may be restricted.
         * Scrolling still works; only the reset is skipped.
         */

      }

    }


    resetFrameScroll();


    projectFrame?.addEventListener(
      "load",
      resetFrameScroll,
      {
        once:
          true
      }
    );


    return true;

  }


  function closeViewer() {

    if (
      viewer?.open
    ) {

      viewer.close();

    }


    document.body.classList.remove(
      "portfolio-viewer-open",
      "nh-viewer-open"
    );

  }


  /* =======================================================
     GENERIC PUBLIC API

     Future projects should open the viewer with:

     PortfolioProjectViewer.open("sola")

     or:

     PortfolioProjectViewer.open("avance")
  ======================================================= */

  window.PortfolioProjectViewer = {

    open:
      openProject,

    close:
      closeViewer,

    mount:
      mountProject,

    getCurrentProject() {

      return currentProjectKey;

    }

  };


  /* =======================================================
     VIEWER CHROME EVENTS
  ======================================================= */

  function bindViewerChrome() {

    if (
      !viewer ||
      viewer.dataset.genericViewerBound ===
        "true"
    ) {

      return;

    }


    viewer.dataset.genericViewerBound =
      "true";


    const closeButton =
      viewer.querySelector(
        ".nh-site-viewer-close"
      );


    closeButton?.addEventListener(
      "click",
      () => {

        closeViewer();

      }
    );


    viewer.addEventListener(
      "cancel",
      (event) => {

        event.preventDefault();

        closeViewer();

      }
    );


    viewer.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          viewer
        ) {

          closeViewer();

        }

      }
    );


    viewer.addEventListener(
      "close",
      () => {

        document.body.classList.remove(
          "portfolio-viewer-open",
          "nh-viewer-open"
        );

      }
    );

  }


  /* =======================================================
     NORTH HOME / EXISTING WORK LAUNCHERS

     These remain temporarily for compatibility.

     Later the Work renderer itself will create generic
     project viewer controls for every registered project.
  ======================================================= */

  function repairNorthLaunchers() {

    const northSlide =
      document.querySelector(
        '.project-slide[data-project="north"]'
      );


    const northImage =
      northSlide?.querySelector(
        ".project-image"
      );


    const northTitle =
      northSlide?.querySelector(
        ".project-caption h3"
      );


    if (!northImage) {
      return;
    }


    /*
     * Prevent the horizontal project reel from treating a
     * click on the project image as the beginning of a drag.
     */

    if (
      northImage.dataset.clickRepair !==
      "true"
    ) {

      northImage.dataset.clickRepair =
        "true";


      northImage.addEventListener(
        "pointerdown",
        (event) => {

          event.stopPropagation();

        }
      );

    }


    /*
     * A real button is the clearest explicit launch target.
     */

    let button =
      northImage.querySelector(
        ".nh-project-view-button"
      );


    if (!button) {

      button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "nh-project-view-button";


      button.innerHTML = `
        VIEW WEBSITE

        <span aria-hidden="true">
          ↗
        </span>
      `;


      northImage.append(
        button
      );

    }


    button.setAttribute(
      "aria-label",
      "View North Home website preview"
    );


    if (
      button.dataset.genericViewerBound !==
      "true"
    ) {

      button.dataset.genericViewerBound =
        "true";


      button.addEventListener(
        "pointerdown",
        (event) => {

          event.stopPropagation();

        }
      );


      button.addEventListener(
        "click",
        (event) => {

          /*
           * Do not bubble into north-home.js's older
           * project-image listener.
           */

          event.preventDefault();
          event.stopPropagation();


          openProject(
            "north"
          );

        }
      );

    }


    /*
     * Keep the project title as a secondary launch target.
     */

    if (northTitle) {

      northTitle.classList.add(
        "nh-project-title-launch"
      );


      northTitle.setAttribute(
        "role",
        "button"
      );


      northTitle.setAttribute(
        "tabindex",
        "0"
      );


      northTitle.setAttribute(
        "aria-label",
        "View North Home website preview"
      );


      if (
        northTitle.dataset.genericViewerBound !==
        "true"
      ) {

        northTitle.dataset.genericViewerBound =
          "true";


        northTitle.addEventListener(
          "click",
          () => {

            openProject(
              "north"
            );

          }
        );


        northTitle.addEventListener(
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


            openProject(
              "north"
            );

          }
        );

      }

    }

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


    /*
     * north-home.js currently creates the dialog shell.
     *
     * project-north.js registers the canonical North source.
     *
     * Wait until both exist before replacing the old viewer
     * clone.
     */

    const viewerReady =
      getViewerElements();


    const projectReady =
      window.PortfolioProjects?.has(
        DEFAULT_PROJECT_KEY
      );


    if (
      !viewerReady ||
      !projectReady
    ) {

      if (
        attempt <
        MAX_START_ATTEMPTS
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


    addViewerStyles();


    bindViewerChrome();


    /*
     * Immediately replace north-home.js's old
     * .nh-site-view-only clone with the canonical source.
     */

    mountProject(
      DEFAULT_PROJECT_KEY
    );


    repairNorthLaunchers();


    started =
      true;


    document.documentElement
      .setAttribute(
        "data-project-viewer",
        "ready"
      );


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:viewer-ready"
      )
    );

  }


  /* =======================================================
     REGISTRY EVENTS
  ======================================================= */

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
