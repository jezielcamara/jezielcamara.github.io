/* =========================================================
   NORTH HOME / CANONICAL WEBSITE MODULE

   NEW MODULAR ARCHITECTURE

   ONE PROJECT.
   ONE WEBSITE SOURCE.

   RESPONSIBILITY
   - North Home canonical website DOM
   - North Home website interactions
   - North Home website lifecycle

   NOT RESPONSIBLE FOR
   - portfolio Hero placement
   - Selected Work placement
   - Responsive Lab placement
   - project iframe creation
   - viewer chrome
   - case-study presentation
   - project registration

   IMPORTANT

   The website itself is unchanged from the current
   production North Home implementation.

   The architectural changes are:
   - native ES module exports
   - no window.NorthHomeSite global
   - no factory-ready CustomEvent
   - no registration polling
   - explicit cleanup lifecycle
========================================================= */


/* =========================================================
   PROJECT IDENTITY
========================================================= */

export const NORTH_HOME_KEY =
  "north";


/* =========================================================
   SERVICE DATA

   Static project data is created once per module rather
   than once for every interactive frame.
========================================================= */

const SERVICE_DATA =
  Object.freeze({

    repairs:
      Object.freeze({

        index:
          "SERVICE / 01",

        title:
          "Small problems should stay small.",

        description:
          "General residential repairs for everyday issues that need attention before they become larger problems.",

        items:
          Object.freeze([
            "Walls, surfaces and small repairs",
            "Doors, fittings and fixtures",
            "General residential troubleshooting"
          ])

      }),


    maintenance:
      Object.freeze({

        index:
          "SERVICE / 02",

        title:
          "Care before something goes wrong.",

        description:
          "Preventive and recurring maintenance for homes, condos and rental properties that need consistent attention.",

        items:
          Object.freeze([
            "Routine residential checks",
            "Preventive fixes and adjustments",
            "Recurring property support"
          ])

      }),


    installation:
      Object.freeze({

        index:
          "SERVICE / 03",

        title:
          "The finishing details matter.",

        description:
          "Installation for fixtures, fittings and practical home upgrades where careful placement and finish matter.",

        items:
          Object.freeze([
            "Fixtures and fittings",
            "Shelving and storage additions",
            "Small residential upgrades"
          ])

      })

  });


/* =========================================================
   CANONICAL WEBSITE MARKUP

   This is the North Home website.

   Portfolio frames, scaling, browser chrome and case-study
   presentation do not belong here.
========================================================= */

