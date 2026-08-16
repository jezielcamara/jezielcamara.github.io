/* =========================================================
   JEZIEL CAMARA / PROJECT WEBSITE VIEWER

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - lazily load viewer CSS
   - lazily create viewer DOM
   - display project metadata
   - mount one interactive canonical project iframe
   - preserve focus around modal use
   - manage viewer lifecycle

   NOT RESPONSIBLE FOR
   - Work card creation
   - project registration
   - project HTML
   - project design
   - project interactions
   - case studies

   ARCHITECTURE

   View Website
        ↓
   dynamic import viewer.js
        ↓
   lazy css/viewer.css
        ↓
   create dialog
        ↓
   ProjectFrame interactive mode
        ↓
   canonical project website

   IMPORTANT

   Importing this module alone does not create a dialog.

   The viewer is constructed only when openProjectViewer()
   is called.
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

const VIEWER_ID =
  "portfolio-project-viewer";


const VIEWER_STYLE_ID =
  "portfolio-project-viewer-styles";


const VIEWER_STYLESHEET =
  "css/viewer.css?v=20260814-2";


const DEFAULT_VIEWPORT_WIDTH =
  1080;


const DEFAULT_VIEWPORT_HEIGHT =
  820;


/* =========================================================
   STATE
========================================================= */

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


let eventController =
  null;


let stylesheetPromise =
  null;


/* =========================================================
   STYLESHEET
========================================================= */

function getStylesheetURL() {

  return new URL(
    VIEWER_STYLESHEET,
    document.baseURI
  ).href;

}


function ensureViewerStyles() {

  const existing =
    document.getElementById(
      VIEWER_STYLE_ID
    );


  if (existing) {

    return Promise.resolve(
      existing
    );

  }


  if (stylesheetPromise) {

    return stylesheetPromise;

  }


  stylesheetPromise =
    new Promise(
      (
        resolve,
        reject
      ) => {

        const link =
          document.createElement(
            "link"
          );


        link.id =
          VIEWER_STYLE_ID;


        link.rel =
          "stylesheet";


        link.href =
          getStylesheetURL();


        link.addEventListener(
          "load",
          () => {

            resolve(
              link
            );

          },
          {
            once:
              true
          }
        );


        link.addEventListener(
          "error",
          () => {

            stylesheetPromise =
              null;


            link.remove();


            reject(
              new Error(
                "Project viewer stylesheet could not load."
              )
            );

          },
          {
            once:
              true
          }
        );


        document.head.append(
          link
        );

      }
    );


  return stylesheetPromise;

}


/* =========================================================
   PROJECT RESOLUTION
========================================================= */

function getPublishedProject(
  key
) {

  const project =
    ProjectRegistry.get(
      key
    );


  if (
    !project ||
    project.status !==
      "published"
  ) {

    return null;

  }


  return project;

}


/* =========================================================
   VIEWER SHELL
========================================================= */

