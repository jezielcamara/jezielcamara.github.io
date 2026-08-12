/* =========================================================
   NORTH HOME / PROJECT DEFINITION

   ONE PROJECT.
   ONE CANONICAL WEBSITE FACTORY.

   This file has exactly one responsibility:

   Register North Home with PortfolioProjects.

   Website source:
   window.NorthHomeSite

   Shared registry:
   window.PortfolioProjects

   This file does NOT:
   - create North Home HTML
   - clone case-study DOM
   - mount portfolio previews
   - mount case-study previews
   - style project surfaces
   - manage viewer chrome
   - manage case-study presentation
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     SETTINGS
  ======================================================= */

  const PROJECT_KEY =
    "north";


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


  function getNorthFactory() {

    const factory =
      window.NorthHomeSite;


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
        "data-north-project-source",
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
        "north:project-ready",
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
     REGISTER NORTH HOME

     This is the complete North Home project definition.

     Project-specific metadata lives here.

     Project-specific website DOM and behavior live in
     north-home-site.js.

     Portfolio presentation does not live in either file.
  ======================================================= */

  function registerNorthProject() {

    if (
      registrationComplete
    ) {

      return true;

    }


    const registry =
      getRegistry();


    const factory =
      getNorthFactory();


    if (
      !registry ||
      !factory
    ) {

      return false;

    }


    /*
     * Do not create a second registration if this script is
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
          "North Home",

        index:
          "01",

        category:
          "HOME SERVICES",

        type:
          "BUSINESS WEBSITE",

        url:
          "northhome.example",

        featured:
          true,

        viewerDescription:
          "SELF-INITIATED CONCEPT / WEBSITE PREVIEW",

        viewerState:
          "VIEW-ONLY CONCEPT",


        /*
         * ONE WEBSITE SOURCE
         *
         * Hero, Work, Lab, Viewer and Case Study all request
         * fresh instances from this exact factory.
         */

        createSite:
          factory.create,


        /*
         * ONE INTERACTION SOURCE
         *
         * Any interactive North Home instance receives the
         * exact same behavior initializer.
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

     The current script order already loads both required
     systems before this file.

     This retry is retained only as defensive protection
     against future script-order changes.
  ======================================================= */

  function waitForRegistration(
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
        "North Home could not be registered because its project dependencies were unavailable."
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

     These make registration resilient if project scripts are
     reorganized later.

     Immediate registration below remains the normal path.
  ======================================================= */

  document.addEventListener(
    "portfolio:projects-ready",
    () => {

      waitForRegistration();

    }
  );


  document.addEventListener(
    "north:site-factory-ready",
    () => {

      waitForRegistration();

    }
  );


  /* =======================================================
     START
  ======================================================= */

  waitForRegistration();

})();
