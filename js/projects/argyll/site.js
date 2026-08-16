export const ARGYLL_WELLNESS_KEY = "argyll";

export function createArgyllWellnessSite() {
  const preview = document.createElement("div");
  preview.className = "argyll-project-preview";
  preview.innerHTML = `
    <img
      class="argyll-project-preview__desktop"
      src="images/argyll/argyll-homepage.png"
      alt="Argyll Wellness Centre homepage"
    >

    <div class="argyll-mobile-preview" aria-label="Argyll Wellness Centre mobile homepage">
      <header class="argyll-mobile-preview__header">
        <button type="button" aria-label="Open menu"><span></span><span></span><span></span></button>
        <div class="argyll-mobile-preview__brand" aria-label="Argyll Wellness Centre">
          <i aria-hidden="true"></i>
          <strong>ARGYLL</strong>
          <small>WELLNESS CENTRE</small>
        </div>
        <a href="tel:+17802492451" aria-label="Call Argyll Wellness Centre">Call</a>
      </header>

      <section class="argyll-mobile-preview__hero">
        <img src="images/argyll/argyll-homepage.png" alt="People exercising in a wellness studio">
        <div aria-hidden="true"></div>
        <article>
          <p>YOUR WELL-BEING COMES FIRST</p>
          <h1>Feel Better.<br>Live Better.</h1>
          <span>Your well-being is at the heart of everything we do.</span>
          <a href="https://www.argyllwellnesscentre.com/">Book Now</a>
        </article>
      </section>

      <section class="argyll-mobile-preview__services">
        <small>ARGYLL WELLNESS CENTRE</small>
        <h2>Care for the way you live.</h2>
      </section>
    </div>
  `;
  return preview;
}
