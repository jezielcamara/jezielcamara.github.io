/* =========================================================
   SOLA CAFE / CASE STUDY MODULE

   LAZY PROJECT PRESENTATION

   RESPONSIBILITY
   - Sola-specific case metadata
   - Sola-specific case narrative
   - Sola editorial case Hero
   - Sola live website frame
   - Sola case frame geometry
   - Sola case lifecycle

   NOT RESPONSIBLE FOR
   - shared dialog behavior
   - project registration
   - Sola website HTML
   - Sola website interactions

   WEBSITE SOURCE

   ProjectFrame
        ↓
   registered "sola" project
        ↓
   same canonical Sola Cafe DOM
========================================================= */


import {
  ProjectFrame
} from "../../core/project-frame.js";


/* =========================================================
   CASE CONTRACT
========================================================= */

export const caseStyles =
  Object.freeze([
    "css/sola-case-study.css?v=20260814-2"
  ]);


export const caseMeta =
  Object.freeze({

    modeClass:
      "sola-active",

    kicker:
      "SELF-INITIATED / HOSPITALITY",

    summary:
      "A fictional neighborhood cafe built as a parchment-and-ink editorial experience with original engraved artwork, expressive typography, menus, field notes, and practical visit details.",

    goal:
      "Create a memorable cafe identity while keeping menu, hours, and visit information practical on every screen.",

    pages:
      "Story / Menu / Field Notes / Visit"

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
   HERO PREVIEW
========================================================= */

function createPreviewMarkup(
  project
) {

  return `
    <div class="sola-case-preview">

      <div class="sola-case-preview-paper">

        <div
          class="sola-case-preview-ornament"
          aria-hidden="true"
        >
          ❦
        </div>


        <div class="sola-case-preview-browser">

          <div class="sola-case-preview-top">

            <span>
              CONCEPT / ${project.index}
            </span>

            <span>
              ${project.url}
            </span>

          </div>


          <div
            class="sola-case-preview-host"
            data-sola-case-preview-host
            aria-label="${project.name} website preview"
          ></div>

        </div>


        <div
          class="sola-case-preview-note"
          aria-hidden="true"
        >
          coffee / food<br>
          a room to stay
        </div>

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
    <div class="sola-case-study">


      <section class="sola-case-brief">

        <span class="sola-case-label">
          01 / THE IDEA
        </span>


        <div class="sola-case-brief-main">

          <span class="sola-case-kicker">
            SELF-INITIATED CONCEPT / HOSPITALITY
          </span>

          <h3>
            Build a cafe
            website that reads
            like an editorial object.
          </h3>

          <p>
            Sola is a fictional neighborhood cafe shaped
            around Metro Manila mornings. The redesign uses
            a disciplined editorial grid, high-contrast
            typography, parchment surfaces, and original
            engraved coffee illustrations to make the brand
            feel considered without resembling the portfolio.
          </p>

        </div>


        <div class="sola-case-facts">

          <div>
            <span>BUSINESS</span>
            <strong>Neighborhood café</strong>
          </div>

          <div>
            <span>AUDIENCE</span>
            <strong>Coffee, breakfast and café visitors</strong>
          </div>

          <div>
            <span>PRIMARY GOAL</span>
            <strong>Make the café memorable and easy to visit</strong>
          </div>

          <div>
            <span>ART DIRECTION</span>
            <strong>Editorial modernism / engraved cafe studies</strong>
          </div>

          <div>
            <span>SCOPE</span>
            <strong>Story / Menu / Field Notes / Visit</strong>
          </div>

          <div>
            <span>ROLE</span>
            <strong>Strategy / Design / Front-end</strong>
          </div>

        </div>

      </section>


      <section class="sola-case-references">

        <div class="sola-case-reference-heading">

          <span class="sola-case-label">
            02 / VISUAL LANGUAGE
          </span>

          <h3>
            A quiet world
            drawn in ink
            and paper.
          </h3>

          <p>
            The reference direction is intentionally
            different from both the portfolio and a typical
            hospitality template. Sola treats the screen as
            a sequence of editorial plates: type, rules,
            negative space, and illustration share the page.
          </p>

        </div>


        <div class="sola-case-reference-grid">

          <article>

            <span>01</span>

            <strong>
              SCALE
            </strong>

            <p>
              Oversized display typography meets a single
              diagonal object study, creating an opening that
              feels like a magazine cover rather than a
              conventional conversion-led Hero.
            </p>

          </article>


          <article>

            <span>02</span>

            <strong>
              PAPER
            </strong>

            <p>
              Parchment surfaces, precise hairline rules,
              warm ivory, and near-black ink create a calm
              print-like field without decorative clutter.
            </p>

          </article>


          <article>

            <span>03</span>

            <strong>
              ENGRAVING
            </strong>

            <p>
              Original copperplate-style illustrations turn
              coffee cultivation and daily brewing into a
              visual language that belongs specifically to
              the Sola concept.
            </p>

          </article>

        </div>

      </section>


      <section class="sola-case-decisions">

        <span class="sola-case-label">
          03 / DESIGN DECISIONS
        </span>


        <div class="sola-case-decisions-list">

          <article class="sola-case-decision">

            <span>01</span>

            <h4>
              Lead with atmosphere,
              then reveal utility.
            </h4>

            <p>
              North Home uses the clarity of a conventional
              service-business Hero. Sola uses editorial
              scale, a sculptural coffee object, and a drawn
              landscape before unfolding practical content.
            </p>

          </article>


          <article class="sola-case-decision">

            <span>02</span>

            <h4>
              Give illustration
              a real job.
            </h4>

            <p>
              The engravings establish origin, material, and
              ritual. Different crops let the same original
              artwork become panorama, product study, and
              sectional texture without feeling repetitive.
            </p>

          </article>


          <article class="sola-case-decision">

            <span>03</span>

            <h4>
              Make the menu
              an editorial spread.
            </h4>

            <p>
              Category switching stays clear and accessible,
              while ruled rows and typographic contrast make
              the menu feel like a composed print spread
              rather than a collection of UI cards.
            </p>

          </article>


          <article class="sola-case-decision">

            <span>04</span>

            <h4>
              Let mobile become
              a pocket journal.
            </h4>

            <p>
              The same canonical website reorganizes its
              wide modular grid into a deliberate sequence
              of typography, engravings, menu entries, field
              notes, and practical visit information.
            </p>

          </article>

        </div>

      </section>


      <section class="sola-case-system">

        <div class="sola-case-system-heading">

          <span class="sola-case-label">
            04 / BRAND SYSTEM
          </span>

          <h3>
            Warm paper.
            Near-black ink.
            Nothing
            unnecessary.
          </h3>

        </div>


        <div class="sola-case-palette">

          <div
            class="sola-case-swatch"
            style="--swatch:#E9DFCD"
          >
            <span>PARCHMENT</span>
            <strong>#E9DFCD</strong>
          </div>


          <div
            class="sola-case-swatch"
            style="--swatch:#F2EADC"
          >
            <span>WARM IVORY</span>
            <strong>#F2EADC</strong>
          </div>


          <div
            class="sola-case-swatch"
            style="--swatch:#15120E"
          >
            <span>DARK INK</span>
            <strong>#15120E</strong>
          </div>


          <div
            class="sola-case-swatch"
            style="--swatch:#50483D"
          >
            <span>SOFT INK</span>
            <strong>#50483D</strong>
          </div>


          <div
            class="sola-case-swatch"
            style="--swatch:#D8C9B1"
          >
            <span>PAPER DEEP</span>
            <strong>#D8C9B1</strong>
          </div>


          <div
            class="sola-case-swatch"
            style="--swatch:#8B7A63"
          >
            <span>SEPIA RULE</span>
            <strong>#8B7A63</strong>
          </div>

        </div>


        <div class="sola-case-type-sample">

          <span>
            TYPOGRAPHY
          </span>

          <strong>
            The quiet cup.
            The long morning.
          </strong>

          <p>
            Bodoni Moda carries the expressive display voice.
            Its dramatic stroke contrast is balanced by DM
            Sans for navigation, captions, and functional
            labels across every viewport.
          </p>

        </div>

      </section>


      <section class="sola-case-live">

        <div class="sola-case-live-heading">

          <div>

            <span class="sola-case-label">
              05 / LIVE FRONT-END
            </span>

            <h3>
              One café website.
              Running inside
              every surface.
            </h3>

          </div>


          <p>
            This interactive frame uses the exact canonical
            Sola project source used throughout the
            portfolio. Its responsive layout is determined
            by the website viewport itself rather than by
            the surrounding case-study presentation.
          </p>

        </div>


        <div class="sola-case-browser">

          <div class="sola-case-browserbar">

            <div
              class="sola-case-browser-dots"
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
            class="sola-case-live-project-host"
            data-sola-live-project-host
            aria-label="Interactive ${project.name} website"
          ></div>

        </div>

      </section>


      <section class="sola-case-outcome">

        <span class="sola-case-label">
          06 / WHAT THIS PROJECT SHOWS
        </span>

        <h3>
          Same developer.
          Completely different
          visual grammar.
        </h3>


        <div class="sola-case-outcome-grid">

          <article>

            <strong>
              ART DIRECTION
            </strong>

            <span>
              A specific historical reference language is
              translated into an original brand world
              rather than reduced to generic vintage colors.
            </span>

          </article>


          <article>

            <strong>
              RESPONSIVE DESIGN
            </strong>

            <span>
              The asymmetrical desktop grid reorganizes into
              readable sequential mobile layouts from the
              same canonical DOM.
            </span>

          </article>


          <article>

            <strong>
              FRONT-END
            </strong>

            <span>
              Menu interaction, navigation, responsive
              behavior and presentation all originate from
              one registered project implementation.
            </span>

          </article>

        </div>

      </section>

    </div>
  `;

}


/* =========================================================
   INITIALIZE CASE
========================================================= */

export function createProjectCase({
  project,
  dialog,
  elements
}) {

  if (
    !project ||
    project.key !==
      "sola"
  ) {

    throw new Error(
      "Sola case module received the wrong project."
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
      "[data-sola-case-preview-host]"
    );


  const liveProjectHost =
    elements.bodyHost.querySelector(
      "[data-sola-live-project-host]"
    );


  if (
    !previewProjectHost ||
    !liveProjectHost
  ) {

    throw new Error(
      "Sola case mount targets were not created."
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
    "#f3e7cc";


  previewFrame =
    ProjectFrame.mount(
      project.key,
      previewProjectHost,
      {

        instance:
          "sola-case-preview",

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
    "sola-case-project-frame"
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
    "#f3e7cc";


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
            "sola-case-live",

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
      "sola-case-live-frame"
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


    liveFrame.style.transformOrigin =
      "top left";


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
