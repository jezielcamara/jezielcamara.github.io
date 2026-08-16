/* =========================================================
   JEZIEL CAMARA / FEATURED HERO

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - choose one published project
   - mount its desktop Hero preview
   - mount its mobile Hero preview
   - fit real project viewports into portfolio windows
   - keep both Hero previews synchronized
   - clean up Hero frame resources

   NOT RESPONSIBLE FOR
   - project registration
   - canonical project HTML
   - project-specific CSS
   - project interactions
   - Selected Work
   - Responsive Lab
   - website viewer
   - case studies
   - Hero dragging/parallax

   ARCHITECTURE

   ProjectRegistry
        ↓
   Hero
        ↓
   ProjectFrame
        ↓
   same canonical project
        ↓
   desktop viewport + mobile viewport

   IMPORTANT

   Hero no longer has a direct-DOM rendering path.

   Desktop and mobile use the same isolated frame engine.
========================================================= */


import {
  ProjectRegistry
} from "../core/project-registry.js";


import {
  ProjectFrame
} from "../core/project-frame.js";


/* =========================================================
   VIEWPORTS

   These are genuine project viewport sizes.

   Scaling happens only after the project viewport has been
   created.

   The project's responsive CSS therefore responds to the
   actual viewport width rather than to portfolio scaling.
========================================================= */

const DESKTOP_VIEWPORT_WIDTH =
  1200;


const DESKTOP_VIEWPORT_HEIGHT =
  750;


const MOBILE_VIEWPORT_WIDTH =
  390;


/*
 * The mobile project document remains taller than the
 * visible portrait thumbnail.
 *
 * The portfolio host clips the first portion of the
 * genuine mobile page, matching the existing presentation
 * behavior.
 */

const MOBILE_VIEWPORT_HEIGHT =
  1000;


/* =========================================================
   STORAGE

   Preserve the current portfolio behavior:

   when more than one published project exists, avoid
   immediately repeating the project shown during the
   previous page view when possible.
========================================================= */

const LAST_FEATURED_STORAGE_KEY =
  "jc-last-featured-project";


/* =========================================================
   ELEMENTS
========================================================= */

function getHeroElements() {

  const hero =
    document.querySelector(
      ".hero-stage"
    );


  const desktopWindow =
    hero?.querySelector(
      '[data-featured-window="desktop"]'
    );


  const mobileWindow =
    hero?.querySelector(
      '[data-featured-window="mobile"]'
    );


  const desktopHost =
    hero?.querySelector(
      '[data-featured-project-host="desktop"]'
    );


  const mobileHost =
    hero?.querySelector(
      '[data-featured-project-host="mobile"]'
    );


  const featuredIndex =
    hero?.querySelector(
      "[data-featured-index]"
    );


  const featuredType =
    hero?.querySelector(
      "[data-featured-type]"
    );


  const featuredMobileName =
    hero?.querySelector(
      "[data-featured-mobile-name]"
    );


  if (
    !hero ||
    !desktopWindow ||
    !mobileWindow ||
    !desktopHost ||
    !mobileHost
  ) {

    return null;

  }


  return {

    hero,

    desktopWindow,

    mobileWindow,

    desktopHost,

    mobileHost,

    featuredIndex,

    featuredType,

    featuredMobileName

  };

}


/* =========================================================
   SESSION STORAGE

   Storage is optional.

   Private browsing or browser policy may make sessionStorage
   unavailable, so every storage operation is protected.
========================================================= */

function getLastFeaturedKey() {

  try {

    return window.sessionStorage
      .getItem(
        LAST_FEATURED_STORAGE_KEY
      );

  } catch (error) {

    return null;

  }

}


function rememberFeaturedKey(
  key
) {

  if (!key) {

    return;

  }


  try {

    window.sessionStorage
      .setItem(
        LAST_FEATURED_STORAGE_KEY,
        key
      );

  } catch (error) {

    /*
     * Storage is not required for Hero operation.
     */

  }

}


/* =========================================================
   HERO PROJECT SELECTION

   Selection rules:

   1. Project must be published.
   2. Every published project is automatically eligible.
   3. An explicit staging override may select a published
      project by key.
   4. Otherwise avoid immediately repeating the previous
      featured project when another option exists.
========================================================= */

