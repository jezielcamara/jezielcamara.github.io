/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PROJECT SYSTEM

   One project definition.
   One website source.
   Multiple presentation environments.

   Used by:
   - hero desktop preview
   - hero mobile preview
   - selected work
   - responsive lab
   - website viewer
   - case study

   Project-specific files register themselves here.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     PRIVATE PROJECT STORE
  ======================================================= */

  const projects =
    new Map();


  /* =======================================================
     HELPERS
  ======================================================= */

  function normalizeKey(
    value
  ) {

    return String(
      value || ""
    )
      .trim()
      .toLowerCase();

  }


  function requireProject(
    key
  ) {

    const normalizedKey =
      normalizeKey(
        key
      );


    const project =
      projects.get(
        normalizedKey
      );


    if (!project) {

      throw new Error(
        `Portfolio project "${normalizedKey}" is not registered.`
      );

    }


    return project;

  }


  function removeDuplicateIds(
    root
  ) {

    if (!root) {
      return;
    }


    /*
     * Preview copies must not duplicate IDs that
     * may already exist in the interactive source.
     */

    if (
      root.hasAttribute?.(
        "id"
      )
    ) {

      root.removeAttribute(
        "id"
      );

    }


    root
      .querySelectorAll(
        "[id]"
      )
      .forEach(
        (element) => {

          element.removeAttribute(
            "id"
          );

        }
      );

  }


  function makeViewOnly(
    root
  ) {

    if (!root) {
      return;
    }


    root.classList.add(
      "portfolio-project-view-only"
    );


    root.setAttribute(
      "data-project-view-only",
      "true"
    );


    root
      .querySelectorAll(
        `
          a,
          button,
          input,
          select,
          textarea
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
              "button, input, select, textarea"
            )
          ) {

            control.disabled =
              true;

          }

        }
      );


    /*
     * Preview instances should look real,
     * but they should not trigger navigation,
     * forms, or internal project interactions.
     */

    root.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

      },
      true
    );


    root.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

      },
      true
    );

  }


  function createProjectElement(
    project
  ) {

    const result =
      project.createSite();


    /*
     * Project factories may return:
     *
     * 1. An HTMLElement
     * 2. An HTML string
     */

    if (
      result instanceof
      HTMLElement
    ) {

      return result;

    }


    if (
      typeof result ===
      "string"
    ) {

      const template =
        document.createElement(
          "template"
        );


      template.innerHTML =
        result.trim();


      const element =
        template.content
          .firstElementChild;


      if (!element) {

        throw new Error(
          `Project "${project.key}" returned empty HTML.`
        );

      }


      return element;

    }


    throw new Error(
      `Project "${project.key}" createSite() must return an HTMLElement or HTML string.`
    );

  }


  /* =======================================================
     REGISTER
  ======================================================= */

  function register(
    definition
  ) {

    if (
      !definition ||
      typeof definition !==
      "object"
    ) {

      throw new Error(
        "PortfolioProjects.register() requires a project definition."
      );

    }


    const key =
      normalizeKey(
        definition.key
      );


    if (!key) {

      throw new Error(
        "Every portfolio project requires a key."
      );

    }


    if (
      typeof definition.createSite !==
      "function"
    ) {

      throw new Error(
        `Project "${key}" requires a createSite() function.`
      );

    }


    const project = {

      key,

      name:
        definition.name ||
        key,

      index:
        definition.index ||
        "",

      category:
        definition.category ||
        "",

      type:
        definition.type ||
        "WEBSITE",

      featured:
        definition.featured !==
        false,

      createSite:
        definition.createSite,

      initialize:
        typeof definition.initialize ===
        "function"
          ? definition.initialize
          : null

    };


    projects.set(
      key,
      project
    );


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:project-registered",
        {
          detail: {
            key
          }
        }
      )
    );


    return project;

  }


  /* =======================================================
     GET PROJECT
  ======================================================= */

  function get(
    key
  ) {

    return projects.get(
      normalizeKey(
        key
      )
    ) || null;

  }


  function has(
    key
  ) {

    return projects.has(
      normalizeKey(
        key
      )
    );

  }


  function list() {

    return Array.from(
      projects.values()
    );

  }


  function listFeatured() {

    return list()
      .filter(
        (project) =>
          project.featured
      );

  }


  /* =======================================================
     CREATE INSTANCE
  ======================================================= */

  function create(
    key,
    options = {}
  ) {

    const project =
      requireProject(
        key
      );


    const element =
      createProjectElement(
        project
      );


    element.dataset.portfolioProject =
      project.key;


    if (
      options.instance
    ) {

      element.dataset.projectInstance =
        options.instance;

    }


    /*
     * Preview copies intentionally lose IDs.
     *
     * The main interactive project instance may
     * preserve them when needed.
     */

    if (
      options.preserveIds !==
      true
    ) {

      removeDuplicateIds(
        element
      );

    }


    if (
      options.viewOnly ===
      true
    ) {

      makeViewOnly(
        element
      );

    }


    /*
     * Project-specific interaction initialization
     * happens only when explicitly requested.
     */

    if (
      options.interactive ===
        true &&
      project.initialize
    ) {

      project.initialize(
        element,
        options
      );

    }


    return element;

  }


  /* =======================================================
     MOUNT INSTANCE
  ======================================================= */

  function mount(
    key,
    target,
    options = {}
  ) {

    let mountTarget =
      target;


    if (
      typeof target ===
      "string"
    ) {

      mountTarget =
        document.querySelector(
          target
        );

    }


    if (
      !(mountTarget instanceof HTMLElement)
    ) {

      throw new Error(
        `Could not mount portfolio project "${key}": target not found.`
      );

    }


    const projectElement =
      create(
        key,
        options
      );


    mountTarget.replaceChildren(
      projectElement
    );


    mountTarget.dataset.mountedProject =
      normalizeKey(
        key
      );


    if (
      options.viewport
    ) {

      mountTarget.dataset.projectViewport =
        options.viewport;

    }


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:project-mounted",
        {

          detail: {

            key:
              normalizeKey(
                key
              ),

            target:
              mountTarget,

            element:
              projectElement,

            options

          }

        }
      )
    );


    return projectElement;

  }


  /* =======================================================
     PUBLIC API
  ======================================================= */

  window.PortfolioProjects = {

    register,

    get,

    has,

    list,

    listFeatured,

    create,

    mount

  };


  /* =======================================================
     READY EVENT
  ======================================================= */

  document.dispatchEvent(
    new CustomEvent(
      "portfolio:projects-ready"
    )
  );

})();
