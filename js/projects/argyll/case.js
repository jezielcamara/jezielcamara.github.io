export const caseStyles = Object.freeze([
  "css/argyll-case-study.css?v=20260816-1"
]);

export const caseMeta = Object.freeze({
  modeClass: "argyll-active",
  kicker: "CLIENT WORK / HEALTHCARE",
  summary: "A clear, approachable website for an Edmonton wellness centre offering multidisciplinary care under one roof.",
  goal: "Help visitors understand the available services, find practical clinic information, and move confidently toward booking or contacting the centre.",
  pages: "Services / About / Contact / Booking",
  builtWith: "Wix"
});

function caseMarkup() {
  return `
    <article class="argyll-case-study">
      <section class="argyll-case-intro">
        <p class="argyll-case-label">01 / Overview</p>
        <div>
          <h2>Care begins with clarity.</h2>
          <p>Argyll Wellness Centre brings several healthcare services into one practice. The website gives prospective clients a straightforward way to understand that offer before they call or visit.</p>
        </div>
        <dl>
          <div><dt>Industry</dt><dd>Health and wellness</dd></div>
          <div><dt>Role</dt><dd>Website design and implementation</dd></div>
          <div><dt>Location</dt><dd>Edmonton, Alberta</dd></div>
        </dl>
      </section>

      <figure class="argyll-case-homepage">
        <img src="images/argyll/argyll-homepage.png" alt="Argyll Wellness Centre homepage with a prominent booking message">
        <figcaption>Homepage / Desktop view</figcaption>
      </figure>

      <section class="argyll-case-principles">
        <div>
          <p class="argyll-case-label">02 / Communication</p>
          <h2>Plain paths for people looking for help.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Lead with the benefit</strong><p>The opening message focuses on feeling and living better, giving the page an immediate human purpose.</p></li>
          <li><span>02</span><strong>Make services scannable</strong><p>Physiotherapy, chiropractic care, massage therapy, psychology, IV nutrient therapy, and acupuncture are presented as distinct choices.</p></li>
          <li><span>03</span><strong>Keep contact practical</strong><p>Phone, location, hours, and contact actions stay easy to find for visitors who are ready to take the next step.</p></li>
        </ol>
      </section>

      <section class="argyll-case-system">
        <p class="argyll-case-label">03 / Visual direction</p>
        <div>
          <h2>Professional without feeling clinical.</h2>
          <p>A blue and aqua palette carries the centre's identity across navigation and action elements. Rounded buttons soften the interface, while generous white space keeps service information approachable.</p>
        </div>
        <div class="argyll-case-swatches" aria-label="Website color palette">
          <span style="--swatch:#5f9dca"><b>Clear blue</b>#5F9DCA</span>
          <span style="--swatch:#63c7c5"><b>Wellness aqua</b>#63C7C5</span>
          <span style="--swatch:#ffffff"><b>White</b>#FFFFFF</span>
          <span style="--swatch:#202a31"><b>Charcoal</b>#202A31</span>
        </div>
      </section>

      <section class="argyll-case-result">
        <p class="argyll-case-label">04 / Live website</p>
        <h2>Built for real clinic information and real client decisions.</h2>
        <p>The delivered website brings the practice, services, team information, and contact details into one consistent destination.</p>
        <a href="https://www.argyllwellnesscentre.com/" target="_blank" rel="noopener noreferrer">Visit the live website <span aria-hidden="true">↗</span></a>
      </section>
    </article>
  `;
}

export function createProjectCase({ project, elements }) {
  if (!project || project.key !== "argyll") {
    throw new Error("Argyll case module received the wrong project.");
  }

  elements.previewHost.innerHTML = `
    <div class="argyll-case-preview">
      <img src="images/argyll/argyll-homepage.png" alt="Argyll Wellness Centre website preview">
    </div>
  `;
  elements.bodyHost.innerHTML = caseMarkup();

  return Object.freeze({
    project,
    destroy() {
      elements.previewHost.replaceChildren();
      elements.bodyHost.replaceChildren();
    }
  });
}
