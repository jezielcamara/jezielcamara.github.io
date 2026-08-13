/* =========================================================
   JEZIEL CAMARA / PROJECT FRAME ENGINE

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - create isolated project documents
   - create project iframes
   - mount project iframes
   - initialize interactive project instances
   - manage frame lifecycle
   - expose frame-ready state

   NOT RESPONSIBLE FOR
   - project registration
   - project metadata
   - Hero layout
   - Work layout
   - Lab controls
   - viewer chrome
   - case-study presentation
   - project-specific styling

   ARCHITECTURE

   ProjectRegistry
        ↓
   ProjectFrame
        ↓
   isolated iframe
        ↓
   canonical project DOM

   IMPORTANT

   Projects NEVER mount directly into the portfolio DOM.

   Every project presentation uses this same isolated
   rendering path.
========================================================= */


import {
  ProjectRegistry
} from "./project-registry.js";


/* =========================================================
   SETTINGS
========================================================= */

const DEFAULT_WIDTH =
  1200;


const DEFAULT_HEIGHT =
  800;


const FRAME_CLASS =
  "portfolio-project-frame";


/*
 * Shared dependencies that genuinely belong inside every
 * project document.
 *
 * This is deliberately NOT a copy of the portfolio's
 * stylesheet list.
 *
 * The browser will cache this font stylesheet across frames.
 */

const SHARED_FRAME_STYLESHEETS =
  Object.freeze([

    "https://fonts.googleapis.com/css2?family=TASA+Orbiter:wght@400;500;600&display=swap"

  ]);


/* =========================================================
   PRIVATE FRAME STATE
========================================================= */

const frameStates =
  new WeakMap();


/* =========================================================
   BASIC HELPERS
========================================================= */

function normalizeText(
  value,
  fallback = ""
) {

  const text =
    String(
      value ??
      ""
    ).trim();


  return text ||
    fallback;

}


function positiveNumber(
  value,
  fallback
) {

  const number =
    Number(
      value
    );


  if (
    !Number.isFinite(
      number
    ) ||
    number <=
      0
  ) {

    return fallback;

  }


  return number;

}


