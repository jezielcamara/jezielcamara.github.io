/* =========================================================
   JEZIEL CAMARA / PROJECT REGISTRY

   NEW MODULAR ARCHITECTURE

   RESPONSIBILITY
   - store project definitions
   - validate project definitions
   - expose published projects
   - expose featured projects
   - keep project metadata in one place

   NOT RESPONSIBLE FOR
   - creating iframes
   - mounting project DOM
   - scaling previews
   - viewer UI
   - case-study UI
   - responsive Lab UI
   - project-specific HTML
   - project-specific CSS

   IMPORTANT

   The registry describes projects.

   Presentation features consume projects.

   Project rendering will be handled separately by:

   js/core/project-frame.js
========================================================= */


/* =========================================================
   ALLOWED PROJECT STATES
========================================================= */

const PROJECT_STATUSES =
  Object.freeze([
    "published",
    "draft"
  ]);


/* =========================================================
   PRIVATE PROJECT STORE
========================================================= */

const projects =
  new Map();


/* =========================================================
   HELPERS
========================================================= */

function normalizeKey(
  value
) {

  return String(
    value ??
    ""
  )
    .trim()
    .toLowerCase();

}


function normalizeText(
  value,
  fallback = ""
) {

  const text =
    String(
      value ??
      ""
    ).trim();


  return text ||
    fallback;

}


function normalizeStatus(
  value
) {

  const status =
    normalizeKey(
      value ||
      "draft"
    );


  if (
    !PROJECT_STATUSES.includes(
      status
    )
  ) {

    throw new Error(
      `Invalid project status "${status}". Expected "published" or "draft".`
    );

  }


  return status;

}


function normalizeStyles(
  styles
) {

  if (
    styles === undefined ||
    styles === null
  ) {

    return Object.freeze([]);

  }


  if (
    !Array.isArray(
      styles
    )
  ) {

    throw new Error(
      "Project styles must be an array of stylesheet paths."
    );

  }


  const normalized =
    styles
      .map(
        (style) =>
          normalizeText(
            style
          )
      )
      .filter(
        Boolean
      );


  return Object.freeze(
    Array.from(
      new Set(
        normalized
      )
    )
  );

}


/* =========================================================
   OBJECT FREEZING

   Metadata objects are cloned before being exposed.

   This prevents portfolio features from accidentally
   mutating a project's manifest at runtime.
========================================================= */

function freezeRecord(
  value
) {

  if (
    !value ||
    typeof value !==
      "object" ||
    Array.isArray(
      value
    )
  ) {

    return Object.freeze({});

  }


  const copy =
    {};


  Object.entries(
    value
  ).forEach(
    ([
      key,
      entry
    ]) => {

      if (
        Array.isArray(
          entry
        )
      ) {

        copy[key] =
          Object.freeze(
            [
              ...entry
            ]
          );


        return;

      }


      if (
        entry &&
        typeof entry ===
          "object"
      ) {

        copy[key] =
          freezeRecord(
            entry
          );


        return;

      }


      copy[key] =
        entry;

    }
  );


  return Object.freeze(
    copy
  );

}


/* =========================================================
   SORTING

   Projects use their portfolio index for normal ordering.

   Missing or non-numeric indexes move to the end.
========================================================= */

function projectSortValue(
  project
) {

  const parsed =
    Number.parseInt(
      project.index,
      10
    );


  return Number.isFinite(
    parsed
  )
    ? parsed
    : Number.MAX_SAFE_INTEGER;

}


function sortProjects(
  list
) {

  return [
    ...list
  ].sort(
    (
      first,
      second
    ) => {

      const indexDifference =
        projectSortValue(
          first
        ) -
        projectSortValue(
          second
        );


      if (
        indexDifference !==
        0
      ) {

        return indexDifference;

      }


      return first.name.localeCompare(
        second.name
      );

    }
  );

}


/* =========================================================
   PROJECT VALIDATION
========================================================= */