const SITE_MARKUP = `
  <div
    class="nh-site north-project-source"
    data-canonical-project="north"
  >


    <!-- =================================================
         HEADER
    ================================================== -->

    <header class="nh-header">

      <a
        class="nh-logo"
        href="#nh-home"
      >
        North Home<span>.</span>
      </a>


      <nav
        aria-label="North Home navigation"
      >

        <a href="#nh-services">
          Services
        </a>

        <a href="#nh-process">
          Process
        </a>

        <a href="#nh-work">
          Work
        </a>

        <a href="#nh-area">
          Areas
        </a>

      </nav>


      <a
        class="nh-header-cta"
        href="#nh-quote"
      >
        Request a quote
      </a>

    </header>


    <!-- =================================================
         HERO
    ================================================== -->

    <section
      class="nh-hero"
      id="nh-home"
      data-nh-reveal
    >

      <div
        class="nh-hero-media"
        role="img"
        aria-label="Contemporary residential home"
      >


        <div class="nh-hero-trust">

          <strong>
            HOME CARE
          </strong>

          <span>
            Metro Manila / Concept service
          </span>

        </div>


        <div class="nh-hero-copy">


          <div class="nh-eyebrow">

            <span>
              RESIDENTIAL SERVICES
            </span>

            <span>
              METRO MANILA
            </span>

          </div>


          <h1>
            CARE FOR<br>
            THE HOME<br>
            YOU LIVE IN.
          </h1>


          <p>
            Residential repairs, preventive
            maintenance and installation for
            homeowners who want the work handled
            clearly and properly.
          </p>


          <div class="nh-hero-actions">

            <a href="#nh-quote">

              Request a quote

              <span>
                ↗
              </span>

            </a>


            <a href="#nh-services">

              Explore services

              <span>
                ↓
              </span>

            </a>

          </div>

        </div>

      </div>

    </section>


    <!-- =================================================
         TRUST STRIP
    ================================================== -->

    <div class="nh-trust-strip">


      <div class="nh-trust-item">

        <strong>
          Repairs
        </strong>

        <span>
          Practical fixes for the
          things that need attention.
        </span>

      </div>


      <div class="nh-trust-item">

        <strong>
          Maintenance
        </strong>

        <span>
          Preventive care before
          small issues become expensive.
        </span>

      </div>


      <div class="nh-trust-item">

        <strong>
          Installation
        </strong>

        <span>
          Fixtures, fittings and
          thoughtful home upgrades.
        </span>

      </div>


      <div class="nh-trust-item">

        <strong>
          Metro Manila
        </strong>

        <span>
          Selected residential areas
          across the metro.
        </span>

      </div>

    </div>


    <!-- =================================================
         SERVICES
    ================================================== -->

    <section
      class="nh-section nh-services"
      id="nh-services"
      data-nh-reveal
    >


      <div class="nh-section-heading">

        <span>
          01 / SERVICES
        </span>

        <h2>
          START WITH
          WHAT NEEDS
          ATTENTION.
        </h2>

        <p>
          Pick the closest match.
          If the problem is unclear,
          describe what is happening
          and North can help identify
          the next step.
        </p>

      </div>


      <div class="nh-services-layout">


        <div
          class="nh-service-list"
          role="tablist"
          aria-label="North Home services"
        >


          <button
            class="nh-service-tab active"
            type="button"
            role="tab"
            data-nh-service="repairs"
            aria-selected="true"
          >

            <span>
              01
            </span>

            <strong>
              Repairs
            </strong>

            <i>
              →
            </i>

          </button>


          <button
            class="nh-service-tab"
            type="button"
            role="tab"
            data-nh-service="maintenance"
            aria-selected="false"
          >

            <span>
              02
            </span>

            <strong>
              Maintenance
            </strong>

            <i>
              →
            </i>

          </button>


          <button
            class="nh-service-tab"
            type="button"
            role="tab"
            data-nh-service="installation"
            aria-selected="false"
          >

            <span>
              03
            </span>

            <strong>
              Installation
            </strong>

            <i>
              →
            </i>

          </button>

        </div>


        <div class="nh-service-feature">


          <div
            class="nh-service-photo"
            id="nh-service-photo"
            data-service="repairs"
            role="img"
            aria-label="Residential repair service"
          ></div>


          <div class="nh-service-info">

            <span id="nh-service-index">
              SERVICE / 01
            </span>

            <h3 id="nh-service-title">
              Small problems
              should stay small.
            </h3>

            <p id="nh-service-description">
              General residential repairs for
              everyday issues that need attention
              before they become larger problems.
            </p>


            <ul id="nh-service-items">

              <li>
                Walls, surfaces and small repairs
              </li>

              <li>
                Doors, fittings and fixtures
              </li>

              <li>
                General residential troubleshooting
              </li>

            </ul>

          </div>

        </div>

      </div>

    </section>


    <!-- =================================================
         STORY
    ================================================== -->

    <section
      class="nh-story"
      data-nh-reveal
    >


      <div class="nh-story-grid">


        <div class="nh-story-copy">

          <span>
            HOME CARE / WITHOUT THE GUESSWORK
          </span>

          <h2>
            A BETTER WAY
            TO LOOK AFTER
            YOUR HOME.
          </h2>

          <p>
            Home maintenance often starts with
            uncertainty: who to call, what the
            problem actually is, and whether the
            job is large enough for someone to
            take seriously. North keeps the first
            step simple and explains what happens
            before the work begins.
          </p>

        </div>


        <div
          class="nh-story-photo"
          role="img"
          aria-label="Modern residential interior"
        ></div>

      </div>

    </section>


    <!-- =================================================
         PROCESS
    ================================================== -->

    <section
      class="nh-process"
      id="nh-process"
      data-nh-reveal
    >


      <div class="nh-process-heading">

        <span>
          02 / HOW IT WORKS
        </span>

        <h2>
          CLEAR FROM
          FIRST MESSAGE
          TO FINISHED JOB.
        </h2>

      </div>


      <div class="nh-process-grid">


        <article class="nh-process-step">

          <span>
            01
          </span>

          <h3>
            Tell us what
            needs attention.
          </h3>

          <p>
            Describe the issue,
            location and what
            you are noticing.
          </p>

        </article>


        <article class="nh-process-step">

          <span>
            02
          </span>

          <h3>
            We review
            the request.
          </h3>

          <p>
            North checks the
            information and clarifies
            the likely scope.
          </p>

        </article>


        <article class="nh-process-step">

          <span>
            03
          </span>

          <h3>
            Confirm
            the work.
          </h3>

          <p>
            Agree on the job,
            timing and practical
            next steps.
          </p>

        </article>


        <article class="nh-process-step">

          <span>
            04
          </span>

          <h3>
            Get it
            sorted.
          </h3>

          <p>
            The work gets done
            without making the
            process harder.
          </p>

        </article>

      </div>

    </section>


    <!-- =================================================
         SELECTED WORK
    ================================================== -->

    <section
      class="nh-section nh-work"
      id="nh-work"
      data-nh-reveal
    >


      <div class="nh-section-heading">

        <span>
          03 / SELECTED WORK
        </span>

        <h2>
          WORK THAT
          BELONGS IN
          THE HOME.
        </h2>

        <p>
          Concept project records
          show the range of small
          residential work North
          is positioned to handle.
        </p>

      </div>


      <div class="nh-work-grid">


        <article class="nh-work-card">

          <div class="nh-work-overlay">

            <span>
              INSTALLATION / MAKATI
            </span>

            <h3>
              Kitchen fixture
              upgrade
            </h3>

          </div>

        </article>


        <div class="nh-work-side">


          <article
            class="
              nh-work-card
              nh-work-card-small
              nh-work-card-two
            "
          >

            <div class="nh-work-overlay">

              <span>
                REPAIR / PASIG
              </span>

              <h3>
                Interior
                wall repair
              </h3>

            </div>

          </article>


          <article
            class="
              nh-work-card
              nh-work-card-small
              nh-work-card-three
            "
          >

            <div class="nh-work-overlay">

              <span>
                MAINTENANCE / BGC
              </span>

              <h3>
                Condo
                maintenance
              </h3>

            </div>

          </article>

        </div>

      </div>

    </section>


    <!-- =================================================
         WHY NORTH
    ================================================== -->

    <section
      class="nh-why"
      data-nh-reveal
    >


      <div class="nh-why-layout">


        <div class="nh-why-copy">

          <span>
            04 / WHY NORTH
          </span>

          <h2>
            LESS
            UNCERTAINTY.
            BETTER CARE.
          </h2>

        </div>


        <div class="nh-why-list">


          <div class="nh-why-item">

            <span>
              01
            </span>

            <strong>
              Clear communication
            </strong>

          </div>


          <div class="nh-why-item">

            <span>
              02
            </span>

            <strong>
              Practical recommendations
            </strong>

          </div>


          <div class="nh-why-item">

            <span>
              03
            </span>

            <strong>
              Residential-first service
            </strong>

          </div>


          <div class="nh-why-item">

            <span>
              04
            </span>

            <strong>
              Straightforward process
            </strong>

          </div>

        </div>

      </div>

    </section>


    <!-- =================================================
         SERVICE AREA
    ================================================== -->

    <section
      class="nh-area"
      id="nh-area"
      data-nh-reveal
    >


      <div class="nh-area-copy">

        <span>
          05 / SERVICE AREA
        </span>

        <h2>
          HOME CARE
          ACROSS
          THE METRO.
        </h2>

      </div>


      <div class="nh-area-list">

        <span>
          MAKATI
        </span>

        <span>
          TAGUIG
        </span>

        <span>
          PASIG
        </span>

        <span>
          MANDALUYONG
        </span>

        <span>
          QUEZON CITY
        </span>

        <span>
          SELECTED NEARBY AREAS
        </span>

      </div>

    </section>


    <!-- =================================================
         QUOTE
    ================================================== -->

    <section
      class="nh-quote"
      id="nh-quote"
      data-nh-reveal
    >


      <div class="nh-quote-copy">

        <span>
          06 / REQUEST A QUOTE
        </span>

        <h2>
          SOMETHING
          AT HOME
          NEEDS ATTENTION?
        </h2>

        <p>
          Tell North what is happening.
          This is a front-end portfolio
          demonstration, so no information
          is actually submitted.
        </p>

      </div>


      <form
        class="nh-form"
        id="nh-form"
      >


        <label>

          WHAT NEEDS ATTENTION?

          <textarea
            name="job"
            rows="3"
            placeholder="Example: loose kitchen fixture..."
            required
          ></textarea>

        </label>


        <div class="nh-form-row">


          <label>

            SERVICE

            <select name="service">

              <option>
                Not sure
              </option>

              <option>
                Repairs
              </option>

              <option>
                Maintenance
              </option>

              <option>
                Installation
              </option>

            </select>

          </label>


          <label>

            AREA

            <input
              type="text"
              name="area"
              placeholder="Makati"
            >

          </label>

        </div>


        <button type="submit">

          <span id="nh-form-button">
            Review request
          </span>

          <span>
            ↗
          </span>

        </button>


        <p
          class="nh-form-status"
          id="nh-form-status"
          aria-live="polite"
        ></p>

      </form>

    </section>


    <!-- =================================================
         FOOTER
    ================================================== -->

    <footer class="nh-footer">

      <strong>
        North Home.
      </strong>

      <span>
        RESIDENTIAL SERVICES / METRO MANILA
      </span>

      <span>
        CONCEPT PROJECT / JC
      </span>

    </footer>

  </div>
`;