function escapeHTML(
  value
) {

  return String(
    value ??
    ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      "\"",
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   URL NORMALIZATION
========================================================= */

function absoluteURL(
  value
) {

  const path =
    normalizeText(
      value
    );


  if (!path) {

    return "";

  }


  try {

    return new URL(
      path,
      document.baseURI
    ).href;

  } catch (error) {

    console.warn(
      `[ProjectFrame] Could not resolve stylesheet URL: ${path}`,
      error
    );


    return "";

  }

}


/* =========================================================
   TARGET RESOLUTION
========================================================= */

function resolveTarget(
  target
) {

  if (
    typeof target ===
      "string"
  ) {

    return document.querySelector(
      target
    );

  }


  if (
    target &&
    target.nodeType ===
      1
  ) {

    return target;

  }


  return null;

}


/* =========================================================
   PROJECT RESOLUTION
========================================================= */

function resolveProject(
  projectOrKey
) {

  const key =
    typeof projectOrKey ===
      "string"
      ? projectOrKey
      : projectOrKey?.key;


  const project =
    ProjectRegistry.get(
      key
    );


  if (!project) {

    throw new Error(
      `ProjectFrame could not find registered project "${String(key || "")}".`
    );

  }


  return project;

}


/* =========================================================
   PROJECT ELEMENT CREATION

   Supported canonical factory output:

   1. Element
   2. HTML string

   This DOM exists only long enough to serialize the
   canonical project into its isolated frame document.

   It is NEVER mounted into the portfolio document.
========================================================= */

function createProjectElement(
  project
) {

  const result =
    project.createSite();


  if (
    result &&
    result.nodeType ===
      1
  ) {

    return result;

  }


  if (
    typeof result ===
      "string"
  ) {

    const template =
      document.createElement(
        "template"
      );


    template.innerHTML =
      result.trim();


    const element =
      template.content
        .firstElementChild;


    if (!element) {

      throw new Error(
        `Project "${project.key}" returned empty HTML.`
      );

    }


    return element;

  }


  throw new Error(
    `Project "${project.key}" createSite() must return an Element or HTML string.`
  );

}


/* =========================================================
   FRAME OPTIONS
========================================================= */

function normalizeFrameOptions(
  project,
  options = {}
) {

  const interactive =
    options.interactive ===
      true;


  /*
   * scrollable
   *
   * false:
   * decorative preview
   *
   * true:
   * visitor may scroll the project viewport
   * without activating project controls
   *
   * interactive automatically implies scrollable.
   */

  const scrollable =
    interactive ||
    options.scrollable ===
      true;


  const width =
    positiveNumber(
      options.width,
      DEFAULT_WIDTH
    );


  const height =
    positiveNumber(
      options.height,
      DEFAULT_HEIGHT
    );


  const loading =
    options.loading ===
      "eager"
      ? "eager"
      : "lazy";


  const instance =
    normalizeText(
      options.instance,
      "preview"
    );


  const viewport =
    normalizeText(
      options.viewport,
      "responsive"
    );


  const mode =
    interactive
      ? "interactive"
      : scrollable
        ? "browse"
        : "decorative";


  return {

    interactive,

    scrollable,

    width,

    height,

    loading,

    instance,

    viewport,

    mode,

    label:
      normalizeText(
        options.label,
        `${project.name} website preview`
      ),

    revealRoot:
      options.revealRoot ??
      null

  };

}


/* =========================================================
   VIEW-ONLY PROJECT PREPARATION

   View-only project documents are inert.

   This means:
   - links cannot navigate
   - buttons cannot activate
   - form controls cannot receive focus
   - duplicated interactive controls do not enter tab order

   The iframe itself may still be scrollable when the Lab
   needs a browseable responsive preview.
========================================================= */

function prepareProjectRoot(
  project,
  options
) {

  const root =
    createProjectElement(
      project
    );


  root.dataset.portfolioProject =
    project.key;


  root.dataset.projectFrame =
    options.instance;


  root.dataset.projectViewport =
    options.viewport;


  root.dataset.projectFrameMode =
    options.mode;


  if (
    options.interactive
  ) {

    root.dataset.projectInteractive =
      "true";

  } else {

    /*
     * Native inert is intentionally used instead of
     * individually rewriting every link/button/input.
     *
     * The canonical project HTML remains one source while
     * the serialized view-only frame becomes non-operable.
     */

    root.setAttribute(
      "inert",
      ""
    );

  }


  return root;

}


/* =========================================================
   STYLESHEET MARKUP

   Old architecture:
   copy every stylesheet loaded by the portfolio.

   New architecture:
   shared frame dependency
        +
   project.styles

   Example for Sola:

   Google Font
   css/sola.css

   Nothing from North, the Lab, viewer, case study or
   portfolio shell enters that iframe.
========================================================= */

function createStylesheetMarkup(
  project
) {

  const stylesheets =
    [
      ...SHARED_FRAME_STYLESHEETS,
      ...project.styles
    ];


  const uniqueURLs =
    Array.from(
      new Set(
        stylesheets
          .map(
            absoluteURL
          )
          .filter(
            Boolean
          )
      )
    );


  return uniqueURLs
    .map(
      (href) => `

  <link
    rel="stylesheet"
    href="${escapeHTML(href)}"
  >`
    )
    .join(
      "\n"
    );

}


/* =========================================================
   FRAME DOCUMENT

   This contains:
   - canonical project DOM
   - only project-required CSS
   - minimal iframe reset
   - no internal JavaScript

   Interactive behavior is attached by the parent module
   after the same-origin frame loads.
========================================================= */

function createFrameDocument(
  project,
  options
) {

  const projectRoot =
    prepareProjectRoot(
      project,
      options
    );


  const projectHTML =
    projectRoot.outerHTML;


  const stylesheetMarkup =
    createStylesheetMarkup(
      project
    );


  const baseHref =
    escapeHTML(
      document.baseURI
    );


  const title =
    escapeHTML(
      `${project.name} preview`
    );


  const mode =
    escapeHTML(
      options.mode
    );


  return `
<!DOCTYPE html>

<html
  lang="en"
  data-project-frame-document="${mode}"
>

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <base
    href="${baseHref}"
  >

  <title>
    ${title}
  </title>

  ${stylesheetMarkup}


  <style>

    /* =====================================================
       FRAME RESET

       This CSS belongs to the presentation viewport only.

       It does not redesign the project.
    ===================================================== */

    html,
    body {
      width:
        100%;

      min-width:
        0;

      margin:
        0;

      padding:
        0;

      overflow-x:
        hidden;

      background:
        transparent;
    }


    html {
      min-height:
        100%;
    }


    body {
      min-height:
        100vh;
    }


    body
    > [data-portfolio-project] {
      width:
        100%;

      min-width:
        0;

      max-width:
        none;

      margin:
        0;
    }


    *,
    *::before,
    *::after {
      box-sizing:
        border-box;
    }


    /* =====================================================
       VIEW-ONLY SAFETY

       inert handles focus and activation.

       Pointer rules provide an additional guard against
       accidental navigation inside view-only previews.
    ===================================================== */

    [data-project-frame-mode="decorative"]
    a,

    [data-project-frame-mode="decorative"]
    button,

    [data-project-frame-mode="decorative"]
    input,

    [data-project-frame-mode="decorative"]
    select,

    [data-project-frame-mode="decorative"]
    textarea,

    [data-project-frame-mode="browse"]
    a,

    [data-project-frame-mode="browse"]
    button,

    [data-project-frame-mode="browse"]
    input,

    [data-project-frame-mode="browse"]
    select,

    [data-project-frame-mode="browse"]
    textarea {
      pointer-events:
        none !important;
    }


    /* =====================================================
       REDUCED MOTION

       Each iframe respects the visitor's operating-system
       preference independently.
    ===================================================== */

    @media (
      prefers-reduced-motion:
      reduce
    ) {

      *,
      *::before,
      *::after {
        scroll-behavior:
          auto !important;

        animation-duration:
          .001ms !important;

        animation-iteration-count:
          1 !important;

        transition-duration:
          .001ms !important;

        transition-delay:
          0ms !important;
      }

    }

  </style>

</head>


<body
  data-project-frame-mode="${mode}"
>

  ${projectHTML}

</body>

</html>
  `.trim();

}


/* =========================================================
   INITIALIZER CLEANUP SUPPORT

   New project initializers may optionally return:

   function cleanup() {}

   OR

   {
     destroy() {}
   }

   Existing project initializers may continue returning their
   root element. That remains valid.
========================================================= */

function extractCleanup(
  result
) {

  if (
    typeof result ===
      "function"
  ) {

    return result;

  }


  if (
    result &&
    typeof result.destroy ===
      "function"
  ) {

    return () => {

      result.destroy();

    };

  }


  return null;

}


/* =========================================================
   INTERACTIVE FRAME INITIALIZATION
========================================================= */

async function initializeInteractiveFrame(
  frame,
  state
) {

  const {
    project,
    options,
    controller
  } =
    state;


  if (
    !options.interactive
  ) {

    return null;

  }


  let frameDocument =
    null;


  try {

    frameDocument =
      frame.contentDocument;

  } catch (error) {

    throw new Error(
      `Project "${project.key}" interactive frame document is inaccessible.`,
      {
        cause:
          error
      }
    );

  }


  if (!frameDocument) {

    throw new Error(
      `Project "${project.key}" interactive frame document is unavailable.`
    );

  }


  const projectRoot =
    frameDocument.querySelector(
      "[data-portfolio-project]"
    );


  if (!projectRoot) {

    throw new Error(
      `Project "${project.key}" frame did not contain its canonical project root.`
    );

  }


  if (
    typeof project.initialize !==
      "function"
  ) {

    return projectRoot;

  }


  /*
   * A reveal root from the parent document cannot be used
   * by an IntersectionObserver created inside the iframe.
   *
   * Only pass the supplied root if it belongs to the actual
   * frame document.
   */

  const suppliedRevealRoot =
    options.revealRoot;


  const revealRoot =
    suppliedRevealRoot &&
    suppliedRevealRoot.ownerDocument ===
      frameDocument
      ? suppliedRevealRoot
      : null;


  const result =
    await project.initialize(
      projectRoot,
      {

        frame,

        frameDocument,

        frameWindow:
          frameDocument.defaultView,

        interactive:
          true,

        viewport:
          options.viewport,

        instance:
          options.instance,

        revealRoot,

        signal:
          controller.signal

      }
    );


  state.cleanup =
    extractCleanup(
      result
    );


  return projectRoot;

}


/* =========================================================
   READY SETTLEMENT
========================================================= */

function settleReady(
  frame,
  state,
  {
    root = null,
    error = null
  } = {}
) {

  if (
    state.settled
  ) {

    return;

  }


  state.settled =
    true;


  state.root =
    root;


  state.error =
    error;


  frame.dataset.projectFrameState =
    error
      ? "error"
      : "ready";


  state.resolveReady({

    frame,

    project:
      state.project,

    root,

    interactive:
      state.options.interactive,

    scrollable:
      state.options.scrollable,

    mode:
      state.options.mode,

    error

  });

}


/* =========================================================
   LOAD HANDLER
========================================================= */

async function handleFrameLoad(
  frame,
  state
) {

  if (
    state.destroyed
  ) {

    return;

  }


  try {

    const root =
      await initializeInteractiveFrame(
        frame,
        state
      );


    settleReady(
      frame,
      state,
      {
        root
      }
    );

  } catch (error) {

    console.error(
      `[ProjectFrame] Failed to initialize "${state.project.key}".`,
      error
    );


    settleReady(
      frame,
      state,
      {
        error
      }
    );

  }

}


/* =========================================================
   CREATE FRAME

   Defaults:
   - isolated
   - view-only
   - decorative
   - lazy

   Immediate Hero surfaces may explicitly request:

   loading: "eager"

   Lab may request:

   scrollable: true

   Viewer / case-live may request:

   interactive: true
========================================================= */

function createFrame(
  projectOrKey,
  options = {}
) {

  const project =
    resolveProject(
      projectOrKey
    );


  const normalizedOptions =
    normalizeFrameOptions(
      project,
      options
    );


  const frame =
    document.createElement(
      "iframe"
    );


  const controller =
    new AbortController();


  let resolveReady;


  const ready =
    new Promise(
      (resolve) => {

        resolveReady =
          resolve;

      }
    );


  const state =
    {

      project,

      options:
        normalizedOptions,

      controller,

      cleanup:
        null,

      root:
        null,

      error:
        null,

      destroyed:
        false,

      settled:
        false,

      resolveReady,

      ready

    };


  frameStates.set(
    frame,
    state
  );


  /* -------------------------------------------------------
     IDENTITY
  ------------------------------------------------------- */

  frame.className =
    FRAME_CLASS;


  frame.dataset.projectFrameManaged =
    "true";


  frame.dataset.portfolioProject =
    project.key;


  frame.dataset.projectInstance =
    normalizedOptions.instance;


  frame.dataset.projectViewport =
    normalizedOptions.viewport;


  frame.dataset.projectFrameMode =
    normalizedOptions.mode;


  frame.dataset.projectFrameState =
    "loading";


  /* -------------------------------------------------------
     ACCESSIBILITY
  ------------------------------------------------------- */

  frame.title =
    normalizedOptions.label;


  if (
    normalizedOptions.interactive ||
    normalizedOptions.scrollable
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

  } else {

    frame.setAttribute(
      "aria-hidden",
      "true"
    );


    frame.setAttribute(
      "tabindex",
      "-1"
    );


    frame.setAttribute(
      "scrolling",
      "no"
    );

  }


  /* -------------------------------------------------------
     SANDBOX

     DECORATIVE / BROWSE

     Empty sandbox:
     - no scripts
     - opaque origin
     - no forms
     - no popup privileges
     - no top navigation

     INTERACTIVE

     allow-same-origin only:
     - still no scripts execute inside srcdoc
     - parent module may access frame DOM
     - parent attaches canonical initialize()
  ------------------------------------------------------- */

  frame.setAttribute(
    "sandbox",
    normalizedOptions.interactive
      ? "allow-same-origin"
      : ""
  );


  /* -------------------------------------------------------
     LOADING

     Unlike the old architecture, lazy is the default.
  ------------------------------------------------------- */

  frame.loading =
    normalizedOptions.loading;


  /* -------------------------------------------------------
     INITIAL GEOMETRY

     Feature modules may override these values for their
     presentation environments.

     The project engine owns the viewport.
     The feature owns presentation geometry.
  ------------------------------------------------------- */

  frame.style.display =
    "block";


  frame.style.width =
    `${normalizedOptions.width}px`;


  frame.style.height =
    `${normalizedOptions.height}px`;


  frame.style.minWidth =
    `${normalizedOptions.width}px`;


  frame.style.maxWidth =
    "none";


  frame.style.margin =
    "0";


  frame.style.padding =
    "0";


  frame.style.border =
    "0";


  frame.style.background =
    "transparent";


  frame.style.pointerEvents =
    normalizedOptions.interactive ||
    normalizedOptions.scrollable
      ? "auto"
      : "none";


  /* -------------------------------------------------------
     LOAD

     Register before assigning srcdoc.
  ------------------------------------------------------- */

  frame.addEventListener(
    "load",
    () => {

      handleFrameLoad(
        frame,
        state
      );

    },
    {
      once:
        true
    }
  );


  frame.srcdoc =
    createFrameDocument(
      project,
      normalizedOptions
    );


  return frame;

}


/* =========================================================
   DESTROY FRAME

   Provides an explicit lifecycle instead of leaving feature
   modules to remove iframes without cleanup.
========================================================= */

function destroyFrame(
  frame
) {

  const state =
    frameStates.get(
      frame
    );


  if (!state) {

    frame?.remove?.();


    return false;

  }


  if (
    state.destroyed
  ) {

    return false;

  }


  state.destroyed =
    true;


  state.controller.abort();


  if (
    typeof state.cleanup ===
      "function"
  ) {

    try {

      state.cleanup();

    } catch (error) {

      console.warn(
        `[ProjectFrame] Cleanup failed for "${state.project.key}".`,
        error
      );

    }

  }


  if (
    !state.settled
  ) {

    settleReady(
      frame,
      state,
      {
        error:
          new DOMException(
            "Project frame was destroyed before becoming ready.",
            "AbortError"
          )
      }
    );

  }


  frame.remove();


  frameStates.delete(
    frame
  );


  return true;

}


/* =========================================================
   REMOVE MANAGED FRAMES FROM TARGET
========================================================= */

function destroyTargetFrames(
  target
) {

  if (!target) {

    return;

  }


  Array.from(
    target.children
  ).forEach(
    (child) => {

      if (
        frameStates.has(
          child
        )
      ) {

        destroyFrame(
          child
        );

      }

    }
  );

}


/* =========================================================
   MOUNT FRAME

   Mounting another project into the same host first destroys
   any managed frame already owned by that host.
========================================================= */

function mountFrame(
  projectOrKey,
  target,
  options = {}
) {

  const mountTarget =
    resolveTarget(
      target
    );


  if (!mountTarget) {

    const key =
      typeof projectOrKey ===
        "string"
        ? projectOrKey
        : projectOrKey?.key;


    throw new Error(
      `ProjectFrame could not mount "${String(key || "")}": target not found.`
    );

  }


  const project =
    resolveProject(
      projectOrKey
    );


  destroyTargetFrames(
    mountTarget
  );


  const frame =
    createFrame(
      project,
      options
    );


  mountTarget.replaceChildren(
    frame
  );


  mountTarget.dataset.mountedProject =
    project.key;


  mountTarget.dataset.projectRenderMode =
    "frame";


  mountTarget.dataset.projectFrameMode =
    frame.dataset.projectFrameMode;


  mountTarget.dataset.projectViewport =
    frame.dataset.projectViewport;


  return frame;

}


/* =========================================================
   UNMOUNT TARGET

   Removes only ProjectFrame-managed iframes.

   Other unrelated target content is not destroyed.
========================================================= */

function unmountFrame(
  target
) {

  const mountTarget =
    resolveTarget(
      target
    );


  if (!mountTarget) {

    return false;

  }


  let removed =
    false;


  Array.from(
    mountTarget.children
  ).forEach(
    (child) => {

      if (
        frameStates.has(
          child
        )
      ) {

        destroyFrame(
          child
        );


        removed =
          true;

      }

    }
  );


  delete mountTarget.dataset
    .mountedProject;


  delete mountTarget.dataset
    .projectRenderMode;


  delete mountTarget.dataset
    .projectFrameMode;


  delete mountTarget.dataset
    .projectViewport;


  return removed;

}


/* =========================================================
   FRAME READY

   Features no longer need:
   - global CustomEvents
   - registration polling
   - requestAnimationFrame retry loops

   Example:

   const frame =
     ProjectFrame.mount(...);

   const result =
     await ProjectFrame.whenReady(frame);

   if (result.error) {
     // handle failure
   }
========================================================= */

function whenReady(
  frame
) {

  const state =
    frameStates.get(
      frame
    );


  if (!state) {

    return Promise.resolve({

      frame:
        frame ||
        null,

      project:
        null,

      root:
        null,

      interactive:
        false,

      scrollable:
        false,

      mode:
        null,

      error:
        new Error(
          "ProjectFrame.whenReady() received an unmanaged frame."
        )

    });

  }


  return state.ready;

}


/* =========================================================
   FRAME STATE

   Safe diagnostic snapshot.

   Internal controller/cleanup functions are intentionally
   not exposed.
========================================================= */

function getState(
  frame
) {

  const state =
    frameStates.get(
      frame
    );


  if (!state) {

    return null;

  }


  return Object.freeze({

    key:
      state.project.key,

    project:
      state.project,

    instance:
      state.options.instance,

    viewport:
      state.options.viewport,

    mode:
      state.options.mode,

    interactive:
      state.options.interactive,

    scrollable:
      state.options.scrollable,

    loading:
      state.options.loading,

    width:
      state.options.width,

    height:
      state.options.height,

    ready:
      state.settled &&
      !state.error,

    error:
      state.error,

    destroyed:
      state.destroyed

  });

}


/* =========================================================
   PUBLIC API
========================================================= */

export const ProjectFrame =
  Object.freeze({

    create:
      createFrame,

    mount:
      mountFrame,

    unmount:
      unmountFrame,

    destroy:
      destroyFrame,

    whenReady,

    getState

  });


export {
  FRAME_CLASS,
  SHARED_FRAME_STYLESHEETS
};
