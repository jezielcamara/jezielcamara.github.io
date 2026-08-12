/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PROJECT VIEWER

   Compatibility filename:
   js/north-home-repair.js

   This file is shared portfolio infrastructure.

   RESPONSIBILITY:
   - create one generic website viewer
   - display registered project metadata
   - mount any registered canonical project
   - provide an interactive full website viewport
   - provide PortfolioProjectViewer

   NOT RESPONSIBLE FOR:
   - project HTML
   - project behavior
   - project metadata definitions
   - project-specific URL mappings
   - project-specific viewer logic

   Project definitions come from:

   window.PortfolioProjects
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const VIEWER_ID =
    "portfolio-project-viewer";


  const VIEWER_STYLE_ID =
    "portfolio-project-viewer-styles";


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


  let projectFrame =
    null;


  let currentProjectKey =
    null;


  let returnFocusElement =
    null;


  let started =
    false;


  /* =======================================================
     VIEWER CSS

     This styles only portfolio presentation chrome.

     Nothing inside the registered project is redesigned.
  ======================================================= */

  const viewerCSS = `

    /* =====================================================
       BODY STATE
    ===================================================== */

    body.portfolio-viewer-open {
      overflow:
        hidden;
    }


    /* =====================================================
       VIEWER
    ===================================================== */

    .portfolio-project-viewer {
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


    .portfolio-project-viewer::backdrop {
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


    .portfolio-project-viewer[open] {
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

    .portfolio-project-viewer-shell {
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

    .portfolio-project-viewer-topbar {
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


    .portfolio-project-viewer-identity {
      min-width:
        0;

      display:
        flex;

      align-items:
        center;

      gap:
        16px;
    }


    .portfolio-project-viewer-title {
      color:
        #fff;

      font-size:
        .66rem;

      font-weight:
        600;

      white-space:
        nowrap;
    }


    .portfolio-project-viewer-description {
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


    .portfolio-project-viewer-close {
      flex:
        0
        0
        auto;

      gap:
        12px;

      padding:
        10px
        0;

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;
    }


    .portfolio-project-viewer-close
    span {
      font-size:
        1rem;

      font-weight:
        400;
    }


    /* =====================================================
       VIEWER BODY
    ===================================================== */

    .portfolio-project-viewer-body {
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

    .portfolio-project-viewer-browser {
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


    .portfolio-project-viewer-browserbar {
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


    .portfolio-project-viewer-dots {
      display:
        flex;

      gap:
        5px;
    }


    .portfolio-project-viewer-dots
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


    .portfolio-project-viewer-url {
      justify-self:
        center;
    }


    .portfolio-project-viewer-state {
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

    .portfolio-project-viewer-canvas {
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


    .portfolio-project-viewer-canvas
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
       SELECTED WORK LAUNCHER

       These generic positioning rules remain here so this
       final architecture pass does not require another CSS
       migration.

       They contain no project-specific behavior.
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


    .project-view-button {
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
    }


    /* =====================================================
       LAPTOP
    ===================================================== */

    @media (
      max-width: 1100px
    ) {

      .portfolio-project-viewer {
        width:
          86vw !important;

        height:
          88vh !important;
      }

    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (
      max-width: 700px
    ) {

      .portfolio-project-viewer {
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


      .portfolio-project-viewer::backdrop {
        background:
          rgba(
            0,
            0,
            0,
            .93
          ) !important;
      }


      .portfolio-project-viewer-topbar {
        min-height:
          52px;

        padding:
          0
          13px;
      }


      .portfolio-project-viewer-description {
        display:
          none;
      }


      .portfolio-project-viewer-body {
        padding:
          7px;
      }


      .portfolio-project-viewer-browser {
        border-radius:
          10px;
      }


      .portfolio-project-viewer-browserbar {
        grid-template-columns:
          1fr
          auto;
      }


      .portfolio-project-viewer-state {
        display:
          none;
      }


      .portfolio-project-viewer-url {
        justify-self:
          end;
      }


      .project-view-button {
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

      .portfolio-project-viewer[open] {
        animation:
          none !important;
      }

    }

  `;


  /* =======================================================
     STYLE INSTALLATION
  ======================================================= */

  function addViewerStyles() {

    document
      .querySelector(
        `#${VIEWER_STYLE_ID}`
      )
      ?.remove();


    const style =
      document.createElement(
        "style"
      );


    style.id =
      VIEWER_STYLE_ID;


    style.textContent =
      viewerCSS;


    document.head.append(
      style
    );

  }


  /* =======================================================
     VIEWER SHELL
  ======================================================= */

  function createViewerShell() {

    const dialog =
      document.createElement(
        "dialog"
      );


    dialog.id =
      VIEWER_ID;


    dialog.className =
      "portfolio-project-viewer";


    dialog.setAttribute(
      "aria-label",
      "Project website preview"
    );


    dialog.dataset.viewerOwner =
      "portfolio-project-viewer";


    dialog.innerHTML = `
      <div class="portfolio-project-viewer-shell">

        <header class="portfolio-project-viewer-topbar">

          <div class="portfolio-project-viewer-identity">

            <span class="portfolio-project-viewer-title">
              PROJECT
            </span>

            <small class="portfolio-project-viewer-description">
              WEBSITE PREVIEW / CONCEPT PROJECT
            </small>

          </div>


          <button
            class="portfolio-project-viewer-close"
            type="button"
            aria-label="Close project website preview"
          >

            Close

            <span aria-hidden="true">
              ×
            </span>

          </button>

        </header>


        <div class="portfolio-project-viewer-body">

          <div class="portfolio-project-viewer-browser">

            <div class="portfolio-project-viewer-browserbar">

              <div
                class="portfolio-project-viewer-dots"
                aria-hidden="true"
              >
                <i></i>
                <i></i>
                <i></i>
              </div>


              <span class="portfolio-project-viewer-url">
                project.example
              </span>


              <strong class="portfolio-project-viewer-state">
                CONCEPT PROJECT
              </strong>

            </div>


            <div
              class="portfolio-project-viewer-canvas"
              aria-live="polite"
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


    if (!existingViewer) {

      existingViewer =
        createViewerShell();

    }


    return existingViewer;

  }


  /* =======================================================
     ELEMENT LOOKUP
  ======================================================= */

  function getViewerElements() {

    viewer =
      ensureViewerShell();


    canvas =
      viewer.querySelector(
        ".portfolio-project-viewer-canvas"
      );


    return Boolean(
      viewer &&
      canvas
    );

  }


  /* =======================================================
     PROJECT REGISTRY
  ======================================================= */

  function getRegistry() {

    const registry =
      window.PortfolioProjects;


    if (
      !registry ||
      typeof registry.get !==
        "function" ||
      typeof registry.mountFrame !==
        "function"
    ) {

      return null;

    }


    return registry;

  }


  /* =======================================================
     VIEWER IDENTITY

     All displayed information now comes from the project's
     registered metadata.

     There are no project-specific URL or label mappings
     inside the viewer.
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
        ".portfolio-project-viewer-title"
      );


    const description =
      viewer.querySelector(
        ".portfolio-project-viewer-description"
      );


    const url =
      viewer.querySelector(
        ".portfolio-project-viewer-url"
      );


    const state =
      viewer.querySelector(
        ".portfolio-project-viewer-state"
      );


    const closeButton =
      viewer.querySelector(
        ".portfolio-project-viewer-close"
      );


    if (title) {

      title.textContent =
        project.name.toUpperCase();

    }


    if (description) {

      description.textContent =
        project.viewerDescription;

    }


    if (url) {

      url.textContent =
        project.url;

    }


    if (state) {

      /*
       * A registered initializer means the full viewer can
       * run the canonical project's interactions.

       * Projects without an initializer retain their
       * registered presentation-state label.
       */

      state.textContent =
        project.initialize
          ? "INTERACTIVE CONCEPT"
          : project.viewerState;

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
     FRAME PRESENTATION
  ======================================================= */

  function configureProjectFrame(
    frame,
    project
  ) {

    if (!frame) {

      return;

    }


    /*
     * Decorative previews elsewhere are view-only.

     * The full viewer is intentionally interactive and
     * scrollable.
     */

    frame.removeAttribute(
      "aria-hidden"
    );


    frame.setAttribute(
      "tabindex",
      "0"
    );


    frame.setAttribute(
      "scrolling",
      "yes"
    );


    if (project) {

      frame.setAttribute(
        "aria-label",
        `${project.name} interactive website`
      );

    }


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
     FRAME READY STATE
  ======================================================= */

  function markFrameLoading() {

    if (!canvas) {

      return;

    }


    canvas.setAttribute(
      "aria-busy",
      "true"
    );


    canvas.dataset.viewerFrameState =
      "loading";

  }


  function markFrameReady() {

    if (!canvas) {

      return;

    }


    canvas.removeAttribute(
      "aria-busy"
    );


    canvas.dataset.viewerFrameState =
      "ready";

  }


  /* =======================================================
     MOUNT PROJECT

     The website viewer is the interactive presentation
     environment.

     It requests the exact same project source as Hero,
     Work, Lab and the case study, but enables the registered
     initialize() behavior.
  ======================================================= */

  function mountProject(
    key
  ) {

    if (!key) {

      return false;

    }


    const registry =
      getRegistry();


    if (!registry) {

      return false;

    }


    const project =
      registry.get(
        key
      );


    if (!project) {

      return false;

    }


    if (
      !getViewerElements()
    ) {

      return false;

    }


    const existingFrame =
      canvas.querySelector(
        ".portfolio-project-frame"
      );


    /*
     * Reopening the same project can reuse its live iframe
     * and preserve the initialized project instance.
     */

    if (
      currentProjectKey ===
        project.key &&
      existingFrame
    ) {

      projectFrame =
        existingFrame;


      configureProjectFrame(
        projectFrame,
        project
      );


      updateViewerIdentity(
        project
      );


      markFrameReady();


      return true;

    }


    updateViewerIdentity(
      project
    );


    markFrameLoading();


    projectFrame =
      registry.mountFrame(
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


          /*
           * This is the key difference between the full
           * website viewer and decorative previews.

           * PortfolioProjects will attach the registered
           * project's canonical initialize() function when
           * the isolated viewport is ready.
           */

          interactive:
            true,

          label:
            `${project.name} interactive website viewer`

        }
      );


    configureProjectFrame(
      projectFrame,
      project
    );


    currentProjectKey =
      project.key;


    canvas.dataset.canonicalViewer =
      "true";


    canvas.dataset.mountedProject =
      project.key;


    projectFrame.addEventListener(
      "load",
      markFrameReady,
      {
        once:
          true
      }
    );


    return true;

  }


  /* =======================================================
     RESET PROJECT SCROLL
  ======================================================= */

  function resetFrameScroll() {

    if (!projectFrame) {

      return;

    }


    try {

      projectFrame
        .contentWindow
        ?.scrollTo(
          0,
          0
        );

    } catch (error) {

      /*
       * Frame scrolling remains usable even if direct
       * programmatic access is restricted.
       */

    }

  }


  /* =======================================================
     OPEN
  ======================================================= */

  function openProject(
    key
  ) {

    if (!key) {

      return false;

    }


    const activeElement =
      document.activeElement;


    if (
      activeElement instanceof
        HTMLElement &&
      activeElement !==
        document.body
    ) {

      returnFocusElement =
        activeElement;

    } else {

      returnFocusElement =
        null;

    }


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


    if (!viewer.open) {

      viewer.showModal();

    }


    document.body.classList.add(
      "portfolio-viewer-open"
    );


    requestAnimationFrame(
      resetFrameScroll
    );


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
     RESTORE FOCUS
  ======================================================= */

  function restoreFocus() {

    const target =
      returnFocusElement;


    returnFocusElement =
      null;


    if (
      !target ||
      !target.isConnected ||
      typeof target.focus !==
        "function"
    ) {

      return;

    }


    requestAnimationFrame(
      () => {

        target.focus({
          preventScroll:
            true
        });

      }
    );

  }


  /* =======================================================
     CLOSE
  ======================================================= */

  function closeViewer() {

    if (
      viewer?.open
    ) {

      viewer.close();

    } else {

      document.body.classList.remove(
        "portfolio-viewer-open"
      );


      restoreFocus();

    }

  }


  /* =======================================================
     PUBLIC API

     Every portfolio project uses the same interface:

     PortfolioProjectViewer.open("north")
     PortfolioProjectViewer.open("sola")
     PortfolioProjectViewer.open("avance")
  ======================================================= */

  window.PortfolioProjectViewer =
    Object.freeze({

      open:
        openProject,

      close:
        closeViewer,

      mount:
        mountProject,

      getCurrentProject() {

        return currentProjectKey;

      }

    });


  /* =======================================================
     VIEWER EVENTS
  ======================================================= */

  function bindViewerEvents() {

    if (
      !viewer ||
      viewer.dataset.viewerEventsBound ===
        "true"
    ) {

      return;

    }


    viewer.dataset.viewerEventsBound =
      "true";


    const closeButton =
      viewer.querySelector(
        ".portfolio-project-viewer-close"
      );


    closeButton?.addEventListener(
      "click",
      closeViewer
    );


    /*
     * Native Escape handling.
     */

    viewer.addEventListener(
      "cancel",
      (event) => {

        event.preventDefault();

        closeViewer();

      }
    );


    /*
     * Clicking the dialog backdrop closes the viewer.

     * Clicks inside the browser frame do not.
     */

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
          "portfolio-viewer-open"
        );


        restoreFocus();

      }
    );

  }


  /* =======================================================
     START

     The viewer is generic infrastructure and does not wait
     for any specific project.

     Projects may register before or after viewer startup.
  ======================================================= */

  function start() {

    if (started) {

      return;

    }


    addViewerStyles();


    if (
      !getViewerElements()
    ) {

      return;

    }


    bindViewerEvents();


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
     LOAD
  ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      start,
      {
        once:
          true
      }
    );

  } else {

    start();

  }

})();
