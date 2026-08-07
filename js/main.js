const body = document.body;
const root = document.documentElement;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* -------------------------------------------------
   PAGE INTRO
-------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    body.classList.add("ready");
  });
});


/* -------------------------------------------------
   SCROLL STATE
-------------------------------------------------- */

const heroStage = document.querySelector(".hero-stage");
const labSection = document.querySelector(".lab-section");
const contactSection = document.querySelector(".contact-section");

let pageTicking = false;

function updatePageState() {
  const scrollTop = window.scrollY;

  const maxScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    maxScroll > 0
      ? (scrollTop / maxScroll) * 100
      : 0;

  root.style.setProperty(
    "--scroll-progress",
    `${progress}%`
  );


  if (
    heroStage &&
    !prefersReducedMotion
  ) {
    const rect =
      heroStage.getBoundingClientRect();

    const heroScroll = Math.max(
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
  }


  const viewportCenter =
    window.innerHeight * 0.5;


  body.classList.remove(
    "rail-blue",
    "rail-lime"
  );


  if (labSection) {
    const rect =
      labSection.getBoundingClientRect();


    if (
      rect.top <= viewportCenter &&
      rect.bottom >= viewportCenter
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
      rect.top <= viewportCenter &&
      rect.bottom >= viewportCenter
    ) {
      body.classList.remove(
        "rail-blue"
      );

      body.classList.add(
        "rail-lime"
      );
    }
  }


  pageTicking = false;
}


function requestPageUpdate() {
  if (pageTicking) {
    return;
  }


  pageTicking = true;

  requestAnimationFrame(
    updatePageState
  );
}


window.addEventListener(
  "scroll",
  requestPageUpdate,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  requestPageUpdate
);


updatePageState();


/* -------------------------------------------------
   HERO POINTER PARALLAX
-------------------------------------------------- */

const floatingWindows =
  document.querySelectorAll(
    ".floating-window"
  );


if (
  heroStage &&
  !prefersReducedMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {
  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;


  heroStage.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        heroStage.getBoundingClientRect();


      targetX =
        (
          event.clientX -
          rect.left -
          rect.width / 2
        ) /
        rect.width;


      targetY =
        (
          event.clientY -
          rect.top -
          rect.height / 2
        ) /
        rect.height;
    }
  );


  heroStage.addEventListener(
    "pointerleave",
    () => {
      targetX = 0;
      targetY = 0;
    }
  );


  function animateParallax() {
    currentX +=
      (targetX - currentX) *
      0.045;


    currentY +=
      (targetY - currentY) *
      0.045;


    floatingWindows.forEach(
      (element) => {

        /*
         * Don't let parallax fight
         * with the user's drag.
         */

        if (
          element.classList.contains(
            "is-dragging"
          )
        ) {
          return;
        }


        const depth =
          Number(
            element.dataset.depth
          ) || 1;


        element.style.setProperty(
          "--parallax-x",
          `${currentX * 18 * depth}px`
        );


        element.style.setProperty(
          "--parallax-y",
          `${currentY * 14 * depth}px`
        );
      }
    );


    requestAnimationFrame(
      animateParallax
    );
  }


  animateParallax();
}


/* -------------------------------------------------
   HERO DRAGGABLE WINDOWS
   Responsive position + responsive sizing
-------------------------------------------------- */

