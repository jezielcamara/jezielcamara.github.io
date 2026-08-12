/* =========================================================
   JEZIEL CAMARA / PORTFOLIO RESPONSIVE LAB
   Extends the existing Lab width animation in main.js
   with portfolio-specific responsive descriptions.
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


  if (
    !viewportRange ||
    !responsivePreview
  ) {
    return;
  }


  /* =======================================================
     RESPONSIVE STATES
  ======================================================= */

  function getPortfolioViewportState(
    width
  ) {

    if (width <= 480) {

      return {
        label:
          "Phone",

        text:
          "Phone: the portfolio becomes a focused vertical composition with simplified navigation and tighter project framing."
      };

    }


    if (width <= 760) {

      return {
        label:
          "Tablet",

        text:
          "Tablet: the composition tightens while the hierarchy, project preview, and supporting content remain easy to scan."
      };

    }


    return {
      label:
        "Desktop",

      text:
        "Desktop: the portfolio uses the full canvas for layered typography, project imagery, and supporting content."
    };

  }


  /* =======================================================
     APPLY PORTFOLIO COPY
  ======================================================= */

  function applyPortfolioState() {

    const width =
      Number(
        viewportRange.value
      );


    const state =
      getPortfolioViewportState(
        width
      );


    responsivePreview.dataset.business =
      "portfolio";


    /*
     * main.js owns the numeric width display.
     * This file only owns the portfolio-specific
     * mode label and explanation.
     */

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
     USER-DRIVEN SLIDER
  ======================================================= */

  viewportRange.addEventListener(
    "input",
    () => {

      /*
       * main.js updates the preview width first.
       * Apply our portfolio wording immediately after.
       */

      requestAnimationFrame(
        applyPortfolioState
      );

    }
  );


  /* =======================================================
     AUTOMATIC REPLAY
  ======================================================= */

  /*
   * main.js changes the range value during its
   * animated Replay sequence without firing input.
   *
   * The numeric output changes on every animation
   * frame, so we can use it only as a signal.
   *
   * IMPORTANT:
   * We do not write back to viewportOutput here,
   * avoiding a MutationObserver feedback loop.
   */

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
              applyPortfolioState
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
          applyPortfolioState
        );

    },
    {
      passive: true
    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  requestAnimationFrame(
    applyPortfolioState
  );

})();