function chooseFeaturedProject(
  hero
) {

  const projects =
    ProjectRegistry.published();


  if (
    !projects.length
  ) {

    return null;

  }


  /*
   * Optional future override:
   *
   * <section
   *   class="hero-stage"
   *   data-featured-project="sola"
   * >
   *
   * The override is honored only when that project is
   * already in the published project collection.
   */

  const requestedKey =
    String(
      hero.dataset
        .featuredProject ||
      ""
    )
      .trim()
      .toLowerCase();


  if (requestedKey) {

    const requestedProject =
      projects.find(
        (project) =>
          project.key ===
          requestedKey
      );


    if (requestedProject) {

      return requestedProject;

    }

  }


  if (
    projects.length ===
    1
  ) {

    return projects[0];

  }


  const previousKey =
    getLastFeaturedKey();


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


/* =========================================================
   FRAME FITTING

   ProjectFrame owns the real project viewport.

   Hero owns only how that viewport is scaled into its
   presentation window.
========================================================= */

function fitFrame(
  host,
  frame,
  viewportWidth,
  viewportHeight
) {

  if (
    !host ||
    !frame
  ) {

    return;

  }


  const availableWidth =
    host.clientWidth;


  if (
    !availableWidth
  ) {

    return;

  }


  const scale =
    Math.min(
      1,
      availableWidth /
      viewportWidth
    );


  frame.style.position =
    "absolute";


  frame.style.top =
    "0";


  frame.style.left =
    "0";


  frame.style.width =
    `${viewportWidth}px`;


  frame.style.minWidth =
    `${viewportWidth}px`;


  frame.style.height =
    `${viewportHeight}px`;


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


  host.dataset.previewScale =
    scale.toFixed(
      4
    );

}


/* =========================================================
   PRESENTATION CLASSES

   These classes already exist in project-surfaces.css.

   They control only the portfolio frame:
   - clipping
   - aspect ratio
   - placeholder removal
   - positioning

   They do not alter project design.
========================================================= */

function prepareDesktopHost(
  host
) {

  host.classList.add(
    "has-canonical-project-preview",
    "has-canonical-desktop-preview"
  );


  host.style.position =
    "relative";


  host.style.overflow =
    "hidden";

}


function prepareMobileHost(
  host
) {

  host.classList.add(
    "has-canonical-project-preview",
    "has-canonical-mobile-preview"
  );


  host.style.position =
    "relative";


  host.style.overflow =
    "hidden";

}


/* =========================================================
   HERO LABELS
========================================================= */

function renderProjectLabels(
  elements,
  project
) {

  if (
    elements.featuredIndex
  ) {

    elements.featuredIndex.textContent =
      `PROJECT / ${project.index}`;

  }


  if (
    elements.featuredType
  ) {

    elements.featuredType.textContent =
      project.type;

  }


  if (
    elements.featuredMobileName
  ) {

    elements.featuredMobileName.textContent =
      project.name.toUpperCase();

  }


  elements.desktopWindow
    .dataset
    .featuredProject =
      project.key;


  elements.mobileWindow
    .dataset
    .featuredProject =
      project.key;


  elements.hero
    .dataset
    .activeFeaturedProject =
      project.key;


  document.documentElement
    .dataset
    .featuredProject =
      project.key;

}


/* =========================================================
   MOUNT DESKTOP
========================================================= */

function mountDesktopProject(
  elements,
  project
) {

  prepareDesktopHost(
    elements.desktopHost
  );


  const frame =
    ProjectFrame.mount(
      project.key,
      elements.desktopHost,
      {

        instance:
          "hero-desktop",

        viewport:
          "desktop",

        width:
          DESKTOP_VIEWPORT_WIDTH,

        height:
          DESKTOP_VIEWPORT_HEIGHT,

        loading:
          "eager",

        label:
          `${project.name} desktop website preview`

      }
    );


  frame.classList.add(
    "featured-project-frame",
    "featured-project-frame-desktop"
  );


  return frame;

}


/* =========================================================
   MOUNT MOBILE
========================================================= */

function mountMobileProject(
  elements,
  project
) {

  prepareMobileHost(
    elements.mobileHost
  );


  const frame =
    ProjectFrame.mount(
      project.key,
      elements.mobileHost,
      {

        instance:
          "hero-mobile",

        viewport:
          "mobile",

        width:
          MOBILE_VIEWPORT_WIDTH,

        height:
          MOBILE_VIEWPORT_HEIGHT,

        /*
         * The mobile preview is also above the fold.
         *
         * Keep it eager so its visible thumbnail does not
         * appear after the rest of the Hero has settled.
         */

        loading:
          "eager",

        label:
          `${project.name} mobile website preview`

      }
    );


  frame.classList.add(
    "featured-project-frame",
    "featured-project-frame-mobile"
  );


  return frame;

}


/* =========================================================
   HERO INITIALIZATION

   This function performs no polling.

   app.js imports the project manifests first.

   By the time initHero() runs, registration is already
   synchronous and complete.
========================================================= */

export function initHero() {

  const elements =
    getHeroElements();


  if (!elements) {

    return null;

  }


  const project =
    chooseFeaturedProject(
      elements.hero
    );


  if (!project) {

    console.warn(
      "[Hero] No published project is registered."
    );


    return null;

  }


  renderProjectLabels(
    elements,
    project
  );


  let desktopFrame =
    null;


  let mobileFrame =
    null;


  try {

    desktopFrame =
      mountDesktopProject(
        elements,
        project
      );


    mobileFrame =
      mountMobileProject(
        elements,
        project
      );

  } catch (error) {

    console.error(
      `[Hero] Could not mount featured project "${project.key}".`,
      error
    );


    if (
      desktopFrame
    ) {

      ProjectFrame.destroy(
        desktopFrame
      );

    }


    if (
      mobileFrame
    ) {

      ProjectFrame.destroy(
        mobileFrame
      );

    }


    return null;

  }


  rememberFeaturedKey(
    project.key
  );


  /* =======================================================
     FRAME FIT
  ======================================================= */

  function fitDesktop() {

    fitFrame(
      elements.desktopHost,
      desktopFrame,
      DESKTOP_VIEWPORT_WIDTH,
      DESKTOP_VIEWPORT_HEIGHT
    );

  }


  function fitMobile() {

    fitFrame(
      elements.mobileHost,
      mobileFrame,
      MOBILE_VIEWPORT_WIDTH,
      MOBILE_VIEWPORT_HEIGHT
    );

  }


  function fitAll() {

    fitDesktop();
    fitMobile();

  }


  /* =======================================================
     RESIZE MANAGEMENT

     One ResizeObserver owns both Hero project hosts.
  ======================================================= */

  let resizeObserver =
    null;


  let resizeFrame =
    0;


  function scheduleFit() {

    if (
      resizeFrame
    ) {

      return;

    }


    resizeFrame =
      window.requestAnimationFrame(
        () => {

          resizeFrame =
            0;


          fitAll();

        }
      );

  }


  function handleWindowResize() {

    scheduleFit();

  }


  if (
    "ResizeObserver" in
      window
  ) {

    resizeObserver =
      new ResizeObserver(
        scheduleFit
      );


    resizeObserver.observe(
      elements.desktopHost
    );


    resizeObserver.observe(
      elements.mobileHost
    );

  } else {

    window.addEventListener(
      "resize",
      handleWindowResize,
      {
        passive:
          true
      }
    );

  }


  /*
   * First fitting occurs after layout has received the
   * newly mounted frame.
   */

  scheduleFit();


  /* =======================================================
     CLEANUP

     app.js can destroy this feature explicitly during future
     staging reloads or architecture tests.
  ======================================================= */

  function destroy() {

    if (
      resizeFrame
    ) {

      window.cancelAnimationFrame(
        resizeFrame
      );


      resizeFrame =
        0;

    }


    resizeObserver?.disconnect();


    resizeObserver =
      null;


    window.removeEventListener(
      "resize",
      handleWindowResize
    );


    ProjectFrame.unmount(
      elements.desktopHost
    );


    ProjectFrame.unmount(
      elements.mobileHost
    );


    delete elements.desktopHost
      .dataset
      .previewScale;


    delete elements.mobileHost
      .dataset
      .previewScale;


    delete elements.desktopWindow
      .dataset
      .featuredProject;


    delete elements.mobileWindow
      .dataset
      .featuredProject;


    delete elements.hero
      .dataset
      .activeFeaturedProject;


    if (
      document.documentElement
        .dataset
        .featuredProject ===
      project.key
    ) {

      delete document.documentElement
        .dataset
        .featuredProject;

    }

  }


  /* =======================================================
     FEATURE CONTROLLER

     Exposing the current project and managed frames makes
     later Viewer integration explicit without creating
     globals.
  ======================================================= */

  return Object.freeze({

    project,

    desktopFrame,

    mobileFrame,

    fit:
      fitAll,

    destroy

  });

}
