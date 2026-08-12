/* =========================================================
   JEZIEL CAMARA / PORTFOLIO PROJECT SYSTEM

   ONE PROJECT DEFINITION.
   ONE WEBSITE SOURCE.
   MULTIPLE PRESENTATION ENVIRONMENTS.

   Used by:
   - Hero desktop preview
   - Hero mobile preview
   - Selected Work
   - Responsive Lab
   - website viewer
   - case-study preview
   - case-study live website

   PROJECT CONTRACT

   Every project registers:

   {
     key,
     name,
     index,
     category,
     type,
     url,
     featured,
     viewerDescription,
     viewerState,
     createSite,
     initialize
   }

   createSite()
     Returns a fresh canonical website DOM instance.

   initialize(root, options)
     Optionally activates behavior for an interactive
     instance of that website.

   IMPORTANT ARCHITECTURE RULE

   Portfolio presentation code may choose:
   - direct DOM
   - isolated iframe
   - desktop width
   - tablet width
   - mobile width
   - interactive or view-only mode

   It must NEVER recreate project-specific website HTML.
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
      value ||
      ""
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
     TARGET RESOLUTION
  ======================================================= */

  function resolveTarget(
    target
  ) {

    if (
      typeof target ===
      "string"
    ) {

      return document.querySelector(
        target
      );

    }


    return target;

  }


  /* =======================================================
     PROJECT ELEMENT VALIDATION
  ======================================================= */

  function isElement(
    value
  ) {

    return Boolean(
      value &&
      value.nodeType ===
        1
    );

  }


  /* =======================================================
     ID CLEANUP

     Direct decorative copies can exist in the same
     document.

     Their IDs must therefore be removed unless the caller
     explicitly requests preserveIds: true.
  ======================================================= */

  function removeDuplicateIds(
    root
  ) {

    if (!root) {

      return;

    }


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

     A decorative project preview remains visually complete
     but does not behave like a live website.

     Clicks are still allowed to bubble to the surrounding
     portfolio launcher.
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
     * Prevent project navigation while preserving bubbling.
     *
     * The surrounding Hero or Work surface may use that
     * click to open PortfolioProjectViewer.
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
     * Supported factory output:
     *
     * 1. Element
     * 2. HTML string
     */

    if (
      isElement(
        result
      )
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
      `Project "${project.key}" createSite() must return an Element or HTML string.`
    );

  }


  /* =======================================================
     REGISTER PROJECT
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


    /*
     * Metadata lives with the project definition.
     *
     * Presentation infrastructure should not contain
     * project-specific switch statements.
     */

    const project =
      Object.freeze({

        key,

        name:
          String(
            definition.name ||
            key
          ),

        index:
          String(
            definition.index ||
            ""
          ),

        category:
          String(
            definition.category ||
            ""
          ),

        type:
          String(
            definition.type ||
            "WEBSITE"
          ),

        url:
          String(
            definition.url ||
            `${key}.example`
          ),

        featured:
          definition.featured !==
          false,

        viewerDescription:
          String(
            definition.viewerDescription ||
            "WEBSITE PREVIEW / CONCEPT PROJECT"
          ),

        viewerState:
          String(
            definition.viewerState ||
            "VIEW-ONLY CONCEPT"
          ),

        createSite:
          definition.createSite,

        initialize:
          typeof definition.initialize ===
          "function"
            ? definition.initialize
            : null

      });


    projects.set(
      key,
      project
    );


    document.dispatchEvent(
      new CustomEvent(
        "portfolio:project-registered",
        {
          detail: {
            key,
            project
          }
        }
      )
    );


    return project;

  }


  /* =======================================================
     PROJECT LOOKUP
  ======================================================= */

  function get(
    key
  ) {

    return projects.get(
      normalizeKey(
        key
      )
    ) ||
    null;

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
     DIRECT INSTANCE INITIALIZATION
  ======================================================= */

  function initializeProjectElement(
    project,
    element,
    options = {}
  ) {

    if (
      !project.initialize ||
      !element
    ) {

      return element;

    }


    project.initialize(
      element,
      options
    );


    return element;

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


    if (
      options.viewport
    ) {

      element.dataset.projectViewport =
        options.viewport;

    }


    const viewOnly =
      options.viewOnly ===
      true;


    const interactive =
      options.interactive ===
        true &&
      !viewOnly;


    /*
     * Decorative direct previews lose IDs because another
     * copy of the same project may exist in this document.
     *
     * Interactive live instances can explicitly preserve
     * them.
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
      viewOnly
    ) {

      makeViewOnly(
        element
      );

    }


    if (
      interactive
    ) {

      element.dataset.projectInteractive =
        "true";


      initializeProjectElement(
        project,
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

    const mountTarget =
      resolveTarget(
        target
      );


    if (
      !isElement(
        mountTarget
      )
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


    mountTarget.dataset.projectRenderMode =
      "direct";


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
     ISOLATED PROJECT VIEWPORTS

     Standard CSS media queries respond to the browser
     viewport.

     Therefore a project embedded in a 390px iframe receives
     its genuine mobile layout, while the same exact source
     embedded in a 1200px iframe receives its desktop layout.

     The project does not change.

     Only the viewport changes.
  ======================================================= */


  /* =======================================================
     SHARED STYLE REFERENCES
  ======================================================= */

  function getSharedStyleMarkup() {

    const markup =
      [];


    /*
     * Copy every external stylesheet loaded by the current
     * portfolio page.
     *
     * Project selectors are namespaced, so every isolated
     * viewport receives the same active design system as the
     * source document.
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
     * The iframe receives the same canonical element
     * generated by the registered project factory.
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


    if (
      options.viewport
    ) {

      projectElement.dataset.projectViewport =
        options.viewport;

    }


    const interactive =
      options.interactive ===
      true;


    if (
      interactive
    ) {

      projectElement.dataset.projectInteractive =
        "true";

    }


    /*
     * IDs are safe in the isolated document.
     *
     * The iframe contains only one project instance.
     */

    const projectHTML =
      projectElement.outerHTML;


    const styles =
      getSharedStyleMarkup();


    const baseHref =
      document.baseURI;


    const title =
      `${project.name} preview`;


    const interactionStyles =
      interactive
        ? `
    a,
    button,
    input,
    select,
    textarea {
      pointer-events:
        auto;
    }
        `
        : `
    a,
    button,
    input,
    select,
    textarea {
      pointer-events:
        none !important;
    }
        `;


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
      width:
        100%;

      min-width:
        0;

      margin:
        0;

      padding:
        0;

      overflow-x:
        hidden;

      background:
        transparent;
    }


    body {
      min-height:
        100vh;
    }


    body
    > [data-portfolio-project] {
      width:
        100%;

      min-width:
        0;

      max-width:
        none;

      margin:
        0;
    }


    ${interactionStyles}


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


<body
  data-project-frame-mode="${
    interactive
      ? "interactive"
      : "view-only"
  }"
>

  ${projectHTML}

</body>

</html>
    `.trim();

  }


  /* =======================================================
     FRAME PROJECT INITIALIZATION

     Interactive frames remain script-free internally.

     Because the frame is same-origin, the parent project
     system attaches the registered initialize() behavior
     after the srcdoc document loads.

     The project therefore still has one behavior source.
  ======================================================= */

  function initializeFrameProject(
    frame,
    project,
    options = {}
  ) {

    if (
      options.interactive !==
        true ||
      !project.initialize
    ) {

      return null;

    }


    let frameDocument =
      null;


    try {

      frameDocument =
        frame.contentDocument;

    } catch (error) {

      frameDocument =
        null;

    }


    if (!frameDocument) {

      return null;

    }


    const projectRoot =
      frameDocument.querySelector(
        "[data-portfolio-project]"
      );


    if (!projectRoot) {

      return null;

    }


    project.initialize(
      projectRoot,
      {
        ...options,

        frame,

        frameDocument,

        frameWindow:
          frameDocument.defaultView,

        preserveIds:
          true,

        interactive:
          true
      }
    );


    frame.dataset.projectInteractive =
      "true";


    return projectRoot;

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
      ) ||
      1200;


    const height =
      Number(
        options.height
      ) ||
      800;


    const interactive =
      options.interactive ===
      true;


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


    frame.dataset.projectFrameMode =
      interactive
        ? "interactive"
        : "view-only";


    frame.title =
      options.label ||
      `${project.name} website preview`;


    /*
     * DECORATIVE FRAME
     *
     * Empty sandbox:
     * - no scripts
     * - opaque origin
     * - no forms
     * - no navigation privileges
     *
     * Used by Hero / Work / Lab / case preview.
     *
     *
     * INTERACTIVE FRAME
     *
     * allow-same-origin only:
     * - still no scripts running inside srcdoc
     * - still no top-level navigation privilege
     * - parent project system may access the frame DOM
     *   and attach the project's registered initialize()
     *
     * Used by the full website viewer.
     */

    frame.setAttribute(
      "sandbox",
      interactive
        ? "allow-same-origin"
        : ""
    );


    frame.loading =
      "eager";


    if (
      interactive
    ) {

      frame.setAttribute(
        "tabindex",
        "0"
      );


      frame.setAttribute(
        "scrolling",
        "yes"
      );

    } else {

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

    }


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
      interactive
        ? "auto"
        : "none";


    /*
     * Register load handling before assigning srcdoc.
     */

    frame.addEventListener(
      "load",
      () => {

        const projectRoot =
          initializeFrameProject(
            frame,
            project,
            options
          );


        document.dispatchEvent(
          new CustomEvent(
            "portfolio:project-frame-ready",
            {
              detail: {

                key:
                  project.key,

                frame,

                root:
                  projectRoot,

                interactive,

                options

              }
            }
          )
        );

      },
      {
        once:
          true
      }
    );


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

    const mountTarget =
      resolveTarget(
        target
      );


    if (
      !isElement(
        mountTarget
      )
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


    mountTarget.dataset.projectFrameMode =
      options.interactive ===
        true
        ? "interactive"
        : "view-only";


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

  window.PortfolioProjects =
    Object.freeze({

      register,

      get,

      has,

      list,

      listFeatured,

      create,

      mount,

      createFrame,

      mountFrame

    });


  /* =======================================================
     READY EVENT
  ======================================================= */

  document.dispatchEvent(
    new CustomEvent(
      "portfolio:projects-ready"
    )
  );

})();