if (
  heroStage &&
  floatingWindows.length
) {

  let highestZIndex = 50;

  const dragStates =
    new Map();


  const clamp = (
    value,
    minimum,
    maximum
  ) => {
    return Math.max(
      minimum,
      Math.min(
        value,
        maximum
      )
    );
  };


  /*
   * A dragged desktop window should not
   * keep desktop proportions on a phone.
   *
   * These values make each object smaller
   * while maintaining the composition.
   */

  function getWindowSize(
    windowElement
  ) {

    const heroWidth =
      heroStage.clientWidth;


    const isMobile =
      heroWidth <= 680;


    const isTablet =
      heroWidth > 680 &&
      heroWidth <= 950;


    /*
     * MAIN PROJECT
     */

    if (
      windowElement.classList.contains(
        "window-main"
      )
    ) {

      if (isMobile) {
        return {
          width: clamp(
            heroWidth * 0.56,
            210,
            300
          ),

          placeholderMinHeight:
            165
        };
      }


      if (isTablet) {
        return {
          width: clamp(
            heroWidth * 0.46,
            300,
            470
          ),

          placeholderMinHeight:
            235
        };
      }


      return {
        width: null,
        placeholderMinHeight:
          null
      };
    }


    /*
     * SMALL PROJECT
     */

    if (
      windowElement.classList.contains(
        "window-small"
      )
    ) {

      if (isMobile) {
        return {
          width: clamp(
            heroWidth * 0.34,
            135,
            175
          ),

          placeholderMinHeight:
            105
        };
      }


      if (isTablet) {
        return {
          width: clamp(
            heroWidth * 0.21,
            150,
            225
          ),

          placeholderMinHeight:
            125
        };
      }


      return {
        width: null,
        placeholderMinHeight:
          null
      };
    }


    /*
     * PORTRAIT
     */

    if (
      windowElement.classList.contains(
        "window-portrait"
      )
    ) {

      if (isMobile) {
        return {
          width: clamp(
            heroWidth * 0.24,
            100,
            130
          ),

          placeholderMinHeight:
            null
        };
      }


      if (isTablet) {
        return {
          width: clamp(
            heroWidth * 0.15,
            110,
            165
          ),

          placeholderMinHeight:
            null
        };
      }


      return {
        width: null,
        placeholderMinHeight:
          null
      };
    }


    return {
      width: null,
      placeholderMinHeight:
        null
    };
  }


  /*
   * Resize only windows the visitor
   * has interacted with.
   *
   * Untouched windows continue using
   * your normal CSS layout.
   */

  function applyDraggedWindowSize(
    windowElement,
    state
  ) {

    if (
      !state.hasBeenDragged
    ) {
      return;
    }


    const size =
      getWindowSize(
        windowElement
      );


    const placeholder =
      windowElement.querySelector(
        ".window-placeholder"
      );


    if (
      size.width === null
    ) {
      windowElement.style.width =
        "";
    } else {
      windowElement.style.width =
        `${size.width}px`;
    }


    if (placeholder) {

      if (
        size.placeholderMinHeight ===
        null
      ) {
        placeholder.style.minHeight =
          "";
      } else {
        placeholder.style.minHeight =
          `${size.placeholderMinHeight}px`;
      }

    }
  }


  /*
   * Remember position relative to the
   * available hero space instead of
   * remembering raw desktop pixels.
   */

  function updatePositionRatio(
    windowElement,
    state,
    left,
    top
  ) {

    const maxLeft =
      Math.max(
        0,
        heroStage.clientWidth -
        windowElement.offsetWidth
      );


    const maxTop =
      Math.max(
        0,
        heroStage.clientHeight -
        windowElement.offsetHeight
      );


    state.xRatio =
      maxLeft > 0
        ? clamp(
            left / maxLeft,
            0,
            1
          )
        : 0;


    state.yRatio =
      maxTop > 0
        ? clamp(
            top / maxTop,
            0,
            1
          )
        : 0;
  }


  /*
   * Restore a dragged object after
   * browser resizing.
   */

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


    /*
     * Resize first.
     */

    applyDraggedWindowSize(
      windowElement,
      state
    );


    /*
     * Then calculate where it belongs.
     */

    const maxLeft =
      Math.max(
        0,
        heroStage.clientWidth -
        windowElement.offsetWidth
      );


    const maxTop =
      Math.max(
        0,
        heroStage.clientHeight -
        windowElement.offsetHeight
      );


    const nextLeft =
      clamp(
        maxLeft *
        state.xRatio,
        0,
        maxLeft
      );


    const nextTop =
      clamp(
        maxTop *
        state.yRatio,
        0,
        maxTop
      );


    windowElement.style.left =
      `${nextLeft}px`;


    windowElement.style.top =
      `${nextTop}px`;


    windowElement.style.right =
      "auto";


    windowElement.style.bottom =
      "auto";
  }


  floatingWindows.forEach(
    (windowElement) => {

      const dragHandle =
        windowElement.querySelector(
          ".window-bar"
        );


      if (!dragHandle) {
        return;
      }


      const state = {
        isDragging: false,
        hasBeenDragged: false,

        pointerId: null,

        pointerStartX: 0,
        pointerStartY: 0,

        elementStartLeft: 0,
        elementStartTop: 0,

        xRatio: 0.5,
        yRatio: 0.5
      };


      dragStates.set(
        windowElement,
        state
      );


      /*
       * BEGIN DRAG
       */

      dragHandle.addEventListener(
        "pointerdown",
        (event) => {

          /*
           * Ignore right click etc.
           */

          if (
            event.pointerType ===
              "mouse" &&
            event.button !== 0
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


          /*
           * Read the current CSS position
           * before changing positioning.
           */

          state.elementStartLeft =
            windowElement.offsetLeft;


          state.elementStartTop =
            windowElement.offsetTop;


          windowElement.style.left =
            `${state.elementStartLeft}px`;


          windowElement.style.top =
            `${state.elementStartTop}px`;


          windowElement.style.right =
            "auto";


          windowElement.style.bottom =
            "auto";


          /*
           * Mark this specific window as
           * controlled by the drag system.
           */

          state.hasBeenDragged =
            true;


          windowElement.classList.add(
            "has-been-dragged"
          );


          /*
           * If the visitor begins dragging
           * at a small viewport, make sure
           * the card has the proper size.
           */

          applyDraggedWindowSize(
            windowElement,
            state
          );


          /*
           * Re-clamp after resizing.
           */

          const maxLeft =
            Math.max(
              0,
              heroStage.clientWidth -
              windowElement.offsetWidth
            );


          const maxTop =
            Math.max(
              0,
              heroStage.clientHeight -
              windowElement.offsetHeight
            );


          state.elementStartLeft =
            clamp(
              state.elementStartLeft,
              0,
              maxLeft
            );


          state.elementStartTop =
            clamp(
              state.elementStartTop,
              0,
              maxTop
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


          /*
           * Bring the selected window
           * above the other windows.
           */

          highestZIndex += 1;


          windowElement.style.zIndex =
            highestZIndex;


          windowElement.classList.add(
            "is-dragging"
          );


          /*
           * Temporarily remove parallax so
           * the object follows the pointer
           * precisely.
           */

          windowElement.style.setProperty(
            "--parallax-x",
            "0px"
          );


          windowElement.style.setProperty(
            "--parallax-y",
            "0px"
          );


          dragHandle.setPointerCapture(
            state.pointerId
          );


          event.preventDefault();
        }
      );


      /*
       * MOVE DRAG
       */

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


          let nextLeft =
            state.elementStartLeft +
            moveX;


          let nextTop =
            state.elementStartTop +
            moveY;


          const maxLeft =
            Math.max(
              0,
              heroStage.clientWidth -
              windowElement.offsetWidth
            );


          const maxTop =
            Math.max(
              0,
              heroStage.clientHeight -
              windowElement.offsetHeight
            );


          /*
           * Never allow the full object
           * to leave the hero.
           */

          nextLeft =
            clamp(
              nextLeft,
              0,
              maxLeft
            );


          nextTop =
            clamp(
              nextTop,
              0,
              maxTop
            );


          windowElement.style.left =
            `${nextLeft}px`;


          windowElement.style.top =
            `${nextTop}px`;


          /*
           * Keep remembering its
           * relative position.
           */

          updatePositionRatio(
            windowElement,
            state,
            nextLeft,
            nextTop
          );
        }
      );


      /*
       * END DRAG
       */

      function finishDrag(
        event
      ) {

        if (
          !state.isDragging ||
          event.pointerId !==
            state.pointerId
        ) {
          return;
        }


        state.isDragging =
          false;


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
          dragHandle.hasPointerCapture(
            state.pointerId
          )
        ) {
          dragHandle.releasePointerCapture(
            state.pointerId
          );
        }


        state.pointerId =
          null;
      }


      dragHandle.addEventListener(
        "pointerup",
        finishDrag
      );


      dragHandle.addEventListener(
        "pointercancel",
        finishDrag
      );
    }
  );


  /*
   * RESPONSIVE REPOSITIONING
   */

  let heroResizeFrame = 0;


  function repositionDraggedWindows() {

    cancelAnimationFrame(
      heroResizeFrame
    );


    heroResizeFrame =
      requestAnimationFrame(
        () => {

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
      passive: true
    }
  );


  window.addEventListener(
    "orientationchange",
    repositionDraggedWindows
  );
}


