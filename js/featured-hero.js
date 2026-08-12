/* =========================================================
   JEZIEL CAMARA / FEATURED HERO PROJECT

   Controls the paired hero presentation:

   LARGE WINDOW  = desktop project preview
   SMALL WINDOW  = mobile project preview

   The project registry is intentionally separate so
   Sola Cafe and Avance can be added later and selected
   automatically on each new page visit.
========================================================= */

(function () {

  /* =======================================================
     PROJECT REGISTRY

     Only completed work should be added here.
  ======================================================= */

  const featuredProjects = [

    {
      key:
        "north",

      name:
        "North Home",

      index:
        "01",

      type:
        "BUSINESS WEBSITE"
    }

  ];


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const desktopWindow =
    document.querySelector(
      ".window-main"
    );


  const desktopBar =
    desktopWindow?.querySelector(
      ".window-bar"
    );


  const desktopPreview =
    desktopWindow?.querySelector(
      ".window-placeholder"
    );


  const mobileWindow =
    document.querySelector(
      ".window-small"
    );


  const mobileBar =
    mobileWindow?.querySelector(
      ".window-bar"
    );


  const mobilePreview =
    mobileWindow?.querySelector(
      ".window-placeholder"
    );


  if (
    !desktopWindow ||
    !desktopBar ||
    !desktopPreview ||
    !mobileWindow ||
    !mobileBar ||
    !mobilePreview
  ) {
    return;
  }


  /* =======================================================
     NORTH HOME / MOBILE PREVIEW
  ======================================================= */

  function northMobileMarkup() {

    return `
      <div
        class="nh-mobile-thumb"
        aria-hidden="true"
      >

        <header class="nh-mobile-nav">

          <strong class="nh-mobile-logo">
            North
            <span>
              Home
            </span>
          </strong>


          <span
            class="nh-mobile-menu"
            aria-hidden="true"
          >
            ≡
          </span>

        </header>


        <div class="nh-mobile-hero">


          <span class="nh-mobile-project-tag">
            RESIDENTIAL / METRO MANILA
          </span>


          <div class="nh-mobile-copy">


            <span class="nh-mobile-kicker">
              RESIDENTIAL SERVICES
            </span>


            <strong>
              CARE FOR<br>
              THE HOME<br>
              YOU LIVE IN.
            </strong>


            <p>
              Repairs, maintenance
              and installation for
              modern homes.
            </p>


            <span class="nh-mobile-cta">

              REQUEST A QUOTE

              <span aria-hidden="true">
                ↗
              </span>

            </span>


          </div>


        </div>

      </div>
    `;

  }


  /* =======================================================
     NORTH HOME / WEBSITE VIEWER
  ======================================================= */

  function openNorthViewer() {

    const viewer =
      document.querySelector(
        "#nh-site-viewer"
      );


    /*
     * Preferred route:
     * open the existing North Home viewer directly.
     */

    if (viewer) {

      if (!viewer.open) {

        viewer.showModal();


        document.body.classList.add(
          "nh-viewer-open"
        );


        const scrollArea =
          viewer.querySelector(
            ".nh-site-viewer-scroll"
          );


        if (scrollArea) {

          scrollArea.scrollTop =
            0;

        }

      }


      return;

    }


    /*
     * Fallback:
     * north-home.js already wires the desktop preview
     * to the viewer. Trigger that existing interaction
     * if the dialog has not been created yet.
     */

    const desktopLauncher =
      document.querySelector(
        ".window-main .window-placeholder.nh-view-launch"
      );


    desktopLauncher?.click();

  }


  function makeNorthMobileLaunchable() {

    /*
     * Avoid adding the same listeners twice if this
     * project is rendered again later.
     */

    if (
      mobilePreview.dataset.viewerBound ===
      "true"
    ) {
      return;
    }


    mobilePreview.dataset.viewerBound =
      "true";


    mobilePreview.classList.add(
      "nh-view-launch"
    );


    mobilePreview.setAttribute(
      "role",
      "button"
    );


    mobilePreview.setAttribute(
      "tabindex",
      "0"
    );


    mobilePreview.setAttribute(
      "aria-label",
      "View the North Home concept website from the mobile preview"
    );


    mobilePreview.addEventListener(
      "click",
      () => {

        openNorthViewer();

      }
    );


    mobilePreview.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !== "Enter" &&
          event.key !== " "
        ) {
          return;
        }


        event.preventDefault();


        openNorthViewer();

      }
    );

  }


  /* =======================================================
     FEATURE RENDERERS
  ======================================================= */

  const projectRenderers = {

    north: {

      /*
       * North Home's desktop preview is already generated
       * by north-home.js, so do not rebuild it here.
       */

      renderDesktop() {

        desktopBar.innerHTML = `
          <span>
            PROJECT / 01
          </span>

          <span>
            BUSINESS WEBSITE
          </span>
        `;


        desktopWindow.dataset.featuredProject =
          "north";

      },


      renderMobile() {

        mobileBar.innerHTML = `
          <span>
            MOBILE / 01
          </span>

          <span>
            NORTH HOME
          </span>
        `;


        mobilePreview.classList.remove(
          "has-north-preview"
        );


        mobilePreview.classList.add(
          "has-north-mobile-preview"
        );


        mobilePreview.innerHTML =
          northMobileMarkup();


        mobileWindow.dataset.featuredProject =
          "north";


        makeNorthMobileLaunchable();

      }

    }

  };


  /* =======================================================
     FEATURE SELECTION
  ======================================================= */

  function chooseProject() {

    /*
     * At the moment there is only one completed project.
     *
     * Once more projects are added to featuredProjects,
     * this automatically selects one on every page load.
     */

    if (
      featuredProjects.length === 1
    ) {

      return featuredProjects[0];

    }


    /*
     * Avoid repeating the project from the immediately
     * previous visit when another option exists.
     *
     * sessionStorage survives reload/navigation in the
     * current tab but resets with a new browsing session.
     */

    let previousKey =
      null;


    try {

      previousKey =
        sessionStorage.getItem(
          "jc-last-featured-project"
        );

    } catch (error) {

      previousKey =
        null;

    }


    const alternatives =
      featuredProjects.filter(
        (project) =>
          project.key !==
          previousKey
      );


    const pool =
      alternatives.length
        ? alternatives
        : featuredProjects;


    const randomIndex =
      Math.floor(
        Math.random() *
        pool.length
      );


    return pool[randomIndex];

  }


  /* =======================================================
     APPLY FEATURE
  ======================================================= */

  function renderFeaturedProject(
    project
  ) {

    const renderer =
      projectRenderers[
        project.key
      ];


    if (!renderer) {
      return;
    }


    renderer.renderDesktop();
    renderer.renderMobile();


    document.documentElement.dataset.featuredProject =
      project.key;


    try {

      sessionStorage.setItem(
        "jc-last-featured-project",
        project.key
      );

    } catch (error) {

      /*
       * Storage can be blocked in some browser/privacy
       * contexts. The feature still works without it.
       */

    }

  }


  /* =======================================================
     WAIT FOR NORTH HOME

     north-home.js generates the large desktop preview
     during DOMContentLoaded. This controller runs after it,
     but waits briefly in case initialization ordering changes.
  ======================================================= */

  function start(
    attempt = 0
  ) {

    const northDesktopReady =
      desktopPreview.classList.contains(
        "has-north-preview"
      ) &&
      desktopPreview.querySelector(
        ".nh-thumb"
      );


    if (
      !northDesktopReady &&
      attempt < 30
    ) {

      requestAnimationFrame(
        () => {

          start(
            attempt + 1
          );

        }
      );


      return;

    }


    const project =
      chooseProject();


    renderFeaturedProject(
      project
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () => {

        requestAnimationFrame(
          () => {

            start();

          }
        );

      },
      {
        once: true
      }
    );

  } else {

    requestAnimationFrame(
      () => {

        start();

      }
    );

  }

})();
