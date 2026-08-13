/* =========================================================
   JEZIEL CAMARA / PROJECT CASE DIALOG

   MODULAR PORTFOLIO ARCHITECTURE

   RESPONSIBILITY
   - resolve the shared case-study dialog
   - resolve published projects
   - dynamically import project case modules
   - lazily load project case styles
   - populate shared project metadata
   - manage Next Project
   - preserve and restore focus
   - manage dialog lifecycle
   - cleanly support app stop / restart cycles

   NOT RESPONSIBLE FOR
   - project-specific case markup
   - project-specific case styling
   - project website HTML
   - project website interactions
   - project iframe geometry

   ARCHITECTURE

   Explore Project
        ↓
   case-dialog.js
        ↓
   ProjectRegistry
        ↓
   project.loadCase()
        ↓
   projects/{key}/case.js
        ↓
   project case presentation
        ↓
   ProjectFrame

   IMPORTANT

   Project case modules are not imported during initial
   portfolio load.

   Project-specific case DOM is not created until requested.
========================================================= */


import {
  ProjectRegistry
} from "../core/project-registry.js";


/* =========================================================
   SETTINGS
========================================================= */

const CASE_DIALOG_ID =
  "case-dialog";


/* =========================================================
   STATE
========================================================= */

let caseElements =
  null;


let eventController =
  null;


let currentProject =
  null;


let currentCaseController =
  null;


let currentModeClass =
  "";


let returnFocusElement =
  null;


let openVersion =
  0;


/*
 * One promise per stylesheet URL.
 *
 * This prevents two rapid case requests from creating
 * duplicate links or treating a still-loading stylesheet
 * as ready.
 */

const stylesheetPromises =
  new Map();


/* =========================================================
   CASE STATE
========================================================= */

function setCaseState(
  state
) {

  const dialog =
    caseElements?.dialog;


  if (!dialog) {

    return;

  }


  dialog.dataset.caseState =
    state;


  if (
    state ===
    "loading"
  ) {

    dialog.setAttribute(
      "aria-busy",
      "true"
    );

  } else {

    dialog.removeAttribute(
      "aria-busy"
    );

  }

}


/* =========================================================
   ELEMENTS
========================================================= */

