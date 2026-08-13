/* =========================================================
   JEZIEL CAMARA / RESPONSIVE LAB

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - select a published Lab-enabled project
   - mount the canonical project frame
   - own the responsive width slider
   - own viewport labels and explanatory copy
   - own replay animation
   - own responsive project-frame sizing
   - own Lab project identity
   - lazily activate the Lab near the viewport
   - clean up all Lab resources

   NOT RESPONSIBLE FOR
   - project registration
   - project-specific HTML
   - project-specific CSS
   - Hero rendering
   - Work rendering
   - case studies
   - website viewer
   - page-wide motion

   ARCHITECTURE

   ProjectRegistry
        ↓
   Lab
        ↓
   one published Lab-enabled project
        ↓
   ProjectFrame
        ↓
   genuine responsive viewport

   IMPORTANT

   The slider changes the iframe's REAL viewport width.

   The project is not redesigned or reconstructed for
   the Lab.

   The presentation frame changes.

   The project design does not.
========================================================= */


import {
  ProjectRegistry
} from "../core/project-registry.js";


import {
  ProjectFrame
} from "../core/project-frame.js";


/* =========================================================
   SETTINGS
========================================================= */

const FALLBACK_VIEWPORT_HEIGHT =
  760;


const LAB_ROOT_MARGIN =
  "700px 0px 700px 0px";


const DEFAULT_MIN_WIDTH =
  320;


const DEFAULT_MAX_WIDTH =
  1100;


const DEFAULT_WIDTH =
  1000;


const DEFAULT_PHONE_MAX =
  480;


const DEFAULT_TABLET_MAX =
  760;


/* =========================================================
   ELEMENTS
========================================================= */

function getLabElements() {

  const section =
    document.querySelector(
      "#lab"
    );


  const viewportRange =
    section?.querySelector(
      "#viewport-range"
    );


  const viewportOutput =
    section?.querySelector(
      "#viewport-output strong"
    );


  const viewportMode =
    section?.querySelector(
      "#viewport-mode"
    );


  const responsivePreview =
    section?.querySelector(
      "[data-lab-preview]"
    ) ||
    section?.querySelector(
      "#responsive-preview"
    );


  const frameHost =
    section?.querySelector(
      "[data-lab-project-host]"
    ) ||
    section?.querySelector(
      "#demo-site"
    );


  const labExplainer =
    section?.querySelector(
      "#lab-explainer"
    );


  const replayButton =
    section?.querySelector(
      "#replay-lab"
    );


  const demoUrl =
    section?.querySelector(
      "#demo-url"
    );


  const previewLogo =
    section?.querySelector(
      "[data-lab-preview-logo]"
    ) ||
    section?.querySelector(
      ".preview-logo"
    );


  const labLabel =
    section?.querySelector(
      "[data-lab-project-label]"
    ) ||
    section?.querySelector(
      ".lab-portfolio-label"
    );


  const labIntro =
    section?.querySelector(
      "[data-lab-intro]"
    ) ||
    section?.querySelector(
      ".lab-heading-copy p"
    );


  if (
    !section ||
    !viewportRange ||
    !responsivePreview ||
    !frameHost
  ) {

    return null;

  }


  return {

    section,

    viewportRange,

    viewportOutput,

    viewportMode,

    responsivePreview,

    frameHost,

    labExplainer,

    replayButton,

    demoUrl,

    previewLogo,

    labLabel,

    labIntro

  };

}


/* =========================================================
   HELPERS
========================================================= */

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


function finiteNumber(
  value,
  fallback
) {

  const parsed =
    Number(
      value
    );


  return Number.isFinite(
    parsed
  )
    ? parsed
    : fallback;

}


/* =========================================================
   LAB PROJECT COLLECTION

   Publication and Lab eligibility are separate.

   A project must be BOTH:
   - published
   - explicitly Lab-enabled

   Future projects therefore do not accidentally enter the
   responsive demo simply because they are published.
========================================================= */

function getLabProjects() {

  return ProjectRegistry
    .published()
    .filter(
      (project) =>
        project.lab.enabled ===
        true
    );

}


