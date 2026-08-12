/* =========================================================
   NORTH HOME / VIEWER + PORTFOLIO REPAIR
========================================================= */

(function () {

  const viewerCSS = `
    /* =====================================================
       NORTH HOME VIEWER — STABLE CONTAINED LAYOUT
    ===================================================== */

    .nh-site-viewer {
      width:
        min(
          76vw,
          1180px
        ) !important;

      height:
        88vh !important;

      max-width:
        none !important;

      max-height:
        none !important;

      margin:
        auto !important;

      padding:
        0 !important;

      overflow:
        hidden !important;

      color:
        #fff;

      background:
        #171a1e !important;

      border:
        1px
        solid
        rgba(
          255,
          255,
          255,
          .18
        ) !important;

      border-radius:
        18px !important;

      box-shadow:
        0
        45px
        140px
        rgba(
          0,
          0,
          0,
          .75
        ) !important;
    }


    .nh-site-viewer::backdrop {
      background:
        rgba(
          0,
          0,
          0,
          .9
        ) !important;

      backdrop-filter:
        blur(4px) !important;

      -webkit-backdrop-filter:
        blur(4px) !important;
    }


    .nh-site-viewer[open] {
      animation:
        nh-repair-viewer-in
        260ms
        cubic-bezier(
          .18,
          .78,
          .22,
          1
        )
        both;
    }


    @keyframes nh-repair-viewer-in {

      from {
        opacity: 0;

        transform:
          translateY(16px)
          scale(.985);
      }


      to {
        opacity: 1;

        transform:
          translateY(0)
          scale(1);
      }

    }


    /* =====================================================
       VIEWER SHELL
    ===================================================== */

    .nh-site-viewer-shell {
      width:
        100%;

      height:
        100%;

      min-width:
        0;

      min-height:
        0;

      display:
        grid;

      grid-template-rows:
        auto
        minmax(
          0,
          1fr
        );

      overflow:
        hidden;
    }


    /* =====================================================
       VIEWER TOP BAR
    ===================================================== */

    .nh-site-viewer-topbar {
      min-height:
        58px;

      flex:
        0
        0
        auto;

      display:
        flex;

      align-items:
        center;

      justify-content:
        space-between;

      gap:
        24px;

      padding:
        0
        20px;

      color:
        rgba(
          255,
          255,
          255,
          .68
        );

      background:
        #111417;

      border-bottom:
        1px
        solid
        rgba(
          255,
          255,
          255,
          .1
        );

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;
    }


    .nh-site-viewer-topbar
    > div {
      min-width:
        0;

      display:
        flex;

      align-items:
        center;

      gap:
        16px;
    }


    .nh-site-viewer-topbar
    span {
      color:
        #fff;

      font-size:
        .66rem;

      font-weight:
        600;

      white-space:
        nowrap;
    }


    .nh-site-viewer-topbar
    small {
      overflow:
        hidden;

      color:
        rgba(
          255,
          255,
          255,
          .4
        );

      font-size:
        .49rem;

      letter-spacing:
        .07em;

      text-overflow:
        ellipsis;

      white-space:
        nowrap;
    }


    .nh-site-viewer-close {
      flex:
        0
        0
        auto;

      display:
        inline-flex;

      align-items:
        center;

      gap:
        12px;

      padding:
        10px
        0;

      color:
        #fff;

      background:
        transparent;

      border:
        0;

      cursor:
        pointer;

      font:
        inherit;

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .6rem;
    }


    .nh-site-viewer-close
    span {
      font-size:
        1rem;

      font-weight:
        400;
    }


    /* =====================================================
       SCROLL AREA
    ===================================================== */

    .nh-site-viewer-scroll {
      width:
        100%;

      min-width:
        0;

      min-height:
        0;

      overflow-x:
        hidden;

      overflow-y:
        auto;

      padding:
        16px;

      background:
        #20242a;

      overscroll-behavior:
        contain;

      scrollbar-gutter:
        stable;
    }


    /* =====================================================
       BROWSER FRAME
    ===================================================== */

    .nh-site-viewer-browser {
      width:
        100%;

      max-width:
        1080px;

      min-width:
        0;

      margin:
        0
        auto
        24px;

      overflow:
        hidden;

      background:
        #fbfaf7;

      border-radius:
        14px;

      box-shadow:
        0
        24px
        70px
        rgba(
          0,
          0,
          0,
          .34
        );
    }


    .nh-site-viewer-browserbar {
      min-height:
        38px;

      display:
        grid;

      grid-template-columns:
        1fr
        auto
        1fr;

      gap:
        18px;

      align-items:
        center;

      padding:
        0
        14px;

      color:
        #74777a;

      background:
        #ece9e2;

      border-bottom:
        1px
        solid
        rgba(
          23,
          27,
          33,
          .1
        );

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .48rem;

      letter-spacing:
        .05em;
    }


    .nh-site-viewer-browserbar
    > div {
      display:
        flex;

      gap:
        5px;
    }


    .nh-site-viewer-browserbar
    i {
      width:
        6px;

      height:
        6px;

      display:
        block;

      border:
        1px
        solid
        #929292;

      border-radius:
        50%;
    }


    .nh-site-viewer-browserbar
    > span {
      justify-self:
        center;
    }


    .nh-site-viewer-browserbar
    strong {
      justify-self:
        end;

      color:
        #182433;

      font-weight:
        600;
    }


    /* =====================================================
       CRITICAL FIX:
       THE WEBSITE NOW RESPONDS TO THE POPUP,
       NOT TO THE OUTER BROWSER WINDOW.
    ===================================================== */

    .nh-site-viewer-canvas {
      width:
        100%;

      min-width:
        0;

      overflow:
        hidden;

      container:
        northviewer
        / inline-size;
    }


    .nh-site-viewer-canvas *,
    .nh-site-viewer-canvas *::before,
    .nh-site-viewer-canvas *::after {
      box-sizing:
        border-box;
    }


    .nh-site-viewer-canvas
    > .nh-site {
      width:
        100%;

      min-width:
        0;

      max-width:
        100%;

      overflow:
        hidden;
    }


    /* =====================================================
       VIEWER-SPECIFIC TYPE + SPACING SCALE
    ===================================================== */

    .nh-site-view-only
    .nh-header {
      padding-inline:
        clamp(
          18px,
          3.5cqw,
          38px
        );
    }


    .nh-site-view-only
    .nh-hero {
      padding:
        0
        clamp(
          8px,
          1.6cqw,
          20px
        )
        clamp(
          8px,
          1.6cqw,
          20px
        );
    }


    .nh-site-view-only
    .nh-hero-media {
      min-height:
        clamp(
          500px,
          61cqw,
          650px
        );

      padding:
        clamp(
          28px,
          5cqw,
          52px
        );
    }


    .nh-site-view-only
    .nh-hero h1 {
      font-size:
        clamp(
          3.8rem,
          8.2cqw,
          7.7rem
        );

      overflow-wrap:
        normal;
    }


    .nh-site-view-only
    .nh-section,

    .nh-site-view-only
    .nh-story,

    .nh-site-view-only
    .nh-process,

    .nh-site-view-only
    .nh-why,

    .nh-site-view-only
    .nh-area,

    .nh-site-view-only
    .nh-quote {
      padding:
        clamp(
          58px,
          8cqw,
          92px
        )
        clamp(
          22px,
          4.6cqw,
          46px
        );
    }


    .nh-site-view-only
    .nh-section-heading
    h2,

    .nh-site-view-only
    .nh-story-copy
    h2,

    .nh-site-view-only
    .nh-process-heading
    h2,

    .nh-site-view-only
    .nh-why-copy
    h2,

    .nh-site-view-only
    .nh-area-copy
    h2,

    .nh-site-view-only
    .nh-quote-copy
    h2 {
      font-size:
        clamp(
          2.8rem,
          5.6cqw,
          5.3rem
        );
    }


    /* Disable the old background-size hover trick
       inside the view-only presentation. */

    .nh-site-view-only
    .nh-work-card:hover {
      background-size:
        cover !important;
    }


    /* =====================================================
       POPUP RESPONSIVE LAYOUT
       Uses container queries so narrowing the popup
       actually changes the North Home layout.
    ===================================================== */

    @container northviewer
    (max-width: 980px) {

      .nh-site-view-only
      .nh-header {
        grid-template-columns:
          1fr
          auto;

        min-height:
          68px;
      }


      .nh-site-view-only
      .nh-header
      nav {
        display:
          none;
      }


      .nh-site-view-only
      .nh-trust-strip {
        grid-template-columns:
          repeat(
            2,
            1fr
          );
      }


      .nh-site-view-only
      .nh-section-heading {
        grid-template-columns:
          105px
          minmax(
            0,
            1fr
          );

        gap:
          24px;
      }


      .nh-site-view-only
      .nh-section-heading
      p {
        grid-column:
          2;
      }


      .nh-site-view-only
      .nh-services-layout {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-service-feature {
        grid-template-columns:
          minmax(
            0,
            1.05fr
          )
          minmax(
            240px,
            .8fr
          );
      }


      .nh-site-view-only
      .nh-story-grid {
        grid-template-columns:
          .9fr
          1fr;

        gap:
          36px;
      }


      .nh-site-view-only
      .nh-process-grid {
        grid-template-columns:
          repeat(
            2,
            1fr
          );
      }


      .nh-site-view-only
      .nh-process-step:nth-child(3) {
        border-left:
          0;

        border-top:
          1px
          solid
          rgba(
            255,
            255,
            255,
            .18
          );
      }


      .nh-site-view-only
      .nh-process-step:nth-child(4) {
        border-top:
          1px
          solid
          rgba(
            255,
            255,
            255,
            .18
          );
      }


      .nh-site-view-only
      .nh-work-grid {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-work-card {
        min-height:
          500px;
      }


      .nh-site-view-only
      .nh-work-side {
        grid-template-columns:
          1fr
          1fr;

        grid-template-rows:
          none;
      }


      .nh-site-view-only
      .nh-work-card-small {
        min-height:
          300px;
      }


      .nh-site-view-only
      .nh-why-layout,

      .nh-site-view-only
      .nh-area,

      .nh-site-view-only
      .nh-quote {
        gap:
          42px;
      }

    }


    @container northviewer
    (max-width: 680px) {

      .nh-site-view-only
      .nh-header {
        min-height:
          60px;

        padding:
          0
          14px;
      }


      .nh-site-view-only
      .nh-header-cta {
        padding:
          8px
          11px;

        font-size:
          .53rem;
      }


      .nh-site-view-only
      .nh-hero {
        padding:
          0
          7px
          7px;
      }


      .nh-site-view-only
      .nh-hero-media {
        min-height:
          500px;

        padding:
          28px
          20px;

        border-radius:
          16px;
      }


      .nh-site-view-only
      .nh-hero h1 {
        font-size:
          clamp(
            3.2rem,
            15cqw,
            4.9rem
          );
      }


      .nh-site-view-only
      .nh-hero-trust {
        top:
          14px;

        right:
          14px;
      }


      .nh-site-view-only
      .nh-trust-strip {
        grid-template-columns:
          1fr
          1fr;

        margin:
          0
          7px
          7px;
      }


      .nh-site-view-only
      .nh-section-heading {
        grid-template-columns:
          1fr;

        gap:
          12px;
      }


      .nh-site-view-only
      .nh-section-heading
      p {
        grid-column:
          1;
      }


      .nh-site-view-only
      .nh-section-heading
      h2,

      .nh-site-view-only
      .nh-story-copy
      h2,

      .nh-site-view-only
      .nh-process-heading
      h2,

      .nh-site-view-only
      .nh-why-copy
      h2,

      .nh-site-view-only
      .nh-area-copy
      h2,

      .nh-site-view-only
      .nh-quote-copy
      h2 {
        font-size:
          clamp(
            2.7rem,
            13cqw,
            4rem
          );
      }


      .nh-site-view-only
      .nh-service-feature {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-service-photo {
        min-height:
          330px;
      }


      .nh-site-view-only
      .nh-service-info {
        padding:
          26px
          20px;
      }


      .nh-site-view-only
      .nh-story-grid {
        grid-template-columns:
          1fr;

        gap:
          30px;
      }


      .nh-site-view-only
      .nh-story-photo {
        min-height:
          390px;

        order:
          -1;
      }


      .nh-site-view-only
      .nh-process-heading {
        grid-template-columns:
          1fr;

        gap:
          14px;
      }


      .nh-site-view-only
      .nh-process-grid {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-process-step {
        min-height:
          165px;
      }


      .nh-site-view-only
      .nh-process-step
      + .nh-process-step,

      .nh-site-view-only
      .nh-process-step:nth-child(3),

      .nh-site-view-only
      .nh-process-step:nth-child(4) {
        border-left:
          0;

        border-top:
          1px
          solid
          rgba(
            255,
            255,
            255,
            .18
          );
      }


      .nh-site-view-only
      .nh-work-side {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-work-card {
        min-height:
          400px;
      }


      .nh-site-view-only
      .nh-work-card-small {
        min-height:
          300px;
      }


      .nh-site-view-only
      .nh-why-layout,

      .nh-site-view-only
      .nh-area,

      .nh-site-view-only
      .nh-quote {
        grid-template-columns:
          1fr;

        gap:
          38px;
      }


      .nh-site-view-only
      .nh-area-list {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-area-list
      span:nth-child(even) {
        border-left:
          0;
      }


      .nh-site-view-only
      .nh-form-row {
        grid-template-columns:
          1fr;
      }


      .nh-site-view-only
      .nh-footer {
        min-height:
          120px;

        grid-template-columns:
          1fr;

        gap:
          5px;

        align-content:
          center;

        padding:
          0
          16px;
      }

    }


    /* =====================================================
       VIEW-ONLY BEHAVIOUR
    ===================================================== */

    .nh-site-view-only
    a,

    .nh-site-view-only
    button,

    .nh-site-view-only
    input,

    .nh-site-view-only
    textarea,

    .nh-site-view-only
    select {
      pointer-events:
        none !important;
    }


    /* =====================================================
       SELECTED WORK CLICK TARGET
    ===================================================== */

    .project-slide[data-project="north"]
    .project-image {
      cursor:
        zoom-in !important;
    }


    .project-slide[data-project="north"]
    .project-image::after {
      content:
        "";

      position:
        absolute;

      inset:
        0;

      z-index:
        8;

      pointer-events:
        none;

      border:
        1px
        solid
        transparent;

      transition:
        border-color
        180ms
        ease;
    }


    .project-slide[data-project="north"]
    .project-image:hover::after {
      border-color:
        var(--blue);
    }


    .nh-project-view-button {
      position:
        absolute;

      z-index:
        30;

      right:
        22px;

      bottom:
        22px;

      min-height:
        40px;

      display:
        inline-flex;

      align-items:
        center;

      gap:
        14px;

      padding:
        0
        14px;

      color:
        #182433;

      background:
        rgba(
          255,
          255,
          255,
          .95
        );

      border:
        0;

      border-radius:
        999px;

      cursor:
        pointer;

      font-family:
        "TASA Orbiter",
        Arial,
        sans-serif;

      font-size:
        .54rem;

      font-weight:
        600;

      box-shadow:
        0
        8px
        25px
        rgba(
          0,
          0,
          0,
          .18
        );
    }


    .nh-project-title-launch {
      cursor:
        pointer;
    }


    .nh-project-title-launch:hover {
      text-decoration:
        underline;

      text-decoration-thickness:
        1px;

      text-underline-offset:
        5px;
    }


    /* Hide the old non-button badge. */

    .project-slide[data-project="north"]
    .nh-view-badge {
      display:
        none !important;
    }


    /* =====================================================
       LAPTOP
    ===================================================== */

    @media (
      max-width: 1100px
    ) {

      .nh-site-viewer {
        width:
          86vw !important;

        height:
          88vh !important;
      }

    }


    /* =====================================================
       MOBILE POPUP
    ===================================================== */

    @media (
      max-width: 700px
    ) {

      .nh-site-viewer {
        width:
          calc(
            100vw - 20px
          ) !important;

        height:
          calc(
            100dvh - 20px
          ) !important;

        border-radius:
          13px !important;
      }


      .nh-site-viewer::backdrop {
        background:
          rgba(
            0,
            0,
            0,
            .93
          ) !important;
      }


      .nh-site-viewer-topbar {
        min-height:
          52px;

        padding:
          0
          13px;
      }


      .nh-site-viewer-topbar
      small {
        display:
          none;
      }


      .nh-site-viewer-scroll {
        padding:
          7px;
      }


      .nh-site-viewer-browser {
        border-radius:
          10px;
      }


      .nh-site-viewer-browserbar {
        grid-template-columns:
          1fr
          auto;
      }


      .nh-site-viewer-browserbar
      strong {
        display:
          none;
      }


      .nh-site-viewer-browserbar
      > span {
        justify-self:
          end;
      }


      .nh-project-view-button {
        right:
          14px;

        bottom:
          14px;
      }

    }


    @media (
      prefers-reduced-motion:
      reduce
    ) {

      .nh-site-viewer[open] {
        animation:
          none !important;
      }

    }
  `;


  function addRepairStyles() {

    if (
      document.querySelector(
        "#north-home-repair-styles"
      )
    ) {
      return;
    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "north-home-repair-styles";


    style.textContent =
      viewerCSS;


    document.head.append(
      style
    );

  }


  function repairNorthHome() {

    addRepairStyles();


    const northSlide =
      document.querySelector(
        '.project-slide[data-project="north"]'
      );


    const northImage =
      northSlide?.querySelector(
        ".project-image"
      );


    const northTitle =
      northSlide?.querySelector(
        ".project-caption h3"
      );


    if (!northImage) {
      return;
    }


    /*
     * IMPORTANT:
     *
     * main.js treats pointerdown inside the reel
     * as a horizontal drag.
     *
     * Stop the event at the North image so the
     * reel cannot steal the click.
     */

    if (
      !northImage.dataset.clickRepair
    ) {

      northImage.dataset.clickRepair =
        "true";


      northImage.addEventListener(
        "pointerdown",
        (event) => {

          event.stopPropagation();

        }
      );

    }


    /*
     * north-home.js already added the actual
     * viewer-opening click listener to this image.
     *
     * Remove the fake button semantics from the div
     * because we are adding a real button below.
     */

    northImage.removeAttribute(
      "role"
    );


    northImage.removeAttribute(
      "tabindex"
    );


    /*
     * Add an actual button.
     *
     * main.js explicitly ignores pointer drag events
     * that begin on a button, so this also provides
     * a guaranteed launch target.
     */

    if (
      !northImage.querySelector(
        ".nh-project-view-button"
      )
    ) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "nh-project-view-button";


      button.setAttribute(
        "aria-label",
        "View North Home website preview"
      );


      button.innerHTML = `
        VIEW WEBSITE
        <span aria-hidden="true">
          ↗
        </span>
      `;


      button.addEventListener(
        "pointerdown",
        (event) => {

          event.stopPropagation();

        }
      );


      /*
       * Let the click bubble to northImage.
       *
       * The existing North Home viewer listener
       * will then open the popup.
       */

      northImage.append(
        button
      );

    }


    /*
     * Make the project title launch the same preview.
     */

    if (
      northTitle &&
      !northTitle.dataset.clickRepair
    ) {

      northTitle.dataset.clickRepair =
        "true";


      northTitle.classList.add(
        "nh-project-title-launch"
      );


      northTitle.setAttribute(
        "role",
        "button"
      );


      northTitle.setAttribute(
        "tabindex",
        "0"
      );


      northTitle.setAttribute(
        "aria-label",
        "View North Home website preview"
      );


      northTitle.addEventListener(
        "click",
        () => {

          northImage.click();

        }
      );


      northTitle.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key !== "Enter" &&
            event.key !== " "
          ) {
            return;
          }


          event.preventDefault();

          northImage.click();

        }
      );

    }

  }


  function startRepair() {

    /*
     * north-home.js builds the website and viewer
     * during DOMContentLoaded.
     *
     * One animation frame ensures those elements
     * exist before this repair runs.
     */

    requestAnimationFrame(
      repairNorthHome
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      startRepair,
      {
        once: true
      }
    );

  } else {

    startRepair();

  }

})();