function getCaseElements() {

  /*
   * The dialog itself is static portfolio markup.
   *
   * The controller may have been destroyed during a
   * stopApp() cycle while the DOM remained connected.
   *
   * If so, rebind its events before returning the cache.
   */

  if (
    caseElements?.dialog?.isConnected
  ) {

    if (
      !eventController ||
      eventController.signal.aborted
    ) {

      bindCaseEvents();

    }


    return caseElements;

  }


  const dialog =
    document.getElementById(
      CASE_DIALOG_ID
    );


  const closeButton =
    dialog?.querySelector(
      "#case-close"
    );


  const nextButton =
    dialog?.querySelector(
      "#case-next"
    );


  const caseIndex =
    dialog?.querySelector(
      "#case-index"
    );


  const caseCategory =
    dialog?.querySelector(
      "#case-category"
    );


  const caseType =
    dialog?.querySelector(
      "#case-type"
    );


  const caseTitle =
    dialog?.querySelector(
      "#case-title"
    );


  const caseSummary =
    dialog?.querySelector(
      "#case-summary"
    );


  const caseGoal =
    dialog?.querySelector(
      "#case-goal"
    );


  const casePages =
    dialog?.querySelector(
      "#case-pages"
    );


  const previewHost =
    dialog?.querySelector(
      "[data-case-preview-host]"
    );


  const bodyHost =
    dialog?.querySelector(
      "[data-project-case-body]"
    );


  if (
    !dialog ||
    !closeButton ||
    !nextButton ||
    !caseIndex ||
    !caseCategory ||
    !caseType ||
    !caseTitle ||
    !caseSummary ||
    !caseGoal ||
    !casePages ||
    !previewHost ||
    !bodyHost
  ) {

    return null;

  }


  caseElements =
    {

      dialog,

      closeButton,

      nextButton,

      caseIndex,

      caseCategory,

      caseType,

      caseTitle,

      caseSummary,

      caseGoal,

      casePages,

      previewHost,

      bodyHost

    };


  bindCaseEvents();


  return caseElements;

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


function getCaseProjects() {

  return ProjectRegistry
    .published()
    .filter(
      (project) =>
        typeof project.loadCase ===
        "function"
    );

}


/* =========================================================
   CASE STYLES
========================================================= */

function absoluteStylesheetURL(
  path
) {

  try {

    return new URL(
      path,
      document.baseURI
    ).href;

  } catch (error) {

    console.warn(
      `[Case] Could not resolve stylesheet "${String(path)}".`,
      error
    );


    return "";

  }

}


function findExistingStylesheet(
  href
) {

  return Array
    .from(
      document.querySelectorAll(
        'link[rel~="stylesheet"]'
      )
    )
    .find(
      (link) =>
        link.href ===
        href
    ) ||
    null;

}


/* =========================================================
   WAIT FOR STYLESHEET

   link.sheet becomes available once a stylesheet has loaded.

   An existing link with sheet === null may still be loading,
   so it must not be treated as ready immediately.
========================================================= */

function waitForStylesheet(
  link,
  href,
  {
    removeOnError = false
  } = {}
) {

  if (
    link.sheet
  ) {

    const ready =
      Promise.resolve(
        link
      );


    stylesheetPromises.set(
      href,
      ready
    );


    return ready;

  }


  const cached =
    stylesheetPromises.get(
      href
    );


  if (cached) {

    return cached;

  }


  const promise =
    new Promise(
      (
        resolve,
        reject
      ) => {

        function cleanup() {

          link.removeEventListener(
            "load",
            handleLoad
          );


          link.removeEventListener(
            "error",
            handleError
          );

        }


        function handleLoad() {

          cleanup();


          resolve(
            link
          );

        }


        function handleError() {

          cleanup();


          stylesheetPromises.delete(
            href
          );


          if (
            removeOnError
          ) {

            link.remove();

          }


          reject(
            new Error(
              `Case stylesheet could not load: ${href}`
            )
          );

        }


        link.addEventListener(
          "load",
          handleLoad
        );


        link.addEventListener(
          "error",
          handleError
        );

      }
    );


  stylesheetPromises.set(
    href,
    promise
  );


  return promise;

}


function loadCaseStylesheet(
  path
) {

  const href =
    absoluteStylesheetURL(
      path
    );


  if (!href) {

    return Promise.reject(
      new Error(
        `Invalid case stylesheet "${String(path)}".`
      )
    );

  }


  /*
   * Check the shared promise cache first.
   *
   * This matters when a link already exists but is still
   * loading.
   */

  const cached =
    stylesheetPromises.get(
      href
    );


  if (cached) {

    return cached;

  }


  const existing =
    findExistingStylesheet(
      href
    );


  if (existing) {

    return waitForStylesheet(
      existing,
      href
    );

  }


  const link =
    document.createElement(
      "link"
    );


  link.rel =
    "stylesheet";


  link.href =
    href;


  link.dataset.caseStylesheet =
    "true";


  /*
   * Bind load/error before insertion so even a very fast
   * cached stylesheet cannot finish before handlers exist.
   */

  const promise =
    waitForStylesheet(
      link,
      href,
      {
        removeOnError:
          true
      }
    );


  document.head.append(
    link
  );


  return promise;

}


async function ensureCaseStyles(
  styles
) {

  if (
    !Array.isArray(
      styles
    ) ||
    !styles.length
  ) {

    return;

  }


  await Promise.all(
    styles.map(
      loadCaseStylesheet
    )
  );

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
   GENERIC METADATA
========================================================= */

function populateCaseMetadata(
  project,
  meta = {}
) {

  if (!caseElements) {

    return;

  }


  caseElements.caseIndex.textContent =
    `${project.index} / CASE STUDY`;


  caseElements.caseCategory.textContent =
    project.category;


  caseElements.caseType.textContent =
    meta.kicker ||
    project.type;


  caseElements.caseTitle.textContent =
    project.name;


  caseElements.caseSummary.textContent =
    meta.summary ||
    project.viewer.description ||
    "";


  caseElements.caseGoal.textContent =
    meta.goal ||
    "";


  caseElements.casePages.textContent =
    meta.pages ||
    project.work.pages ||
    project.type;


  caseElements.closeButton.setAttribute(
    "aria-label",
    `Close ${project.name} case study`
  );


  caseElements.dialog.setAttribute(
    "aria-label",
    `${project.name} case study`
  );


  caseElements.dialog.dataset.project =
    project.key;

}


/* =========================================================
   CURRENT PRESENTATION CLEANUP
========================================================= */

function destroyCurrentCase() {

  if (
    typeof currentCaseController?.destroy ===
      "function"
  ) {

    try {

      currentCaseController.destroy();

    } catch (error) {

      console.warn(
        "[Case] Project case cleanup failed.",
        error
      );

    }

  }


  currentCaseController =
    null;


  if (
    currentModeClass &&
    caseElements?.dialog
  ) {

    caseElements.dialog.classList.remove(
      currentModeClass
    );

  }


  currentModeClass =
    "";


  caseElements?.previewHost
    ?.replaceChildren();


  caseElements?.bodyHost
    ?.replaceChildren();


  currentProject =
    null;

}


/* =========================================================
   NEXT PROJECT
========================================================= */

function getNextProjectKey() {

  const projects =
    getCaseProjects();


  if (
    projects.length <=
    1
  ) {

    return null;

  }


  const currentIndex =
    projects.findIndex(
      (project) =>
        project.key ===
        currentProject?.key
    );


  if (
    currentIndex <
    0
  ) {

    return projects[0].key;

  }


  return projects[
    (
      currentIndex +
      1
    ) %
    projects.length
  ].key;

}


function updateNextButton() {

  if (!caseElements) {

    return;

  }


  const nextKey =
    getNextProjectKey();


  caseElements.nextButton.disabled =
    !nextKey;


  caseElements.nextButton.hidden =
    !nextKey;


  if (!nextKey) {

    caseElements.nextButton.removeAttribute(
      "aria-label"
    );


    return;

  }


  const nextProject =
    ProjectRegistry.get(
      nextKey
    );


  if (nextProject) {

    caseElements.nextButton.setAttribute(
      "aria-label",
      `Open next project: ${nextProject.name}`
    );

  }

}


/* =========================================================
   DIALOG EVENTS
========================================================= */

function bindCaseEvents() {

  if (
    !caseElements
  ) {

    return;

  }


  eventController?.abort();


  eventController =
    new AbortController();


  const {
    signal
  } =
    eventController;


  caseElements.closeButton.addEventListener(
    "click",
    () => {

      closeProjectCase();

    },
    {
      signal
    }
  );


  caseElements.nextButton.addEventListener(
    "click",
    async () => {

      const nextKey =
        getNextProjectKey();


      if (!nextKey) {

        return;

      }


      await openProjectCase(
        nextKey
      );

    },
    {
      signal
    }
  );


  caseElements.dialog.addEventListener(
    "cancel",
    (event) => {

      event.preventDefault();


      closeProjectCase();

    },
    {
      signal
    }
  );


  caseElements.dialog.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        caseElements.dialog
      ) {

        closeProjectCase();

      }

    },
    {
      signal
    }
  );


  caseElements.dialog.addEventListener(
    "close",
    () => {

      openVersion +=
        1;


      destroyCurrentCase();


      document.body.classList.remove(
        "case-open"
      );


      setCaseState(
        "closed"
      );


      delete caseElements.dialog.dataset
        .project;


      restoreFocus();

    },
    {
      signal
    }
  );

}