/* -------------------------------------------------
   SCROLL REVEALS
-------------------------------------------------- */

const revealSections =
  document.querySelectorAll(
    ".reveal"
  );


const detailElements =
  document.querySelectorAll(`
    .thinking-lines article,
    .project-slide,
    .story-step,
    .note-item
  `);


detailElements.forEach(
  (element, index) => {

    element.classList.add(
      "motion-item"
    );


    element.style.setProperty(
      "--motion-delay",
      `${(index % 4) * 70}ms`
    );

  }
);


if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {

  const revealObserver =
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
        threshold: 0.12,

        rootMargin:
          "0px 0px -8% 0px"
      }
    );


  revealSections.forEach(
    (element) =>
      revealObserver.observe(
        element
      )
  );


  detailElements.forEach(
    (element) =>
      revealObserver.observe(
        element
      )
  );

} else {

  revealSections.forEach(
    (element) =>
      element.classList.add(
        "in-view"
      )
  );


  detailElements.forEach(
    (element) =>
      element.classList.add(
        "in-view"
      )
  );

}


/* -------------------------------------------------
   PROJECT REEL DRAG
-------------------------------------------------- */

const projectReel =
  document.querySelector(
    ".project-reel"
  );


const reelProgressFill =
  document.querySelector(
    ".reel-progress-fill"
  );


