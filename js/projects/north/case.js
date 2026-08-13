/* =========================================================
   NORTH HOME / CASE STUDY MODULE

   LAZY PROJECT PRESENTATION

   RESPONSIBILITY
   - North-specific case metadata
   - North-specific case narrative
   - North case Hero preview
   - North live website frame
   - North case frame geometry
   - North case lifecycle

   NOT RESPONSIBLE FOR
   - shared dialog behavior
   - project registration
   - North website HTML
   - North website interactions

   WEBSITE SOURCE

   ProjectFrame
        ↓
   registered "north" project
        ↓
   same canonical North Home DOM
========================================================= */


import {
  ProjectFrame
} from "../../core/project-frame.js";


/* =========================================================
   CASE CONTRACT
========================================================= */

export const caseStyles =
  Object.freeze([
    "css/north-home.css"
  ]);


export const caseMeta =
  Object.freeze({

    modeClass:
      "north-active",

    kicker:
      "SELF-INITIATED / RESIDENTIAL SERVICES",

    summary:
      "A premium residential-services concept designed to make home maintenance feel clear, trustworthy and appropriate for a modern home.",

    goal:
      "Explain the services quickly, create residential trust, and make requesting help feel straightforward.",

    pages:
      "Home / Services / About / Contact"

  });


/* =========================================================
   SETTINGS
========================================================= */

const PREVIEW_WIDTH =
  1200;


const PREVIEW_HEIGHT =
  760;


const LIVE_WIDTH =
  1200;


const LIVE_HEIGHT =
  820;


const LIVE_ROOT_MARGIN =
  "600px 0px 600px 0px";


/* =========================================================
   HERO PREVIEW MARKUP
========================================================= */

function createPreviewMarkup(
  project
) {

  return `
    <div class="north-case-preview">

      <div class="north-case-preview-browser">

        <div class="north-case-preview-top">

          <span>
            CONCEPT / ${project.index}
          </span>

          <span>
            ${project.url}
          </span>

        </div>


        <div
          class="north-case-canonical-host"
          data-north-case-preview-host
          aria-label="${project.name} website preview"
        ></div>

      </div>

    </div>
  `;

}


/* =========================================================
   CASE NARRATIVE
========================================================= */

function createCaseMarkup(
  project
) {

  return `
    <div class="north-case-study">


      <section class="nh-case-brief">

        <span class="nh-case-label">
          01 / THE BRIEF
        </span>


        <div class="nh-case-brief-main">

          <span>
            SELF-INITIATED CONCEPT / RESIDENTIAL SERVICES
          </span>

          <h3>
            Make home services
            feel as considered
            as the home itself.
          </h3>

          <p>
            North Home is a fictional residential-services
            business for homeowners, condo residents and
            small property managers across Metro Manila.
            The concept focuses on clarity, trust and a
            premium residential experience rather than the
            visual language of a traditional contractor.
          </p>

        </div>


        <div class="nh-case-facts">

          <div>
            <span>BUSINESS</span>
            <strong>Residential home services</strong>
          </div>

          <div>
            <span>AUDIENCE</span>
            <strong>Homeowners + property managers</strong>
          </div>

          <div>
            <span>PRIMARY GOAL</span>
            <strong>Generate quote inquiries</strong>
          </div>

          <div>
            <span>POSITIONING</span>
            <strong>Premium but approachable</strong>
          </div>

          <div>
            <span>SCOPE</span>
            <strong>Home / Services / About / Contact</strong>
          </div>

          <div>
            <span>ROLE</span>
            <strong>Strategy / Design / Front-end</strong>
          </div>

        </div>

      </section>


      <section class="nh-case-decisions">

        <span class="nh-case-label">
          02 / DESIGN DIRECTION
        </span>


        <div class="nh-case-decisions-list">

          <article class="nh-case-decision">

            <span>01</span>

            <h4>
              Residential,
              not industrial.
            </h4>

            <p>
              The visual system uses generous imagery,
              soft surfaces, restrained typography and
              warm neutral colors so the business feels
              appropriate inside a well-designed home.
            </p>

          </article>


          <article class="nh-case-decision">

            <span>02</span>

            <h4>
              Show the environment,
              not just the work.
            </h4>

            <p>
              Photography takes the lead. Services are
              presented through the homes customers care
              about rather than a page filled with tools,
              vans and construction graphics.
            </p>

          </article>


          <article class="nh-case-decision">

            <span>03</span>

            <h4>
              Make every service
              easy to understand.
            </h4>

            <p>
              Repairs, maintenance and installation remain
              clear choices. Visitors can switch between
              them without navigating away from the page.
            </p>

          </article>


          <article class="nh-case-decision">

            <span>04</span>

            <h4>
              Keep one clear
              conversion path.
            </h4>

            <p>
              Requesting a quote stays visible throughout
              the experience without turning every section
              into another oversized call-to-action.
            </p>

          </article>

        </div>

      </section>


      <section class="nh-live">

        <div class="nh-live-heading">

          <div>

            <span class="nh-case-label">
              03 / LIVE FRONT-END
            </span>

            <h3>
              A complete website
              inside the portfolio.
            </h3>

          </div>


          <p>
            The concept remains entirely front-end.
            Visitors can navigate the page, switch
            services and test the inquiry interaction
            without leaving the portfolio.
          </p>

        </div>


        <div class="nh-browser">

          <div class="nh-browserbar">

            <div
              class="nh-browser-dots"
              aria-hidden="true"
            >
              <i></i>
              <i></i>
              <i></i>
            </div>


            <span>
              ${project.url}
            </span>


            <strong>
              INTERACTIVE CONCEPT
            </strong>

          </div>


          <div
            class="nh-live-project-host"
            data-north-live-project-host
            aria-label="Interactive ${project.name} website"
          ></div>

        </div>

      </section>


      <section class="nh-case-outcome">

        <span class="nh-case-label">
          04 / WHAT THIS PROJECT SHOWS
        </span>

        <h3>
          One portfolio.
          A completely different
          visual identity.
        </h3>


        <div class="nh-case-outcome-grid">

          <div class="nh-case-outcome-item">

            <strong>
              POSITIONING
            </strong>

            <span>
              The business is presented
              as thoughtful residential care,
              not a generic contractor.
            </span>

          </div>


          <div class="nh-case-outcome-item">

            <strong>
              DESIGN
            </strong>

            <span>
              Photography, serif typography
              and soft residential colors create
              a visual language distinct from
              the portfolio itself.
            </span>

          </div>


          <div class="nh-case-outcome-item">

            <strong>
              FRONT-END
            </strong>

            <span>
              Responsive layouts, service
              switching, smooth navigation
              and an inquiry demonstration
              complete the concept.
            </span>

          </div>

        </div>

      </section>

    </div>
  `;

}


