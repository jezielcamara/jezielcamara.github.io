import { ProjectRegistry } from "../../core/project-registry.js";
import { ARGYLL_WELLNESS_KEY, createArgyllWellnessSite } from "./site.js";

export const argyllWellnessProject = ProjectRegistry.register({
  key: ARGYLL_WELLNESS_KEY,
  status: "published",
  name: "Argyll Wellness Centre",
  index: "04",
  category: "HEALTHCARE",
  type: "CLIENT WEBSITE",
  url: "www.argyllwellnesscentre.com",
  featured: false,
  styles: ["css/argyll-preview.css?v=20260816-2"],
  work: {
    pages: "Services / About / Contact / Booking",
    websiteUrl: "https://www.argyllwellnesscentre.com/"
  },
  viewer: {
    enabled: false
  },
  lab: {
    enabled: false
  },
  createSite: createArgyllWellnessSite,
  loadCase: () => import("./case.js?v=20260816-1")
});