/* =========================================================
   OPEN PROJECT CASE
========================================================= */

export async function openProjectCase(
  key,
  options = {}
) {

  const elements =
    getCaseElements();


  if (!elements) {

    console.error(
      "[Case] Shared case dialog markup was not found."
    );


    return false;

  }


  const project =
    getPublishedProject(
      key
    );


  if (
    !project ||
    typeof project.loadCase !==
      "function"
  ) {

    console.warn(
      `[Case] Published case study "${String(key || "")}" was not found.`
    );


    return false;

  }


  const version =
    ++openVersion;


  if (
    !elements.dialog.open
  ) {

    rememberFocus(
      options.returnFocus
    );

  }


  setCaseState(
    "loading"
  );


  try {

    /* =====================================================
       LAZY PROJECT MODULE
    ===================================================== */

    const caseModule =
      await project.loadCase();


    if (
      version !==
      openVersion
    ) {

      return false;

    }


    if (
      typeof caseModule.createProjectCase !==
        "function"
    ) {

      throw new Error(
        `Project "${project.key}" case module does not export createProjectCase().`
      );

    }


    /* =====================================================
       LAZY PROJECT CASE STYLES
    ===================================================== */

    await ensureCaseStyles(
      caseModule.caseStyles ||
      []
    );


    if (
      version !==
      openVersion
    ) {

      return false;

    }


    /* =====================================================
       REPLACE CURRENT CASE
    ===================================================== */

    destroyCurrentCase();


    currentProject =
      project;


    const meta =
      caseModule.caseMeta ||
      {};


    currentModeClass =
      String(
        meta.modeClass ||
        ""
      ).trim();


    populateCaseMetadata(
      project,
      meta
    );


    if (currentModeClass) {

      elements.dialog.classList.add(
        currentModeClass
      );

    }


    updateNextButton();


    /*
     * Open the shared shell before project initialization so
     * its dimensions are available to case-frame observers.
     */

    if (
      !elements.dialog.open
    ) {

      elements.dialog.showModal();

    }


    document.body.classList.add(
      "case-open"
    );


    /* =====================================================
       CREATE PROJECT CASE
    ===================================================== */

    const controller =
      await caseModule.createProjectCase({
        project,
        dialog:
          elements.dialog,
        elements
      });


    /*
     * The visitor may have closed the case or selected a
     * different project while asynchronous work completed.
     */

    if (
      version !==
      openVersion
    ) {

      controller?.destroy?.();


      return false;

    }


    currentCaseController =
      controller ||
      null;


    setCaseState(
      "ready"
    );


    window.requestAnimationFrame(
      () => {

        if (
          !elements.dialog.open
        ) {

          return;

        }


        elements.dialog.scrollTo({
          top:
            0,
          behavior:
            "auto"
        });

      }
    );


    return true;

  } catch (error) {

    console.error(
      `[Case] Could not open "${project.key}" case study.`,
      error
    );


    destroyCurrentCase();


    setCaseState(
      "error"
    );


    if (
      elements.dialog.open
    ) {

      elements.dialog.close();

    } else {

      document.body.classList.remove(
        "case-open"
      );


      restoreFocus();

    }


    return false;

  }

}


