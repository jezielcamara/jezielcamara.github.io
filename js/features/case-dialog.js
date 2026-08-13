/* =========================================================
   JEZIEL CAMARA / PROJECT CASE DIALOG

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - open the shared case-study dialog
   - resolve published projects
   - dynamically import project case modules
   - lazily load project case CSS
   - populate shared project metadata
   - manage Next Project
   - preserve and restore focus
   - own shared dialog lifecycle

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

   Case-study modules are not imported during initial page
   load.

   Project-specific case DOM is not created until the
   visitor opens that project.
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


const stylesheetPromises =
  new Map();


/* =========================================================
   ELEMENTS
========================================================= */

function getCaseElements() {

  if (
    caseElements?.dialog?.isConnected
  ) {

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


  const existing =
    findExistingStylesheet(
      href
    );


  if (existing) {

    return Promise.resolve(
      existing
    );

  }


  if (
    stylesheetPromises.has(
      href
    )
  ) {

    return stylesheetPromises.get(
      href
    );

  }


  const promise =
    new Promise(
      (
        resolve,
        reject
      ) => {

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

            stylesheetPromises.delete(
              href
            );


            link.remove();


            reject(
              new Error(
                `Case stylesheet could not load: ${path}`
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


  stylesheetPromises.set(
    href,
    promise
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


  if (nextKey) {

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


      caseElements.dialog.dataset.caseState =
        "closed";


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


  elements.dialog.dataset.caseState =
    "loading";


  try {

    /*
     * This is the actual project-specific lazy boundary.
     */

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


    if (
      !elements.dialog.open
    ) {

      elements.dialog.showModal();

    }


    document.body.classList.add(
      "case-open"
    );


    const controller =
      await caseModule.createProjectCase({
        project,
        dialog:
          elements.dialog,
        elements
      });


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


    elements.dialog.dataset.caseState =
      "ready";


    window.requestAnimationFrame(
      () => {

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


    elements.dialog.dataset.caseState =
      "error";


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


  if (
    !elements
  ) {

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


  restoreFocus();


  return false;

}


/* =========================================================
   DESTROY
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


  eventController?.abort();


  eventController =
    null;


  document.body.classList.remove(
    "case-open"
  );


  restoreFocus();


  return true;

}


/* =========================================================
   DIAGNOSTIC STATE
========================================================= */

export function getCaseDialogState() {

  return Object.freeze({

    created:
      Boolean(
        caseElements?.dialog?.isConnected
      ),

    open:
      Boolean(
        caseElements?.dialog?.open
      ),

    project:
      currentProject?.key ||
      null,

    state:
      caseElements?.dialog
        ?.dataset
        .caseState ||
      "idle"

  });

}