function createViewerShell() {

  const dialog =
    document.createElement(
      "dialog"
    );


  dialog.id =
    VIEWER_ID;


  dialog.className =
    "portfolio-project-viewer";


  dialog.dataset.viewerOwner =
    "portfolio-project-viewer";


  dialog.setAttribute(
    "aria-label",
    "Project website preview"
  );


  dialog.innerHTML = `
    <div class="portfolio-project-viewer-shell">

      <header class="portfolio-project-viewer-topbar">

        <div
          class="portfolio-project-viewer-window-controls"
          aria-label="Window controls"
        >

          <button
            class="portfolio-project-viewer-close"
            type="button"
            aria-label="Close project website preview"
            title="Close"
          >
            <span aria-hidden="true">×</span>
          </button>

          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>

        </div>


        <div class="portfolio-project-viewer-address">

          <span aria-hidden="true">—</span>

          <span class="portfolio-project-viewer-url">
            project.example
          </span>

        </div>


        <div class="portfolio-project-viewer-identity">

          <span class="portfolio-project-viewer-title">
            PROJECT
          </span>

          <small class="portfolio-project-viewer-description">
            WEBSITE PREVIEW / CONCEPT PROJECT
          </small>

          <strong class="portfolio-project-viewer-state">
            CONCEPT PROJECT
          </strong>

        </div>


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
            data-viewer-frame-state="loading"
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


/* =========================================================
   ELEMENT CACHE
========================================================= */

function ensureViewerShell() {

  if (
    viewer &&
    viewer.isConnected &&
    canvas &&
    canvas.isConnected
  ) {

    return true;

  }


  viewer =
    document.getElementById(
      VIEWER_ID
    ) ||
    createViewerShell();


  canvas =
    viewer.querySelector(
      ".portfolio-project-viewer-canvas"
    );


  if (!canvas) {

    viewer.remove();


    viewer =
      null;


    return false;

  }


  bindViewerEvents();


  return true;

}


/* =========================================================
   VIEWER EVENTS
========================================================= */

function bindViewerEvents() {

  eventController?.abort();


  eventController =
    new AbortController();


  const {
    signal
  } =
    eventController;


  const closeButton =
    viewer.querySelector(
      ".portfolio-project-viewer-close"
    );


  closeButton?.addEventListener(
    "click",
    () => {

      closeProjectViewer();

    },
    {
      signal
    }
  );


  viewer.addEventListener(
    "cancel",
    (event) => {

      event.preventDefault();


      closeProjectViewer();

    },
    {
      signal
    }
  );


  viewer.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        viewer
      ) {

        closeProjectViewer();

      }

    },
    {
      signal
    }
  );


  viewer.addEventListener(
    "close",
    () => {

      document.body.classList.remove(
        "portfolio-viewer-open"
      );


      restoreFocus();

    },
    {
      signal
    }
  );

}


/* =========================================================
   VIEWER IDENTITY
========================================================= */

function updateViewerIdentity(
  project
) {

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
      project.viewer.description ||
      "WEBSITE PREVIEW / CONCEPT PROJECT";

  }


  if (url) {

    url.textContent =
      project.url;

  }


  if (state) {

    state.textContent =
      typeof project.initialize ===
        "function"
        ? "INTERACTIVE CONCEPT"
        : (
          project.viewer.state ||
          "VIEW-ONLY CONCEPT"
        );

  }


  closeButton?.setAttribute(
    "aria-label",
    `Close ${project.name} website preview`
  );


  viewer.setAttribute(
    "aria-label",
    `${project.name} website preview`
  );


  viewer.dataset.project =
    project.key;

}


/* =========================================================
   FRAME PRESENTATION
========================================================= */

function configureProjectFrame(
  frame,
  project
) {

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


  frame.setAttribute(
    "aria-label",
    `${project.name} interactive website`
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


  frame.style.transformOrigin =
    "top left";


  frame.style.pointerEvents =
    "auto";

}


/* =========================================================
   FRAME STATE
========================================================= */

function markFrameState(
  state
) {

  if (!canvas) {

    return;

  }


  canvas.dataset.viewerFrameState =
    state;


  if (
    state ===
    "loading"
  ) {

    canvas.setAttribute(
      "aria-busy",
      "true"
    );

  } else {

    canvas.removeAttribute(
      "aria-busy"
    );

  }

}


/* =========================================================
   MOUNT PROJECT
========================================================= */

async function mountProject(
  project
) {

  if (
    !project ||
    !ensureViewerShell()
  ) {

    return false;

  }


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
      projectFrame,
      project
    );


    updateViewerIdentity(
      project
    );


    markFrameState(
      "ready"
    );


    return true;

  }


  updateViewerIdentity(
    project
  );


  markFrameState(
    "loading"
  );


  try {

    projectFrame =
      ProjectFrame.mount(
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

          interactive:
            true,

          loading:
            "eager",

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


    const result =
      await ProjectFrame.whenReady(
        projectFrame
      );


    if (
      result.error
    ) {

      markFrameState(
        "error"
      );


      return false;

    }


    markFrameState(
      "ready"
    );


    return true;

  } catch (error) {

    markFrameState(
      "error"
    );


    console.error(
      `[Viewer] Could not mount "${project.key}".`,
      error
    );


    return false;

  }

}


/* =========================================================
   RESET PROJECT SCROLL
========================================================= */

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
     * The viewer remains usable even if direct scroll
     * access is restricted.
     */

  }

}


/* =========================================================
   FOCUS
========================================================= */

function rememberFocus(
  requestedElement
) {

  const candidate =
    requestedElement ||
    document.activeElement;


  if (
    candidate instanceof
      HTMLElement &&
    candidate !==
      document.body
  ) {

    returnFocusElement =
      candidate;

  } else {

    returnFocusElement =
      null;

  }

}


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


  window.requestAnimationFrame(
    () => {

      target.focus({
        preventScroll:
          true
      });

    }
  );

}


/* =========================================================
   OPEN
========================================================= */

export async function openProjectViewer(
  key,
  options = {}
) {

  const project =
    getPublishedProject(
      key
    );


  if (!project) {

    console.warn(
      `[Viewer] Published project "${String(key || "")}" was not found.`
    );


    return false;

  }


  rememberFocus(
    options.returnFocus
  );


  try {

    await ensureViewerStyles();

  } catch (error) {

    console.error(
      "[Viewer] Viewer stylesheet could not load.",
      error
    );


    return false;

  }


  if (
    !ensureViewerShell()
  ) {

    return false;

  }


  /*
   * Open the shell before awaiting complete project
   * initialization so the visitor receives immediate
   * visual feedback.
   */

  if (!viewer.open) {

    viewer.showModal();

  }


  document.body.classList.add(
    "portfolio-viewer-open"
  );


  const mounted =
    await mountProject(
      project
    );


  if (!mounted) {

    return false;

  }


  window.requestAnimationFrame(
    resetFrameScroll
  );


  return true;

}


/* =========================================================
   CLOSE
========================================================= */

export function closeProjectViewer() {

  if (
    viewer?.open
  ) {

    viewer.close();


    return true;

  }


  document.body.classList.remove(
    "portfolio-viewer-open"
  );


  restoreFocus();


  return false;

}


/* =========================================================
   DESTROY
========================================================= */

export function destroyProjectViewer() {

  closeProjectViewer();


  eventController?.abort();


  eventController =
    null;


  if (
    canvas &&
    projectFrame
  ) {

    ProjectFrame.unmount(
      canvas
    );

  }


  projectFrame =
    null;


  currentProjectKey =
    null;


  viewer?.remove();


  viewer =
    null;


  canvas =
    null;


  returnFocusElement =
    null;

}


/* =========================================================
   DIAGNOSTIC STATE
========================================================= */

export function getProjectViewerState() {

  return Object.freeze({

    created:
      Boolean(
        viewer &&
        viewer.isConnected
      ),

    open:
      Boolean(
        viewer?.open
      ),

    project:
      currentProjectKey,

    frameReady:
      Boolean(
        projectFrame &&
        ProjectFrame
          .getState(
            projectFrame
          )
          ?.ready
      )

  });

}
