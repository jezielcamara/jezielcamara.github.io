/* =========================================================
   NORTH HOME / PROJECT MANIFEST

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
  NORTH_HOME_KEY,
  createNorthHomeSite,
  initializeNorthHomeSite
} from "./site.js";


/* =========================================================
   PROJECT DEFINITION
========================================================= */

export const northProject =
  ProjectRegistry.register({

    /* -----------------------------------------------------
       IDENTITY
    ----------------------------------------------------- */

    key:
      NORTH_HOME_KEY,

    status:
      "published",

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


    /* -----------------------------------------------------
       PORTFOLIO VISIBILITY
    ----------------------------------------------------- */

    featured:
      true,


    /* -----------------------------------------------------
       PROJECT-OWNED STYLES

       TEMPORARY DURING THE ARCHITECTURE MIGRATION.

       North currently uses:

       css/north-home.css
       css/north-home-ph.css

       These remain separate for now so this migration does
       not alter North's approved visual design.

       They can be consolidated later without changing the
       project manifest or frame system.
    ----------------------------------------------------- */

    styles:
      [
        "css/north-home.css",
        "css/north-home-ph.css"
      ],


    /* -----------------------------------------------------
       SELECTED WORK
    ----------------------------------------------------- */

    work:
      {

        pages:
          "Services / About / Contact"

      },


    /* -----------------------------------------------------
       WEBSITE VIEWER
    ----------------------------------------------------- */

    viewer:
      {

        description:
          "SELF-INITIATED CONCEPT / WEBSITE PREVIEW",

        state:
          "VIEW-ONLY CONCEPT"

      },


    /* -----------------------------------------------------
       RESPONSIVE LAB

       Responsive descriptions belong to the project.

       lab.js will read this information instead of
       maintaining project-specific switch statements.

       These thresholds match the current production Lab:
       - 320 minimum
       - 480 phone
       - 760 tablet
       - 1100 maximum
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
          "Drag the slider and watch the North Home website reorganize itself for desktop, tablet, and phone.",


        phone:
          {

            maxWidth:
              480,

            label:
              "Phone",

            text:
              "Phone: North Home uses its real mobile layout with simplified navigation, stacked services, and touch-friendly content."

          },


        tablet:
          {

            maxWidth:
              760,

            label:
              "Tablet",

            text:
              "Tablet: North Home uses its real responsive layout with tighter spacing, reduced navigation, and reorganized sections."

          },


        desktop:
          {

            label:
              "Desktop",

            text:
              "Desktop: North Home uses its full layout with large residential photography, wider content groups, and complete navigation."

          }

      },


    /* -----------------------------------------------------
       CANONICAL WEBSITE
    ----------------------------------------------------- */

    createSite:
      createNorthHomeSite,


    /* -----------------------------------------------------
       CANONICAL INTERACTIONS
    ----------------------------------------------------- */

    initialize:
      initializeNorthHomeSite,


    /* -----------------------------------------------------
       LAZY CASE STUDY

       case.js will be migrated later.

       Dynamic import means this file is not requested until
       the visitor actually opens the North case study.
    ----------------------------------------------------- */

    loadCase:
      () =>
        import(
          "./case.js"
        )

  });
