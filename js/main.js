const body = document.body;
const root = document.documentElement;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* PAGE INTRO */

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    body.classList.add("ready");
  });
});


/* SCROLL PROGRESS + HERO MOVEMENT */

const heroStage = document.querySelector(".hero-stage");
const labSection = document.querySelector(".lab-section");
const contactSection = document.querySelector(".contact-section");

let ticking = false;

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


  if (heroStage && !prefersReducedMotion) {
    const rect = heroStage.getBoundingClientRect();

    const heroScroll = Math.max(
      0,
      Math.min(-rect.top, rect.height)
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


  const viewportCenter = window.innerHeight * 0.5;

  body.classList.remove(
    "rail-blue",
    "rail-lime"
  );


  if (labSection) {
    const rect = labSection.getBoundingClientRect();

    if (
      rect.top <= viewportCenter &&
      rect.bottom >= viewportCenter
    ) {
      body.classList.add("rail-blue");
    }
  }


  if (contactSection) {
    const rect = contactSection.getBoundingClientRect();

    if (
      rect.top <= viewportCenter &&
      rect.bottom >= viewportCenter
    ) {
      body.classList.remove("rail-blue");
      body.classList.add("rail-lime");
    }
  }


  ticking = false;
}


function requestPageUpdate() {
  if (!ticking) {
    requestAnimationFrame(updatePageState);
    ticking = true;
  }
}


window.addEventListener(
  "scroll",
  requestPageUpdate,
  { passive: true }
);

window.addEventListener(
  "resize",
  requestPageUpdate
);

updatePageState();


/* HERO POINTER PARALLAX */

const floatingWindows =
  document.querySelectorAll(".floating-window");


if (
  heroStage &&
  !prefersReducedMotion &&
  window.matchMedia("(pointer: fine)").matches
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
        (event.clientX -
          rect.left -
          rect.width / 2) /
        rect.width;

      targetY =
        (event.clientY -
          rect.top -
          rect.height / 2) /
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
      (targetX - currentX) * 0.045;

    currentY +=
      (targetY - currentY) * 0.045;


    floatingWindows.forEach((element) => {
      const depth =
        Number(element.dataset.depth) || 1;

      element.style.setProperty(
        "--parallax-x",
        `${currentX * 18 * depth}px`
      );

      element.style.setProperty(
        "--parallax-y",
        `${currentY * 14 * depth}px`
      );
    });


    requestAnimationFrame(animateParallax);
  }


  animateParallax();
}


/* SECTION REVEALS */

const revealSections =
  document.querySelectorAll(".reveal");


const detailElements =
  document.querySelectorAll(`
    .thinking-lines article,
    .project-slide,
    .about-data > div
  `);


detailElements.forEach((element, index) => {
  element.classList.add("motion-item");

  element.style.setProperty(
    "--motion-delay",
    `${(index % 4) * 70}ms`
  );
});


if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {
  const observer =
    new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("in-view");

          currentObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );


  revealSections.forEach((element) => {
    observer.observe(element);
  });


  detailElements.forEach((element) => {
    observer.observe(element);
  });

} else {
  revealSections.forEach((element) => {
    element.classList.add("in-view");
  });

  detailElements.forEach((element) => {
    element.classList.add("in-view");
  });
}


/* PROJECT REEL DRAG */

const projectReel =
  document.querySelector(".project-reel");

const reelProgressFill =
  document.querySelector(".reel-progress-fill");


if (projectReel) {
  let dragging = false;
  let startX = 0;
  let startingScroll = 0;


  projectReel.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      dragging = true;
      startX = event.clientX;
      startingScroll = projectReel.scrollLeft;

      projectReel.classList.add("dragging");

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

      const distance =
        event.clientX - startX;

      projectReel.scrollLeft =
        startingScroll - distance;
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
        ? projectReel.scrollLeft / maximum
        : 0;

    if (reelProgressFill) {
      reelProgressFill.style.transform =
        `scaleX(${0.28 + progress * 0.72})`;
    }
  }


  projectReel.addEventListener(
    "scroll",
    updateReelProgress,
    { passive: true }
  );

  updateReelProgress();
}


/* RESPONSIVE LAB */

const viewportRange =
  document.querySelector("#viewport-range");

const viewportOutput =
  document.querySelector("#viewport-output");

const responsivePreview =
  document.querySelector("#responsive-preview");


function updateResponsivePreview() {
  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }

  const width =
    Number(viewportRange.value);

  responsivePreview.style.setProperty(
    "--preview-width",
    `${width}px`
  );

  if (viewportOutput) {
    viewportOutput.textContent =
      `${width}px`;
  }
}


if (viewportRange) {
  viewportRange.addEventListener(
    "input",
    updateResponsivePreview
  );

  updateResponsivePreview();
}
