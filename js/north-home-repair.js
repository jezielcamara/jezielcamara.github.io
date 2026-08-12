/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PROJECT VIEWER

   Compatibility filename:
   js/north-home-repair.js

   This is now shared portfolio infrastructure.

   RESPONSIBILITY:
   - create the website-viewer dialog shell
   - mount any registered canonical project
   - provide one generic viewer API
   - keep project design isolated from portfolio chrome

   IMPORTANT:

   This file must NOT contain:
   - North Home website markup
   - North Home responsive layout rules
   - project-specific typography
   - project-specific spacing
   - project-specific mobile redesigns

   The project itself always comes from:

   window.PortfolioProjects
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const VIEWER_ID =
    "nh-site-viewer";


  const DEFAULT_PROJECT_KEY =
    "north";


  const DEFAULT_VIEWPORT_WIDTH =
    1080;


  const DEFAULT_VIEWPORT_HEIGHT =
    820;


  const MAX_START_ATTEMPTS =
    90;


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

     Only portfolio presentation chrome belongs here.

     Nothing inside the embedded project is redesigned.
  ======================================================= */

  const viewerCSS = `

    /* =====================================================
       VIEWER DIALOG
    ===================================================== */

    .portfolio-project-viewer,
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


    .portfolio-project-viewer::backdrop,
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


    .portfolio-project-viewer[open],
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
       VIEWER BODY
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
       GENERIC SELECTED-WORK VIEW CONTROL
    ===================================================== */

    .project-image.has-canonical-work-preview {
      cursor:
        zoom-in;
    }


    .project-image.has-canonical-work-preview::after {
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


    .project-image.has-canonical-work-preview:hover::after {
      border-color:
        var(--blue);
    }


    .project-view-button,
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

      color:
        #182433;

      background:
        rgba(
          255,
          255,
          255,
          .95
        );

      border:
        0;

      border-radius:
        999px;

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

      box-shadow:
        0
        8px
        25px
        rgba(
          0,
          0,
          0,
          .18
        );
    }


    /*
     * Legacy North badges are no longer part of the
     * presentation system.
     */

    .nh-view-badge,
    .nh-hero-view-badge {
      display:
        none !important;
    }


    /* =====================================================
       LAPTOP PORTFOLIO VIEWER
    ===================================================== */

    @media (
      max-width: 1100px
    ) {

      .portfolio-project-viewer,
      .nh-site-viewer {
        width:
          86vw !important;

        height:
          88vh !important;
      }

    }


    /* =====================================================
       MOBILE PORTFOLIO VIEWER

       These rules change only the viewer shell.

       The embedded project sees the narrower iframe and
       activates its own responsive CSS.
    ===================================================== */

    @media (
      max-width: 700px
    ) {

      .portfolio-project-viewer,
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


      .portfolio-project-viewer::backdrop,
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


      .project-view-button,
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

      .portfolio-project-viewer[open],
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

    const existingStyles =
      document.querySelector(
        "#north-home-repair-styles"
      );


    existingStyles?.remove();


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
     CREATE VIEWER SHELL

     This is the important infrastructure change.

     The shared viewer now owns its dialog shell.

     north-home.js is no longer required to create it.
  ======================================================= */

  function createViewerShell() {

    const dialog =
      document.createElement(
        "dialog"
      );


    dialog.id =
      VIEWER_ID;


    dialog.className =
      "nh-site-viewer portfolio-project-viewer";


    dialog.setAttribute(
      "aria-label",
      "Project website preview"
    );


    dialog.dataset.viewerOwner =
      "portfolio-project-viewer";


    dialog.innerHTML = `
      <div class="nh-site-viewer-shell">

        <header class="nh-site-viewer-topbar">

          <div>

            <span>
              PROJECT
            </span>

            <small>
              WEBSITE PREVIEW / CONCEPT PROJECT
            </small>

          </div>


          <button
            class="nh-site-viewer-close"
            type="button"
            aria-label="Close project website preview"
          >

            Close

            <span aria-hidden="true">
              ×
            </span>

          </button>

        </header>


        <div class="nh-site-viewer-scroll">

          <div class="nh-site-viewer-browser">

            <div class="nh-site-viewer-browserbar">

              <div aria-hidden="true">

                <i></i>
                <i></i>
                <i></i>

              </div>


              <span>
                project.example
              </span>


              <strong>
                VIEW-ONLY CONCEPT
              </strong>

            </div>


            <div
              class="nh-site-viewer-canvas"
            ></div>

          </div>

        </div>

      </div>
    `;


    document.body.append(
      dialog
    );


    return dialog;

  }


  function ensureViewerShell() {

    let existingViewer =
      document.querySelector(
        `#${VIEWER_ID}`
      );


    /*
     * During this transition the old north-home.js
     * viewer may still create the dialog first.
     *
     * Reuse it now.
     *
     * After that old block is removed, this function
     * creates the shell itself.
     */

    if (!existingViewer) {

      existingViewer =
        createViewerShell();

    }


    existingViewer.classList.add(
      "nh-site-viewer",
      "portfolio-project-viewer"
    );


    existingViewer.dataset.viewerOwner =
      "portfolio-project-viewer";


    return existingViewer;

  }


  /* =======================================================
     GET VIEWER ELEMENTS
  ======================================================= */

  function getViewerElements() {

    viewer =
      ensureViewerShell();


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
     PROJECT METADATA
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


  /* =======================================================
     VIEWER IDENTITY
  ======================================================= */

  function updateViewerIdentity(
    project
  ) {

    if (
      !viewer ||
      !project
    ) {

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
     CONFIGURE PROJECT FRAME
  ======================================================= */

  function configureProjectFrame(
    frame
  ) {

    if (!frame) {

      return;

    }


    /*
     * Hero and Work previews disable scrolling.
     *
     * The full website viewer must allow the visitor to
     * scroll vertically through the project.
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


  /* =======================================================
     MOUNT CANONICAL PROJECT
  ======================================================= */

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
     * Avoid rebuilding the same project unnecessarily.
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
     * The viewer receives the project's registered
     * canonical website source.
     *
     * mountFrame() replaces anything previously inside
     * the viewer canvas.
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
     OPEN PROJECT
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
     * Attempt to reset the embedded website to the top.
     *
     * The sandbox may prevent direct frame access, which
     * is acceptable. The viewer still functions normally.
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
         * No action required.
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


  /* =======================================================
     CLOSE VIEWER
  ======================================================= */

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
     PUBLIC API

     Every current and future project uses this API.

     Examples:

     PortfolioProjectViewer.open("north")
     PortfolioProjectViewer.open("sola")
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
     START
  ======================================================= */

  function start(
    attempt = 0
  ) {

    if (started) {

      return;

    }


    /*
     * The viewer shell no longer depends on north-home.js.
     *
     * We can create it immediately.
     */

    getViewerElements();


    const projectReady =
      window.PortfolioProjects?.has(
        DEFAULT_PROJECT_KEY
      );


    /*
     * North is currently the first completed project.
     *
     * Once another project is registered first, the viewer
     * API itself still works because openProject() mounts
     * any requested registered project.
     */

    if (!projectReady) {

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
     * Prepare North in the viewer so the first launch
     * is immediate.
     */

    mountProject(
      DEFAULT_PROJECT_KEY
    );


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
     PROJECT REGISTRATION EVENTS
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
