/* =========================================================
   NORTH HOME / CANONICAL WEBSITE FACTORY

   ONE PROJECT.
   ONE WEBSITE SOURCE.

   This file owns the actual North Home website DOM.

   It does NOT know about:
   - the portfolio Hero
   - Selected Work
   - Responsive Lab
   - the website viewer
   - the case-study layout

   Every presentation environment must request a fresh
   North Home website from this factory.
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     PROJECT IDENTITY
  ======================================================= */

  const PROJECT_KEY =
    "north";


  /* =======================================================
     CANONICAL WEBSITE MARKUP

     This is the actual North Home website.

     Presentation-specific browser frames, scaling,
     dialogs and portfolio controls do not belong here.
  ======================================================= */

  const siteMarkup = `
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


  /* =======================================================
     CREATE FRESH WEBSITE
  ======================================================= */

  function createNorthHomeSite() {

    const template =
      document.createElement(
        "template"
      );


    template.innerHTML =
      siteMarkup.trim();


    const site =
      template.content
        .firstElementChild;


    if (
      !(site instanceof HTMLElement)
    ) {

      throw new Error(
        "North Home website factory could not create the site."
      );

    }


    return site;

  }


  /* =======================================================
     PUBLIC FACTORY

     Every consumer receives a new DOM instance.

     No consumer owns the source.
  ======================================================= */

  window.NorthHomeSite = Object.freeze({

    key:
      PROJECT_KEY,

    create:
      createNorthHomeSite

  });


  /* =======================================================
     FACTORY READY EVENT
  ======================================================= */

  document.dispatchEvent(
    new CustomEvent(
      "north:site-factory-ready",
      {
        detail: {
          key:
            PROJECT_KEY
        }
      }
    )
  );

})();