/* =========================================================
   CASE INITIALIZATION
========================================================= */

export function createProjectCase({
  project,
  dialog,
  elements
}) {

  if (
    !project ||
    project.key !==
      "north"
  ) {

    throw new Error(
      "North case module received the wrong project."
    );

  }


  const controller =
    new AbortController();


  const {
    signal
  } =
    controller;


  let destroyed =
    false;


  let previewFrame =
    null;


  let liveFrame =
    null;


  let previewResizeObserver =
    null;


  let liveObserver =
    null;


  let fitFrame =
    0;


  elements.previewHost.innerHTML =
    createPreviewMarkup(
      project
    );


  elements.bodyHost.innerHTML =
    createCaseMarkup(
      project
    );


  const previewProjectHost =
    elements.previewHost.querySelector(
      "[data-north-case-preview-host]"
    );


  const liveProjectHost =
    elements.bodyHost.querySelector(
      "[data-north-live-project-host]"
    );


  if (
    !previewProjectHost ||
    !liveProjectHost
  ) {

    throw new Error(
      "North case mount targets were not created."
    );

  }


  /* =======================================================
     HERO PREVIEW
  ======================================================= */

  previewProjectHost.style.position =
    "relative";


  previewProjectHost.style.width =
    "100%";


  previewProjectHost.style.aspectRatio =
    "16 / 10";


  previewProjectHost.style.minWidth =
    "0";


  previewProjectHost.style.overflow =
    "hidden";


  previewProjectHost.style.background =
    "#ffffff";


  previewFrame =
    ProjectFrame.mount(
      project.key,
      previewProjectHost,
      {

        instance:
          "north-case-preview",

        viewport:
          "desktop",

        width:
          PREVIEW_WIDTH,

        height:
          PREVIEW_HEIGHT,

        interactive:
          false,

        loading:
          "eager",

        label:
          `${project.name} case-study website preview`

      }
    );


  previewFrame.classList.add(
    "north-case-project-frame"
  );


  previewProjectHost.dataset
    .canonicalCasePreview =
      "true";


  function fitPreview() {

    if (
      destroyed ||
      !previewFrame
    ) {

      return;

    }


    const availableWidth =
      previewProjectHost.clientWidth;


    if (!availableWidth) {

      return;

    }


    const scale =
      Math.min(
        1,
        availableWidth /
        PREVIEW_WIDTH
      );


    previewFrame.style.position =
      "absolute";


    previewFrame.style.top =
      "0";


    previewFrame.style.left =
      "0";


    previewFrame.style.width =
      `${PREVIEW_WIDTH}px`;


    previewFrame.style.minWidth =
      `${PREVIEW_WIDTH}px`;


    previewFrame.style.height =
      `${PREVIEW_HEIGHT}px`;


    previewFrame.style.maxWidth =
      "none";


    previewFrame.style.margin =
      "0";


    previewFrame.style.transformOrigin =
      "top left";


    previewFrame.style.transform =
      `scale(${scale})`;


    previewFrame.style.pointerEvents =
      "none";


    previewProjectHost.dataset.previewScale =
      scale.toFixed(
        4
      );

  }


  function schedulePreviewFit() {

    if (
      destroyed ||
      fitFrame
    ) {

      return;

    }


    fitFrame =
      window.requestAnimationFrame(
        () => {

          fitFrame =
            0;


          fitPreview();

        }
      );

  }


  if (
    "ResizeObserver" in
      window
  ) {

    previewResizeObserver =
      new ResizeObserver(
        schedulePreviewFit
      );


    previewResizeObserver.observe(
      previewProjectHost
    );

  } else {

    window.addEventListener(
      "resize",
      schedulePreviewFit,
      {
        passive:
          true,
        signal
      }
    );

  }


  schedulePreviewFit();


  /* =======================================================
     LIVE WEBSITE
  ======================================================= */

  liveProjectHost.style.position =
    "relative";


  liveProjectHost.style.width =
    "100%";


  liveProjectHost.style.height =
    "clamp(520px, 72vh, 820px)";


  liveProjectHost.style.minWidth =
    "0";


  liveProjectHost.style.overflow =
    "hidden";


  liveProjectHost.style.background =
    "#fbfaf7";


  function mountLiveWebsite() {

    if (
      destroyed ||
      liveFrame
    ) {

      return liveFrame;

    }


    liveFrame =
      ProjectFrame.mount(
        project.key,
        liveProjectHost,
        {

          instance:
            "north-case-live",

          viewport:
            "responsive",

          width:
            LIVE_WIDTH,

          height:
            LIVE_HEIGHT,

          interactive:
            true,

          loading:
            "lazy",

          label:
            `${project.name} interactive case-study website`

        }
      );


    liveFrame.classList.add(
      "north-case-live-frame"
    );


    liveFrame.style.position =
      "absolute";


    liveFrame.style.inset =
      "0";


    liveFrame.style.width =
      "100%";


    liveFrame.style.height =
      "100%";


    liveFrame.style.minWidth =
      "0";


    liveFrame.style.maxWidth =
      "100%";


    liveFrame.style.margin =
      "0";


    liveFrame.style.transform =
      "none";


    liveFrame.style.pointerEvents =
      "auto";


    liveProjectHost.dataset
      .canonicalLiveProject =
        "true";


    ProjectFrame
      .whenReady(
        liveFrame
      )
      .then(
        ({
          error
        }) => {

          if (
            destroyed ||
            !liveFrame
          ) {

            return;

          }


          liveProjectHost.dataset
            .projectFrameState =
              error
                ? "error"
                : "ready";

        }
      );


    return liveFrame;

  }


  if (
    "IntersectionObserver" in
      window
  ) {

    liveObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          if (
            !entries.some(
              (entry) =>
                entry.isIntersecting
            )
          ) {

            return;

          }


          observer.disconnect();


          liveObserver =
            null;


          mountLiveWebsite();

        },
        {

          root:
            dialog,

          rootMargin:
            LIVE_ROOT_MARGIN,

          threshold:
            0

        }
      );


    liveObserver.observe(
      liveProjectHost
    );

  } else {

    mountLiveWebsite();

  }


  /* =======================================================
     DESTROY
  ======================================================= */

  function destroy() {

    if (destroyed) {

      return;

    }


    destroyed =
      true;


    controller.abort();


    previewResizeObserver?.disconnect();


    previewResizeObserver =
      null;


    liveObserver?.disconnect();


    liveObserver =
      null;


    if (fitFrame) {

      window.cancelAnimationFrame(
        fitFrame
      );


      fitFrame =
        0;

    }


    if (previewFrame) {

      ProjectFrame.unmount(
        previewProjectHost
      );


      previewFrame =
        null;

    }


    if (liveFrame) {

      ProjectFrame.unmount(
        liveProjectHost
      );


      liveFrame =
        null;

    }


    delete previewProjectHost.dataset
      .canonicalCasePreview;


    delete previewProjectHost.dataset
      .previewScale;


    delete liveProjectHost.dataset
      .canonicalLiveProject;


    delete liveProjectHost.dataset
      .projectFrameState;

  }


  return Object.freeze({

    project,

    mountLiveWebsite,

    destroy

  });

}
