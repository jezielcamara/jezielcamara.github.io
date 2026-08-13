/* =========================================================
   JEZIEL CAMARA / SELECTED WORK

   MODULAR PORTFOLIO ARCHITECTURE

   RESPONSIBILITY
   - render published project cards
   - keep draft projects out of the portfolio
   - lazily mount canonical project previews
   - scale project frames into Work surfaces
   - manage reel drag behavior
   - manage reel progress
   - track the active project slide
   - lazily open the website viewer
   - lazily open project case studies
   - clean up Work resources

   NOT RESPONSIBLE FOR
   - project registration
   - canonical project HTML
   - project-specific CSS
   - website viewer implementation
   - case-study implementation
   - page-wide reveal animation

   ARCHITECTURE

   ProjectRegistry
        ↓
   published projects
        ↓
   Selected Work cards
        ↓
   ProjectFrame preview

   ACTIONS

   View Website
        ↓
   dynamic import("./viewer.js")

   Explore Project
        ↓
   dynamic import("./case-dialog.js")
        ↓
   project.loadCase()
========================================================= */


import {
  ProjectRegistry
} from "../core/project-registry.js";


import {
  ProjectFrame
} from "../core/project-frame.js";


/* =========================================================
   PROJECT PREVIEW VIEWPORT
========================================================= */

const WORK_VIEWPORT_WIDTH =
  1200;


const WORK_VIEWPORT_HEIGHT =
  820;


/* =========================================================
   PREVIEW LAZY-MOUNT DISTANCE
========================================================= */

const WORK_ROOT_MARGIN =
  "700px 0px 700px 0px";


/* =========================================================
   LAZY ACTION MODULES

   These modules are deliberately absent from the initial
   app dependency graph.

   The first click loads them.

   Native ES-module caching handles subsequent requests.
========================================================= */

let viewerModulePromise =
  null;


let viewerModule =
  null;


let caseDialogModulePromise =
  null;


let caseDialogModule =
  null;


/* =========================================================
   LAZY VIEWER
========================================================= */

function loadViewerModule() {

  if (viewerModule) {

    return Promise.resolve(
      viewerModule
    );

  }


  if (viewerModulePromise) {

    return viewerModulePromise;

  }


  viewerModulePromise =
    import(
      "./viewer.js"
    )
      .then(
        (module) => {

          viewerModule =
            module;


          return module;

        }
      )
      .catch(
        (error) => {

          viewerModulePromise =
            null;


          throw error;

        }
      );


  return viewerModulePromise;

}


/* =========================================================
   LAZY CASE CONTROLLER
========================================================= */

function loadCaseDialogModule() {

  if (caseDialogModule) {

    return Promise.resolve(
      caseDialogModule
    );

  }


  if (caseDialogModulePromise) {

    return caseDialogModulePromise;

  }


  caseDialogModulePromise =
    import(
      "./case-dialog.js"
    )
      .then(
        (module) => {

          caseDialogModule =
            module;


          return module;

        }
      )
      .catch(
        (error) => {

          caseDialogModulePromise =
            null;


          throw error;

        }
      );


  return caseDialogModulePromise;

}


/* =========================================================
   ELEMENTS
========================================================= */

function getWorkElements() {

  const section =
    document.querySelector(
      "#work"
    );


  const reel =
    section?.querySelector(
      "[data-project-reel]"
    ) ||
    section?.querySelector(
      ".project-reel"
    );


  const track =
    section?.querySelector(
      "[data-project-reel-track]"
    ) ||
    section?.querySelector(
      ".reel-track"
    );


  const progress =
    section?.querySelector(
      "[data-reel-progress]"
    ) ||
    section?.querySelector(
      ".reel-progress-fill"
    );


  if (
    !section ||
    !reel ||
    !track
  ) {

    return null;

  }


  return {

    section,

    reel,

    track,

    progress

  };

}


/* =========================================================
   SLIDE CLASS COMPATIBILITY

   Temporary compatibility with the current CSS system.

   These classes depend on ordinal position rather than
   project identity.
========================================================= */

function getSlideClassName(
  index
) {

  if (
    index ===
    1
  ) {

    return (
      "project-slide project-slide-alt"
    );

  }


  if (
    index ===
    2
  ) {

    return (
      "project-slide project-slide-third"
    );

  }


  return "project-slide";

}