/* =========================================================
   PROJECT SELECTION

   Priority:

   1. Explicit Lab project:
      data-lab-project="..."

   2. Current Hero featured project, when Lab-enabled.

   3. First published Lab-enabled project.

   Because app.js initializes Hero before Lab, the second
   option allows the Lab to demonstrate the same project
   currently featured above.
========================================================= */

function chooseLabProject(
  section
) {

  const projects =
    getLabProjects();


  if (
    !projects.length
  ) {

    return null;

  }


  const requestedKey =
    String(
      section.dataset
        .labProject ||
      ""
    )
      .trim()
      .toLowerCase();


  if (requestedKey) {

    const requested =
      projects.find(
        (project) =>
          project.key ===
          requestedKey
      );


    if (requested) {

      return requested;

    }

  }


  const featuredKey =
    String(
      document.documentElement
        .dataset
        .featuredProject ||
      ""
    )
      .trim()
      .toLowerCase();


  if (featuredKey) {

    const featured =
      projects.find(
        (project) =>
          project.key ===
          featuredKey
      );


    if (featured) {

      return featured;

    }

  }


  return projects[0];

}


/* =========================================================
   PROJECT WIDTH CONFIGURATION
========================================================= */

function getProjectWidths(
  project
) {

  const minimum =
    finiteNumber(
      project.lab.minWidth,
      DEFAULT_MIN_WIDTH
    );


  const maximum =
    Math.max(
      minimum,
      finiteNumber(
        project.lab.maxWidth,
        DEFAULT_MAX_WIDTH
      )
    );


  const preferred =
    finiteNumber(
      project.lab.defaultWidth,
      DEFAULT_WIDTH
    );


  const defaultWidth =
    clamp(
      preferred,
      minimum,
      maximum
    );


  return {

    minimum,

    maximum,

    defaultWidth

  };

}


/* =========================================================
   RESPONSIVE STATE

   The project manifest supplies its own explanation copy.

   Lab never contains:

   if (project.key === "north")
   if (project.key === "sola")

   No project-specific switch statements exist here.
========================================================= */

function getViewportState(
  project,
  width
) {

  const phone =
    project.lab.phone ||
    {};


  const tablet =
    project.lab.tablet ||
    {};


  const desktop =
    project.lab.desktop ||
    {};


  const phoneMaximum =
    finiteNumber(
      phone.maxWidth,
      DEFAULT_PHONE_MAX
    );


  const tabletMaximum =
    finiteNumber(
      tablet.maxWidth,
      DEFAULT_TABLET_MAX
    );


  if (
    width <=
    phoneMaximum
  ) {

    return {

      key:
        "phone",

      label:
        phone.label ||
        "Phone",

      text:
        phone.text ||
        `Phone: ${project.name} is shown at its real mobile viewport.`

    };

  }


  if (
    width <=
    tabletMaximum
  ) {

    return {

      key:
        "tablet",

      label:
        tablet.label ||
        "Tablet",

      text:
        tablet.text ||
        `Tablet: ${project.name} is shown at its real tablet viewport.`

    };

  }


  return {

    key:
      "desktop",

    label:
      desktop.label ||
      "Desktop",

    text:
      desktop.text ||
      `Desktop: ${project.name} is shown at its full desktop viewport.`

  };

}


/* =========================================================
   LAB HOST
========================================================= */

function prepareFrameHost(
  host
) {

  host.className =
    "demo-site portfolio-lab-project-host";


  host.style.position =
    "relative";


  host.style.width =
    "100%";


  host.style.height =
    "100%";


  host.style.minWidth =
    "0";


  host.style.minHeight =
    "0";


  host.style.display =
    "block";


  host.style.overflow =
    "hidden";


  host.style.margin =
    "0";


  host.style.padding =
    "0";


  host.style.background =
    "transparent";

}


/* =========================================================
   INITIALIZE LAB
========================================================= */

