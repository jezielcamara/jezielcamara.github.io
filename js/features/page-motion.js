/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PAGE MOTION

   MODULAR PORTFOLIO ARCHITECTURE

   RESPONSIBILITY
   - page intro state
   - scroll progress
   - Hero word scroll response
   - side-rail section state
   - Hero pointer parallax
   - draggable Hero windows
   - responsive dragged-window placement
   - reveal observers
   - reduced-motion handling
   - pause Hero animation while offscreen
   - pause Hero animation while document is hidden
   - clean up all page-motion resources

   NOT RESPONSIBLE FOR
   - project selection
   - project iframe rendering
   - Work reel behavior
   - Responsive Lab behavior
   - Viewer behavior
   - case-study behavior

   PERFORMANCE RULE

   Hero pointer animation runs only while:

   - the Hero is near the viewport
   - the document is visible
   - motion is permitted
   - interpolation is still required

   There is no permanent requestAnimationFrame loop.
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const HERO_VISIBLE_MARGIN =
  "160px 0px 160px 0px";


const HERO_SAFE_EDGE =
  14;


const PARALLAX_EASE =
  0.045;


const PARALLAX_X_DISTANCE =
  18;


const PARALLAX_Y_DISTANCE =
  14;


const PARALLAX_SETTLE_THRESHOLD =
  0.0005;


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


/* =========================================================
   INITIALIZE
========================================================= */

