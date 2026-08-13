/* =========================================================
   SOLA CAFE / PROJECT MANIFEST

   NEW MODULAR ARCHITECTURE

   ONE PROJECT DEFINITION.

   RESPONSIBILITY
   - publication status
   - portfolio metadata
   - project stylesheet dependencies
   - canonical website source
   - canonical interactions
   - Responsive Lab metadata
   - lazy case-study entry point

   NOT RESPONSIBLE FOR
   - iframe creation
   - Hero layout
   - Work layout
   - Lab controls
   - viewer chrome
   - case-study presentation
========================================================= */


import {
  ProjectRegistry
} from "../../core/project-registry.js";


import {
  SOLA_CAFE_KEY,
  createSolaSite,
  initializeSolaSite
} from "./site.js";


/* =========================================================
   PROJECT DEFINITION
========================================================= */

export const solaProject =
  ProjectRegistry.register({

    /* -----------------------------------------------------
       IDENTITY
    ----------------------------------------------------- */

    key:
      SOLA_CAFE_KEY,

    status:
      "published",

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


    /* -----------------------------------------------------
       PORTFOLIO VISIBILITY
    ----------------------------------------------------- */

    featured:
      true,


    /* -----------------------------------------------------
       PROJECT-OWNED STYLES

       Only Sola's actual website stylesheet is required
       inside a Sola iframe.

       sola-case-study.css is deliberately excluded because
       it belongs to portfolio case-study presentation,
       not to the canonical Sola website.
    ----------------------------------------------------- */

    styles:
      [
        "css/sola.css?v=20260814-1"
      ],


    /* -----------------------------------------------------
       SELECTED WORK
    ----------------------------------------------------- */

    work:
      {

        pages:
          "Menu / Notebook / Gallery / Visit"

      },


    /* -----------------------------------------------------
       WEBSITE VIEWER
    ----------------------------------------------------- */

    viewer:
      {

        description:
          "SELF-INITIATED HOSPITALITY CONCEPT / WEBSITE PREVIEW",

        state:
          "VIEW-ONLY CONCEPT"

      },


    /* -----------------------------------------------------
       RESPONSIVE LAB

       The project describes its responsive states.

       The future generic lab.js only reads these values.
       It does not contain Sola-specific switch statements.
    ----------------------------------------------------- */

    lab:
      {

        enabled:
          true,

        minWidth:
          320,

        maxWidth:
          1100,

        defaultWidth:
          1000,

        intro:
          "Drag the slider and watch the Sola Cafe website reorganize its antique composition for desktop, tablet, and phone.",


        phone:
          {

            maxWidth:
              480,

            label:
              "Phone",

            text:
              "Phone: Sola becomes a compact vertical café journal while preserving its antique typography, photographs, menu, notebook, gallery, and visit information."

          },


        tablet:
          {

            maxWidth:
              760,

            label:
              "Tablet",

            text:
              "Tablet: Sola reduces the scale of its archival composition, reorganizes floating ephemera, and keeps the menu and collected photography readable."

          },


        desktop:
          {

            label:
              "Desktop",

            text:
              "Desktop: Sola uses its full antique tabletop composition with layered photography, paper details, ornamental typography, and wider editorial layouts."

          }

      },


    /* -----------------------------------------------------
       CANONICAL WEBSITE
    ----------------------------------------------------- */

    createSite:
      createSolaSite,


    /* -----------------------------------------------------
       CANONICAL INTERACTIONS
    ----------------------------------------------------- */

    initialize:
      initializeSolaSite,


    /* -----------------------------------------------------
       LAZY CASE STUDY

       case.js will be migrated later.

       This import does nothing until the generic case
       controller explicitly calls project.loadCase().
    ----------------------------------------------------- */

    loadCase:
      () =>
        import(
          "./case.js"
        )

  });