/* =========================================================
   ACTION BUTTON
========================================================= */

function createActionButton({
  project,
  action,
  text
}) {

  const button =
    document.createElement(
      "button"
    );


  /*
   * case-open currently contains the approved text-button
   * presentation in enhancements.css.
   *
   * project-view-launch adds the existing Viewer focus /
   * cursor treatment.
   *
   * These style names can be consolidated later without
   * changing the action architecture.
   */

  button.className =
    action ===
      "viewer"
      ? "case-open project-view-launch"
      : "case-open";


  button.type =
    "button";


  button.dataset.project =
    project.key;


  button.dataset.projectAction =
    action;


  button.dataset.reelNoDrag =
    "true";


  button.setAttribute(
    "aria-haspopup",
    "dialog"
  );


  if (
    action ===
    "case"
  ) {

    button.dataset.caseProject =
      project.key;


    button.setAttribute(
      "aria-controls",
      "case-dialog"
    );

  }


  button.setAttribute(
    "aria-label",
    action ===
      "viewer"
      ? `View ${project.name} website`
      : `Explore ${project.name} project`
  );


  const label =
    document.createTextNode(
      text
    );


  const arrow =
    document.createElement(
      "span"
    );


  arrow.setAttribute(
    "aria-hidden",
    "true"
  );


  arrow.textContent =
    "↗";


  button.append(
    label,
    arrow
  );


  return button;

}


/* =========================================================
   PROJECT CARD
========================================================= */

function createProjectCard(
  project,
  position
) {

  const article =
    document.createElement(
      "article"
    );


  article.className =
    getSlideClassName(
      position
    );


  article.dataset.project =
    project.key;


  article.dataset.workProject =
    project.key;


  article.dataset.projectStatus =
    project.status;


  const titleId =
    `work-project-${project.key}-title`;


  article.setAttribute(
    "aria-labelledby",
    titleId
  );


  /* =======================================================
     PROJECT MEDIA

     Deliberately NOT role="img".

     The surface contains a canonical iframe and may later
     sit beside interactive controls. It is not a static
     semantic image.
  ======================================================= */

  const media =
    document.createElement(
      "div"
    );


  media.className =
    "project-image";


  media.dataset.projectPreview =
    project.key;


  media.dataset.projectPreviewState =
    "waiting";


  /* =======================================================
     TEMPORARY PLACEHOLDER

     Removed automatically by ProjectFrame.mount().
  ======================================================= */

  const placeholderCross =
    document.createElement(
      "div"
    );


  placeholderCross.className =
    "placeholder-cross";


  placeholderCross.setAttribute(
    "aria-hidden",
    "true"
  );


  const placeholderLabel =
    document.createElement(
      "span"
    );


  placeholderLabel.textContent =
    `PROJECT IMAGE / ${project.index}`;


  placeholderLabel.setAttribute(
    "aria-hidden",
    "true"
  );


  media.append(
    placeholderCross,
    placeholderLabel
  );


  /* =======================================================
     CAPTION
  ======================================================= */

  const caption =
    document.createElement(
      "div"
    );


  caption.className =
    "project-caption";


  const identity =
    document.createElement(
      "div"
    );


  const meta =
    document.createElement(
      "span"
    );


  meta.textContent =
    `${project.index} / ${project.category}`;


  const title =
    document.createElement(
      "h3"
    );


  title.id =
    titleId;


  title.textContent =
    project.name;


  identity.append(
    meta,
    title
  );


  /* =======================================================
     ACTIONS
  ======================================================= */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "project-caption-actions";


  const pages =
    document.createElement(
      "p"
    );


  pages.textContent =
    project.work.pages ||
    project.type;


  actions.append(
    pages
  );


  /*
   * Website Viewer
   *
   * viewer.enabled defaults to usable unless explicitly
   * disabled by project metadata.
   */

  if (
    project.viewer.enabled !==
    false
  ) {

    const viewerButton =
      createActionButton({

        project,

        action:
          "viewer",

        text:
          "View website"

      });


    actions.append(
      viewerButton
    );

  }


  /*
   * Case Study
   *
   * Only projects with an actual loadCase() function receive
   * the case action.
   */

  if (
    typeof project.loadCase ===
      "function"
  ) {

    const caseButton =
      createActionButton({

        project,

        action:
          "case",

        text:
          "Explore project"

      });


    actions.append(
      caseButton
    );

  }


  caption.append(
    identity,
    actions
  );


  article.append(
    media,
    caption
  );


  return {

    article,

    media

  };

}


