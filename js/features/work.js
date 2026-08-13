/* =========================================================
   JEZIEL CAMARA / SELECTED WORK

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - render published project cards
   - keep draft projects out of the portfolio
   - lazily mount canonical project previews
   - scale project frames into Work surfaces
   - manage reel drag behavior
   - manage reel progress
   - track the active project slide
   - expose project-action hooks for Viewer / Case modules
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
   Work
        ↓
   published projects only
        ↓
   project cards
        ↓
   near viewport
        ↓
   ProjectFrame
        ↓
   canonical project website

   IMPORTANT

   Project cards are generated from the registry.

   There is no hardcoded:
   - North card
   - Sola card
   - Avance placeholder
========================================================= */


import {
  ProjectRegistry
} from "../core/project-registry.js";


import {
  ProjectFrame
} from "../core/project-frame.js";


/* =========================================================
   PROJECT VIEWPORT

   All Selected Work previews receive the same genuine
   desktop project viewport.

   Portfolio scaling changes.

   Project layout does not.
========================================================= */

const WORK_VIEWPORT_WIDTH =
  1200;


const WORK_VIEWPORT_HEIGHT =
  820;


/* =========================================================
   LAZY-MOUNT DISTANCE

   Work project documents are not created during initial
   Hero load.

   Mount them only when the Work section approaches the
   viewport.

   700px gives the browser time to:
   - create srcdoc
   - request project CSS
   - request visible project imagery

   before the user actually reaches the section.
========================================================= */

const WORK_ROOT_MARGIN =
  "700px 0px 700px 0px";


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

   The current CSS still contains historical alternate slide
   class names.

   All of them now share the same dimensions.

   We retain the ordinal classes temporarily so the staging
   page preserves the current visual system until the later
   CSS consolidation pass.

   This is based on POSITION, not project identity.
========================================================= */

function getSlideClassName(
  index
) {

  if (
    index ===
    1
  ) {

    return "project-slide project-slide-alt";

  }


  if (
    index ===
    2
  ) {

    return "project-slide project-slide-third";

  }


  return "project-slide";

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


  /* -------------------------------------------------------
     PROJECT MEDIA

     IMPORTANT:

     This is deliberately NOT role="img".

     A project surface will later receive controls such as
     the View Website button.

     Interactive descendants must never be placed inside an
     element exposed as role="img".
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     TEMPORARY PREVIEW PLACEHOLDER

     ProjectFrame.mount() replaces these children when the
     Work section approaches the viewport.
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     CAPTION
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     ACTIONS

     The Work module creates the action hook.

     It does NOT open case studies itself.

     The future case-dialog.js module owns the dialog and
     binds to:

     [data-case-project]
  ------------------------------------------------------- */

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


  const caseButton =
    document.createElement(
      "button"
    );


  caseButton.className =
    "case-open";


  caseButton.type =
    "button";


  caseButton.dataset.project =
    project.key;


  caseButton.dataset.caseProject =
    project.key;


  caseButton.dataset.projectAction =
    "case";


  caseButton.setAttribute(
    "aria-haspopup",
    "dialog"
  );


  caseButton.setAttribute(
    "aria-controls",
    "case-dialog"
  );


  caseButton.setAttribute(
    "aria-label",
    `Explore ${project.name} project`
  );


  const caseText =
    document.createTextNode(
      "Explore project"
    );


  const caseArrow =
    document.createElement(
      "span"
    );


  caseArrow.setAttribute(
    "aria-hidden",
    "true"
  );


  caseArrow.textContent =
    "↗";


  caseButton.append(
    caseText,
    caseArrow
  );


  actions.append(
    pages,
    caseButton
  );


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

   This is the public publication boundary.

   Draft projects never receive:
   - a card
   - a preview
   - a case button
   - active reel state

   Avance can safely exist as status:"draft" later without
   appearing here.
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

   Keep a genuine 1200 × 820 project viewport.

   Scale only its presentation inside the portfolio card.
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


  if (
    !availableWidth
  ) {

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

   The current production reel does not explicitly maintain
   one active project.

   This module does.

   CSS can therefore cleanly de-emphasize neighboring
   captions later without changing Work JavaScript again.
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

     One near-viewport event mounts the Work previews.

     We do not construct Work iframes during initial Hero
     startup.
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

      /*
       * Older browser fallback.
       */

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


    /*
     * Generic integration event for future portfolio
     * features.
     *
     * This is NOT a dependency-readiness event.
     *
     * All modules are already synchronously imported.
     *
     * This event represents an actual UI state change.
     */

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

     Progress and active-slide calculation share one
     requestAnimationFrame rather than doing work directly
     for every native scroll event.
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

     Touch keeps native browser scrolling.

     Mouse / pen receive the desktop grab interaction.

     Interactive controls never begin a reel drag.
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

    if (
      !dragging
    ) {

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

      if (
        dragging
      ) {

        dragging =
          false;


        dragPointerId =
          null;


        reel.classList.remove(
          "dragging"
        );


        scheduleScrollState();

      }

    },
    {

      signal

    }
  );


  /* =======================================================
     KEYBOARD / PROGRAMMATIC RESIZE SUPPORT

     Native horizontal scrolling remains available to
     keyboard users.

     Resize recalculates:
     - frame scaling
     - progress
     - active slide
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

     A fresh page always begins on the first published
     project.

     This fixes stale reel positions caused by browser
     scroll restoration or previous runtime state.
  ======================================================= */

  reel.scrollLeft =
    0;


  updateScrollState();


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


    mountObserver?.disconnect();


    mountObserver =
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
      scrollFrame
    ) {

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
