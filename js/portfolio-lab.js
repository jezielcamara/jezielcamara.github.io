/* =========================================================
   JEZIEL CAMARA / RESPONSIVE WORK LAB

   ONE PROJECT SOURCE.
   REAL RESPONSIVE VIEWPORT.

   The Lab no longer finds or clones North Home directly
   from the case study.

   Instead it requests the registered project from:

   window.PortfolioProjects

   The existing main.js continues to control:
   - slider value
   - preview width
   - automatic replay animation

   This file controls:
   - canonical project mounting
   - isolated responsive viewport
   - Lab project information
   - project-specific responsive explanation
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const DEFAULT_PROJECT_KEY =
    "north";


  const MIN_VIEWPORT_WIDTH =
    320;


  const MAX_VIEWPORT_WIDTH =
    1100;


  const FALLBACK_VIEWPORT_HEIGHT =
    760;


  const MAX_START_ATTEMPTS =
    90;


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const viewportRange =
    document.querySelector(
      "#viewport-range"
    );


  const viewportOutput =
    document.querySelector(
      "#viewport-output strong"
    );


  const viewportMode =
    document.querySelector(
      "#viewport-mode"
    );


  const responsivePreview =
    document.querySelector(
      "#responsive-preview"
    );


  const labExplainer =
    document.querySelector(
      "#lab-explainer"
    );


  const demoUrl =
    document.querySelector(
      "#demo-url"
    );


  const previewLogo =
    document.querySelector(
      ".preview-logo"
    );


  const labLabel =
    document.querySelector(
      ".lab-portfolio-label"
    );


  const labIntro =
    document.querySelector(
      ".lab-heading-copy p"
    );


  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }


  /* =======================================================
     STATE
  ======================================================= */

  let currentProject =
    null;


  let frameHost =
    null;


  let projectFrame =
    null;


  let frameResizeObserver =
    null;


  let resizeFrame =
    0;


  let started =
    false;


  /* =======================================================
     HELPERS
  ======================================================= */

  function clamp(
    value,
    minimum,
    maximum
  ) {

    return Math.max(
      minimum,
      Math.min(
        value,
        maximum
      )
    );

  }


  function getRequestedWidth() {

    const value =
      Number(
        viewportRange.value
      );


    if (
      !Number.isFinite(
        value
      )
    ) {

      return 1000;

    }


    return clamp(
      value,
      MIN_VIEWPORT_WIDTH,
      MAX_VIEWPORT_WIDTH
    );

  }


  function getProjectKey() {

    const requestedKey =
      responsivePreview.dataset.business;


    if (
      requestedKey &&
      window.PortfolioProjects?.has(
        requestedKey
      )
    ) {

      return requestedKey;

    }


    return DEFAULT_PROJECT_KEY;

  }


  /* =======================================================
     PROJECT INFORMATION
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


  function getViewportState(
    project,
    width
  ) {

    /*
     * Project-specific descriptions belong here only
     * as explanatory portfolio copy.
     *
     * These descriptions DO NOT control the design.
     * The actual project CSS controls the layout.
     */

    if (
      project.key ===
      "north"
    ) {

      if (
        width <=
        480
      ) {

        return {

          label:
            "Phone",

          text:
            "Phone: North Home uses its real mobile layout with simplified navigation, stacked services, and touch-friendly content."

        };

      }


      if (
        width <=
        760
      ) {

        return {

          label:
            "Tablet",

          text:
            "Tablet: North Home uses its real responsive layout with tighter spacing, reduced navigation, and reorganized sections."

        };

      }


      return {

        label:
          "Desktop",

        text:
          "Desktop: North Home uses its full layout with large residential photography, wider content groups, and complete navigation."

      };

    }


    /*
     * Generic fallback for future registered projects.
     */

    if (
      width <=
      480
    ) {

      return {

        label:
          "Phone",

        text:
          `Phone: ${project.name} is shown at its real mobile viewport.`

      };

    }


    if (
      width <=
      760
    ) {

      return {

        label:
          "Tablet",

        text:
          `Tablet: ${project.name} is shown at its real tablet viewport.`

      };

    }


    return {

      label:
        "Desktop",

      text:
        `Desktop: ${project.name} is shown at its full desktop viewport.`

    };

  }


  function updateLabIdentity(
    project
  ) {

    responsivePreview.dataset.business =
      project.key;


    responsivePreview.dataset.labProject =
      project.key;


    if (
      demoUrl
    ) {

      demoUrl.textContent =
        getProjectUrl(
          project
        );

    }


    if (
      previewLogo
    ) {

      previewLogo.textContent =
        `LIVE / ${project.name.toUpperCase()}`;

    }


    if (
      labLabel
    ) {

      labLabel.textContent =
        `${project.name.toUpperCase()} / RESPONSIVE WEBSITE`;

    }


    if (
      labIntro
    ) {

      labIntro.textContent =
        `Drag the slider and watch the ${project.name} website reorganize itself for desktop, tablet, and phone.`;

    }

  }


  /* =======================================================
     FRAME HOST
  ======================================================= */

  function prepareFrameHost() {

    const existingDemo =
      document.querySelector(
        "#demo-site"
      );


    if (!existingDemo) {
      return null;
    }


    /*
     * Keep #demo-site.
     *
     * main.js and existing portfolio styling already
     * expect this element to exist.
     *
     * It becomes a neutral presentation host rather than
     * another copy of project-specific website markup.
     */

    existingDemo.className =
      "demo-site portfolio-lab-project-host";


    existingDemo.replaceChildren();


    existingDemo.style.position =
      "relative";


    existingDemo.style.width =
      "100%";


    existingDemo.style.height =
      "100%";


    existingDemo.style.minWidth =
      "0";


    existingDemo.style.minHeight =
      "0";


    existingDemo.style.overflow =
      "hidden";


    existingDemo.style.background =
      "transparent";


    return existingDemo;

  }


  /* =======================================================
     FRAME SIZE

     The iframe receives the exact width selected by the
     slider.

     If the portfolio canvas itself is physically narrower
     than that requested viewport, only the presentation is
     scaled down.

     The project inside the iframe still believes its
     viewport is the selected width.
  ======================================================= */

  function fitProjectFrame() {

    if (
      !projectFrame ||
      !frameHost
    ) {
      return;
    }


    const requestedWidth =
      getRequestedWidth();


    const availableWidth =
      frameHost.clientWidth;


    const availableHeight =
      frameHost.clientHeight ||
      FALLBACK_VIEWPORT_HEIGHT;


    if (
      !availableWidth ||
      !availableHeight
    ) {
      return;
    }


    const scale =
      Math.min(
        1,
        availableWidth /
        requestedWidth
      );


    /*
     * Give the iframe a real viewport equal to the slider.
     */

    projectFrame.style.position =
      "absolute";


    projectFrame.style.top =
      "0";


    projectFrame.style.left =
      "0";


    projectFrame.style.width =
      `${requestedWidth}px`;


    projectFrame.style.minWidth =
      `${requestedWidth}px`;


    projectFrame.style.maxWidth =
      "none";


    /*
     * Counter the visual scale when calculating height.
     *
     * This keeps the scaled iframe filling the available
     * vertical Lab area while still allowing its own page
     * to scroll vertically.
     */

    projectFrame.style.height =
      `${availableHeight / scale}px`;


    projectFrame.style.margin =
      "0";


    projectFrame.style.border =
      "0";


    projectFrame.style.transformOrigin =
      "top left";


    projectFrame.style.transform =
      `scale(${scale})`;


    /*
     * Unlike decorative hero/work previews, the Lab iframe
     * may receive pointer input so visitors can vertically
     * scroll through the responsive website.
     *
     * Its sandbox prevents project actions/scripts.
     * Controls inside the frame are already non-interactive.
     */

    projectFrame.style.pointerEvents =
      "auto";


    frameHost.dataset.projectViewportWidth =
      String(
        Math.round(
          requestedWidth
        )
      );


    frameHost.dataset.projectPreviewScale =
      scale.toFixed(
        4
      );

  }


  /* =======================================================
     RESPONSIVE COPY
  ======================================================= */

  function applyProjectState() {

    if (
      !currentProject
    ) {
      return;
    }


    const width =
      getRequestedWidth();


    const state =
      getViewportState(
        currentProject,
        width
      );


    if (
      viewportMode &&
      viewportMode.textContent !==
        state.label
    ) {

      viewportMode.textContent =
        state.label;

    }


    if (
      labExplainer &&
      labExplainer.textContent.trim() !==
        state.text
    ) {

      labExplainer.textContent =
        state.text;

    }


    fitProjectFrame();

  }


  /* =======================================================
     FRAME RESIZE WATCHER
  ======================================================= */

  function watchFrameHost() {

    frameResizeObserver?.disconnect();


    if (
      "ResizeObserver" in window
    ) {

      frameResizeObserver =
        new ResizeObserver(
          () => {

            cancelAnimationFrame(
              resizeFrame
            );


            resizeFrame =
              requestAnimationFrame(
                fitProjectFrame
              );

          }
        );


      frameResizeObserver.observe(
        frameHost
      );


      responsivePreview &&
      frameResizeObserver.observe(
        responsivePreview
      );


      return;

    }


    window.addEventListener(
      "resize",
      () => {

        cancelAnimationFrame(
          resizeFrame
        );


        resizeFrame =
          requestAnimationFrame(
            fitProjectFrame
          );

      },
      {
        passive:
          true
      }
    );

  }


  /* =======================================================
     MOUNT CANONICAL PROJECT
  ======================================================= */

  function mountProjectLab(
    project
  ) {

    if (
      !window.PortfolioProjects ||
      typeof window.PortfolioProjects.mountFrame !==
        "function"
    ) {

      return false;

    }


    frameHost =
      prepareFrameHost();


    if (!frameHost) {
      return false;
    }


    currentProject =
      project;


    updateLabIdentity(
      project
    );


    const initialWidth =
      getRequestedWidth();


    /*
     * THIS IS THE IMPORTANT ARCHITECTURAL CHANGE.
     *
     * The Lab no longer searches:
     *
     * .north-case-study .nh-site
     *
     * It requests the registered canonical project.
     */

    projectFrame =
      window.PortfolioProjects.mountFrame(
        project.key,
        frameHost,
        {

          instance:
            "responsive-lab",

          viewport:
            "responsive",

          width:
            initialWidth,

          height:
            FALLBACK_VIEWPORT_HEIGHT,

          label:
            `${project.name} responsive website preview`

        }
      );


    projectFrame.classList.add(
      "portfolio-lab-project-frame"
    );


    frameHost.dataset.canonicalLabPreview =
      "true";


    requestAnimationFrame(
      () => {

        applyProjectState();
        watchFrameHost();

      }
    );


    return true;

  }


  /* =======================================================
     FIND REGISTERED PROJECT
  ======================================================= */

  function getLabProject() {

    if (
      !window.PortfolioProjects
    ) {
      return null;
    }


    const key =
      getProjectKey();


    return window.PortfolioProjects.get(
      key
    );

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
      getLabProject();


    if (!project) {

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


    if (
      mountProjectLab(
        project
      )
    ) {

      started =
        true;

    }

  }


  /* =======================================================
     MANUAL SLIDER

     main.js changes the outer preview width.
     We change the real iframe viewport to the same value.
  ======================================================= */

  viewportRange.addEventListener(
    "input",
    () => {

      requestAnimationFrame(
        applyProjectState
      );

    }
  );


  /* =======================================================
     AUTOMATIC REPLAY

     main.js changes #viewport-output while replaying the
     slider animation.

     Watching that output keeps the iframe viewport exactly
     synchronized with the replay.
  ======================================================= */

  if (
    viewportOutput &&
    "MutationObserver" in window
  ) {

    let observerFrame =
      0;


    const observer =
      new MutationObserver(
        () => {

          cancelAnimationFrame(
            observerFrame
          );


          observerFrame =
            requestAnimationFrame(
              applyProjectState
            );

        }
      );


    observer.observe(
      viewportOutput,
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


  /* =======================================================
     PROJECT REGISTRATION EVENTS

     portfolio-lab.js loads before project-north.js.

     Waiting for registry events removes any dependency on
     North Home's case-study DOM creation order.
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
     PAGE RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      cancelAnimationFrame(
        resizeFrame
      );


      resizeFrame =
        requestAnimationFrame(
          applyProjectState
        );

    },
    {
      passive:
        true
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
