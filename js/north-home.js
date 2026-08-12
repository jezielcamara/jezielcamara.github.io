/* -------------------------------------------------
   NORTH HOME
   Embedded portfolio case study + website concept
-------------------------------------------------- */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  function northThumbMarkup() {
    return `
      <div class="north-thumb">
        <div class="north-thumb-top">
          <strong>NORTH<span>.</span></strong>
          <span>PROPERTY SERVICES / METRO MANILA</span>
        </div>

        <div class="north-thumb-hero">
          <div>
            <small>REPAIRS / MAINTENANCE / INSTALLATION</small>

            <b>
              GOOD WORK.<br>
              NO GUESSWORK.
            </b>

            <span>
              Property maintenance for homes
              and small businesses across Metro Manila.
            </span>

            <i>REQUEST A QUOTE →</i>
          </div>

          <div class="north-thumb-art">
            <span>SERVICE / FIELD 01</span>
          </div>
        </div>

        <div class="north-thumb-services">
          <span>01 / REPAIRS</span>
          <span>02 / MAINTENANCE</span>
          <span>03 / INSTALLATION</span>
        </div>
      </div>
    `;
  }


  function northCasePreviewMarkup() {
    return `
      <div class="north-case-preview">
        <div class="north-preview-browser">
          <div class="north-preview-browserbar">
            <span>CONCEPT / 01</span>
            <span>northhome.example</span>
          </div>

          ${northThumbMarkup()}
        </div>
      </div>
    `;
  }


  function northCaseStudyMarkup() {
    return `
      <div class="north-case-study">

        <!-- CASE BRIEF -->

        <section class="north-case-brief">
          <span class="north-case-label">
            01 / THE BRIEF
          </span>

          <div class="north-case-brief-copy">
            <p class="north-case-overline">
              SELF-INITIATED CONCEPT / HOME SERVICES
            </p>

            <h3>
              A customer arrives
              with a problem.
              The website should
              not create another one.
            </h3>

            <p>
              North Home is a fictional property-services business
              serving homeowners, landlords, condo owners, and small
              businesses across Metro Manila. The concept starts with
              a simple question: can someone understand what the
              company does, find the right service, and know what to
              do next without hunting through the website?
            </p>
          </div>

          <div class="north-case-facts-grid">
            <div>
              <span>BUSINESS</span>
              <strong>Property services</strong>
            </div>

            <div>
              <span>AUDIENCE</span>
              <strong>Homeowners + small businesses</strong>
            </div>

            <div>
              <span>PRIMARY GOAL</span>
              <strong>Generate quote inquiries</strong>
            </div>

            <div>
              <span>ROLE</span>
              <strong>Strategy / Design / Front-end</strong>
            </div>

            <div>
              <span>SCOPE</span>
              <strong>Home / Services / About / Contact</strong>
            </div>

            <div>
              <span>BUILD</span>
              <strong>HTML / CSS / JavaScript concept</strong>
            </div>
          </div>
        </section>


        <!-- DESIGN DECISIONS -->

        <section class="north-case-decisions">
          <span class="north-case-label">
            02 / DESIGN DECISIONS
          </span>

          <div class="north-decisions-list">

            <article>
              <span>01</span>

              <h4>
                Services before
                company history.
              </h4>

              <p>
                Someone looking for a repair does not need a long
                introduction first. The homepage establishes what
                North does immediately, then moves straight into
                Repairs, Maintenance, and Installation.
              </p>
            </article>


            <article>
              <span>02</span>

              <h4>
                One clear action:
                request a quote.
              </h4>

              <p>
                The inquiry path stays visible from the first screen
                to the final section. Secondary content supports the
                decision instead of competing with the main action.
              </p>
            </article>


            <article>
              <span>03</span>

              <h4>
                Practical,
                not corporate.
              </h4>

              <p>
                The visual language borrows from architectural plans,
                job sheets, measurements, and building materials.
                That gives North its own identity without making the
                business feel like a large construction corporation.
              </p>
            </article>


            <article>
              <span>04</span>

              <h4>
                Mobile changes
                the order.
              </h4>

              <p>
                On smaller screens the service visual moves first,
                navigation simplifies, content stacks, and quote
                actions remain easy to reach. The layout adapts
                instead of becoming a squeezed desktop page.
              </p>
            </article>

          </div>
        </section>


        <!-- LIVE WEBSITE -->

        <section class="north-live-wrap">

          <div class="north-live-heading">
            <div>
              <span class="north-case-label">
                03 / LIVE FRONT-END
              </span>

              <h3>
                The website,
                inside the case study.
              </h3>
            </div>

            <p>
              This is a working front-end concept rather than a
              screenshot. Switch services, use the navigation,
              and try the quote interaction.
            </p>
          </div>


          <div class="nh-browser">

            <div class="nh-browserbar">
              <div aria-hidden="true">
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


            <div class="nh-site">

              <!-- WEBSITE HEADER -->

              <header class="nh-header">
                <a
                  class="nh-logo"
                  href="#nh-home"
                >
                  NORTH<span>.</span>
                </a>

                <nav aria-label="North Home navigation">
                  <a href="#nh-services">
                    Services
                  </a>

                  <a href="#nh-process">
                    How it works
                  </a>

                  <a href="#nh-work">
                    Work
                  </a>

                  <a href="#nh-area">
                    Service area
                  </a>
                </nav>

                <a
                  class="nh-header-cta"
                  href="#nh-quote"
                >
                  Request a quote ↗
                </a>
              </header>


              <!-- WEBSITE HERO -->

              <section
                class="nh-hero"
                id="nh-home"
                data-nh-reveal
              >

                <div class="nh-hero-copy">

                  <div class="nh-eyebrow">
                    <span>
                      PROPERTY SERVICES
                    </span>

                    <span>
                      METRO MANILA
                    </span>
                  </div>

                  <h1>
                    GOOD WORK.<br>
                    <em>NO GUESSWORK.</em>
                  </h1>

                  <p>
                    Repairs, preventive maintenance,
                    and practical installation work
                    for homes and small businesses.
                  </p>

                  <div class="nh-hero-actions">
                    <a href="#nh-quote">
                      Request a quote
                      <span>↗</span>
                    </a>

                    <a href="#nh-services">
                      View services
                      <span>↓</span>
                    </a>
                  </div>

                </div>


                <div
                  class="nh-hero-visual"
                  aria-label="Architectural illustration representing North Home property services"
                >
                  <span class="nh-measure nh-measure-a">
                    SITE / 014
                  </span>

                  <span class="nh-measure nh-measure-b">
                    14.5995° N / 120.9842° E
                  </span>

                  <div class="nh-building nh-building-one"></div>
                  <div class="nh-building nh-building-two"></div>
                  <div class="nh-building nh-building-three"></div>

                  <div class="nh-visual-card">
                    <span>
                      CURRENT JOB
                    </span>

                    <strong>
                      Kitchen fixture
                      replacement
                    </strong>

                    <small>
                      INSTALLATION / MAKATI
                    </small>
                  </div>
                </div>

              </section>


              <!-- SERVICE STRIP -->

              <div class="nh-service-strip">
                <span>
                  01 / REPAIRS
                </span>

                <span>
                  02 / MAINTENANCE
                </span>

                <span>
                  03 / INSTALLATION
                </span>

                <span>
                  04 / SMALL IMPROVEMENTS
                </span>
              </div>


              <!-- SERVICES -->

              <section
                class="nh-services"
                id="nh-services"
                data-nh-reveal
              >

                <div class="nh-section-intro">
                  <span>
                    01 / SERVICES
                  </span>

                  <h2>
                    START WITH
                    THE PROBLEM.
                  </h2>

                  <p>
                    Choose the closest match.
                    If you are not sure, describe
                    what is happening and North
                    can help identify the next step.
                  </p>
                </div>


                <div class="nh-service-interface">

                  <div
                    class="nh-service-tabs"
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
                      <span>01</span>
                      <strong>Repairs</strong>
                      <i>→</i>
                    </button>


                    <button
                      class="nh-service-tab"
                      type="button"
                      role="tab"
                      data-nh-service="maintenance"
                      aria-selected="false"
                    >
                      <span>02</span>
                      <strong>Maintenance</strong>
                      <i>→</i>
                    </button>


                    <button
                      class="nh-service-tab"
                      type="button"
                      role="tab"
                      data-nh-service="installation"
                      aria-selected="false"
                    >
                      <span>03</span>
                      <strong>Installation</strong>
                      <i>→</i>
                    </button>

                  </div>


                  <div class="nh-service-detail">

                    <div
                      class="nh-service-visual"
                      id="nh-service-visual"
                      data-service-art="repairs"
                    >
                      <span id="nh-service-art-label">
                        REPAIR / FIELD 01
                      </span>

                      <b></b>
                      <b></b>
                      <b></b>
                    </div>


                    <div class="nh-service-copy">
                      <span id="nh-service-index">
                        SERVICE / 01
                      </span>

                      <h3 id="nh-service-title">
                        Small problems
                        should stay small.
                      </h3>

                      <p id="nh-service-description">
                        General household and property repairs
                        for the issues that need attention
                        before they become larger problems.
                      </p>

                      <ul id="nh-service-list">
                        <li>
                          Minor wall and surface repairs
                        </li>

                        <li>
                          Doors, fixtures, and fittings
                        </li>

                        <li>
                          General property troubleshooting
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>

              </section>


              <!-- UNSURE -->

              <section
                class="nh-unsure"
                data-nh-reveal
              >

                <div>
                  <span>
                    NOT SURE WHICH SERVICE?
                  </span>

                  <h2>
                    SHOW US
                    THE PROBLEM.
                  </h2>
                </div>

                <p>
                  Describe what is happening.
                  If you have a photo, mention it
                  in the inquiry. The first step is
                  simply figuring out what the job needs.
                </p>

                <a href="#nh-quote">
                  Describe the job
                  <span>↗</span>
                </a>

              </section>


              <!-- PROCESS -->

              <section
                class="nh-process"
                id="nh-process"
                data-nh-reveal
              >

                <div class="nh-section-intro nh-section-intro-dark">
                  <span>
                    02 / HOW IT WORKS
                  </span>

                  <h2>
                    FOUR STEPS.
                    NO MYSTERY.
                  </h2>

                  <p>
                    A simple process keeps the customer
                    informed before the work begins.
                  </p>
                </div>


                <div class="nh-process-grid">

                  <article>
                    <span>
                      01
                    </span>

                    <h3>
                      Tell us
                      the job.
                    </h3>

                    <p>
                      Describe the issue,
                      location, and what
                      you need done.
                    </p>
                  </article>


                  <article>
                    <span>
                      02
                    </span>

                    <h3>
                      We review
                      the request.
                    </h3>

                    <p>
                      North checks the scope
                      and asks for any missing
                      information.
                    </p>
                  </article>


                  <article>
                    <span>
                      03
                    </span>

                    <h3>
                      Confirm
                      the work.
                    </h3>

                    <p>
                      Agree on the job,
                      timing, and practical
                      next steps.
                    </p>
                  </article>


                  <article>
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


              <!-- WORK -->

              <section
                class="nh-work"
                id="nh-work"
                data-nh-reveal
              >

                <div class="nh-section-intro">
                  <span>
                    03 / RECENT WORK
                  </span>

                  <h2>
                    THE KIND OF
                    WORK WE HANDLE.
                  </h2>

                  <p>
                    Concept project records show how
                    North communicates practical jobs
                    without relying on generic stock imagery.
                  </p>
                </div>


                <div class="nh-work-grid">

                  <article class="nh-work-card nh-work-a">
                    <div class="nh-work-image">
                      <span>
                        PROJECT / 014
                      </span>
                    </div>

                    <div>
                      <span>
                        INSTALLATION / MAKATI
                      </span>

                      <h3>
                        Kitchen fixture replacement
                      </h3>

                      <p>
                        Residential / completed in one visit
                      </p>
                    </div>
                  </article>


                  <article class="nh-work-card nh-work-b">
                    <div class="nh-work-image">
                      <span>
                        PROJECT / 021
                      </span>
                    </div>

                    <div>
                      <span>
                        REPAIR / PASIG
                      </span>

                      <h3>
                        Interior wall repair
                      </h3>

                      <p>
                        Condo unit / surface restoration
                      </p>
                    </div>
                  </article>


                  <article class="nh-work-card nh-work-c">
                    <div class="nh-work-image">
                      <span>
                        PROJECT / 028
                      </span>
                    </div>

                    <div>
                      <span>
                        MAINTENANCE / BGC
                      </span>

                      <h3>
                        Small office maintenance
                      </h3>

                      <p>
                        Commercial / recurring support
                      </p>
                    </div>
                  </article>

                </div>

              </section>


              <!-- SERVICE AREA -->

              <section
                class="nh-area"
                id="nh-area"
                data-nh-reveal
              >

                <div>
                  <span>
                    04 / SERVICE AREA
                  </span>

                  <h2>
                    BASED IN
                    METRO MANILA.
                  </h2>
                </div>

                <div class="nh-area-grid">
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
                    05 / REQUEST A QUOTE
                  </span>

                  <h2>
                    SOMETHING
                    NEED FIXING?
                  </h2>

                  <p>
                    Tell North what is happening.
                    This portfolio demo keeps the
                    interaction front-end only and
                    does not send any information.
                  </p>
                </div>


                <form
                  class="nh-quote-form"
                  id="nh-quote-form"
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


                  <div>
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
                    <span id="nh-form-button-text">
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


              <!-- WEBSITE FOOTER -->

              <footer class="nh-footer">
                <strong>
                  NORTH.
                </strong>

                <span>
                  PROPERTY SERVICES / METRO MANILA
                </span>

                <span>
                  CONCEPT PROJECT / JC
                </span>
              </footer>

            </div>

          </div>

        </section>


        <!-- CASE RESULT -->

        <section class="north-case-result">
          <span class="north-case-label">
            04 / WHAT THIS DEMONSTRATES
          </span>

          <h3>
            A small business website
            does not need complicated
            technology to feel considered.
          </h3>

          <div>
            <p>
              <strong>
                MESSAGE
              </strong>

              <span>
                The first screen explains the business,
                location, main services, and next action.
              </span>
            </p>

            <p>
              <strong>
                DESIGN
              </strong>

              <span>
                The identity uses an architectural,
                practical visual system built specifically
                for the service category.
              </span>
            </p>

            <p>
              <strong>
                FRONT-END
              </strong>

              <span>
                Responsive layouts, service switching,
                navigation, motion, and a front-end-only
                inquiry interaction are built into the concept.
              </span>
            </p>
          </div>
        </section>

      </div>
    `;
  }


  function initNorthHome() {
    const northProjectImage = document.querySelector(
      '.project-slide[data-project="north"] .project-image'
    );

    const heroProjectWindow = document.querySelector(
      ".window-main .window-placeholder"
    );

    const caseDialog = document.querySelector(
      "#case-dialog"
    );

    const caseHeroMedia = document.querySelector(
      "#case-hero-media"
    );

    const caseFooter = document.querySelector(
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


    /* -------------------------------------------------
       POPULATE PORTFOLIO PROJECT PREVIEWS
    -------------------------------------------------- */

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


    /* -------------------------------------------------
       INSERT CASE HERO PREVIEW
    -------------------------------------------------- */

    if (
      !caseHeroMedia.querySelector(
        ".north-case-preview"
      )
    ) {
      caseHeroMedia.insertAdjacentHTML(
        "beforeend",
        northCasePreviewMarkup()
      );
    }


    /* -------------------------------------------------
       INSERT FULL CASE STUDY
    -------------------------------------------------- */

    if (
      !caseDialog.querySelector(
        ".north-case-study"
      )
    ) {
      caseFooter.insertAdjacentHTML(
        "beforebegin",
        northCaseStudyMarkup()
      );
    }


    /* -------------------------------------------------
       NORTH CASE MODE
    -------------------------------------------------- */

    const northOpenButton = document.querySelector(
      '.case-open[data-project="north"]'
    );

    const allCaseButtons = document.querySelectorAll(
      ".case-open"
    );

    const nextButton = document.querySelector(
      "#case-next"
    );

    const closeButton = document.querySelector(
      "#case-close"
    );


    function applyNorthCaseMode() {
      const caseTitle = document.querySelector(
        "#case-title"
      );

      const caseType = document.querySelector(
        "#case-type"
      );

      const caseSummary = document.querySelector(
        "#case-summary"
      );

      const caseGoal = document.querySelector(
        "#case-goal"
      );

      const casePages = document.querySelector(
        "#case-pages"
      );


      const isNorth =
        caseTitle?.textContent.trim() ===
        "North Home";


      caseDialog.classList.toggle(
        "north-active",
        isNorth
      );


      if (isNorth) {
        if (caseType) {
          caseType.textContent =
            "SELF-INITIATED / BUSINESS WEBSITE";
        }

        if (caseSummary) {
          caseSummary.textContent =
            "A front-end concept for a small property-services company, designed around service clarity and a direct path to requesting a quote.";
        }

        if (caseGoal) {
          caseGoal.textContent =
            "Help a customer understand the service quickly, build enough confidence to continue, and make the next step obvious.";
        }

        if (casePages) {
          casePages.textContent =
            "Home / Services / About / Contact";
        }
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


    northOpenButton?.addEventListener(
      "click",
      () => {
        requestAnimationFrame(
          applyNorthCaseMode
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


    /* -------------------------------------------------
       NORTH SERVICES INTERACTION
    -------------------------------------------------- */

    const serviceData = {
      repairs: {
        index:
          "SERVICE / 01",

        artLabel:
          "REPAIR / FIELD 01",

        title:
          "Small problems should stay small.",

        description:
          "General household and property repairs for the issues that need attention before they become larger problems.",

        items: [
          "Minor wall and surface repairs",
          "Doors, fixtures, and fittings",
          "General property troubleshooting"
        ]
      },


      maintenance: {
        index:
          "SERVICE / 02",

        artLabel:
          "MAINTENANCE / FIELD 02",

        title:
          "Keep the property working.",

        description:
          "Preventive and recurring maintenance for homes, rental properties, and small commercial spaces.",

        items: [
          "Routine property checks",
          "Small preventive fixes",
          "Recurring maintenance support"
        ]
      },


      installation: {
        index:
          "SERVICE / 03",

        artLabel:
          "INSTALLATION / FIELD 03",

        title:
          "Install it properly the first time.",

        description:
          "Practical installation work for fixtures, fittings, and small upgrades around the property.",

        items: [
          "Fixtures and fittings",
          "Shelving and practical additions",
          "Small property upgrades"
        ]
      }
    };


    const serviceTabs = document.querySelectorAll(
      ".nh-service-tab"
    );

    const serviceVisual = document.querySelector(
      "#nh-service-visual"
    );

    const serviceArtLabel = document.querySelector(
      "#nh-service-art-label"
    );

    const serviceIndex = document.querySelector(
      "#nh-service-index"
    );

    const serviceTitle = document.querySelector(
      "#nh-service-title"
    );

    const serviceDescription = document.querySelector(
      "#nh-service-description"
    );

    const serviceList = document.querySelector(
      "#nh-service-list"
    );


    function setNorthService(key) {
      const data = serviceData[key];

      if (!data) {
        return;
      }


      serviceTabs.forEach(
        (tab) => {
          const active =
            tab.dataset.nhService === key;

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


      serviceVisual.dataset.serviceArt =
        key;

      serviceArtLabel.textContent =
        data.artLabel;

      serviceIndex.textContent =
        data.index;

      serviceTitle.textContent =
        data.title;

      serviceDescription.textContent =
        data.description;


      serviceList.replaceChildren();


      data.items.forEach(
        (item) => {
          const li =
            document.createElement(
              "li"
            );

          li.textContent =
            item;

          serviceList.append(
            li
          );
        }
      );


      if (
        !prefersReducedMotion
      ) {
        serviceVisual.animate(
          [
            {
              opacity: 0.45,
              transform:
                "translateX(10px)"
            },
            {
              opacity: 1,
              transform:
                "translateX(0)"
            }
          ],
          {
            duration: 330,
            easing:
              "cubic-bezier(.2,.75,.25,1)"
          }
        );


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
            duration: 330,
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


    /* -------------------------------------------------
       NORTH INTERNAL NAVIGATION
    -------------------------------------------------- */

    document.querySelectorAll(
      '.nh-site a[href^="#nh-"]'
    ).forEach(
      (link) => {
        link.addEventListener(
          "click",
          (event) => {
            const target =
              document.querySelector(
                link.getAttribute(
                  "href"
                )
              );

            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth",

              block:
                "start"
            });
          }
        );
      }
    );


    /* -------------------------------------------------
       FRONT-END QUOTE DEMO
    -------------------------------------------------- */

    const quoteForm = document.querySelector(
      "#nh-quote-form"
    );

    const quoteStatus = document.querySelector(
      "#nh-form-status"
    );

    const quoteButtonText = document.querySelector(
      "#nh-form-button-text"
    );


    quoteForm?.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();


        if (
          !quoteForm.checkValidity()
        ) {
          quoteForm.reportValidity();

          return;
        }


        const formData =
          new FormData(
            quoteForm
          );


        const service =
          formData.get(
            "service"
          );


        const area =
          String(
            formData.get(
              "area"
            ) || ""
          ).trim();


        quoteButtonText.textContent =
          "Request reviewed ✓";


        quoteStatus.textContent =
          area
            ? `Demo complete — ${service} request in ${area}. Nothing was sent.`
            : `Demo complete — ${service} request. Nothing was sent.`;


        if (
          !prefersReducedMotion
        ) {
          quoteForm.animate(
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
              duration: 360,
              easing:
                "ease"
            }
          );
        }


        window.setTimeout(
          () => {
            quoteButtonText.textContent =
              "Review request";
          },
          2600
        );
      }
    );


    /* -------------------------------------------------
       CASE STUDY SCROLL MOTION
    -------------------------------------------------- */

    const revealItems =
      document.querySelectorAll(
        "[data-nh-reveal]"
      );


    if (
      "IntersectionObserver" in window &&
      !prefersReducedMotion
    ) {
      const northObserver =
        new IntersectionObserver(
          (entries, observer) => {
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
                        "translateY(24px)"
                    },
                    {
                      opacity: 1,
                      transform:
                        "translateY(0)"
                    }
                  ],
                  {
                    duration: 650,
                    easing:
                      "cubic-bezier(.18,.78,.22,1)",
                    fill:
                      "both"
                  }
                );


                observer.unobserve(
                  entry.target
                );
              }
            );
          },
          {
            threshold: 0.08,
            root:
              caseDialog,
            rootMargin:
              "0px 0px -5% 0px"
          }
        );


      revealItems.forEach(
        (item) => {
          northObserver.observe(
            item
          );
        }
      );
    }


    /* -------------------------------------------------
       SMALL POINTER RESPONSE
       Gives the architectural hero some life.
    -------------------------------------------------- */

    const northHeroVisual =
      document.querySelector(
        ".nh-hero-visual"
      );


    if (
      northHeroVisual &&
      !prefersReducedMotion &&
      window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {
      northHeroVisual.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            northHeroVisual.getBoundingClientRect();


          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            0.5;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5;


          northHeroVisual.style.transform =
            `perspective(900px)
             rotateX(${y * -2.2}deg)
             rotateY(${x * 2.8}deg)`;
        }
      );


      northHeroVisual.addEventListener(
        "pointerleave",
        () => {
          northHeroVisual.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";
        }
      );
    }
  }


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
