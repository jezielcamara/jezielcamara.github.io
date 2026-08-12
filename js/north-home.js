/* =========================================================
   NORTH HOME
   Premium residential-services portfolio concept
========================================================= */

(function () {

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     THUMBNAIL
  ======================================================= */

  function northThumbMarkup() {

    return `
      <div class="nh-thumb">

        <div class="nh-thumb-nav">

          <strong class="nh-thumb-logo">
            North Home
          </strong>

          <span>
            SERVICES / ABOUT / CONTACT
          </span>

        </div>


        <div class="nh-thumb-hero">

          <div class="nh-thumb-stat">
            ★ 4.9 / LOCAL HOME CARE
          </div>


          <div class="nh-thumb-copy">

            <small>
              RESIDENTIAL SERVICES / METRO MANILA
            </small>

            <strong>
              CARE FOR<br>
              THE HOME<br>
              YOU LIVE IN.
            </strong>

            <span>
              Repairs, maintenance and
              installation for modern homes.
            </span>

          </div>

        </div>

      </div>
    `;

  }


  /* =======================================================
     CASE HERO PREVIEW
  ======================================================= */

  function northCasePreviewMarkup() {

    return `
      <div class="north-case-preview">

        <div class="north-case-preview-browser">

          <div class="north-case-preview-top">

            <span>
              CONCEPT / 01
            </span>

            <span>
              northhome.example
            </span>

          </div>

          ${northThumbMarkup()}

        </div>

      </div>
    `;

  }


  /* =======================================================
     FULL CASE STUDY
  ======================================================= */

  function northCaseStudyMarkup() {

    return `
      <div class="north-case-study">


        <!-- ===============================================
             BRIEF
        ================================================ -->

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
              <span>
                BUSINESS
              </span>

              <strong>
                Residential home services
              </strong>
            </div>


            <div>
              <span>
                AUDIENCE
              </span>

              <strong>
                Homeowners + property managers
              </strong>
            </div>


            <div>
              <span>
                PRIMARY GOAL
              </span>

              <strong>
                Generate quote inquiries
              </strong>
            </div>


            <div>
              <span>
                POSITIONING
              </span>

              <strong>
                Premium but approachable
              </strong>
            </div>


            <div>
              <span>
                SCOPE
              </span>

              <strong>
                Home / Services / About / Contact
              </strong>
            </div>


            <div>
              <span>
                ROLE
              </span>

              <strong>
                Strategy / Design / Front-end
              </strong>
            </div>

          </div>

        </section>


        <!-- ===============================================
             DESIGN DIRECTION
        ================================================ -->

        <section class="nh-case-decisions">

          <span class="nh-case-label">
            02 / DESIGN DIRECTION
          </span>


          <div class="nh-case-decisions-list">


            <article class="nh-case-decision">

              <span>
                01
              </span>

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

              <span>
                02
              </span>

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

              <span>
                03
              </span>

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

              <span>
                04
              </span>

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


        <!-- ===============================================
             LIVE WEBSITE
        ================================================ -->

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


            <!-- BROWSER BAR -->

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
                northhome.example
              </span>


              <strong>
                LIVE CONCEPT
              </strong>

            </div>


            <!-- ===========================================
                 NORTH HOME WEBSITE
            ============================================ -->

            <div class="nh-site">


              <!-- HEADER -->

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


              <!-- HERO -->

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
                      ★ 4.9
                    </strong>

                    <span>
                      Home care / Metro Manila
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
                        <span>↗</span>
                      </a>


                      <a href="#nh-services">
                        Explore services
                        <span>↓</span>
                      </a>

                    </div>


                  </div>


                </div>

              </section>


              <!-- TRUST STRIP -->

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


              <!-- SERVICES -->

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


              <!-- STORY -->

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


              <!-- PROCESS -->

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


              <!-- SELECTED WORK -->

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


              <!-- WHY NORTH -->

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


              <!-- SERVICE AREA -->

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


              <!-- QUOTE -->

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


              <!-- SITE FOOTER -->

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


          </div>


        </section>


        <!-- ===============================================
             CASE OUTCOME
        ================================================ -->

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


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  function initNorthHome() {


    const northProjectImage =
      document.querySelector(
        '.project-slide[data-project="north"] .project-image'
      );


    const heroProjectWindow =
      document.querySelector(
        ".window-main .window-placeholder"
      );


    const caseDialog =
      document.querySelector(
        "#case-dialog"
      );


    const caseHeroMedia =
      document.querySelector(
        "#case-hero-media"
      );


    const caseFooter =
      document.querySelector(
        ".case-footer"
      );


    if (
      !northProjectImage ||
      !heroProjectWindow ||
      !caseDialog ||
      !caseHeroMedia ||
      !caseFooter
    ) {
      return;
    }


    /* =====================================================
       PORTFOLIO PREVIEWS
    ===================================================== */

    northProjectImage.classList.add(
      "has-north-preview"
    );


    northProjectImage.innerHTML =
      northThumbMarkup();


    heroProjectWindow.classList.add(
      "has-north-preview"
    );


    heroProjectWindow.innerHTML =
      northThumbMarkup();


    /* =====================================================
       CASE HERO
    ===================================================== */

    caseHeroMedia
      .querySelectorAll(
        ".north-case-preview"
      )
      .forEach(
        (element) => {
          element.remove();
        }
      );


    caseHeroMedia.insertAdjacentHTML(
      "beforeend",
      northCasePreviewMarkup()
    );


    /* =====================================================
       CASE BODY
    ===================================================== */

    caseDialog
      .querySelectorAll(
        ".north-case-study"
      )
      .forEach(
        (element) => {
          element.remove();
        }
      );


    caseFooter.insertAdjacentHTML(
      "beforebegin",
      northCaseStudyMarkup()
    );


    /* =====================================================
       CASE MODE
    ===================================================== */

    const allCaseButtons =
      document.querySelectorAll(
        ".case-open"
      );


    const nextButton =
      document.querySelector(
        "#case-next"
      );


    const closeButton =
      document.querySelector(
        "#case-close"
      );


    function applyNorthCaseMode() {


      const caseTitle =
        document.querySelector(
          "#case-title"
        );


      const caseType =
        document.querySelector(
          "#case-type"
        );


      const caseSummary =
        document.querySelector(
          "#case-summary"
        );


      const caseGoal =
        document.querySelector(
          "#case-goal"
        );


      const casePages =
        document.querySelector(
          "#case-pages"
        );


      const isNorth =
        caseTitle?.textContent.trim() ===
        "North Home";


      caseDialog.classList.toggle(
        "north-active",
        isNorth
      );


      if (!isNorth) {
        return;
      }


      if (caseType) {
        caseType.textContent =
          "SELF-INITIATED / RESIDENTIAL SERVICES";
      }


      if (caseSummary) {
        caseSummary.textContent =
          "A premium residential-services concept designed to make home maintenance feel clear, trustworthy and appropriate for a modern home.";
      }


      if (caseGoal) {
        caseGoal.textContent =
          "Explain the services quickly, create residential trust, and make requesting help feel straightforward.";
      }


      if (casePages) {
        casePages.textContent =
          "Home / Services / About / Contact";
      }

    }


    allCaseButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            requestAnimationFrame(
              applyNorthCaseMode
            );

          }
        );

      }
    );


    nextButton?.addEventListener(
      "click",
      () => {

        requestAnimationFrame(
          applyNorthCaseMode
        );

      }
    );


    closeButton?.addEventListener(
      "click",
      () => {

        caseDialog.classList.remove(
          "north-active"
        );

      }
    );


    caseDialog.addEventListener(
      "close",
      () => {

        caseDialog.classList.remove(
          "north-active"
        );

      }
    );


    /* =====================================================
       SERVICE DATA
    ===================================================== */

    const serviceData = {


      repairs: {

        index:
          "SERVICE / 01",

        title:
          "Small problems should stay small.",

        description:
          "General residential repairs for everyday issues that need attention before they become larger problems.",

        items: [
          "Walls, surfaces and small repairs",
          "Doors, fittings and fixtures",
          "General residential troubleshooting"
        ]

      },


      maintenance: {

        index:
          "SERVICE / 02",

        title:
          "Care before something goes wrong.",

        description:
          "Preventive and recurring maintenance for homes, condos and rental properties that need consistent attention.",

        items: [
          "Routine residential checks",
          "Preventive fixes and adjustments",
          "Recurring property support"
        ]

      },


      installation: {

        index:
          "SERVICE / 03",

        title:
          "The finishing details matter.",

        description:
          "Installation for fixtures, fittings and practical home upgrades where careful placement and finish matter.",

        items: [
          "Fixtures and fittings",
          "Shelving and storage additions",
          "Small residential upgrades"
        ]

      }


    };


    const serviceTabs =
      document.querySelectorAll(
        ".nh-service-tab"
      );


    const servicePhoto =
      document.querySelector(
        "#nh-service-photo"
      );


    const serviceIndex =
      document.querySelector(
        "#nh-service-index"
      );


    const serviceTitle =
      document.querySelector(
        "#nh-service-title"
      );


    const serviceDescription =
      document.querySelector(
        "#nh-service-description"
      );


    const serviceItems =
      document.querySelector(
        "#nh-service-items"
      );


    function setNorthService(key) {


      const data =
        serviceData[key];


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
            String(active)
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
              document.createElement(
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
        !prefersReducedMotion &&
        servicePhoto
      ) {


        servicePhoto.animate(
          [
            {
              opacity: .4,
              transform:
                "scale(1.015)"
            },

            {
              opacity: 1,
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
        !prefersReducedMotion &&
        serviceTitle
      ) {


        serviceTitle.animate(
          [
            {
              opacity: 0,
              transform:
                "translateY(8px)"
            },

            {
              opacity: 1,
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


        tab.addEventListener(
          "click",
          () => {


            setNorthService(
              tab.dataset.nhService
            );


          }
        );


      }
    );


    /* =====================================================
       INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll(
      '.nh-site a[href^="#nh-"]'
    ).forEach(
      (link) => {


        link.addEventListener(
          "click",
          (event) => {


            const selector =
              link.getAttribute(
                "href"
              );


            const target =
              document.querySelector(
                selector
              );


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


    /* =====================================================
       FRONT-END QUOTE DEMO
    ===================================================== */

    const form =
      document.querySelector(
        "#nh-form"
      );


    const formButton =
      document.querySelector(
        "#nh-form-button"
      );


    const formStatus =
      document.querySelector(
        "#nh-form-status"
      );


    form?.addEventListener(
      "submit",
      (event) => {


        event.preventDefault();


        if (
          !form.checkValidity()
        ) {


          form.reportValidity();

          return;


        }


        const data =
          new FormData(
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
            ) || ""
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
          !prefersReducedMotion
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


        window.setTimeout(
          () => {


            if (formButton) {


              formButton.textContent =
                "Review request";


            }


          },
          2500
        );


      }
    );


    /* =====================================================
       CASE STUDY REVEALS
    ===================================================== */

    const revealItems =
      document.querySelectorAll(
        "[data-nh-reveal]"
      );


    if (
      "IntersectionObserver" in window &&
      !prefersReducedMotion
    ) {


      const observer =
        new IntersectionObserver(
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


                entry.target.animate(
                  [
                    {
                      opacity: 0,
                      transform:
                        "translateY(22px)"
                    },

                    {
                      opacity: 1,
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
              caseDialog,

            rootMargin:
              "0px 0px -5% 0px"

          }
        );


      revealItems.forEach(
        (item) => {


          observer.observe(
            item
          );


        }
      );


    }


    /* =====================================================
       HERO POINTER RESPONSE
    ===================================================== */

    const heroMedia =
      document.querySelector(
        ".nh-hero-media"
      );


    if (
      heroMedia &&
      !prefersReducedMotion &&
      window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {


      heroMedia.addEventListener(
        "pointermove",
        (event) => {


          const rect =
            heroMedia.getBoundingClientRect();


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


      heroMedia.addEventListener(
        "pointerleave",
        () => {


          heroMedia.style.transform =
            "perspective(1100px) rotateX(0deg) rotateY(0deg)";


        }
      );


    }


    /*
     * Initialize the first service state.
     */

    setNorthService(
      "repairs"
    );

  }


  /* =======================================================
     LOAD
  ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {


    document.addEventListener(
      "DOMContentLoaded",
      initNorthHome,
      {
        once: true
      }
    );


  } else {


    initNorthHome();


  }


})();


/* =========================================================
   NORTH HOME / WEBSITE-ONLY VIEWER
========================================================= */

(function () {

  function initNorthWebsiteViewer() {

    const northSlide =
      document.querySelector(
        '.project-slide[data-project="north"]'
      );


    const northProjectImage =
      northSlide?.querySelector(
        ".project-image"
      );


    const heroPreview =
      document.querySelector(
        ".window-main .window-placeholder.has-north-preview"
      );


    const sourceWebsite =
      document.querySelector(
        ".north-case-study .nh-site"
      );


    if (
      !northSlide ||
      !northProjectImage ||
      !sourceWebsite
    ) {
      return;
    }


    /* -----------------------------------------------------
       CREATE VIEWER
    ----------------------------------------------------- */

    let viewer =
      document.querySelector(
        "#nh-site-viewer"
      );


    if (!viewer) {

      viewer =
        document.createElement(
          "dialog"
        );


      viewer.className =
        "nh-site-viewer";


      viewer.id =
        "nh-site-viewer";


      viewer.setAttribute(
        "aria-label",
        "North Home website preview"
      );


      viewer.innerHTML = `
        <div class="nh-site-viewer-shell">

          <header class="nh-site-viewer-topbar">

            <div>
              <span>
                NORTH HOME
              </span>

              <small>
                WEBSITE PREVIEW / CONCEPT PROJECT
              </small>
            </div>


            <button
              class="nh-site-viewer-close"
              type="button"
              aria-label="Close North Home website preview"
            >
              Close
              <span aria-hidden="true">
                ×
              </span>
            </button>

          </header>


          <div class="nh-site-viewer-scroll">

            <div class="nh-site-viewer-browser">

              <div class="nh-site-viewer-browserbar">

                <div aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <span>
                  northhome.example
                </span>

                <strong>
                  VIEW-ONLY CONCEPT
                </strong>

              </div>


              <div
                class="nh-site-viewer-canvas"
              ></div>

            </div>

          </div>

        </div>
      `;


      document.body.append(
        viewer
      );

    }


    const canvas =
      viewer.querySelector(
        ".nh-site-viewer-canvas"
      );


    const scrollArea =
      viewer.querySelector(
        ".nh-site-viewer-scroll"
      );


    const closeButton =
      viewer.querySelector(
        ".nh-site-viewer-close"
      );


    /* -----------------------------------------------------
       COPY THE EXISTING NORTH WEBSITE
    ----------------------------------------------------- */

    canvas.replaceChildren();


    const websiteClone =
      sourceWebsite.cloneNode(
        true
      );


    websiteClone.classList.add(
      "nh-site-view-only"
    );


    /*
     * Avoid duplicate IDs because the original
     * North website still exists inside the case study.
     */

    websiteClone
      .querySelectorAll(
        "[id]"
      )
      .forEach(
        (element) => {
          element.removeAttribute(
            "id"
          );
        }
      );


    /*
     * Presentation only.
     *
     * Everything still LOOKS like a finished website,
     * but nothing inside the website preview performs
     * an action.
     */

    websiteClone
      .querySelectorAll(
        `
          a,
          button,
          input,
          select,
          textarea
        `
      )
      .forEach(
        (element) => {

          element.setAttribute(
            "tabindex",
            "-1"
          );


          element.setAttribute(
            "aria-disabled",
            "true"
          );

        }
      );


    canvas.append(
      websiteClone
    );


    /* -----------------------------------------------------
       OPEN / CLOSE
    ----------------------------------------------------- */

    function openViewer() {

      if (
        viewer.open
      ) {
        return;
      }


      viewer.showModal();


      document.body.classList.add(
        "nh-viewer-open"
      );


      if (scrollArea) {
        scrollArea.scrollTop =
          0;
      }

    }


    function closeViewer() {

      if (
        !viewer.open
      ) {
        return;
      }


      viewer.close();


      document.body.classList.remove(
        "nh-viewer-open"
      );

    }


    closeButton?.addEventListener(
      "click",
      closeViewer
    );


    viewer.addEventListener(
      "cancel",
      (event) => {

        event.preventDefault();

        closeViewer();

      }
    );


    viewer.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          viewer
        ) {

          closeViewer();

        }

      }
    );


    /* -----------------------------------------------------
       MAKE NORTH PREVIEWS CLICKABLE
    ----------------------------------------------------- */

    function makeLaunchable(
      element,
      label
    ) {

      if (!element) {
        return;
      }


      element.classList.add(
        "nh-view-launch"
      );


      element.setAttribute(
        "role",
        "button"
      );


      element.setAttribute(
        "tabindex",
        "0"
      );


      element.setAttribute(
        "aria-label",
        label
      );


      element.addEventListener(
        "click",
        (event) => {

          /*
           * Keep the normal case-study button
           * separate from this website viewer.
           */

          if (
            event.target.closest(
              ".case-open"
            )
          ) {
            return;
          }


          openViewer();

        }
      );


      element.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key !== "Enter" &&
            event.key !== " "
          ) {
            return;
          }


          event.preventDefault();

          openViewer();

        }
      );

    }


    makeLaunchable(
      northProjectImage,
      "View North Home website"
    );


    makeLaunchable(
      heroPreview,
      "View North Home website"
    );


    /* -----------------------------------------------------
       ADD A CLEAR VIEW CUE TO THE WORK IMAGE
    ----------------------------------------------------- */

    if (
      !northProjectImage.querySelector(
        ".nh-view-badge"
      )
    ) {

      const badge =
        document.createElement(
          "span"
        );


      badge.className =
        "nh-view-badge";


      badge.innerHTML = `
        VIEW WEBSITE
        <b aria-hidden="true">
          ↗
        </b>
      `;


      northProjectImage.append(
        badge
      );

    }


    /* -----------------------------------------------------
       ADD SMALL CUE TO HERO PREVIEW
    ----------------------------------------------------- */

    if (
      heroPreview &&
      !heroPreview.querySelector(
        ".nh-hero-view-badge"
      )
    ) {

      const heroBadge =
        document.createElement(
          "span"
        );


      heroBadge.className =
        "nh-hero-view-badge";


      heroBadge.textContent =
        "VIEW ↗";


      heroPreview.append(
        heroBadge
      );

    }

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initNorthWebsiteViewer,
      {
        once: true
      }
    );

  } else {

    initNorthWebsiteViewer();

  }

})();