/* =========================================================
   CREATE FRESH WEBSITE

   Every presentation receives a completely fresh North Home
   DOM tree from this one source.
========================================================= */

export function createNorthHomeSite() {

  const template =
    document.createElement(
      "template"
    );


  template.innerHTML =
    SITE_MARKUP.trim();


  const site =
    template.content
      .firstElementChild;


  if (
    !site ||
    site.nodeType !==
      1
  ) {

    throw new Error(
      "North Home website factory could not create the site."
    );

  }


  return site;

}


/* =========================================================
   INITIALIZE WEBSITE

   Interactive behavior is bound only when ProjectFrame
   requests an interactive instance.

   The function returns cleanup() so ProjectFrame can fully
   destroy listeners, observers and timers when an iframe is
   replaced.
========================================================= */

export function initializeNorthHomeSite(
  root,
  options = {}
) {

  if (
    !root ||
    root.nodeType !==
      1
  ) {

    return null;

  }


  if (
    root.dataset.northInitialized ===
      "true"
  ) {

    return root;

  }


  root.dataset.northInitialized =
    "true";


  const doc =
    root.ownerDocument ||
    document;


  const windowObject =
    doc.defaultView ||
    window;


  const prefersReducedMotion =
    windowObject.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches ||
    false;


  const cleanups =
    [];


  let revealObserver =
    null;


  let formResetTimer =
    0;


  let cleaned =
    false;


  /* =======================================================
     EVENT LIFECYCLE
  ======================================================= */

  function on(
    target,
    type,
    listener,
    eventOptions
  ) {

    if (
      !target ||
      typeof target.addEventListener !==
        "function"
    ) {

      return;

    }


    target.addEventListener(
      type,
      listener,
      eventOptions
    );


    cleanups.push(
      () => {

        target.removeEventListener(
          type,
          listener,
          eventOptions
        );

      }
    );

  }


  function cleanup() {

    if (cleaned) {

      return;

    }


    cleaned =
      true;


    if (
      formResetTimer
    ) {

      windowObject.clearTimeout(
        formResetTimer
      );


      formResetTimer =
        0;

    }


    revealObserver?.disconnect();


    revealObserver =
      null;


    while (
      cleanups.length
    ) {

      const dispose =
        cleanups.pop();


      try {

        dispose();

      } catch (error) {

        console.warn(
          "[North Home] Cleanup failed.",
          error
        );

      }

    }


    const heroMedia =
      root.querySelector(
        ".nh-hero-media"
      );


    if (heroMedia) {

      heroMedia.style.transform =
        "";

    }


    delete root.dataset
      .northInitialized;

  }


  /* =======================================================
     FRAME ABORT SIGNAL

     ProjectFrame aborts this signal when its managed iframe
     is destroyed.
  ======================================================= */

  const signal =
    options.signal;


  if (
    signal &&
    typeof signal.addEventListener ===
      "function"
  ) {

    if (
      signal.aborted
    ) {

      cleanup();


      return cleanup;

    }


    on(
      signal,
      "abort",
      cleanup,
      {
        once:
          true
      }
    );

  }


  /* =======================================================
     SERVICES
  ======================================================= */

  const serviceTabs =
    root.querySelectorAll(
      ".nh-service-tab"
    );


  const servicePhoto =
    root.querySelector(
      "#nh-service-photo"
    );


  const serviceIndex =
    root.querySelector(
      "#nh-service-index"
    );


  const serviceTitle =
    root.querySelector(
      "#nh-service-title"
    );


  const serviceDescription =
    root.querySelector(
      "#nh-service-description"
    );


  const serviceItems =
    root.querySelector(
      "#nh-service-items"
    );


  function setNorthService(
    key,
    animate = true
  ) {

    const data =
      SERVICE_DATA[
        key
      ];


    if (!data) {

      return;

    }


    serviceTabs.forEach(
      (tab) => {

        const active =
          tab.dataset.nhService ===
          key;


        tab.classList.toggle(
          "active",
          active
        );


        tab.setAttribute(
          "aria-selected",
          String(
            active
          )
        );

      }
    );


    if (servicePhoto) {

      servicePhoto.dataset.service =
        key;

    }


    if (serviceIndex) {

      serviceIndex.textContent =
        data.index;

    }


    if (serviceTitle) {

      serviceTitle.textContent =
        data.title;

    }


    if (serviceDescription) {

      serviceDescription.textContent =
        data.description;

    }


    if (serviceItems) {

      serviceItems.replaceChildren();


      data.items.forEach(
        (item) => {

          const li =
            doc.createElement(
              "li"
            );


          li.textContent =
            item;


          serviceItems.append(
            li
          );

        }
      );

    }


    if (
      animate &&
      !prefersReducedMotion &&
      servicePhoto &&
      typeof servicePhoto.animate ===
        "function"
    ) {

      servicePhoto.animate(
        [
          {
            opacity:
              .4,

            transform:
              "scale(1.015)"
          },

          {
            opacity:
              1,

            transform:
              "scale(1)"
          }
        ],
        {
          duration:
            360,

          easing:
            "cubic-bezier(.2,.75,.25,1)"
        }
      );

    }


    if (
      animate &&
      !prefersReducedMotion &&
      serviceTitle &&
      typeof serviceTitle.animate ===
        "function"
    ) {

      serviceTitle.animate(
        [
          {
            opacity:
              0,

            transform:
              "translateY(8px)"
          },

          {
            opacity:
              1,

            transform:
              "translateY(0)"
          }
        ],
        {
          duration:
            330,

          easing:
            "cubic-bezier(.2,.75,.25,1)"
        }
      );

    }

  }


  serviceTabs.forEach(
    (tab) => {

      on(
        tab,
        "click",
        () => {

          setNorthService(
            tab.dataset.nhService
          );

        }
      );

    }
  );


  setNorthService(
    "repairs",
    false
  );


  /* =======================================================
     INTERNAL NAVIGATION
  ======================================================= */

  root
    .querySelectorAll(
      'a[href^="#nh-"]'
    )
    .forEach(
      (link) => {

        on(
          link,
          "click",
          (event) => {

            const selector =
              link.getAttribute(
                "href"
              );


            if (!selector) {

              return;

            }


            let target =
              null;


            try {

              target =
                root.querySelector(
                  selector
                );

            } catch (error) {

              target =
                null;

            }


            if (!target) {

              return;

            }


            event.preventDefault();


            target.scrollIntoView(
              {
                behavior:
                  prefersReducedMotion
                    ? "auto"
                    : "smooth",

                block:
                  "start"
              }
            );

          }
        );

      }
    );


  /* =======================================================
     FRONT-END QUOTE DEMO
  ======================================================= */

  const form =
    root.querySelector(
      "#nh-form"
    );


  const formButton =
    root.querySelector(
      "#nh-form-button"
    );


  const formStatus =
    root.querySelector(
      "#nh-form-status"
    );


  on(
    form,
    "submit",
    (event) => {

      event.preventDefault();


      if (
        !form.checkValidity()
      ) {

        form.reportValidity();


        return;

      }


      const FormDataConstructor =
        windowObject.FormData ||
        FormData;


      const data =
        new FormDataConstructor(
          form
        );


      const service =
        data.get(
          "service"
        );


      const area =
        String(
          data.get(
            "area"
          ) ||
          ""
        ).trim();


      if (formButton) {

        formButton.textContent =
          "Request reviewed ✓";

      }


      if (formStatus) {

        formStatus.textContent =
          area
            ? `Demo complete — ${service} request in ${area}. Nothing was sent.`
            : `Demo complete — ${service} request. Nothing was sent.`;

      }


      if (
        !prefersReducedMotion &&
        typeof form.animate ===
          "function"
      ) {

        form.animate(
          [
            {
              transform:
                "translateY(0)"
            },

            {
              transform:
                "translateY(-4px)"
            },

            {
              transform:
                "translateY(0)"
            }
          ],
          {
            duration:
              360,

            easing:
              "ease"
          }
        );

      }


      if (
        formResetTimer
      ) {

        windowObject.clearTimeout(
          formResetTimer
        );

      }


      formResetTimer =
        windowObject.setTimeout(
          () => {

            formResetTimer =
              0;


            if (
              formButton
            ) {

              formButton.textContent =
                "Review request";

            }

          },
          2500
        );

    }
  );


  /* =======================================================
     REVEAL MOTION
  ======================================================= */

  const revealItems =
    root.querySelectorAll(
      "[data-nh-reveal]"
    );


  const suppliedRevealRoot =
    options.revealRoot &&
    options.revealRoot.nodeType ===
      1
      ? options.revealRoot
      : null;


  if (
    "IntersectionObserver" in
      windowObject &&
    !prefersReducedMotion
  ) {

    revealObserver =
      new windowObject.IntersectionObserver(
        (
          entries,
          instance
        ) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              if (
                typeof entry.target.animate ===
                  "function"
              ) {

                entry.target.animate(
                  [
                    {
                      opacity:
                        0,

                      transform:
                        "translateY(22px)"
                    },

                    {
                      opacity:
                        1,

                      transform:
                        "translateY(0)"
                    }
                  ],
                  {
                    duration:
                      650,

                    easing:
                      "cubic-bezier(.18,.78,.22,1)",

                    fill:
                      "both"
                  }
                );

              }


              instance.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            .07,

          root:
            suppliedRevealRoot,

          rootMargin:
            "0px 0px -5% 0px"
        }
      );


    revealItems.forEach(
      (item) => {

        revealObserver.observe(
          item
        );

      }
    );

  }


  /* =======================================================
     HERO POINTER RESPONSE
  ======================================================= */

  const heroMedia =
    root.querySelector(
      ".nh-hero-media"
    );


  const hasFinePointer =
    windowObject.matchMedia?.(
      "(pointer: fine)"
    ).matches ||
    false;


  if (
    heroMedia &&
    !prefersReducedMotion &&
    hasFinePointer
  ) {

    on(
      heroMedia,
      "pointermove",
      (event) => {

        const rect =
          heroMedia
            .getBoundingClientRect();


        if (
          !rect.width ||
          !rect.height
        ) {

          return;

        }


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          .5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          .5;


        heroMedia.style.transform =
          `
            perspective(1100px)
            rotateX(${y * -1.1}deg)
            rotateY(${x * 1.3}deg)
          `;

      }
    );


    on(
      heroMedia,
      "pointerleave",
      () => {

        heroMedia.style.transform =
          "perspective(1100px) rotateX(0deg) rotateY(0deg)";

      }
    );

  }


  return cleanup;

}
