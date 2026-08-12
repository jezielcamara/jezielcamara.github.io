/* =========================================================
   JEZIEL CAMARA / RESPONSIVE WORK LAB
   Uses the real North Home project inside the Lab.
========================================================= */

(function () {

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


  const demoUrl =
    document.querySelector(
      "#demo-url"
    );


  const previewLogo =
    document.querySelector(
      ".preview-logo"
    );


  const labLabel =
    document.querySelector(
      ".lab-portfolio-label"
    );


  const labIntro =
    document.querySelector(
      ".lab-heading-copy p"
    );


  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }


  /* =======================================================
     RESPONSIVE DESCRIPTION
  ======================================================= */

  function getNorthViewportState(
    width
  ) {

    if (width <= 480) {

      return {
        label:
          "Phone",

        text:
          "Phone: North Home becomes a focused single-column experience with simpler navigation, stacked services, and touch-friendly content."
      };

    }


    if (width <= 760) {

      return {
        label:
          "Tablet",

        text:
          "Tablet: North Home tightens its layout, reduces navigation, and reorganizes larger sections for the narrower screen."
      };

    }


    return {
      label:
        "Desktop",

      text:
        "Desktop: North Home uses the wider canvas for large residential photography, side-by-side content, and a fuller navigation."
    };

  }


  /* =======================================================
     REMOVE DUPLICATE IDS
  ======================================================= */

  function removeCloneIds(
    element
  ) {

    element
      .querySelectorAll(
        "[id]"
      )
      .forEach(
        (item) => {

          item.removeAttribute(
            "id"
          );

        }
      );

  }


  /* =======================================================
     MAKE LAB VERSION VIEW-ONLY
  ======================================================= */

  function makeViewOnly(
    element
  ) {

    element
      .querySelectorAll(
        `
          a,
          button,
          input,
          textarea,
          select
        `
      )
      .forEach(
        (control) => {

          control.setAttribute(
            "tabindex",
            "-1"
          );


          control.setAttribute(
            "aria-disabled",
            "true"
          );


          if (
            control.matches(
              "button, input, textarea, select"
            )
          ) {

            control.disabled =
              true;

          }

        }
      );


    element.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

      },
      true
    );

  }


  /* =======================================================
     INSERT THE ACTUAL NORTH HOME WEBSITE
  ======================================================= */

  function mountNorthHomeLab(
    attempt = 0
  ) {

    const sourceWebsite =
      document.querySelector(
        ".north-case-study .nh-site"
      );


    const oldDemo =
      document.querySelector(
        "#demo-site"
      );


    /*
     * north-home.js creates the source website
     * on DOMContentLoaded.
     *
     * If this runs a fraction too early,
     * retry for a few animation frames.
     */

    if (
      !sourceWebsite ||
      !oldDemo
    ) {

      if (attempt < 30) {

        requestAnimationFrame(
          () => {

            mountNorthHomeLab(
              attempt + 1
            );

          }
        );

      }


      return;

    }


    /*
     * Avoid mounting twice.
     */

    if (
      oldDemo.classList.contains(
        "nh-lab-site"
      )
    ) {
      return;
    }


    const labWebsite =
      sourceWebsite.cloneNode(
        true
      );


    removeCloneIds(
      labWebsite
    );


    makeViewOnly(
      labWebsite
    );


    /*
     * Preserve #demo-site because existing
     * portfolio JavaScript expects that element.
     */

    labWebsite.id =
      "demo-site";


    labWebsite.classList.add(
      "demo-site",
      "nh-site-view-only",
      "nh-lab-site"
    );


    oldDemo.replaceWith(
      labWebsite
    );


    /*
     * Lab now represents the actual work.
     */

    responsivePreview.dataset.business =
      "north";


    if (demoUrl) {

      demoUrl.textContent =
        "northhome.example";

    }


    if (previewLogo) {

      previewLogo.textContent =
        "LIVE / NORTH HOME";

    }


    if (labLabel) {

      labLabel.textContent =
        "NORTH HOME / RESPONSIVE WEBSITE";

    }


    if (labIntro) {

      labIntro.textContent =
        "Drag the slider and watch the North Home website reorganize itself for desktop, tablet, and phone.";

    }


    applyNorthState();

  }


  /* =======================================================
     UPDATE LAB TEXT
  ======================================================= */

  function applyNorthState() {

    const width =
      Number(
        viewportRange.value
      );


    const state =
      getNorthViewportState(
        width
      );


    responsivePreview.dataset.business =
      "north";


    if (
      viewportMode &&
      viewportMode.textContent !==
        state.label
    ) {

      viewportMode.textContent =
        state.label;

    }


    if (
      labExplainer &&
      labExplainer.textContent.trim() !==
        state.text
    ) {

      labExplainer.textContent =
        state.text;

    }

  }


  /* =======================================================
     MANUAL SLIDER
  ======================================================= */

  viewportRange.addEventListener(
    "input",
    () => {

      requestAnimationFrame(
        applyNorthState
      );

    }
  );


  /* =======================================================
     AUTOMATIC REPLAY
  ======================================================= */

  if (
    viewportOutput &&
    "MutationObserver" in window
  ) {

    let observerFrame =
      0;


    const observer =
      new MutationObserver(
        () => {

          cancelAnimationFrame(
            observerFrame
          );


          observerFrame =
            requestAnimationFrame(
              applyNorthState
            );

        }
      );


    observer.observe(
      viewportOutput,
      {
        childList: true,
        characterData: true,
        subtree: true
      }
    );

  }


  /* =======================================================
     WINDOW RESIZE
  ======================================================= */

  let resizeFrame =
    0;


  window.addEventListener(
    "resize",
    () => {

      cancelAnimationFrame(
        resizeFrame
      );


      resizeFrame =
        requestAnimationFrame(
          applyNorthState
        );

    },
    {
      passive: true
    }
  );


  /* =======================================================
     START
  ======================================================= */

  function start() {

    /*
     * North Home is also initialized on
     * DOMContentLoaded. Waiting one animation
     * frame lets it create the real .nh-site first.
     */

    requestAnimationFrame(
      () => {

        mountNorthHomeLab();

      }
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      start,
      {
        once: true
      }
    );

  } else {

    start();

  }

})();
