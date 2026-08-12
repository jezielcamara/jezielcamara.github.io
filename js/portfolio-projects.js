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

   IMPORTANT ARCHITECTURE RULE:

   Project HTML must come from one registered createSite()
   function.

   Portfolio previews may present that source directly or
   through an isolated viewport, but they must never recreate
   project-specific HTML separately.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     PRIVATE PROJECT STORE
  ======================================================= */

  const projects =
    new Map();


  /* =======================================================
     KEY HELPERS
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


  /* =======================================================
     ID CLEANUP
  ======================================================= */

  function removeDuplicateIds(
    root
  ) {

    if (!root) {
      return;
    }


    /*
     * Direct preview copies live in the same DOM
     * as the canonical source.
     *
     * They therefore must not keep duplicate IDs.
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


  /* =======================================================
     VIEW-ONLY DIRECT INSTANCE
  ======================================================= */

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
     * Prevent links from navigating while allowing
     * the click event to continue upward.
     *
     * The portfolio wrapper may use that click to
     * open the project viewer.
     */

    root.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

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


  /* =======================================================
     PROJECT ELEMENT CREATION
  ======================================================= */

  function createProjectElement(
    project
  ) {

    const result =
      project.createSite();


    /*
     * Project factories may return:
     *
     * 1. HTMLElement
     * 2. HTML string
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
     CREATE DIRECT INSTANCE
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
     * Direct preview copies intentionally lose IDs.
     *
     * The canonical interactive project can preserve
     * IDs when required.
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
     MOUNT DIRECT INSTANCE
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
     ISOLATED VIEWPORT
  ======================================================= */


  /*
   * Some project layouts use normal CSS media queries.
   *
   * When those projects are embedded inside a small
   * portfolio preview, the media queries would otherwise
   * respond to the outer portfolio browser instead of the
   * preview itself.
   *
   * An isolated iframe gives the same canonical project
   * its own real viewport.
   *
   * Example:
   *
   * 1200px frame = desktop project
   * 700px frame  = tablet project
   * 390px frame  = mobile project
   *
   * Same HTML source.
   * Same CSS source.
   * Different viewport only.
   */


  /* =======================================================
     PAGE STYLE REFERENCES
  ======================================================= */

  function getSharedStyleMarkup() {

    const markup =
      [];


    /*
     * Copy every stylesheet currently loaded by the
     * portfolio page.
     *
     * This keeps isolated previews visually synchronized
     * with the exact CSS files used by the real project.
     */

    document
      .querySelectorAll(
        'link[rel="stylesheet"][href]'
      )
      .forEach(
        (link) => {

          const href =
            link.href;


          if (!href) {
            return;
          }


          markup.push(
            `<link rel="stylesheet" href="${href}">`
          );

        }
      );


    /*
     * Copy inline head styles as well.
     *
     * Most project styles are external, but this ensures
     * the isolated viewport uses the same current styling
     * environment as the parent document.
     */

    document.head
      .querySelectorAll(
        "style"
      )
      .forEach(
        (style) => {

          markup.push(
            `<style>${style.textContent || ""}</style>`
          );

        }
      );


    return markup.join(
      "\n"
    );

  }


  /* =======================================================
     FRAME DOCUMENT
  ======================================================= */

  function createFrameDocument(
    project,
    options = {}
  ) {

    /*
     * Important:
     *
     * This project element comes from the same registered
     * createSite() source used everywhere else.
     */

    const projectElement =
      createProjectElement(
        project
      );


    projectElement.dataset.portfolioProject =
      project.key;


    projectElement.dataset.projectFrame =
      options.instance ||
      "preview";


    /*
     * IDs are safe inside the iframe because this is an
     * isolated document.
     *
     * We deliberately preserve the project's real markup.
     */

    const projectHTML =
      projectElement.outerHTML;


    const styles =
      getSharedStyleMarkup();


    const baseHref =
      document.baseURI;


    const title =
      `${project.name} preview`;


    return `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <base href="${baseHref}">

  <title>
    ${title}
  </title>

  ${styles}

  <style>

    html,
    body {
      width: 100%;
      min-width: 0;

      margin: 0;
      padding: 0;

      overflow-x: hidden;

      background:
        transparent;
    }


    body {
      min-height: 100vh;
    }


    body
    > [data-portfolio-project] {
      width: 100%;
      min-width: 0;
      max-width: none;

      margin: 0;
    }


    a,
    button,
    input,
    select,
    textarea {
      pointer-events:
        none !important;
    }


    * {
      box-sizing:
        border-box;
    }


    @media (
      prefers-reduced-motion:
      reduce
    ) {

      *,
      *::before,
      *::after {
        scroll-behavior:
          auto !important;

        animation-duration:
          .001ms !important;

        animation-iteration-count:
          1 !important;

        transition-duration:
          .001ms !important;
      }

    }

  </style>

</head>


<body>

  ${projectHTML}

</body>

</html>
    `.trim();

  }


  /* =======================================================
     CREATE FRAME
  ======================================================= */

  function createFrame(
    key,
    options = {}
  ) {

    const project =
      requireProject(
        key
      );


    const frame =
      document.createElement(
        "iframe"
      );


    const width =
      Number(
        options.width
      ) || 1200;


    const height =
      Number(
        options.height
      ) || 800;


    frame.className =
      "portfolio-project-frame";


    frame.dataset.portfolioProject =
      project.key;


    if (
      options.instance
    ) {

      frame.dataset.projectInstance =
        options.instance;

    }


    if (
      options.viewport
    ) {

      frame.dataset.projectViewport =
        options.viewport;

    }


    frame.title =
      options.label ||
      `${project.name} website preview`;


    /*
     * The project preview does not need scripts,
     * forms, navigation, storage, or parent access.
     *
     * An empty sandbox provides the strongest isolation.
     */

    frame.setAttribute(
      "sandbox",
      ""
    );


    frame.setAttribute(
      "tabindex",
      "-1"
    );


    frame.setAttribute(
      "aria-hidden",
      "true"
    );


    frame.setAttribute(
      "scrolling",
      "no"
    );


    frame.loading =
      "eager";


    frame.style.display =
      "block";


    frame.style.width =
      `${width}px`;


    frame.style.height =
      `${height}px`;


    frame.style.minWidth =
      `${width}px`;


    frame.style.maxWidth =
      "none";


    frame.style.margin =
      "0";


    frame.style.padding =
      "0";


    frame.style.border =
      "0";


    frame.style.background =
      "transparent";


    frame.style.pointerEvents =
      "none";


    frame.srcdoc =
      createFrameDocument(
        project,
        options
      );


    return frame;

  }


  /* =======================================================
     MOUNT FRAME
  ======================================================= */

  function mountFrame(
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
        `Could not mount project frame "${key}": target not found.`
      );

    }


    const frame =
      createFrame(
        key,
        options
      );


    mountTarget.replaceChildren(
      frame
    );


    mountTarget.dataset.mountedProject =
      normalizeKey(
        key
      );


    mountTarget.dataset.projectRenderMode =
      "frame";


    if (
      options.viewport
    ) {

      mountTarget.dataset.projectViewport =
        options.viewport;

    }


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:project-frame-mounted",
        {

          detail: {

            key:
              normalizeKey(
                key
              ),

            target:
              mountTarget,

            frame,

            options

          }

        }
      )
    );


    return frame;

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

    mount,

    createFrame,

    mountFrame

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