if (projectReel) {

  let dragging = false;

  let startX = 0;

  let startingScroll = 0;


  projectReel.addEventListener(
    "pointerdown",
    (event) => {

      if (
        event.pointerType ===
          "touch" ||
        event.target.closest(
          "button"
        )
      ) {
        return;
      }


      dragging = true;


      startX =
        event.clientX;


      startingScroll =
        projectReel.scrollLeft;


      projectReel.classList.add(
        "dragging"
      );


      projectReel.setPointerCapture(
        event.pointerId
      );

    }
  );


  projectReel.addEventListener(
    "pointermove",
    (event) => {

      if (!dragging) {
        return;
      }


      projectReel.scrollLeft =
        startingScroll -
        (
          event.clientX -
          startX
        );

    }
  );


  function stopDragging() {

    dragging = false;


    projectReel.classList.remove(
      "dragging"
    );

  }


  projectReel.addEventListener(
    "pointerup",
    stopDragging
  );


  projectReel.addEventListener(
    "pointercancel",
    stopDragging
  );


  function updateReelProgress() {

    const maximum =
      projectReel.scrollWidth -
      projectReel.clientWidth;


    const progress =
      maximum > 0
        ? projectReel.scrollLeft /
          maximum
        : 0;


    if (reelProgressFill) {

      reelProgressFill.style.transform =
        `scaleX(${
          0.28 +
          progress *
          0.72
        })`;

    }

  }


  projectReel.addEventListener(
    "scroll",
    updateReelProgress,
    {
      passive: true
    }
  );


  updateReelProgress();

}