export function initPageMotion() {

  const body =
    document.body;


  const root =
    document.documentElement;


  const heroStage =
    document.querySelector(
      ".hero-stage"
    );


  const labSection =
    document.querySelector(
      ".lab-section"
    );


  const contactSection =
    document.querySelector(
      ".contact-section"
    );


  const floatingWindows =
    Array.from(
      document.querySelectorAll(
        ".floating-window"
      )
    );


  const revealSections =
    Array.from(
      document.querySelectorAll(
        ".reveal"
      )
    );


  const detailElements =
    Array.from(
      document.querySelectorAll(
        [
          ".thinking-lines article",
          ".project-slide",
          ".story-step",
          ".note-item"
        ].join(
          ","
        )
      )
    );


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  const controller =
    new AbortController();


  const {
    signal
  } =
    controller;


  let destroyed =
    false;


  /* =======================================================
     REQUEST ANIMATION FRAME STATE
  ======================================================= */

  let introFrame =
    0;


  let pageFrame =
    0;


  let parallaxFrame =
    0;


  let heroResizeFrame =
    0;


  /* =======================================================
     OBSERVERS
  ======================================================= */

  let revealObserver =
    null;


  let heroVisibilityObserver =
    null;


  /* =======================================================
     HERO VISIBILITY
  ======================================================= */

  let heroNearViewport =
    true;


  let documentVisible =
    document.visibilityState !==
    "hidden";


  /* =======================================================
     PAGE INTRO
  ======================================================= */

  function showPage() {

    if (destroyed) {

      return;

    }


    body.classList.add(
      "ready"
    );

  }


  introFrame =
    window.requestAnimationFrame(
      () => {

        introFrame =
          0;


        showPage();

      }
    );


  /* =======================================================
     SCROLL STATE

     One rAF handles:
     - page progress
     - Hero word response
     - side rail state

     Native scroll events never perform layout calculations
     directly.
  ======================================================= */

  function updatePageState() {

    pageFrame =
      0;


    if (destroyed) {

      return;

    }


    const scrollTop =
      window.scrollY;


    const maximumScroll =
      Math.max(
        0,
        root.scrollHeight -
        window.innerHeight
      );


    const progress =
      maximumScroll >
      0
        ? (
          scrollTop /
          maximumScroll
        ) *
          100
        : 0;


    root.style.setProperty(
      "--scroll-progress",
      `${progress}%`
    );


    /* =====================================================
       HERO WORD SCROLL RESPONSE
    ===================================================== */

    if (
      heroStage &&
      !prefersReducedMotion
    ) {

      const rect =
        heroStage.getBoundingClientRect();


      /*
       * Once the Hero has moved above the viewport,
       * convert that travel into subtle opposing movement.
       */

      const heroScroll =
        Math.max(
          0,
          Math.min(
            -rect.top,
            rect.height
          )
        );


      root.style.setProperty(
        "--hero-word-one-x",
        `${heroScroll * -0.055}px`
      );


      root.style.setProperty(
        "--hero-word-two-x",
        `${heroScroll * 0.04}px`
      );

    } else {

      root.style.setProperty(
        "--hero-word-one-x",
        "0px"
      );


      root.style.setProperty(
        "--hero-word-two-x",
        "0px"
      );

    }


    /* =====================================================
       SIDE RAIL STATE
    ===================================================== */

    const viewportCenter =
      window.innerHeight *
      0.5;


    body.classList.remove(
      "rail-blue",
      "rail-lime"
    );


    if (labSection) {

      const rect =
        labSection.getBoundingClientRect();


      if (
        rect.top <=
          viewportCenter &&
        rect.bottom >=
          viewportCenter
      ) {

        body.classList.add(
          "rail-blue"
        );

      }

    }


    if (contactSection) {

      const rect =
        contactSection.getBoundingClientRect();


      if (
        rect.top <=
          viewportCenter &&
        rect.bottom >=
          viewportCenter
      ) {

        body.classList.remove(
          "rail-blue"
        );


        body.classList.add(
          "rail-lime"
        );

      }

    }

  }


  function requestPageUpdate() {

    if (
      destroyed ||
      pageFrame
    ) {

      return;

    }


    pageFrame =
      window.requestAnimationFrame(
        updatePageState
      );

  }


  window.addEventListener(
    "scroll",
    requestPageUpdate,
    {

      passive:
        true,

      signal

    }
  );


  window.addEventListener(
    "resize",
    requestPageUpdate,
    {

      passive:
        true,

      signal

    }
  );


  updatePageState();


  /* =======================================================
     HERO PARALLAX STATE
  ======================================================= */

  let targetX =
    0;


  let targetY =
    0;


  let currentX =
    0;


  let currentY =
    0;


  function canRunHeroParallax() {

    return Boolean(
      heroStage &&
      floatingWindows.length &&
      finePointer &&
      !prefersReducedMotion &&
      heroNearViewport &&
      documentVisible &&
      !destroyed
    );

  }


  function updateWindowWillChange() {

    floatingWindows.forEach(
      (element) => {

        if (
          element.classList.contains(
            "is-dragging"
          )
        ) {

          element.style.willChange =
            "transform";


          return;

        }


        element.style.willChange =
          canRunHeroParallax()
            ? "transform"
            : "auto";

      }
    );

  }


  function applyParallaxValues() {

    floatingWindows.forEach(
      (element) => {

        /*
         * A manually positioned card permanently stops
         * automatic parallax.
         */

        if (
          element.classList.contains(
            "is-dragging"
          ) ||
          element.classList.contains(
            "has-been-dragged"
          )
        ) {

          return;

        }


        const depth =
          Number(
            element.dataset.depth
          ) ||
          1;


        element.style.setProperty(
          "--parallax-x",
          `${
            currentX *
            PARALLAX_X_DISTANCE *
            depth
          }px`
        );


        element.style.setProperty(
          "--parallax-y",
          `${
            currentY *
            PARALLAX_Y_DISTANCE *
            depth
          }px`
        );

      }
    );

  }


  function needsParallaxFrame() {

    return (
      Math.abs(
        targetX -
        currentX
      ) >
        PARALLAX_SETTLE_THRESHOLD ||
      Math.abs(
        targetY -
        currentY
      ) >
        PARALLAX_SETTLE_THRESHOLD
    );

  }


  function animateParallax() {

    parallaxFrame =
      0;


    if (
      !canRunHeroParallax()
    ) {

      updateWindowWillChange();


      return;

    }


    currentX +=
      (
        targetX -
        currentX
      ) *
      PARALLAX_EASE;


    currentY +=
      (
        targetY -
        currentY
      ) *
      PARALLAX_EASE;


    if (
      !needsParallaxFrame()
    ) {

      currentX =
        targetX;


      currentY =
        targetY;

    }


    applyParallaxValues();


    if (
      needsParallaxFrame()
    ) {

      parallaxFrame =
        window.requestAnimationFrame(
          animateParallax
        );

    }

  }


  function requestParallaxUpdate() {

    if (
      parallaxFrame ||
      !canRunHeroParallax()
    ) {

      return;

    }


    parallaxFrame =
      window.requestAnimationFrame(
        animateParallax
      );

  }


  function stopParallaxFrame() {

    if (
      !parallaxFrame
    ) {

      return;

    }


    window.cancelAnimationFrame(
      parallaxFrame
    );


    parallaxFrame =
      0;

  }


  /* =======================================================
     HERO POINTER INPUT
  ======================================================= */

  if (
    heroStage &&
    finePointer &&
    !prefersReducedMotion
  ) {

    heroStage.addEventListener(
      "pointermove",
      (event) => {

        if (
          !heroNearViewport ||
          !documentVisible
        ) {

          return;

        }


        const rect =
          heroStage.getBoundingClientRect();


        if (
          !rect.width ||
          !rect.height
        ) {

          return;

        }


        targetX =
          (
            event.clientX -
            rect.left -
            rect.width /
            2
          ) /
          rect.width;


        targetY =
          (
            event.clientY -
            rect.top -
            rect.height /
            2
          ) /
          rect.height;


        requestParallaxUpdate();

      },
      {
        signal
      }
    );


    heroStage.addEventListener(
      "pointerleave",
      () => {

        targetX =
          0;


        targetY =
          0;


        requestParallaxUpdate();

      },
      {
        signal
      }
    );

  }


  /* =======================================================
     HERO VISIBILITY OBSERVER

     Hero motion runs only while the section is visible.

     When the Hero leaves the relevant viewport area:
     - pointer interpolation stops
     - will-change is released
  ======================================================= */

  if (
    heroStage &&
    "IntersectionObserver" in
      window
  ) {

    heroVisibilityObserver =
      new IntersectionObserver(
        (entries) => {

          const entry =
            entries[0];


          heroNearViewport =
            Boolean(
              entry?.isIntersecting
            );


          if (
            !heroNearViewport
          ) {

            targetX =
              0;


            targetY =
              0;


            stopParallaxFrame();

          } else {

            requestParallaxUpdate();

          }


          updateWindowWillChange();

        },
        {

          root:
            null,

          rootMargin:
            HERO_VISIBLE_MARGIN,

          threshold:
            0

        }
      );


    heroVisibilityObserver.observe(
      heroStage
    );

  }


  /* =======================================================
     DOCUMENT VISIBILITY

     Browser tabs in the background do not continue Hero
     interpolation.
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      documentVisible =
        document.visibilityState !==
        "hidden";


      if (
        !documentVisible
      ) {

        stopParallaxFrame();

      } else {

        requestPageUpdate();
        requestParallaxUpdate();

      }


      updateWindowWillChange();

    },
    {
      signal
    }
  );


  updateWindowWillChange();


  /* =======================================================
     HERO DRAGGABLE WINDOWS
  ======================================================= */

  let highestZIndex =
    50;


  const dragStates =
    new Map();


  function getDraggedWidth(
    windowElement
  ) {

    if (!heroStage) {

      return null;

    }


    const heroWidth =
      heroStage.clientWidth;


    const isMobile =
      heroWidth <=
      680;


    const isTablet =
      heroWidth >
        680 &&
      heroWidth <=
        950;


    /* -----------------------------------------------------
       MAIN PROJECT
    ----------------------------------------------------- */

    if (
      windowElement.classList.contains(
        "window-main"
      )
    ) {

      if (isMobile) {

        return clamp(
          heroWidth *
          0.56,
          200,
          300
        );

      }


      if (isTablet) {

        return clamp(
          heroWidth *
          0.46,
          280,
          470
        );

      }


      return null;

    }


    /* -----------------------------------------------------
       MOBILE PROJECT
    ----------------------------------------------------- */

    if (
      windowElement.classList.contains(
        "window-small"
      )
    ) {

      if (isMobile) {

        return clamp(
          heroWidth *
          0.34,
          125,
          175
        );

      }


      if (isTablet) {

        return clamp(
          heroWidth *
          0.21,
          145,
          225
        );

      }


      return null;

    }


    /* -----------------------------------------------------
       PORTRAIT
    ----------------------------------------------------- */

    if (
      windowElement.classList.contains(
        "window-portrait"
      )
    ) {

      if (isMobile) {

        return clamp(
          heroWidth *
          0.24,
          95,
          130
        );

      }


      if (isTablet) {

        return clamp(
          heroWidth *
          0.15,
          105,
          165
        );

      }


      return null;

    }


    return null;

  }


  /* =======================================================
     WINDOW CONTENT GEOMETRY

     Keep the window bar and project surface locked to the
     same responsive width after manual positioning.
  ======================================================= */

  function normalizeWindowContents(
    windowElement
  ) {

    if (!heroStage) {

      return;

    }


    const placeholder =
      windowElement.querySelector(
        ".window-placeholder"
      );


    const bar =
      windowElement.querySelector(
        ".window-bar"
      );


    if (bar) {

      bar.style.width =
        "100%";


      bar.style.maxWidth =
        "100%";


      bar.style.minWidth =
        "0";


      bar.style.boxSizing =
        "border-box";

    }


    if (placeholder) {

      placeholder.style.width =
        "100%";


      placeholder.style.maxWidth =
        "100%";


      placeholder.style.minWidth =
        "0";


      placeholder.style.boxSizing =
        "border-box";


      if (
        heroStage.clientWidth <=
        950
      ) {

        placeholder.style.minHeight =
          "0px";

      } else {

        placeholder.style.minHeight =
          "";

      }

    }

  }


  function applyDraggedWindowSize(
    windowElement,
    state
  ) {

    if (
      !state.hasBeenDragged
    ) {

      return;

    }


    const width =
      getDraggedWidth(
        windowElement
      );


    if (
      width ===
      null
    ) {

      windowElement.style.width =
        "";

    } else {

      windowElement.style.width =
        `${width}px`;

    }


    windowElement.style.maxWidth =
      `calc(100% - ${
        HERO_SAFE_EDGE *
        2
      }px)`;


    normalizeWindowContents(
      windowElement
    );

  }


  /* =======================================================
     DRAG BOUNDS
  ======================================================= */

  function getBounds(
    windowElement
  ) {

    const maxLeft =
      Math.max(
        HERO_SAFE_EDGE,
        heroStage.clientWidth -
        windowElement.offsetWidth -
        HERO_SAFE_EDGE
      );


    const maxTop =
      Math.max(
        HERO_SAFE_EDGE,
        heroStage.clientHeight -
        windowElement.offsetHeight -
        HERO_SAFE_EDGE
      );


    return {

      minLeft:
        HERO_SAFE_EDGE,

      maxLeft,

      minTop:
        HERO_SAFE_EDGE,

      maxTop

    };

  }


  /* =======================================================
     NORMALIZED DRAG POSITION

     Store manual placement as a percentage of available
     movement space so it survives responsive resizing.
  ======================================================= */

  function updatePositionRatio(
    windowElement,
    state,
    left,
    top
  ) {

    const bounds =
      getBounds(
        windowElement
      );


    const usableWidth =
      Math.max(
        1,
        bounds.maxLeft -
        bounds.minLeft
      );


    const usableHeight =
      Math.max(
        1,
        bounds.maxTop -
        bounds.minTop
      );


    state.xRatio =
      clamp(
        (
          left -
          bounds.minLeft
        ) /
        usableWidth,
        0,
        1
      );


    state.yRatio =
      clamp(
        (
          top -
          bounds.minTop
        ) /
        usableHeight,
        0,
        1
      );

  }


  function placeFromRatio(
    windowElement,
    state
  ) {

    if (
      !state.hasBeenDragged ||
      state.isDragging
    ) {

      return;

    }


    applyDraggedWindowSize(
      windowElement,
      state
    );


    const bounds =
      getBounds(
        windowElement
      );


    const usableWidth =
      Math.max(
        0,
        bounds.maxLeft -
        bounds.minLeft
      );


    const usableHeight =
      Math.max(
        0,
        bounds.maxTop -
        bounds.minTop
      );


    const nextLeft =
      bounds.minLeft +
      usableWidth *
      state.xRatio;


    const nextTop =
      bounds.minTop +
      usableHeight *
      state.yRatio;


    windowElement.style.left =
      `${nextLeft}px`;


    windowElement.style.top =
      `${nextTop}px`;


    windowElement.style.right =
      "auto";


    windowElement.style.bottom =
      "auto";


    windowElement.style.setProperty(
      "--parallax-x",
      "0px"
    );


    windowElement.style.setProperty(
      "--parallax-y",
      "0px"
    );

  }


  /* =======================================================
     BIND WINDOW DRAGGING
  ======================================================= */

  if (
    heroStage &&
    floatingWindows.length
  ) {

    floatingWindows.forEach(
      (windowElement) => {

        const dragHandle =
          windowElement.querySelector(
            ".window-bar"
          );


        if (!dragHandle) {

          return;

        }


        const state =
          {

            isDragging:
              false,

            hasBeenDragged:
              false,

            pointerId:
              null,

            pointerStartX:
              0,

            pointerStartY:
              0,

            elementStartLeft:
              0,

            elementStartTop:
              0,

            xRatio:
              0.5,

            yRatio:
              0.5

          };


        dragStates.set(
          windowElement,
          state
        );


        /* =================================================
           BEGIN DRAG
        ================================================= */

        dragHandle.addEventListener(
          "pointerdown",
          (event) => {

            if (
              event.pointerType ===
                "mouse" &&
              event.button !==
                0
            ) {

              return;

            }


            state.isDragging =
              true;


            state.pointerId =
              event.pointerId;


            state.pointerStartX =
              event.clientX;


            state.pointerStartY =
              event.clientY;


            state.elementStartLeft =
              windowElement.offsetLeft;


            state.elementStartTop =
              windowElement.offsetTop;


            state.hasBeenDragged =
              true;


            windowElement.classList.add(
              "has-been-dragged",
              "is-dragging"
            );


            windowElement.style.willChange =
              "transform";


            /*
             * Once manually positioned, this window no
             * longer participates in automatic parallax.
             */

            windowElement.style.setProperty(
              "--parallax-x",
              "0px"
            );


            windowElement.style.setProperty(
              "--parallax-y",
              "0px"
            );


            windowElement.style.left =
              `${state.elementStartLeft}px`;


            windowElement.style.top =
              `${state.elementStartTop}px`;


            windowElement.style.right =
              "auto";


            windowElement.style.bottom =
              "auto";


            applyDraggedWindowSize(
              windowElement,
              state
            );


            const bounds =
              getBounds(
                windowElement
              );


            state.elementStartLeft =
              clamp(
                state.elementStartLeft,
                bounds.minLeft,
                bounds.maxLeft
              );


            state.elementStartTop =
              clamp(
                state.elementStartTop,
                bounds.minTop,
                bounds.maxTop
              );


            windowElement.style.left =
              `${state.elementStartLeft}px`;


            windowElement.style.top =
              `${state.elementStartTop}px`;


            updatePositionRatio(
              windowElement,
              state,
              state.elementStartLeft,
              state.elementStartTop
            );


            highestZIndex +=
              1;


            windowElement.style.zIndex =
              String(
                highestZIndex
              );


            dragHandle.setPointerCapture(
              state.pointerId
            );


            event.preventDefault();

          },
          {
            signal
          }
        );


        /* =================================================
           MOVE DRAG
        ================================================= */

        dragHandle.addEventListener(
          "pointermove",
          (event) => {

            if (
              !state.isDragging ||
              event.pointerId !==
                state.pointerId
            ) {

              return;

            }


            const moveX =
              event.clientX -
              state.pointerStartX;


            const moveY =
              event.clientY -
              state.pointerStartY;


            const bounds =
              getBounds(
                windowElement
              );


            const nextLeft =
              clamp(
                state.elementStartLeft +
                moveX,
                bounds.minLeft,
                bounds.maxLeft
              );


            const nextTop =
              clamp(
                state.elementStartTop +
                moveY,
                bounds.minTop,
                bounds.maxTop
              );


            windowElement.style.left =
              `${nextLeft}px`;


            windowElement.style.top =
              `${nextTop}px`;


            updatePositionRatio(
              windowElement,
              state,
              nextLeft,
              nextTop
            );

          },
          {
            signal
          }
        );


        /* =================================================
           END DRAG
        ================================================= */

        function finishDrag(
          event
        ) {

          if (
            !state.isDragging
          ) {

            return;

          }


          if (
            event &&
            state.pointerId !==
              null &&
            event.pointerId !==
              state.pointerId
          ) {

            return;

          }


          const pointerId =
            state.pointerId;


          state.isDragging =
            false;


          state.pointerId =
            null;


          updatePositionRatio(
            windowElement,
            state,
            windowElement.offsetLeft,
            windowElement.offsetTop
          );


          windowElement.classList.remove(
            "is-dragging"
          );


          if (
            pointerId !==
              null &&
            dragHandle.hasPointerCapture?.(
              pointerId
            )
          ) {

            dragHandle.releasePointerCapture(
              pointerId
            );

          }


          updateWindowWillChange();

        }


        dragHandle.addEventListener(
          "pointerup",
          finishDrag,
          {
            signal
          }
        );


        dragHandle.addEventListener(
          "pointercancel",
          finishDrag,
          {
            signal
          }
        );


        dragHandle.addEventListener(
          "lostpointercapture",
          () => {

            if (
              !state.isDragging
            ) {

              return;

            }


            state.isDragging =
              false;


            state.pointerId =
              null;


            windowElement.classList.remove(
              "is-dragging"
            );


            updateWindowWillChange();

          },
          {
            signal
          }
        );

      }
    );

  }


  /* =======================================================
     RESPONSIVE DRAGGED-WINDOW PLACEMENT
  ======================================================= */

  function repositionDraggedWindows() {

    if (
      destroyed
    ) {

      return;

    }


    if (
      heroResizeFrame
    ) {

      window.cancelAnimationFrame(
        heroResizeFrame
      );

    }


    heroResizeFrame =
      window.requestAnimationFrame(
        () => {

          heroResizeFrame =
            0;


          dragStates.forEach(
            (
              state,
              windowElement
            ) => {

              placeFromRatio(
                windowElement,
                state
              );

            }
          );

        }
      );

  }


  window.addEventListener(
    "resize",
    repositionDraggedWindows,
    {

      passive:
        true,

      signal

    }
  );


  window.addEventListener(
    "orientationchange",
    repositionDraggedWindows,
    {
      signal
    }
  );


  /* =======================================================
     REVEAL PREPARATION

     Work cards already exist by the time Page Motion starts,
     so the dynamically rendered project slides are included.
  ======================================================= */

  detailElements.forEach(
    (
      element,
      index
    ) => {

      element.classList.add(
        "motion-item"
      );


      element.style.setProperty(
        "--motion-delay",
        `${
          (
            index %
            4
          ) *
          70
        }ms`
      );

    }
  );


  /* =======================================================
     REVEAL OBSERVER
  ======================================================= */

  if (
    "IntersectionObserver" in
      window &&
    !prefersReducedMotion
  ) {

    revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "in-view"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {

          threshold:
            0.12,

          rootMargin:
            "0px 0px -8% 0px"

        }
      );


    revealSections.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );


    detailElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealSections.forEach(
      (element) => {

        element.classList.add(
          "in-view"
        );

      }
    );


    detailElements.forEach(
      (element) => {

        element.classList.add(
          "in-view"
        );

      }
    );

  }


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


    revealObserver?.disconnect();


    revealObserver =
      null;


    heroVisibilityObserver?.disconnect();


    heroVisibilityObserver =
      null;


    if (introFrame) {

      window.cancelAnimationFrame(
        introFrame
      );


      introFrame =
        0;

    }


    if (pageFrame) {

      window.cancelAnimationFrame(
        pageFrame
      );


      pageFrame =
        0;

    }


    if (parallaxFrame) {

      window.cancelAnimationFrame(
        parallaxFrame
      );


      parallaxFrame =
        0;

    }


    if (heroResizeFrame) {

      window.cancelAnimationFrame(
        heroResizeFrame
      );


      heroResizeFrame =
        0;

    }


    body.classList.remove(
      "ready",
      "rail-blue",
      "rail-lime"
    );


    root.style.removeProperty(
      "--scroll-progress"
    );


    root.style.removeProperty(
      "--hero-word-one-x"
    );


    root.style.removeProperty(
      "--hero-word-two-x"
    );


    revealSections.forEach(
      (element) => {

        element.classList.remove(
          "in-view"
        );

      }
    );


    detailElements.forEach(
      (element) => {

        element.classList.remove(
          "motion-item",
          "in-view"
        );


        element.style.removeProperty(
          "--motion-delay"
        );

      }
    );


    floatingWindows.forEach(
      (element) => {

        element.classList.remove(
          "is-dragging",
          "has-been-dragged"
        );


        element.style.removeProperty(
          "--parallax-x"
        );


        element.style.removeProperty(
          "--parallax-y"
        );


        element.style.removeProperty(
          "will-change"
        );


        element.style.removeProperty(
          "left"
        );


        element.style.removeProperty(
          "top"
        );


        element.style.removeProperty(
          "right"
        );


        element.style.removeProperty(
          "bottom"
        );


        element.style.removeProperty(
          "width"
        );


        element.style.removeProperty(
          "max-width"
        );


        element.style.removeProperty(
          "z-index"
        );


        const bar =
          element.querySelector(
            ".window-bar"
          );


        const placeholder =
          element.querySelector(
            ".window-placeholder"
          );


        [
          bar,
          placeholder
        ]
          .filter(
            Boolean
          )
          .forEach(
            (child) => {

              child.style.removeProperty(
                "width"
              );


              child.style.removeProperty(
                "max-width"
              );


              child.style.removeProperty(
                "min-width"
              );


              child.style.removeProperty(
                "box-sizing"
              );


              child.style.removeProperty(
                "min-height"
              );

            }
          );

      }
    );

  }


  /* =======================================================
     FEATURE CONTROLLER
  ======================================================= */

  return Object.freeze({

    update:
      requestPageUpdate,

    reposition:
      repositionDraggedWindows,

    destroy

  });

}