/* =========================================================
   RENDER PUBLISHED PROJECTS

   This is the publication boundary.

   Draft projects receive no:
   - card
   - frame
   - Viewer button
   - case action
   - reel state
========================================================= */

function renderProjects(
  track
) {

  const projects =
    ProjectRegistry
      .published()
      .filter(
        (project) =>
          project.work.enabled !==
          false
      );


  const fragment =
    document.createDocumentFragment();


  const entries =
    [];


  projects.forEach(
    (
      project,
      index
    ) => {

      const card =
        createProjectCard(
          project,
          index
        );


      fragment.append(
        card.article
      );


      entries.push({

        project,

        article:
          card.article,

        host:
          card.media,

        frame:
          null

      });

    }
  );


  track.replaceChildren(
    fragment
  );


  track.dataset.projectCount =
    String(
      projects.length
    );


  track.dataset.workState =
    projects.length
      ? "ready"
      : "empty";


  return entries;

}


/* =========================================================
   PREPARE PROJECT HOST
========================================================= */

function prepareProjectHost(
  host
) {

  host.classList.add(
    "has-canonical-project-preview",
    "has-canonical-work-preview"
  );


  host.style.position =
    "relative";


  host.style.display =
    "block";


  host.style.alignItems =
    "";


  host.style.justifyContent =
    "";


  host.style.padding =
    "0";


  host.style.overflow =
    "hidden";

}


/* =========================================================
   FRAME FITTING

   The project receives a real 1200 × 820 desktop viewport.

   Only the surrounding portfolio presentation scales.
========================================================= */

