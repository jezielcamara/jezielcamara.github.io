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
} from "./site.js?v=20260814-2";


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
        "css/sola.css?v=20260814-2"
      ],


    /* -----------------------------------------------------
       SELECTED WORK
    ----------------------------------------------------- */

    work:
      {

        pages:
          "Story / Menu / Field Notes / Visit"

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
          "Drag the slider and watch Sola's editorial grid reorganize its typography, engraved artwork, menu, and visit details for desktop, tablet, and phone.",


        phone:
          {

            maxWidth:
              480,

            label:
              "Phone",

            text:
              "Phone: Sola becomes a compact vertical cafe journal with large display type, stacked engraved artwork, menu categories, field notes, and visit information."

          },


        tablet:
          {

            maxWidth:
              760,

            label:
              "Tablet",

            text:
              "Tablet: Sola turns its four-column editorial system into paired panels while keeping the engravings, menu, and field notes readable."

          },


        desktop:
          {

            label:
              "Desktop",

            text:
              "Desktop: Sola uses the full parchment-and-ink editorial system with oversized typography, engraved cafe artwork, and an asymmetrical modular grid."

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

       The case study is loaded only when requested.

       This import does nothing until the generic case
       controller explicitly calls project.loadCase().
    ----------------------------------------------------- */

    loadCase:
      () =>
        import(
          "./case.js?v=20260814-2"
        )

  });
