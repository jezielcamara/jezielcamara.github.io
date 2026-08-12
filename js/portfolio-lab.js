/* =========================================================
   JEZIEL CAMARA / PORTFOLIO RESPONSIVE LAB
   Keeps the existing main.js width animation,
   but updates the Lab for the portfolio preview.
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
     PORTFOLIO VIEWPORT COPY
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
          "Tablet: the floating composition tightens while the hierarchy and project preview remain easy to scan."
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
     SYNC THE NEW PORTFOLIO LAB
  ======================================================= */

  function syncPortfolioLab() {

    const width =
      Number(
        viewportRange.value
      );


    const state =
      getPortfolioViewportState(
        width
      );


    /*
     * Make the purpose explicit.
     */

    responsivePreview.dataset.business =
      "portfolio";


    /*
     * main.js already controls the width.
     * We simply keep the labels accurate
     * for this new portfolio demo.
     */

    if (viewportMode) {

      viewportMode.textContent =
        state.label;

    }


    if (viewportOutput) {

      viewportOutput.textContent =
        `${Math.round(width)}px`;

    }


    if (labExplainer) {

      labExplainer.textContent =
        state.text;

    }

  }


  /* =======================================================
     USER SLIDER
  ======================================================= */

  viewportRange.addEventListener(
    "input",
    () => {

      /*
       * main.js handles the actual preview width.
       *
       * This listener runs alongside it and updates
       * only the portfolio-specific text.
       */

      requestAnimationFrame(
        syncPortfolioLab
      );

    }
  );


  /* =======================================================
     WATCH THE AUTOMATIC REPLAY
  ======================================================= */

  /*
   * The original Lab animation in main.js changes
   * the slider value programmatically during Replay.
   *
   * Programmatic range changes do not fire an input
   * event, so observe the visible output instead.
   */

  if (
    viewportOutput &&
    "MutationObserver" in window
  ) {

    const observer =
      new MutationObserver(
        () => {

          requestAnimationFrame(
            syncPortfolioLab
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
     RESIZE SAFETY
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      requestAnimationFrame(
        syncPortfolioLab
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
    syncPortfolioLab
  );

})();