/* -------------------------------------------------
   RESPONSIVE LAB
-------------------------------------------------- */

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


const replayLabButton =
  document.querySelector(
    "#replay-lab"
  );


const businessButtons =
  document.querySelectorAll(
    ".lab-business-button"
  );


const demoFields = {

  url:
    document.querySelector(
      "#demo-url"
    ),

  brand:
    document.querySelector(
      "#demo-brand"
    ),

  kicker:
    document.querySelector(
      "#demo-kicker"
    ),

  title:
    document.querySelector(
      "#demo-title"
    ),

  description:
    document.querySelector(
      "#demo-description"
    ),

  cta:
    document.querySelector(
      "#demo-cta"
    ),

  image:
    document.querySelector(
      "#demo-image-label"
    ),

  navOne:
    document.querySelector(
      "#demo-nav-one"
    ),

  navTwo:
    document.querySelector(
      "#demo-nav-two"
    ),

  navThree:
    document.querySelector(
      "#demo-nav-three"
    ),

  serviceOne:
    document.querySelector(
      "#demo-service-one"
    ),

  serviceTwo:
    document.querySelector(
      "#demo-service-two"
    ),

  serviceThree:
    document.querySelector(
      "#demo-service-three"
    )
};


const demoBusinesses = {

  services: {

    url:
      "northhome.example",

    brand:
      "NORTH",

    kicker:
      "PROPERTY SERVICES",

    title:
      "GOOD WORK.<br>NO GUESSWORK.",

    description:
      "Property maintenance for homes and businesses across Metro Manila.",

    cta:
      "Request a quote →",

    image:
      "SERVICE IMAGE",

    nav: [
      "Services",
      "Company",
      "Contact"
    ],

    services: [
      "Repairs",
      "Maintenance",
      "Installation"
    ]
  },


  cafe: {

    url:
      "solacafe.example",

    brand:
      "SOLA",

    kicker:
      "COFFEE / FOOD / PLACE",

    title:
      "A PLACE<br>WORTH FINDING.",

    description:
      "A neighborhood cafe for coffee, simple food, and slow afternoons.",

    cta:
      "See the menu →",

    image:
      "CAFE IMAGE",

    nav: [
      "Menu",
      "Story",
      "Visit"
    ],

    services: [
      "Coffee",
      "Food",
      "Opening hours"
    ]
  },


  consulting: {

    url:
      "avance.example",

    brand:
      "AVANCE",

    kicker:
      "CONSULTING / STRATEGY",

    title:
      "CLEAR ADVICE.<br>BETTER MOVES.",

    description:
      "Practical guidance for growing teams that need clarity before the next move.",

    cta:
      "Start a conversation →",

    image:
      "CONSULTING IMAGE",

    nav: [
      "Expertise",
      "Company",
      "Contact"
    ],

    services: [
      "Strategy",
      "Operations",
      "Growth"
    ]
  }
};


let labAnimationFrame = 0;

let labUserInteracted =
  false;

let labDemoPlayed =
  false;


function getViewportState(
  width
) {

  if (width <= 480) {

    return {

      label:
        "Phone",

      text:
        "Phone: the image moves up, navigation simplifies, and content stacks."

    };

  }


  if (width <= 760) {

    return {

      label:
        "Tablet",

      text:
        "Tablet: the layout starts stacking while keeping the message easy to scan."

    };

  }


  return {

    label:
      "Desktop",

    text:
      "Desktop: the message and image sit side-by-side."

  };

}


function updateResponsivePreview(
  widthOverride
) {

  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }


  const width =
    widthOverride ??
    Number(
      viewportRange.value
    );


  const state =
    getViewportState(
      width
    );


  responsivePreview.style.setProperty(
    "--preview-width",
    `${width}px`
  );


  viewportRange.value =
    String(
      Math.round(
        width
      )
    );


  if (viewportOutput) {

    viewportOutput.textContent =
      `${Math.round(width)}px`;

  }


  if (viewportMode) {

    viewportMode.textContent =
      state.label;

  }


  if (labExplainer) {

    labExplainer.textContent =
      state.text;

  }

}


