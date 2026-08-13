/* =========================================================
   JEZIEL CAMARA / PORTFOLIO APPLICATION

   MODULAR ARCHITECTURE ENTRY POINT

   RESPONSIBILITY
   - import project manifests
   - start portfolio feature modules
   - expose application lifecycle
   - provide staging diagnostics
   - keep feature initialization isolated

   INITIAL FEATURES
   - Hero
   - Selected Work
   - Responsive Lab
   - Page Motion

   LAZY FEATURES
   - Website Viewer
   - Case Dialog
   - Project Case Studies

   IMPORTANT

   Viewer and case-study modules are intentionally absent
   from this initial dependency graph.

   Work dynamically imports them only when requested.
========================================================= */


/* =========================================================
   PROJECT MANIFESTS
========================================================= */

import "./projects/north/project.js";
import "./projects/sola/project.js";


/* =========================================================
   CORE
========================================================= */

import {
  ProjectRegistry
} from "./core/project-registry.js";


/* =========================================================
   FEATURES
========================================================= */

import {
  initHero
} from "./features/hero.js";


import {
  initWork
} from "./features/work.js?v=20260814-2";


import {
  initLab
} from "./features/lab.js";


import {
  initPageMotion
} from "./features/page-motion.js";


/* =========================================================
   APPLICATION STATE
========================================================= */

const featureControllers =
  new Map();


let started =
  false;


let startResult =
  null;


/* =========================================================
   FEATURE INITIALIZATION

   A failure inside one independent feature does not stop
   unrelated features from initializing.
========================================================= */

function startFeature(
  name,
  initializer
) {

  if (
    typeof initializer !==
      "function"
  ) {

    console.warn(
      `[App] Feature "${name}" has no initializer.`
    );


    return null;

  }


  try {

    const controller =
      initializer();


    if (controller) {

      featureControllers.set(
        name,
        controller
      );

    }


    return controller;

  } catch (error) {

    console.error(
      `[App] Feature "${name}" failed to initialize.`,
      error
    );


    return null;

  }

}


/* =========================================================
   APPLICATION SNAPSHOT
========================================================= */

function getAppState() {

  return Object.freeze({

    started,

    publishedProjects:
      ProjectRegistry
        .published()
        .map(
          (project) =>
            project.key
        ),

    featuredProjects:
      ProjectRegistry
        .featured()
        .map(
          (project) =>
            project.key
        ),

    activeFeatures:
      Array.from(
        featureControllers.keys()
      )

  });

}


/* =========================================================
   START APPLICATION
========================================================= */

export function startApp() {

  if (started) {

    return (
      startResult ||
      getAppState()
    );

  }


  started =
    true;


  document.documentElement
    .dataset
    .portfolioRuntime =
      "modular";


  document.documentElement
    .dataset
    .portfolioRuntimeState =
      "starting";


  const publishedProjects =
    ProjectRegistry.published();


  if (
    !publishedProjects.length
  ) {

    /*
     * Keep the page visible even if project registration is
     * unexpectedly empty.
     */

    document.body.classList.add(
      "ready"
    );


    document
      .querySelectorAll(
        ".reveal"
      )
      .forEach(
        (element) => {

          element.classList.add(
            "in-view"
          );

        }
      );


    document.documentElement
      .dataset
      .portfolioRuntimeState =
        "error";


    console.error(
      "[App] No published projects are registered."
    );


    startResult =
      getAppState();


    return startResult;

  }


  /* =======================================================
     HERO

     Above-the-fold canonical project frames.

     Hero itself does not own page-level dragging or
     parallax.
  ======================================================= */

  startFeature(
    "hero",
    initHero
  );


  /* =======================================================
     SELECTED WORK

     Cards are generated synchronously from published
     registry records.

     Preview iframes remain near-viewport lazy.

     Viewer and Case modules remain click-lazy.
  ======================================================= */

  startFeature(
    "work",
    initWork
  );


  /* =======================================================
     RESPONSIVE LAB

     Lab owns its slider, project frame, replay and
     responsive explanation.
  ======================================================= */

  startFeature(
    "lab",
    initLab
  );


  /* =======================================================
     PAGE MOTION

     Start this AFTER Work has generated its project cards.

     That allows its reveal system to discover the generated
     .project-slide elements without mutation observers,
     polling or cross-module readiness events.
  ======================================================= */

  startFeature(
    "page-motion",
    initPageMotion
  );


  /* =======================================================
     READY
  ======================================================= */

  document.documentElement
    .dataset
    .portfolioProjectCount =
      String(
        publishedProjects.length
      );


  document.documentElement
    .dataset
    .portfolioRuntimeState =
      "ready";


  startResult =
    getAppState();


  return startResult;

}


/* =========================================================
   STOP APPLICATION

   Controllers are destroyed in reverse initialization
   order:

   Page Motion
   Lab
   Work
   Hero
========================================================= */

export function stopApp() {

  if (!started) {

    return getAppState();

  }


  const controllers =
    Array.from(
      featureControllers.entries()
    )
      .reverse();


  controllers.forEach(
    ([
      name,
      controller
    ]) => {

      if (
        typeof controller?.destroy !==
          "function"
      ) {

        return;

      }


      try {

        controller.destroy();

      } catch (error) {

        console.warn(
          `[App] Feature "${name}" cleanup failed.`,
          error
        );

      }

    }
  );


  featureControllers.clear();


  started =
    false;


  startResult =
    null;


  delete document.documentElement
    .dataset
    .portfolioProjectCount;


  document.documentElement
    .dataset
    .portfolioRuntimeState =
      "stopped";


  return getAppState();

}


/* =========================================================
   BOOT

   Native module scripts are deferred automatically.

   The readyState guard keeps this entry point safe if the
   module later moves into <head>.
========================================================= */

function boot() {

  try {

    startApp();

  } catch (error) {

    document.body.classList.add(
      "ready"
    );


    document
      .querySelectorAll(
        ".reveal"
      )
      .forEach(
        (element) => {

          element.classList.add(
            "in-view"
          );

        }
      );


    document.documentElement
      .dataset
      .portfolioRuntimeState =
        "error";


    console.error(
      "[App] Portfolio runtime could not start.",
      error
    );

  }

}


if (
  document.readyState ===
    "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    boot,
    {
      once:
        true
    }
  );

} else {

  boot();

}


/* =========================================================
   PUBLIC DIAGNOSTIC API

   ES-module exports only.

   No runtime API is attached to window.
========================================================= */

export {
  getAppState
};