/* =========================================================
   CLOSE
========================================================= */

export function closeProjectCase() {

  const elements =
    getCaseElements();


  if (!elements) {

    return false;

  }


  openVersion +=
    1;


  if (
    elements.dialog.open
  ) {

    elements.dialog.close();


    return true;

  }


  destroyCurrentCase();


  document.body.classList.remove(
    "case-open"
  );


  setCaseState(
    "closed"
  );


  delete elements.dialog.dataset
    .project;


  restoreFocus();


  return false;

}


/* =========================================================
   DESTROY

   The shared dialog belongs to portfolio HTML, so it is not
   removed.

   Its controller cache IS released so a future app restart
   reacquires the DOM and binds fresh event handlers.
========================================================= */

export function destroyCaseDialog() {

  openVersion +=
    1;


  const elements =
    getCaseElements();


  if (
    elements?.dialog.open
  ) {

    elements.dialog.close();

  }


  destroyCurrentCase();


  document.body.classList.remove(
    "case-open"
  );


  if (
    elements?.dialog
  ) {

    elements.dialog.classList.remove(
      "north-active",
      "sola-active"
    );


    elements.dialog.dataset.caseState =
      "closed";


    elements.dialog.removeAttribute(
      "aria-busy"
    );


    delete elements.dialog.dataset
      .project;

  }


  eventController?.abort();


  eventController =
    null;


  /*
   * Critical lifecycle reset.
   *
   * The DOM remains in the document, but the next
   * openProjectCase() call must reacquire and rebind it.
   */

  caseElements =
    null;


  restoreFocus();


  return true;

}


/* =========================================================
   DIAGNOSTIC STATE
========================================================= */

export function getCaseDialogState() {

  const dialog =
    caseElements?.dialog ||
    document.getElementById(
      CASE_DIALOG_ID
    );


  return Object.freeze({

    created:
      Boolean(
        dialog?.isConnected
      ),

    bound:
      Boolean(
        caseElements &&
        eventController &&
        !eventController.signal.aborted
      ),

    open:
      Boolean(
        dialog?.open
      ),

    project:
      currentProject?.key ||
      null,

    state:
      dialog?.dataset
        .caseState ||
      "idle"

  });

}