function setBusiness(
  key
) {

  const data =
    demoBusinesses[key];


  if (
    !data ||
    !responsivePreview
  ) {
    return;
  }


  responsivePreview.dataset.business =
    key;


  demoFields.url.textContent =
    data.url;


  demoFields.brand.textContent =
    data.brand;


  demoFields.kicker.textContent =
    data.kicker;


  demoFields.title.innerHTML =
    data.title;


  demoFields.description.textContent =
    data.description;


  demoFields.cta.textContent =
    data.cta;


  demoFields.image.textContent =
    data.image;


  demoFields.navOne.textContent =
    data.nav[0];


  demoFields.navTwo.textContent =
    data.nav[1];


  demoFields.navThree.textContent =
    data.nav[2];


  demoFields.serviceOne.textContent =
    data.services[0];


  demoFields.serviceTwo.textContent =
    data.services[1];


  demoFields.serviceThree.textContent =
    data.services[2];


  businessButtons.forEach(
    (button) => {

      const active =
        button.dataset.business ===
        key;


      button.classList.toggle(
        "active",
        active
      );


      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    }
  );


  const demoSite =
    document.querySelector(
      "#demo-site"
    );


  if (
    demoSite &&
    !prefersReducedMotion
  ) {

    demoSite.animate(
      [
        {
          opacity: 0.35,
          transform:
            "translateY(8px)"
        },
        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],
      {
        duration: 360,

        easing:
          "cubic-bezier(.2,.75,.25,1)"
      }
    );

  }

}


function animateLabWidth(
  from,
  to,
  duration
) {

  return new Promise(
    (resolve) => {

      const start =
        performance.now();


      function frame(
        now
      ) {

        if (
          !labAnimationFrame
        ) {

          resolve();

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
          raw < 0.5
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


        updateResponsivePreview(
          from +
          (
            to -
            from
          ) *
          eased
        );


        if (raw < 1) {

          labAnimationFrame =
            requestAnimationFrame(
              frame
            );

        } else {

          labAnimationFrame =
            0;


          resolve();

        }

      }


      labAnimationFrame =
        requestAnimationFrame(
          frame
        );

    }
  );

}


async function runLabDemo() {

  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }


  cancelAnimationFrame(
    labAnimationFrame
  );


  labAnimationFrame =
    0;


  if (
    prefersReducedMotion
  ) {

    updateResponsivePreview(
      390
    );


    return;

  }


  const startWidth =
    Number(
      viewportRange.value
    );


  labAnimationFrame =
    1;


  await animateLabWidth(
    startWidth,
    390,
    1450
  );


  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        260
      )
  );


  labAnimationFrame =
    1;


  await animateLabWidth(
    390,
    920,
    1350
  );

}


if (viewportRange) {

  viewportRange.addEventListener(
    "input",
    () => {

      labUserInteracted =
        true;


      cancelAnimationFrame(
        labAnimationFrame
      );


      labAnimationFrame =
        0;


      updateResponsivePreview();

    }
  );


  updateResponsivePreview();

}


businessButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        labUserInteracted =
          true;


        setBusiness(
          button.dataset.business
        );

      }
    );

  }
);


if (replayLabButton) {

  replayLabButton.addEventListener(
    "click",
    () => {

      runLabDemo();

    }
  );

}


if (
  labSection &&
  "IntersectionObserver" in
    window
) {

  const labObserver =
    new IntersectionObserver(
      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting &&
              !labDemoPlayed &&
              !labUserInteracted
            ) {

              labDemoPlayed =
                true;


              runLabDemo();


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.5
      }
    );


  labObserver.observe(
    labSection
  );

}


/* -------------------------------------------------
   PROJECT CASE STUDIES
-------------------------------------------------- */