function validateDefinition(
  definition
) {

  if (
    !definition ||
    typeof definition !==
      "object" ||
    Array.isArray(
      definition
    )
  ) {

    throw new TypeError(
      "ProjectRegistry.register() requires a project definition object."
    );

  }


  const key =
    normalizeKey(
      definition.key
    );


  if (!key) {

    throw new Error(
      "Every project requires a non-empty key."
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


  if (
    definition.initialize !==
      undefined &&
    definition.initialize !==
      null &&
    typeof definition.initialize !==
      "function"
  ) {

    throw new Error(
      `Project "${key}" initialize must be a function when provided.`
    );

  }


  if (
    definition.loadCase !==
      undefined &&
    definition.loadCase !==
      null &&
    typeof definition.loadCase !==
      "function"
  ) {

    throw new Error(
      `Project "${key}" loadCase must be a function when provided.`
    );

  }


  return key;

}


/* =========================================================
   BUILD IMMUTABLE PROJECT RECORD
========================================================= */

function createProjectRecord(
  definition
) {

  const key =
    validateDefinition(
      definition
    );


  const status =
    normalizeStatus(
      definition.status
    );


  const project =
    {

      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      key,

      status,

      name:
        normalizeText(
          definition.name,
          key
        ),

      index:
        normalizeText(
          definition.index
        ),

      category:
        normalizeText(
          definition.category
        ),

      type:
        normalizeText(
          definition.type,
          "WEBSITE"
        ),

      url:
        normalizeText(
          definition.url,
          `${key}.example`
        ),


      /* ---------------------------------------------------
         PORTFOLIO VISIBILITY
      --------------------------------------------------- */

      featured:
        definition.featured ===
        true,


      /* ---------------------------------------------------
         PROJECT DEPENDENCIES

         Only project-owned styles belong here.

         Example:

         [
           "css/sola.css"
         ]

         The future frame engine will use this list instead
         of copying every stylesheet from the portfolio.
      --------------------------------------------------- */

      styles:
        normalizeStyles(
          definition.styles
        ),


      /* ---------------------------------------------------
         PRESENTATION METADATA

         These objects may contain copy needed by portfolio
         features without requiring project-specific switch
         statements inside those features.

         Example:

         work: {
           pages:
             "Menu / Notebook / Gallery / Visit"
         }

         viewer: {
           description:
             "SELF-INITIATED CONCEPT / WEBSITE PREVIEW",

           state:
             "INTERACTIVE CONCEPT"
         }

         lab: {
           enabled:
             true
         }
      --------------------------------------------------- */

      work:
        freezeRecord(
          definition.work
        ),

      viewer:
        freezeRecord(
          definition.viewer
        ),

      lab:
        freezeRecord(
          definition.lab
        ),


      /* ---------------------------------------------------
         CANONICAL WEBSITE SOURCE
      --------------------------------------------------- */

      createSite:
        definition.createSite,


      /* ---------------------------------------------------
         CANONICAL WEBSITE INTERACTIONS
      --------------------------------------------------- */

      initialize:
        typeof definition.initialize ===
          "function"
          ? definition.initialize
          : null,


      /* ---------------------------------------------------
         LAZY CASE STUDY

         Expected future usage:

         loadCase: () =>
           import("./case.js")

         The case module is therefore downloaded only when
         the visitor requests that case study.
      --------------------------------------------------- */

      loadCase:
        typeof definition.loadCase ===
          "function"
          ? definition.loadCase
          : null

    };


  return Object.freeze(
    project
  );

}


/* =========================================================
   REGISTER
========================================================= */

function register(
  definition
) {

  const project =
    createProjectRecord(
      definition
    );


  if (
    projects.has(
      project.key
    )
  ) {

    throw new Error(
      `Project "${project.key}" is already registered.`
    );

  }


  projects.set(
    project.key,
    project
  );


  return project;

}


/* =========================================================
   LOOKUP
========================================================= */

function get(
  key
) {

  return (
    projects.get(
      normalizeKey(
        key
      )
    ) ||
    null
  );

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


/* =========================================================
   ALL PROJECTS

   Primarily useful for development and diagnostics.

   Public portfolio features should normally consume
   published() instead.
========================================================= */

function list() {

  return sortProjects(
    projects.values()
  );

}


/* =========================================================
   PUBLISHED PROJECTS

   This is the primary public-facing project query.

   Draft projects cannot appear in:
   - Selected Work
   - featured Hero selection
   - viewer navigation
   - case navigation
========================================================= */

function published() {

  return sortProjects(
    Array.from(
      projects.values()
    ).filter(
      (project) =>
        project.status ===
        "published"
    )
  );

}


/* =========================================================
   FEATURED PROJECTS

   A project must be BOTH:
   - published
   - featured

   Setting featured:true on a draft project will therefore
   never expose that project publicly.
========================================================= */

function featured() {

  return published()
    .filter(
      (project) =>
        project.featured
    );

}


/* =========================================================
   PROJECT COUNT
========================================================= */

function size() {

  return projects.size;

}


/* =========================================================
   DEVELOPMENT SNAPSHOT

   Returns simple metadata only.

   Functions are intentionally excluded so console debugging
   remains readable.
========================================================= */

function snapshot() {

  return list()
    .map(
      (project) => ({

        key:
          project.key,

        status:
          project.status,

        name:
          project.name,

        index:
          project.index,

        category:
          project.category,

        type:
          project.type,

        featured:
          project.featured,

        styles:
          [
            ...project.styles
          ]

      })
    );

}


/* =========================================================
   PUBLIC API

   ES MODULE ONLY.

   No window.ProjectRegistry global is created.

   Feature modules will import this exact singleton, which
   removes the script-order polling used by the current
   production architecture.
========================================================= */

export const ProjectRegistry =
  Object.freeze({

    register,

    get,

    has,

    list,

    published,

    featured,

    size,

    snapshot

  });


export {
  PROJECT_STATUSES
};
