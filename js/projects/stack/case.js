import { ProjectFrame } from "../../core/project-frame.js";

export const caseStyles = Object.freeze(["css/stack-case-study.css?v=20260814-1"]);

export const caseMeta = Object.freeze({
  modeClass: "stack-active",
  kicker: "SELF-INITIATED / ECOMMERCE",
  summary: "A premium modular furniture concept that turns adaptability into a clear shopping system—from room-led discovery to configuration, product detail, and a compatible cart.",
  goal: "Design an original furniture brand and commerce experience that sells what a space can become, not only the object in front of it.",
  pages: "Shop / Builder / Product / Journal"
});

const PREVIEW_WIDTH = 1200;
const PREVIEW_HEIGHT = 760;

function previewMarkup() {
  return `<div class="stack-case-preview"><div class="stack-case-preview__label"><span>Project 03 / STACK</span><span>Commerce system / 2026</span></div><div class="stack-case-preview__frame" data-stack-case-preview-host></div></div>`;
}

function caseMarkup() {
  return `
    <article class="stack-case-study">
      <section class="stack-case-intro">
        <p class="stack-case-eyebrow">01 / The brief</p>
        <div><h2>Furniture should expect change.</h2><p>Most furniture commerce treats a product as a finished answer. STACK begins with a different premise: rooms shift, routines overlap, and homes keep evolving after checkout.</p></div>
        <dl><div><dt>Discipline</dt><dd>Brand / UX / UI / Front-end</dd></div><div><dt>Format</dt><dd>Interactive portfolio prototype</dd></div><div><dt>Role</dt><dd>Strategy through implementation</dd></div></dl>
      </section>

      <section class="stack-case-statement"><p>Strategy / One sentence</p><blockquote>Don’t sell the desk.<br>Sell what the space can become.</blockquote></section>

      <section class="stack-case-grid stack-case-grid--problem">
        <div><p class="stack-case-eyebrow">02 / Problem</p><h2>Premium mood often hides the path to purchase.</h2></div>
        <div><p>Furniture sites tend to split in two directions: editorial experiences that feel aspirational but obscure essential decisions, or efficient catalogs with little point of view.</p><p>STACK joins those modes. Cinematic storytelling establishes desire; disciplined labels, filters, pricing, and state changes keep the shopping model legible.</p></div>
        <aside><span>Design question</span><strong>How might modularity feel desirable before it feels technical?</strong></aside>
      </section>

      <section class="stack-case-image stack-case-image--wide"><img src="images/stack/stack-hero.webp" alt="STACK's cinematic modular living environment"><div><span>Campaign image / Living system</span><span>Original AI-assisted art direction</span></div></section>

      <section class="stack-case-system">
        <div class="stack-case-system__title"><p class="stack-case-eyebrow">03 / Visual system</p><h2>Dark, exact, and built on contrast.</h2></div>
        <div class="stack-case-swatches"><span style="--swatch:#0d0d0d"><b>Ink</b>#0D0D0D</span><span style="--swatch:#f1eee8"><b>Ivory</b>#F1EEE8</span><span style="--swatch:#a77a54"><b>Bronze</b>#A77A54</span><span style="--swatch:#99958e"><b>Stone</b>#99958E</span></div>
        <div class="stack-case-type"><span class="stack-case-type__serif">Newsreader</span><span class="stack-case-type__sans">MANROPE / SYSTEM LABELS / 01—06</span></div>
        <p>The serif supplies warmth and editorial cadence. The sans-serif behaves like a product specification: compact, neutral, and repeatable. Bronze is reserved for active states and material cues, never decoration alone.</p>
      </section>

      <section class="stack-case-grid stack-case-grid--journey">
        <div><p class="stack-case-eyebrow">04 / Commerce journey</p><h2>From room to system to piece.</h2></div>
        <ol><li><span>01</span><strong>Orient</strong><p>Shop by the room and the life happening inside it.</p></li><li><span>02</span><strong>Explore</strong><p>Filter a compact core collection without losing editorial context.</p></li><li><span>03</span><strong>Configure</strong><p>Choose dimensions, use, and finish while price updates live.</p></li><li><span>04</span><strong>Complete</strong><p>Add a piece and surface only compatible modules in the bag.</p></li></ol>
      </section>

      <section class="stack-case-split-media"><figure><img src="images/stack/stack-workspace.webp" alt="STACK workspace configuration"><figcaption>Work / Rail configuration</figcaption></figure><figure><img src="images/stack/stack-shelving.webp" alt="STACK modular shelving configuration"><figcaption>Storage / Grid configuration</figcaption></figure></section>

      <section class="stack-case-feature">
        <div><p class="stack-case-eyebrow">05 / Signature interaction</p><h2>A builder that speaks human first.</h2><p>The configurator avoids a wall of technical choices. It asks three plain questions—width, primary use, and finish—then translates the decisions into dimensions, a configuration name, visual state, and live price.</p></div>
        <div class="stack-case-feature__steps"><span><b>01</b>Choose the footprint</span><span><b>02</b>Choose what happens there</span><span><b>03</b>Choose the material character</span><span><b>04</b>Add one coherent configuration</span></div>
      </section>

      <section class="stack-case-grid stack-case-grid--pdp">
        <div><p class="stack-case-eyebrow">06 / Product detail</p><h2>Material confidence without retail noise.</h2></div>
        <div><p>The product page pairs a large, isolated campaign image with the details required to decide: finish, quantity, dimensions, delivery, and repair logic.</p><p>The cart continues the system story by suggesting a compatible module rather than a generic bestseller.</p></div>
        <img src="images/stack/stack-lounge.webp" alt="Frame Lounge product image">
      </section>

      <section class="stack-case-live">
        <header><div><p class="stack-case-eyebrow">07 / Live prototype</p><h2>Try the actual store.</h2></div><p>Filter the collection, build a Grid system, change the lounge finish, and open the bag. This is the same canonical site used everywhere in the portfolio.</p></header>
        <div class="stack-case-live__browser"><div><span></span><span></span><span></span><p>stack-system.example</p></div><div class="stack-case-live__host" data-stack-live-project-host></div></div>
      </section>

      <section class="stack-case-grid stack-case-grid--responsive">
        <div><p class="stack-case-eyebrow">08 / Responsive behavior</p><h2>The hierarchy survives the smaller frame.</h2></div>
        <div><p>At tablet width, split sections stack without collapsing their rhythm. On phones, navigation becomes explicit, commerce controls remain touch-friendly, and the cart uses the full usable width.</p></div>
        <div class="stack-case-devices"><span><b>Desktop</b>3-column collection<br>Split-screen builder</span><span><b>Tablet</b>2-column products<br>Stacked product detail</span><span><b>Phone</b>1-column store<br>Full-width cart</span></div>
      </section>

      <section class="stack-case-metrics"><div><p class="stack-case-eyebrow">09 / Measurement plan</p><h2>What success would mean.</h2></div><div><span><b>01</b>Builder completion rate</span><span><b>02</b>Product-to-bag conversion</span><span><b>03</b>Compatible add-on uptake</span><span><b>04</b>Mobile checkout intent</span></div><p>No invented launch results. These are the metrics the concept is designed to test if developed into a real commerce product.</p></section>

      <section class="stack-case-final"><img src="images/stack/stack-hero.webp" alt="The STACK modular living system"><div><p>Project 03 / Conclusion</p><h2>Built for the room after this one.</h2><span>Strategy / Identity / UX / Interface / Front-end</span></div></section>
    </article>`;
}