function fitProjectFrame(
  entry
) {

  const {
    host,
    frame
  } =
    entry;


  if (
    !host ||
    !frame
  ) {

    return;

  }


  const availableWidth =
    host.clientWidth;


  if (!availableWidth) {

    return;

  }


  const scale =
    Math.min(
      1,
      availableWidth /
      WORK_VIEWPORT_WIDTH
    );


  frame.style.position =
    "absolute";


  frame.style.top =
    "0";


  frame.style.left =
    "0";


  frame.style.width =
    `${WORK_VIEWPORT_WIDTH}px`;


  frame.style.minWidth =
    `${WORK_VIEWPORT_WIDTH}px`;


  frame.style.height =
    `${WORK_VIEWPORT_HEIGHT}px`;


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
   MOUNT ONE PROJECT PREVIEW
========================================================= */

function mountProjectPreview(
  entry
) {

  if (
    entry.frame
  ) {

    return entry.frame;

  }


  prepareProjectHost(
    entry.host
  );


  entry.host.dataset
    .projectPreviewState =
      "loading";


  try {

    const frame =
      ProjectFrame.mount(
        entry.project.key,
        entry.host,
        {

          instance:
            "selected-work",

          viewport:
            "desktop",

          width:
            WORK_VIEWPORT_WIDTH,

          height:
            WORK_VIEWPORT_HEIGHT,

          loading:
            "lazy",

          label:
            `${entry.project.name} selected work preview`

        }
      );


    frame.classList.add(
      "portfolio-work-project-frame"
    );


    entry.frame =
      frame;


    fitProjectFrame(
      entry
    );


    ProjectFrame
      .whenReady(
        frame
      )
      .then(
        ({
          error
        }) => {

          if (
            entry.frame !==
            frame
          ) {

            return;

          }


          entry.host.dataset
            .projectPreviewState =
              error
                ? "error"
                : "ready";

        }
      );


    return frame;

  } catch (error) {

    entry.host.dataset
      .projectPreviewState =
        "error";


    console.error(
      `[Work] Could not mount "${entry.project.key}" preview.`,
      error
    );


    return null;

  }

}


/* =========================================================
   ACTIVE SLIDE
========================================================= */

function findActiveEntry(
  entries,
  reel
) {

  if (
    !entries.length
  ) {

    return null;

  }


  const reelCenter =
    reel.scrollLeft +
    reel.clientWidth /
    2;


  let activeEntry =
    entries[0];


  let smallestDistance =
    Number.POSITIVE_INFINITY;


  entries.forEach(
    (entry) => {

      const slideCenter =
        entry.article.offsetLeft +
        entry.article.offsetWidth /
        2;


      const distance =
        Math.abs(
          slideCenter -
          reelCenter
        );


      if (
        distance <
        smallestDistance
      ) {

        smallestDistance =
          distance;


        activeEntry =
          entry;

      }

    }
  );


  return activeEntry;

}


/* =========================================================
   ACTION STATE
========================================================= */

function setActionState(
  button,
  state
) {

  if (
    !button
  ) {

    return;

  }


  button.dataset.actionState =
    state;


  if (
    state ===
    "loading"
  ) {

    button.disabled =
      true;


    button.setAttribute(
      "aria-busy",
      "true"
    );


    return;

  }


  button.disabled =
    false;


  button.removeAttribute(
    "aria-busy"
  );

}


/* =========================================================
   OPEN VIEWER
========================================================= */

async function openViewer(
  project,
  button
) {

  try {

    const module =
      await loadViewerModule();


    if (
      typeof module.openProjectViewer !==
        "function"
    ) {

      throw new Error(
        "Viewer module does not export openProjectViewer()."
      );

    }


    return await module.openProjectViewer(
      project.key,
      {
        returnFocus:
          button
      }
    );

  } catch (error) {

    console.error(
      `[Work] Could not open "${project.key}" website viewer.`,
      error
    );


    return false;

  }

}


/* =========================================================
   OPEN CASE STUDY
========================================================= */

async function openCase(
  project,
  button
) {

  try {

    const module =
      await loadCaseDialogModule();


    if (
      typeof module.openProjectCase !==
        "function"
    ) {

      throw new Error(
        "Case controller does not export openProjectCase()."
      );

    }


    return await module.openProjectCase(
      project.key,
      {
        returnFocus:
          button
      }
    );

  } catch (error) {

    console.error(
      `[Work] Could not open "${project.key}" case study.`,
      error
    );


    return false;

  }

}


/* =========================================================
   INITIALIZE SELECTED WORK
========================================================= */

export function initWork() {

  const elements =
    getWorkElements();


  if (!elements) {

    return null;

  }


  const {

    section,

    reel,

    track,

    progress

  } =
    elements;


  const entries =
    renderProjects(
      track
    );


  const controller =
    new AbortController();


  const {
    signal
  } =
    controller;


  let destroyed =
    false;


  let previewsMounted =
    false;


  let mountObserver =
    null;


  let resizeObserver =
    null;


  let resizeFrame =
    0;


  let scrollFrame =
    0;


  let activeProjectKey =
    null;


  let dragging =
    false;


  let dragPointerId =
    null;


  let dragStartX =
    0;


  let dragStartScroll =
    0;


  /* =======================================================
     PROJECT LOOKUP FOR ACTIONS
  ======================================================= */

  function getEntryByKey(
    key
  ) {

    return entries.find(
      (entry) =>
        entry.project.key ===
        key
    ) ||
    null;

  }


  /* =======================================================
     ACTION DELEGATION

     No Viewer or Case listener is attached individually to
     each generated card.

     One Work-owned listener handles all project actions.
  ======================================================= */

  track.addEventListener(
    "click",
    async (event) => {

      const button =
        event.target
          ?.closest?.(
            "[data-project-action]"
          );


      if (
        !button ||
        !track.contains(
          button
        )
      ) {

        return;

      }


      event.preventDefault();


      if (
        button.dataset.actionState ===
        "loading"
      ) {

        return;

      }


      const key =
        String(
          button.dataset.project ||
          ""
        )
          .trim()
          .toLowerCase();


      const action =
        String(
          button.dataset.projectAction ||
          ""
        )
          .trim()
          .toLowerCase();


      const entry =
        getEntryByKey(
          key
        );


      if (!entry) {

        return;

      }


      setActionState(
        button,
        "loading"
      );


      let success =
        false;


      if (
        action ===
        "viewer"
      ) {

        success =
          await openViewer(
            entry.project,
            button
          );

      } else if (
        action ===
        "case"
      ) {

        success =
          await openCase(
            entry.project,
            button
          );

      }


      if (
        destroyed ||
        !button.isConnected
      ) {

        return;

      }


      setActionState(
        button,
        success
          ? "ready"
          : "error"
      );

    },
    {
      signal
    }
  );


  /* =======================================================
     FIT ALL MOUNTED FRAMES
  ======================================================= */

  function fitMountedFrames() {

    entries.forEach(
      (entry) => {

        if (
          entry.frame
        ) {

          fitProjectFrame(
            entry
          );

        }

      }
    );

  }


  function scheduleFit() {

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


          fitMountedFrames();

        }
      );

  }


  /* =======================================================
     PREVIEW MOUNTING
  ======================================================= */

  function mountPreviews() {

    if (
      destroyed ||
      previewsMounted
    ) {

      return;

    }


    previewsMounted =
      true;


    section.dataset
      .projectPreviewsMounted =
        "true";


    entries.forEach(
      (entry) => {

        mountProjectPreview(
          entry
        );

      }
    );


    if (
      "ResizeObserver" in
      window
    ) {

      resizeObserver =
        new ResizeObserver(
          scheduleFit
        );


      entries.forEach(
        (entry) => {

          resizeObserver.observe(
            entry.host
          );

        }
      );

    } else {

      window.addEventListener(
        "resize",
        scheduleFit,
        {

          passive:
            true,

          signal

        }
      );

    }


    scheduleFit();

  }


  /* =======================================================
     NEAR-VIEWPORT PREVIEW ACTIVATION
  ======================================================= */

  if (
    entries.length
  ) {

    if (
      "IntersectionObserver" in
        window
    ) {

      mountObserver =
        new IntersectionObserver(
          (
            observerEntries,
            observer
          ) => {

            const approaching =
              observerEntries.some(
                (entry) =>
                  entry.isIntersecting
              );


            if (!approaching) {

              return;

            }


            observer.disconnect();


            mountObserver =
              null;


            mountPreviews();

          },
          {

            root:
              null,

            rootMargin:
              WORK_ROOT_MARGIN,

            threshold:
              0

          }
        );


      mountObserver.observe(
        section
      );

    } else {

      mountPreviews();

    }

  }


  /* =======================================================
     REEL PROGRESS
  ======================================================= */

  function updateProgress() {

    const maximum =
      reel.scrollWidth -
      reel.clientWidth;


    const ratio =
      maximum >
      0
        ? reel.scrollLeft /
          maximum
        : 0;


    const clampedRatio =
      Math.max(
        0,
        Math.min(
          1,
          ratio
        )
      );


    if (progress) {

      progress.style.transform =
        `scaleX(${
          0.28 +
          clampedRatio *
          0.72
        })`;

    }

  }


  /* =======================================================
     ACTIVE PROJECT
  ======================================================= */

  function updateActiveProject() {

    const activeEntry =
      findActiveEntry(
        entries,
        reel
      );


    if (!activeEntry) {

      return;

    }


    entries.forEach(
      (entry) => {

        const active =
          entry ===
          activeEntry;


        entry.article.classList
          .toggle(
            "is-active",
            active
          );


        if (active) {

          entry.article.setAttribute(
            "aria-current",
            "true"
          );

        } else {

          entry.article.removeAttribute(
            "aria-current"
          );

        }

      }
    );


    reel.dataset.activeProject =
      activeEntry.project.key;


    section.dataset.activeProject =
      activeEntry.project.key;


    if (
      activeProjectKey ===
      activeEntry.project.key
    ) {

      return;

    }


    activeProjectKey =
      activeEntry.project.key;


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:work-active",
        {

          detail:
            {

              key:
                activeEntry.project.key,

              project:
                activeEntry.project,

              slide:
                activeEntry.article

            }

        }
      )
    );

  }


  /* =======================================================
     SCROLL STATE
  ======================================================= */

  function updateScrollState() {

    updateProgress();
    updateActiveProject();

  }


  function scheduleScrollState() {

    if (
      destroyed ||
      scrollFrame
    ) {

      return;

    }


    scrollFrame =
      window.requestAnimationFrame(
        () => {

          scrollFrame =
            0;


          updateScrollState();

        }
      );

  }


  reel.addEventListener(
    "scroll",
    scheduleScrollState,
    {

      passive:
        true,

      signal

    }
  );


  /* =======================================================
     POINTER DRAG

     Touch retains native scrolling.

     Mouse and pen receive the grab interaction.

     Interactive controls never initiate drag.
  ======================================================= */

  function isInteractiveTarget(
    target
  ) {

    return Boolean(
      target?.closest?.(
        [
          "button",
          "a",
          "input",
          "select",
          "textarea",
          "[data-reel-no-drag]"
        ].join(
          ","
        )
      )
    );

  }


  reel.addEventListener(
    "pointerdown",
    (event) => {

      if (
        event.pointerType ===
          "touch" ||
        isInteractiveTarget(
          event.target
        )
      ) {

        return;

      }


      dragging =
        true;


      dragPointerId =
        event.pointerId;


      dragStartX =
        event.clientX;


      dragStartScroll =
        reel.scrollLeft;


      reel.classList.add(
        "dragging"
      );


      reel.setPointerCapture(
        event.pointerId
      );


      event.preventDefault();

    },
    {
      signal
    }
  );


  reel.addEventListener(
    "pointermove",
    (event) => {

      if (
        !dragging ||
        event.pointerId !==
          dragPointerId
      ) {

        return;

      }


      reel.scrollLeft =
        dragStartScroll -
        (
          event.clientX -
          dragStartX
        );

    },
    {
      signal
    }
  );


  function finishDrag(
    event
  ) {

    if (!dragging) {

      return;

    }


    if (
      event &&
      dragPointerId !==
        null &&
      event.pointerId !==
        dragPointerId
    ) {

      return;

    }


    const pointerId =
      dragPointerId;


    dragging =
      false;


    dragPointerId =
      null;


    reel.classList.remove(
      "dragging"
    );


    if (
      pointerId !==
        null &&
      reel.hasPointerCapture?.(
        pointerId
      )
    ) {

      reel.releasePointerCapture(
        pointerId
      );

    }


    scheduleScrollState();

  }


  reel.addEventListener(
    "pointerup",
    finishDrag,
    {
      signal
    }
  );


  reel.addEventListener(
    "pointercancel",
    finishDrag,
    {
      signal
    }
  );


  reel.addEventListener(
    "lostpointercapture",
    () => {

      if (!dragging) {

        return;

      }


      dragging =
        false;


      dragPointerId =
        null;


      reel.classList.remove(
        "dragging"
      );


      scheduleScrollState();

    },
    {
      signal
    }
  );


  /* =======================================================
     RESIZE
  ======================================================= */

  function handleResize() {

    scheduleFit();
    scheduleScrollState();

  }


  window.addEventListener(
    "resize",
    handleResize,
    {

      passive:
        true,

      signal

    }
  );


  /* =======================================================
     INITIAL POSITION

     Fresh runtime always starts on project 01.
  ======================================================= */

  reel.scrollLeft =
    0;


  updateScrollState();


  /* =======================================================
     DESTROY
  ======================================================= */

  function destroy() {

    if (destroyed) {

      return;

    }


    destroyed =
      true;


    controller.abort();


    mountObserver?.disconnect();


    mountObserver =
      null;


    resizeObserver?.disconnect();


    resizeObserver =
      null;


    if (resizeFrame) {

      window.cancelAnimationFrame(
        resizeFrame
      );


      resizeFrame =
        0;

    }


    if (scrollFrame) {

      window.cancelAnimationFrame(
        scrollFrame
      );


      scrollFrame =
        0;

    }


    entries.forEach(
      (entry) => {

        if (
          entry.frame
        ) {

          ProjectFrame.unmount(
            entry.host
          );


          entry.frame =
            null;

        }

      }
    );


    /*
     * Viewer and Case are loaded through Work actions rather
     * than through app.js.
     *
     * When Work itself is explicitly destroyed during
     * staging, clean up those optional surfaces as well.
     */

    try {

      viewerModule
        ?.destroyProjectViewer
        ?.();

    } catch (error) {

      console.warn(
        "[Work] Viewer cleanup failed.",
        error
      );

    }


    try {

      caseDialogModule
        ?.destroyCaseDialog
        ?.();

    } catch (error) {

      console.warn(
        "[Work] Case cleanup failed.",
        error
      );

    }


    delete section.dataset
      .projectPreviewsMounted;


    delete section.dataset
      .activeProject;


    delete reel.dataset
      .activeProject;


    track.replaceChildren();


    track.dataset.workState =
      "destroyed";


    track.dataset.projectCount =
      "0";

  }


  /* =======================================================
     FEATURE CONTROLLER
  ======================================================= */

  return Object.freeze({

    projects:
      entries.map(
        (entry) =>
          entry.project
      ),

    mountPreviews,

    update:
      updateScrollState,

    destroy

  });

}
