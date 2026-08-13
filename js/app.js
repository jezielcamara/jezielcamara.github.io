/* =========================================================
   JEZIEL CAMARA / PORTFOLIO APPLICATION

   MODULAR ARCHITECTURE ENTRY POINT

   RESPONSIBILITY
   - import project manifests
   - start portfolio feature modules
   - expose application lifecycle
   - provide staging diagnostics
   - keep feature initialization isolated

   CURRENT FEATURES
   - Hero
   - Selected Work
   - Responsive Lab

   FUTURE FEATURES
   - Viewer
   - Case dialog
   - Page motion

   IMPORTANT

   Project registration happens through native ES-module
   imports before any feature initialization begins.

   There is no:
   - requestAnimationFrame dependency polling
   - global ready event
   - window.PortfolioProjects dependency
   - script-order retry system
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
} from "./features/work.js";


import {
  initLab
} from "./features/lab.js";


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
   TEMPORARY VISIBILITY BRIDGE

   page-motion.js will replace this later.
========================================================= */

function activateCurrentVisualState() {

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

}


/* =========================================================
   FEATURE INITIALIZATION
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


  activateCurrentVisualState();


  const publishedProjects =
    ProjectRegistry.published();


  if (
    !publishedProjects.length
  ) {

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
  ======================================================= */

  startFeature(
    "hero",
    initHero
  );


  /* =======================================================
     SELECTED WORK
  ======================================================= */

  startFeature(
    "work",
    initWork
  );


  /* =======================================================
     RESPONSIVE LAB
  ======================================================= */

  startFeature(
    "lab",
    initLab
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
========================================================= */

function boot() {

  try {

    startApp();

  } catch (error) {

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
========================================================= */

export {
  getAppState
};