export function createProjectCase({ project, dialog, elements }) {
  if (!project || project.key !== "stack") throw new Error("STACK case module received the wrong project.");
  const controller = new AbortController();
  let previewFrame = null;
  let liveFrame = null;
  let previewObserver = null;
  let liveObserver = null;
  let raf = 0;
  let destroyed = false;

  elements.previewHost.innerHTML = previewMarkup();
  elements.bodyHost.innerHTML = caseMarkup();
  const previewHost = elements.previewHost.querySelector("[data-stack-case-preview-host]");
  const liveHost = elements.bodyHost.querySelector("[data-stack-live-project-host]");
  if (!previewHost || !liveHost) throw new Error("STACK case mount targets were not created.");

  previewFrame = ProjectFrame.mount(project.key, previewHost, { instance: "stack-case-preview", viewport: "desktop", width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT, interactive: false, loading: "eager", label: "STACK case-study website preview" });
  previewFrame.classList.add("stack-case-project-frame");
  function fitPreview() {
    raf = 0;
    if (destroyed || !previewFrame || !previewHost.clientWidth) return;
    const scale = Math.min(1, previewHost.clientWidth / PREVIEW_WIDTH);
    Object.assign(previewFrame.style, { position: "absolute", inset: "0 auto auto 0", width: `${PREVIEW_WIDTH}px`, minWidth: `${PREVIEW_WIDTH}px`, maxWidth: "none", height: `${PREVIEW_HEIGHT}px`, margin: "0", transformOrigin: "top left", transform: `scale(${scale})`, pointerEvents: "none" });
  }
  const scheduleFit = () => { if (!raf) raf = requestAnimationFrame(fitPreview); };
  if ("ResizeObserver" in window) { previewObserver = new ResizeObserver(scheduleFit); previewObserver.observe(previewHost); }
  else window.addEventListener("resize", scheduleFit, { passive: true, signal: controller.signal });
  scheduleFit();

  function mountLiveWebsite() {
    if (destroyed || liveFrame) return liveFrame;
    liveFrame = ProjectFrame.mount(project.key, liveHost, { instance: "stack-case-live", viewport: "responsive", width: 1200, height: 820, interactive: true, loading: "lazy", label: "STACK interactive case-study website" });
    Object.assign(liveFrame.style, { position: "absolute", inset: "0", width: "100%", minWidth: "0", maxWidth: "100%", height: "100%", margin: "0", transform: "none", pointerEvents: "auto" });
    return liveFrame;
  }
  if ("IntersectionObserver" in window) {
    liveObserver = new IntersectionObserver((entries, observer) => { if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); liveObserver = null; mountLiveWebsite(); } }, { root: dialog, rootMargin: "900px 0px", threshold: 0 });
    liveObserver.observe(liveHost);
  } else mountLiveWebsite();

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    controller.abort();
    previewObserver?.disconnect();
    liveObserver?.disconnect();
    if (raf) cancelAnimationFrame(raf);
    if (previewFrame) ProjectFrame.unmount(previewHost);
    if (liveFrame) ProjectFrame.unmount(liveHost);
    previewFrame = liveFrame = null;
  }
  return Object.freeze({ project, mountLiveWebsite, destroy });
}