export function initLab() {

  const elements =
    getLabElements();


  if (!elements) {

    return null;

  }


  const {

    section,

    viewportRange,

    viewportOutput,

    viewportMode,

    responsivePreview,

    frameHost,

    labExplainer,

    replayButton,

    demoUrl,

    previewLogo,

    labLabel,

    labIntro

  } =
    elements;


  const controller =
    new AbortController();


  const {
    signal
  } =
    controller;


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  let currentProject =
    chooseLabProject(
      section
    );


  let projectFrame =
    null;


  let activated =
    false;


  let destroyed =
    false;


  let userInteracted =
    false;


  let demoPlayed =
    false;


  let mountObserver =
    null;


  let demoObserver =
    null;


  let resizeObserver =
    null;


  let resizeFrame =
    0;


  let animationFrame =
    0;


  let animationResolve =
    null;


  let pauseTimer =
    0;


  let pauseResolve =
    null;


  let animationToken =
    0;


  if (!currentProject) {

    console.warn(
      "[Lab] No published Lab-enabled project is registered."
    );


    section.dataset.labState =
      "empty";


    return Object.freeze({

      project:
        null,

      destroy() {

        controller.abort();

      }

    });

  }


  /* =======================================================
     PROJECT IDENTITY
  ======================================================= */

  function updateProjectIdentity() {

    if (
      !currentProject
    ) {

      return;

    }


    section.dataset.labProject =
      currentProject.key;


    responsivePreview.dataset.labProject =
      currentProject.key;


    responsivePreview.dataset.business =
      currentProject.key;


    if (demoUrl) {

      demoUrl.textContent =
        currentProject.url;

    }


    if (previewLogo) {

      previewLogo.textContent =
        `LIVE / ${currentProject.name.toUpperCase()}`;

    }


    if (labLabel) {

      labLabel.textContent =
        `${currentProject.name.toUpperCase()} / RESPONSIVE WEBSITE`;

    }


    if (labIntro) {

      labIntro.textContent =
        currentProject.lab.intro ||
        `Drag the slider and watch the ${currentProject.name} website reorganize itself for desktop, tablet, and phone.`;

    }

  }


  /* =======================================================
     RANGE CONFIGURATION
  ======================================================= */

  function configureRange(
    resetValue = true
  ) {

    if (
      !currentProject
    ) {

      return;

    }


    const widths =
      getProjectWidths(
        currentProject
      );


    viewportRange.min =
      String(
        Math.round(
          widths.minimum
        )
      );


    viewportRange.max =
      String(
        Math.round(
          widths.maximum
        )
      );


    if (
      resetValue
    ) {

      viewportRange.value =
        String(
          Math.round(
            widths.defaultWidth
          )
        );

    } else {

      viewportRange.value =
        String(
          Math.round(
            clamp(
              Number(
                viewportRange.value
              ),
              widths.minimum,
              widths.maximum
            )
          )
        );

    }

  }


  /* =======================================================
     CURRENT WIDTH
  ======================================================= */

  function getRequestedWidth() {

    if (
      !currentProject
    ) {

      return DEFAULT_WIDTH;

    }


    const widths =
      getProjectWidths(
        currentProject
      );


    return clamp(
      finiteNumber(
        viewportRange.value,
        widths.defaultWidth
      ),
      widths.minimum,
      widths.maximum
    );

  }


  /* =======================================================
     FRAME FIT

     The iframe receives the real width selected by the
     slider.

     When the visitor's physical portfolio canvas is
     narrower than the requested project viewport, the
     iframe is visually scaled down.

     Its internal CSS still receives the requested width.
  ======================================================= */

  function fitProjectFrame(
    widthOverride
  ) {

    if (
      !projectFrame ||
      !currentProject
    ) {

      return;

    }


    const widths =
      getProjectWidths(
        currentProject
      );


    const requestedWidth =
      clamp(
        finiteNumber(
          widthOverride,
          getRequestedWidth()
        ),
        widths.minimum,
        widths.maximum
      );


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
     * Compensate for visual scaling so the embedded
     * project still fills the available vertical Lab area.
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
     * Browse mode intentionally permits pointer input for
     * scrolling the website.

     The ProjectFrame root itself remains inert, so project
     links, buttons and forms cannot activate.
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
     RESPONSIVE OUTPUT
  ======================================================= */

  function updateViewportPresentation(
    widthOverride
  ) {

    if (
      !currentProject
    ) {

      return;

    }


    const widths =
      getProjectWidths(
        currentProject
      );


    const width =
      clamp(
        finiteNumber(
          widthOverride,
          getRequestedWidth()
        ),
        widths.minimum,
        widths.maximum
      );


    const roundedWidth =
      Math.round(
        width
      );


    const state =
      getViewportState(
        currentProject,
        width
      );


    /*
     * This controls the visible browser-frame width in the
     * portfolio.
     */

    responsivePreview.style.setProperty(
      "--preview-width",
      `${width}px`
    );


    viewportRange.value =
      String(
        roundedWidth
      );


    if (viewportOutput) {

      viewportOutput.textContent =
        `${roundedWidth}px`;

    }


    if (viewportMode) {

      viewportMode.textContent =
        state.label;

    }


    if (labExplainer) {

      labExplainer.textContent =
        state.text;

    }


    section.dataset.labViewport =
      state.key;


    responsivePreview.dataset.viewportMode =
      state.key;


    fitProjectFrame(
      width
    );

  }


  /* =======================================================
     RESIZE SCHEDULING
  ======================================================= */

  function scheduleFrameFit() {

    if (
      destroyed ||
      resizeFrame
    ) {

      return;

    }


    resizeFrame =
      window.requestAnimationFrame(
        () => {

          resizeFrame =
            0;


          fitProjectFrame();

        }
      );

  }


  /* =======================================================
     PROJECT FRAME
  ======================================================= */

  function mountCurrentProject() {

    if (
      destroyed ||
      !currentProject
    ) {

      return null;

    }


    if (
      projectFrame
    ) {

      return projectFrame;

    }


    prepareFrameHost(
      frameHost
    );


    const initialWidth =
      getRequestedWidth();


    section.dataset.labState =
      "loading";


    frameHost.dataset.canonicalLabPreview =
      "true";


    try {

      projectFrame =
        ProjectFrame.mount(
          currentProject.key,
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

            scrollable:
              true,

            loading:
              "lazy",

            label:
              `${currentProject.name} responsive website preview`

          }
        );


      projectFrame.classList.add(
        "portfolio-lab-project-frame"
      );


      /*
       * north-lab.css currently applies permanent
       * will-change: transform.
       *
       * Override it until a replay animation is actually
       * running. The CSS compatibility file will be cleaned
       * up during the later stylesheet architecture pass.
       */

      projectFrame.style.willChange =
        "auto";


      updateViewportPresentation(
        initialWidth
      );


      ProjectFrame
        .whenReady(
          projectFrame
        )
        .then(
          ({
            error
          }) => {

            if (
              destroyed ||
              !projectFrame
            ) {

              return;

            }


            section.dataset.labState =
              error
                ? "error"
                : "ready";

          }
        );


      return projectFrame;

    } catch (error) {

      section.dataset.labState =
        "error";


      console.error(
        `[Lab] Could not mount "${currentProject.key}".`,
        error
      );


      projectFrame =
        null;


      return null;

    }

  }


  /* =======================================================
     ACTIVATE

     The Lab frame is not created on initial page load.

     Activation occurs when the section approaches the
     viewport or when a caller explicitly requests it.
  ======================================================= */

  function activate() {

    if (
      destroyed
    ) {

      return null;

    }


    if (!activated) {

      activated =
        true;


      section.dataset.labActivated =
        "true";


      mountObserver?.disconnect();


      mountObserver =
        null;

    }


    return mountCurrentProject();

  }


  /* =======================================================
     PROJECT CHANGE

     Generic API for future Lab controls.

     No project-specific buttons are required by the current
     design, but the controller already supports changing the
     Lab project without rewriting this module.
  ======================================================= */

  function setProject(
    key
  ) {

    const normalizedKey =
      String(
        key ||
        ""
      )
        .trim()
        .toLowerCase();


    const project =
      getLabProjects()
        .find(
          (candidate) =>
            candidate.key ===
            normalizedKey
        );


    if (!project) {

      return false;

    }


    if (
      currentProject?.key ===
      project.key
    ) {

      return true;

    }


    cancelDemo();


    currentProject =
      project;


    if (projectFrame) {

      ProjectFrame.unmount(
        frameHost
      );


      projectFrame =
        null;

    }


    updateProjectIdentity();


    configureRange(
      true
    );


    updateViewportPresentation();


    if (activated) {

      mountCurrentProject();

    }


    return true;

  }


  /* =======================================================
     ANIMATION STATE
  ======================================================= */

  function setAnimationState(
    active
  ) {

    section.dataset.labAnimating =
      active
        ? "true"
        : "false";


    if (projectFrame) {

      projectFrame.style.willChange =
        active
          ? "transform"
          : "auto";

    }

  }


  /* =======================================================
     CANCEL REPLAY
  ======================================================= */

  function cancelDemo() {

    animationToken +=
      1;


    if (
      animationFrame
    ) {

      window.cancelAnimationFrame(
        animationFrame
      );


      animationFrame =
        0;

    }


    if (
      animationResolve
    ) {

      const resolve =
        animationResolve;


      animationResolve =
        null;


      resolve(
        false
      );

    }


    if (
      pauseTimer
    ) {

      window.clearTimeout(
        pauseTimer
      );


      pauseTimer =
        0;

    }


    if (
      pauseResolve
    ) {

      const resolve =
        pauseResolve;


      pauseResolve =
        null;


      resolve(
        false
      );

    }


    setAnimationState(
      false
    );

  }


  /* =======================================================
     WIDTH ANIMATION
  ======================================================= */

  function animateWidth(
    from,
    to,
    duration,
    token
  ) {

    return new Promise(
      (resolve) => {

        const start =
          performance.now();


        animationResolve =
          resolve;


        function finish(
          completed
        ) {

          animationFrame =
            0;


          animationResolve =
            null;


          resolve(
            completed
          );

        }


        function frame(
          now
        ) {

          if (
            destroyed ||
            token !==
              animationToken
          ) {

            finish(
              false
            );


            return;

          }


          const raw =
            Math.min(
              1,
              (
                now -
                start
              ) /
              duration
            );


          const eased =
            raw <
            .5
              ? 4 *
                raw *
                raw *
                raw
              : 1 -
                Math.pow(
                  -2 *
                  raw +
                  2,
                  3
                ) /
                2;


          updateViewportPresentation(
            from +
            (
              to -
              from
            ) *
            eased
          );


          if (
            raw <
            1
          ) {

            animationFrame =
              window.requestAnimationFrame(
                frame
              );


            return;

          }


          finish(
            true
          );

        }


        animationFrame =
          window.requestAnimationFrame(
            frame
          );

      }
    );

  }


  /* =======================================================
     REPLAY PAUSE
  ======================================================= */

  function waitForReplayPause(
    duration,
    token
  ) {

    return new Promise(
      (resolve) => {

        pauseResolve =
          resolve;


        pauseTimer =
          window.setTimeout(
            () => {

              pauseTimer =
                0;


              pauseResolve =
                null;


              resolve(
                !destroyed &&
                token ===
                  animationToken
              );

            },
            duration
          );

      }
    );

  }


  /* =======================================================
     RUN RESPONSIVE DEMO

     Current production motion is preserved:

     current width
        ↓
     phone
        ↓
     short pause
        ↓
     wide desktop

     Project-specific CSS responds naturally at every width.
  ======================================================= */

  async function runDemo() {

    if (
      destroyed ||
      !currentProject
    ) {

      return false;

    }


    activate();


    cancelDemo();


    const token =
      animationToken;


    const widths =
      getProjectWidths(
        currentProject
      );


    const phoneTarget =
      clamp(
        390,
        widths.minimum,
        widths.maximum
      );


    const desktopTarget =
      clamp(
        920,
        widths.minimum,
        widths.maximum
      );


    if (
      prefersReducedMotion
    ) {

      updateViewportPresentation(
        phoneTarget
      );


      return true;

    }


    setAnimationState(
      true
    );


    const startWidth =
      getRequestedWidth();


    const reachedPhone =
      await animateWidth(
        startWidth,
        phoneTarget,
        1450,
        token
      );


    if (!reachedPhone) {

      setAnimationState(
        false
      );


      return false;

    }


    const completedPause =
      await waitForReplayPause(
        260,
        token
      );


    if (!completedPause) {

      setAnimationState(
        false
      );


      return false;

    }


    const reachedDesktop =
      await animateWidth(
        phoneTarget,
        desktopTarget,
        1350,
        token
      );


    setAnimationState(
      false
    );


    return reachedDesktop;

  }


  /* =======================================================
     SLIDER
  ======================================================= */

  viewportRange.addEventListener(
    "input",
    () => {

      userInteracted =
        true;


      cancelDemo();


      activate();


      updateViewportPresentation();

    },
    {

      signal

    }
  );


  /* =======================================================
     REPLAY BUTTON
  ======================================================= */

  replayButton?.addEventListener(
    "click",
    () => {

      userInteracted =
        true;


      runDemo();

    },
    {

      signal

    }
  );


  /* =======================================================
     LAZY ACTIVATION
  ======================================================= */

  if (
    "IntersectionObserver" in
      window
  ) {

    mountObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          const approaching =
            entries.some(
              (entry) =>
                entry.isIntersecting
            );


          if (!approaching) {

            return;

          }


          observer.disconnect();


          mountObserver =
            null;


          activate();

        },
        {

          root:
            null,

          rootMargin:
            LAB_ROOT_MARGIN,

          threshold:
            0

        }
      );


    mountObserver.observe(
      section
    );

  } else {

    activate();

  }


  /* =======================================================
     AUTOMATIC FIRST DEMO

     Replay begins once when approximately half of the Lab
     enters the viewport, unless the visitor has already
     moved the slider or pressed Replay.

     This replaces the old main.js/portfolio-lab.js
     coordination entirely.
  ======================================================= */

  if (
    "IntersectionObserver" in
      window
  ) {

    demoObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting ||
                demoPlayed ||
                userInteracted
              ) {

                return;

              }


              demoPlayed =
                true;


              observer.unobserve(
                entry.target
              );


              activate();


              runDemo();

            }
          );

        },
        {

          threshold:
            .5

        }
      );


    demoObserver.observe(
      section
    );

  }


  /* =======================================================
     RESIZE MANAGEMENT
  ======================================================= */

  if (
    "ResizeObserver" in
      window
  ) {

    resizeObserver =
      new ResizeObserver(
        scheduleFrameFit
      );


    resizeObserver.observe(
      frameHost
    );


    resizeObserver.observe(
      responsivePreview
    );

  } else {

    window.addEventListener(
      "resize",
      scheduleFrameFit,
      {

        passive:
          true,

        signal

      }
    );

  }


  /* =======================================================
     INITIAL STATIC STATE

     Configure the Lab immediately without constructing its
     iframe.

     The visitor therefore sees accurate:
     - project identity
     - slider bounds
     - viewport label
     - responsive description

     before the Lab approaches the viewport.
  ======================================================= */

  prepareFrameHost(
    frameHost
  );


  updateProjectIdentity();


  configureRange(
    true
  );


  updateViewportPresentation();


  section.dataset.labState =
    "waiting";


  /* =======================================================
     DESTROY
  ======================================================= */

  function destroy() {

    if (
      destroyed
    ) {

      return;

    }


    destroyed =
      true;


    controller.abort();


    cancelDemo();


    mountObserver?.disconnect();


    mountObserver =
      null;


    demoObserver?.disconnect();


    demoObserver =
      null;


    resizeObserver?.disconnect();


    resizeObserver =
      null;


    if (
      resizeFrame
    ) {

      window.cancelAnimationFrame(
        resizeFrame
      );


      resizeFrame =
        0;

    }


    if (
      projectFrame
    ) {

      ProjectFrame.unmount(
        frameHost
      );


      projectFrame =
        null;

    }


    responsivePreview.style.removeProperty(
      "--preview-width"
    );


    delete section.dataset
      .labProject;


    delete section.dataset
      .labViewport;


    delete section.dataset
      .labActivated;


    delete section.dataset
      .labAnimating;


    section.dataset.labState =
      "destroyed";


    delete responsivePreview.dataset
      .labProject;


    delete responsivePreview.dataset
      .business;


    delete responsivePreview.dataset
      .viewportMode;


    delete frameHost.dataset
      .canonicalLabPreview;


    delete frameHost.dataset
      .projectViewportWidth;


    delete frameHost.dataset
      .projectPreviewScale;

  }


  /* =======================================================
     FEATURE CONTROLLER
  ======================================================= */

  return Object.freeze({

    get project() {

      return currentProject;

    },

    activate,

    setProject,

    update:
      updateViewportPresentation,

    replay:
      runDemo,

    cancelReplay:
      cancelDemo,

    destroy

  });

}
