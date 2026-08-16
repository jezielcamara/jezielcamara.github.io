export const ARGYLL_WELLNESS_KEY = "argyll";

export function createArgyllWellnessSite() {
  const preview = document.createElement("div");
  preview.className = "argyll-project-preview";
  preview.innerHTML = `
    <img
      src="images/argyll/argyll-homepage.png"
      alt="Argyll Wellness Centre homepage"
    >
  `;
  return preview;
}