const caseDialog =
  document.querySelector(
    "#case-dialog"
  );


const caseShell =
  caseDialog?.querySelector(
    ".case-shell"
  );


const caseMedia =
  document.querySelector(
    "#case-hero-media"
  );


const caseOpenButtons =
  document.querySelectorAll(
    ".case-open"
  );


const caseCloseButton =
  document.querySelector(
    "#case-close"
  );


const caseNextButton =
  document.querySelector(
    "#case-next"
  );


const caseFields = {

  index:
    document.querySelector(
      "#case-index"
    ),

  category:
    document.querySelector(
      "#case-category"
    ),

  type:
    document.querySelector(
      "#case-type"
    ),

  title:
    document.querySelector(
      "#case-title"
    ),

  summary:
    document.querySelector(
      "#case-summary"
    ),

  goal:
    document.querySelector(
      "#case-goal"
    ),

  pages:
    document.querySelector(
      "#case-pages"
    ),

  approach:
    document.querySelector(
      "#case-approach"
    ),

  imageLabel:
    document.querySelector(
      "#case-image-label"
    )
};


const projectCases = {

  north: {

    index:
      "01 / CASE STUDY",

    category:
      "HOME SERVICES",

    type:
      "BUSINESS WEBSITE",

    title:
      "North Home",

    summary:
      "A service website concept built around one job: help a customer understand the company and request a quote without hunting for information.",

    goal:
      "Make the services clear, build trust quickly, and keep the inquiry path visible.",

    pages:
      "Home / Services / About / Contact",

    imageLabel:
      "NORTH HOME / HERO",

    approach: [
      "Lead with the service promise instead of company history.",

      "Group services into clear choices that are easy to scan.",

      "Repeat the quote path where a customer is most likely to need it."
    ]
  },


  sola: {

    index:
      "02 / CASE STUDY",

    category:
      "HOSPITALITY",

    type:
      "CAFE WEBSITE",

    title:
      "Sola Cafe",

    summary:
      "A hospitality concept that puts atmosphere first while keeping the practical details - menu, opening hours, and location - close at hand.",

    goal:
      "Make the cafe feel worth visiting while answering the questions people check before leaving home.",

    pages:
      "Home / Menu / Gallery / Visit",

    imageLabel:
      "SOLA CAFE / HERO",

    approach: [
      "Use imagery and type to establish the mood before adding detail.",

      "Keep menu, hours, and location reachable without deep navigation.",

      "Make the mobile version useful for someone already on the way."
    ]
  },


  avance: {

    index:
      "03 / CASE STUDY",

    category:
      "PROFESSIONAL SERVICES",

    type:
      "COMPANY WEBSITE",

    title:
      "Avance",

    summary:
      "A professional-services concept designed to make a small firm feel established, focused, and easy to contact.",

    goal:
      "Present expertise and credibility without turning the website into a wall of corporate copy.",

    pages:
      "Home / Expertise / Company / Contact",

    imageLabel:
      "AVANCE / HERO",

    approach: [
      "State the value of the service before listing credentials.",

      "Use restrained visuals and strong spacing to create confidence.",

      "Keep expertise and contact information easy to compare and reach."
    ]
  }
};


const projectOrder =
  Object.keys(
    projectCases
  );


let currentProjectKey =
  projectOrder[0];


let currentProjectSource =
  null;


function populateCase(
  key
) {

  const data =
    projectCases[key];


  if (!data) {
    return;
  }


  currentProjectKey =
    key;


  caseFields.index.textContent =
    data.index;


  caseFields.category.textContent =
    data.category;


  caseFields.type.textContent =
    data.type;


  caseFields.title.textContent =
    data.title;


  caseFields.summary.textContent =
    data.summary;


  caseFields.goal.textContent =
    data.goal;


  caseFields.pages.textContent =
    data.pages;


  caseFields.imageLabel.textContent =
    data.imageLabel;


  caseFields.approach.replaceChildren();


  data.approach.forEach(
    (item) => {

      const li =
        document.createElement(
          "li"
        );


      li.textContent =
        item;


      caseFields.approach.append(
        li
      );

    }
  );

}


