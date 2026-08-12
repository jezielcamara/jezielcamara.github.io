/* =========================================================
   SOLA CAFE / PROJECT DEFINITION

   ONE PROJECT.
   ONE CANONICAL WEBSITE FACTORY.

   This file has exactly one responsibility:

   Register Sola Cafe with PortfolioProjects.

   Website source:
   window.SolaCafeSite

   Shared registry:
   window.PortfolioProjects

   This file does NOT:
   - create Sola HTML
   - create Sola interactions
   - create portfolio thumbnails
   - mount Hero previews
   - mount Selected Work previews
   - mount Responsive Lab previews
   - manage viewer chrome
   - manage case-study presentation
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "sola";


  const MAX_ATTEMPTS =
    90;


  /* =======================================================
     STATE
  ======================================================= */

  let registrationComplete =
    false;


  let readyDispatched =
    false;


  /* =======================================================
     DEPENDENCIES
  ======================================================= */

  function getRegistry() {

    const registry =
      window.PortfolioProjects;


    if (
      !registry ||
      typeof registry.register !==
        "function" ||
      typeof registry.has !==
        "function" ||
      typeof registry.get !==
        "function"
    ) {

      return null;

    }


    return registry;

  }


  function getSolaFactory() {

    const factory =
      window.SolaCafeSite;


    if (
      !factory ||
      typeof factory.create !==
        "function" ||
      typeof factory.initialize !==
        "function"
    ) {

      return null;

    }


    return factory;

  }


  /* =======================================================
     READY STATE
  ======================================================= */

  function markProjectReady(
    project
  ) {

    registrationComplete =
      true;


    document.documentElement
      .setAttribute(
        "data-sola-project-source",
        "ready"
      );


    if (
      readyDispatched
    ) {

      return project;

    }


    readyDispatched =
      true;


    document.dispatchEvent(
      new CustomEvent(
        "sola:project-ready",
        {
          detail: {

            key:
              PROJECT_KEY,

            project:
              project ||
              null

          }
        }
      )
    );


    return project;

  }


  /* =======================================================
     REGISTER SOLA

     Project-specific metadata lives here.

     Project-specific website DOM and behavior live in
     sola-site.js.

     Portfolio presentation remains generic.
  ======================================================= */

  function registerSolaProject() {

    if (
      registrationComplete
    ) {

      return true;

    }


    const registry =
      getRegistry();


    const factory =
      getSolaFactory();


    if (
      !registry ||
      !factory
    ) {

      return false;

    }


    /*
     * Prevent duplicate registration if the file is ever
     * evaluated more than once.
     */

    if (
      registry.has(
        PROJECT_KEY
      )
    ) {

      markProjectReady(
        registry.get(
          PROJECT_KEY
        )
      );


      return true;

    }


    const project =
      registry.register({

        key:
          PROJECT_KEY,

        name:
          "Sola Cafe",

        index:
          "02",

        category:
          "HOSPITALITY",

        type:
          "CAFE WEBSITE",

        url:
          "solacafe.example",

        featured:
          true,

        viewerDescription:
          "SELF-INITIATED HOSPITALITY CONCEPT / WEBSITE PREVIEW",

        viewerState:
          "VIEW-ONLY CONCEPT",


        /*
         * ONE WEBSITE SOURCE
         *
         * Hero, Work, Lab, Viewer and future case-study
         * surfaces all request fresh instances from this
         * exact factory.
         */

        createSite:
          factory.create,


        /*
         * ONE INTERACTION SOURCE
         *
         * Interactive Sola instances receive the same menu,
         * navigation, gallery and reveal behavior.
         */

        initialize:
          factory.initialize

      });


    markProjectReady(
      project
    );


    return true;

  }


  /* =======================================================
     DEPENDENCY WAIT

     Normal production order will load:

     portfolio-projects.js
             ↓
     sola-site.js
             ↓
     project-sola.js

     Retry remains as defensive protection if script order
     changes later.
  ======================================================= */

  function waitForRegistration(
    attempt = 0
  ) {

    if (
      registerSolaProject()
    ) {

      return;

    }


    if (
      attempt >=
      MAX_ATTEMPTS
    ) {

      console.warn(
        "Sola Cafe could not be registered because its project dependencies were unavailable."
      );


      return;

    }


    requestAnimationFrame(
      () => {

        waitForRegistration(
          attempt + 1
        );

      }
    );

  }


  /* =======================================================
     DEPENDENCY EVENTS
  ======================================================= */

  document.addEventListener(
    "portfolio:projects-ready",
    () => {

      waitForRegistration();

    }
  );


  document.addEventListener(
    "sola:site-factory-ready",
    () => {

      waitForRegistration();

    }
  );


  /* =======================================================
     START
  ======================================================= */

  waitForRegistration();

})();
