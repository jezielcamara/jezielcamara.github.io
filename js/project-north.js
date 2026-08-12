/* =========================================================
   NORTH HOME / PROJECT REGISTRATION

   Registers the real North Home website with the shared
   PortfolioProjects system.

   IMPORTANT ARCHITECTURE RULE:

   North Home has ONE canonical website source.

   Every future presentation should be created from this:
   - hero desktop
   - hero mobile
   - selected work
   - responsive lab
   - website viewer
   - case-study preview

   No separate North Home preview markup should be created.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "north";


  const SOURCE_SELECTOR =
    ".north-case-study .nh-site";


  const MAX_ATTEMPTS =
    60;


  /* =======================================================
     STATE
  ======================================================= */

  let canonicalTemplate =
    null;


  let registered =
    false;


  /* =======================================================
     CLEAN SOURCE TEMPLATE
  ======================================================= */

  function createCanonicalTemplate(
    sourceWebsite
  ) {

    if (
      !(sourceWebsite instanceof HTMLElement)
    ) {
      return null;
    }


    /*
     * Clone the real North Home website once.
     *
     * This frozen template becomes the source from which
     * every portfolio preview is created.
     */

    const template =
      sourceWebsite.cloneNode(
        true
      );


    template.classList.add(
      "north-project-source"
    );


    template.setAttribute(
      "data-canonical-project",
      PROJECT_KEY
    );


    return template;

  }


  /* =======================================================
     CREATE SITE

     PortfolioProjects calls this every time another
     presentation of North Home is needed.
  ======================================================= */

  function createNorthSite() {

    if (!canonicalTemplate) {

      throw new Error(
        "North Home canonical template is not available."
      );

    }


    /*
     * Always return a fresh clone.
     *
     * This means every preview starts from the exact
     * same North Home design and content.
     */

    return canonicalTemplate.cloneNode(
      true
    );

  }


  /* =======================================================
     REGISTER PROJECT
  ======================================================= */

  function registerNorthProject() {

    if (registered) {
      return true;
    }


    if (
      !window.PortfolioProjects
    ) {

      return false;

    }


    /*
     * Do not register the same project twice.
     */

    if (
      window.PortfolioProjects.has(
        PROJECT_KEY
      )
    ) {

      registered =
        true;

      return true;

    }


    const sourceWebsite =
      document.querySelector(
        SOURCE_SELECTOR
      );


    if (!sourceWebsite) {
      return false;
    }


    canonicalTemplate =
      createCanonicalTemplate(
        sourceWebsite
      );


    if (!canonicalTemplate) {
      return false;
    }


    window.PortfolioProjects.register({

      key:
        PROJECT_KEY,

      name:
        "North Home",

      index:
        "01",

      category:
        "HOME SERVICES",

      type:
        "BUSINESS WEBSITE",

      featured:
        true,

      createSite:
        createNorthSite

    });


    registered =
      true;


    document.documentElement
      .setAttribute(
        "data-north-project-source",
        "ready"
      );


    document.dispatchEvent(
      new CustomEvent(
        "north:project-ready",
        {

          detail: {

            key:
              PROJECT_KEY

          }

        }
      )
    );


    return true;

  }


  /* =======================================================
     WAIT FOR NORTH HOME SOURCE

     north-home.js creates the actual .nh-site during
     DOMContentLoaded.

     Normally the first attempt will succeed. The retry
     loop protects us if initialization timing changes.
  ======================================================= */

  function waitForNorthSource(
    attempt = 0
  ) {

    if (
      registerNorthProject()
    ) {

      return;

    }


    if (
      attempt >=
      MAX_ATTEMPTS
    ) {

      console.warn(
        "North Home project source could not be registered."
      );

      return;

    }


    requestAnimationFrame(
      () => {

        waitForNorthSource(
          attempt + 1
        );

      }
    );

  }


  /* =======================================================
     START
  ======================================================= */

  function init() {

    waitForNorthSource();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once:
          true
      }
    );

  } else {

    init();

  }

})();