function clearViewTransitionNames() {

  if (
    currentProjectSource
  ) {

    currentProjectSource.style.viewTransitionName =
      "";

  }


  if (caseMedia) {

    caseMedia.style.viewTransitionName =
      "";

  }

}


function openCase(
  key,
  source
) {

  if (
    !caseDialog ||
    !caseMedia
  ) {
    return;
  }


  populateCase(
    key
  );


  currentProjectSource =
    source;


  const showDialog =
    () => {

      if (
        currentProjectSource
      ) {

        currentProjectSource.style.viewTransitionName =
          "";

      }


      caseMedia.style.viewTransitionName =
        "case-image";


      caseDialog.showModal();


      body.classList.add(
        "case-open"
      );

    };


  if (
    document.startViewTransition &&
    !prefersReducedMotion &&
    source
  ) {

    source.style.viewTransitionName =
      "case-image";


    const transition =
      document.startViewTransition(
        showDialog
      );


    transition.finished.finally(
      clearViewTransitionNames
    );

  } else {

    showDialog();


    clearViewTransitionNames();

  }

}


function finishClose() {

  caseDialog.close();


  body.classList.remove(
    "case-open"
  );

}


function closeCase() {

  if (
    !caseDialog?.open
  ) {
    return;
  }


  const hideDialog =
    () => {

      caseMedia.style.viewTransitionName =
        "";


      if (
        currentProjectSource
      ) {

        currentProjectSource.style.viewTransitionName =
          "case-image";

      }


      finishClose();

    };


  if (
    document.startViewTransition &&
    !prefersReducedMotion &&
    currentProjectSource
  ) {

    caseMedia.style.viewTransitionName =
      "case-image";


    const transition =
      document.startViewTransition(
        hideDialog
      );


    transition.finished.finally(
      clearViewTransitionNames
    );

  } else if (
    caseShell &&
    !prefersReducedMotion
  ) {

    const animation =
      caseShell.animate(
        [
          {
            opacity: 1,
            transform:
              "translateY(0)"
          },
          {
            opacity: 0,
            transform:
              "translateY(22px)"
          }
        ],
        {
          duration: 260,

          easing:
            "ease-in",

          fill:
            "forwards"
        }
      );


    animation.finished.finally(
      finishClose
    );

  } else {

    finishClose();

  }

}


caseOpenButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const projectKey =
          button.dataset.project;


        const source =
          button
            .closest(
              ".project-slide"
            )
            ?.querySelector(
              ".project-image"
            );


        openCase(
          projectKey,
          source
        );

      }
    );

  }
);


caseCloseButton?.addEventListener(
  "click",
  closeCase
);


caseDialog?.addEventListener(
  "cancel",
  (event) => {

    event.preventDefault();


    closeCase();

  }
);


caseDialog?.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      caseDialog
    ) {

      closeCase();

    }

  }
);


caseNextButton?.addEventListener(
  "click",
  () => {

    const currentIndex =
      projectOrder.indexOf(
        currentProjectKey
      );


    const nextKey =
      projectOrder[
        (
          currentIndex +
          1
        ) %
        projectOrder.length
      ];


    populateCase(
      nextKey
    );


    currentProjectSource =
      document.querySelector(
        `.project-slide[data-project="${nextKey}"] .project-image`
      );


    if (
      caseShell &&
      !prefersReducedMotion
    ) {

      caseShell.animate(
        [
          {
            opacity: 0.55,
            transform:
              "translateX(12px)"
          },
          {
            opacity: 1,
            transform:
              "translateX(0)"
          }
        ],
        {
          duration: 360,

          easing:
            "cubic-bezier(.2,.75,.25,1)"
        }
      );

    }

  }
);
