import { ProjectRegistry } from "../../core/project-registry.js";
import { STACK_COMMERCE_KEY, createStackSite, initializeStackSite } from "./site.js?v=20260814-1";

export const stackProject = ProjectRegistry.register({
  key: STACK_COMMERCE_KEY,
  status: "published",
  name: "STACK",
  index: "03",
  category: "ECOMMERCE",
  type: "MODULAR FURNITURE",
  url: "stack-system.example",
  featured: true,
  styles: ["css/stack.css?v=20260814-3"],
  work: { pages: "Shop / Builder / Product / Journal" },
  viewer: {
    description: "SELF-INITIATED ECOMMERCE CONCEPT / INTERACTIVE PROTOTYPE",
    state: "CONCEPT STORE"
  },
  lab: {
    enabled: true,
    minWidth: 320,
    maxWidth: 1100,
    defaultWidth: 1000,
    intro: "Drag the slider to see STACK reorganize its editorial commerce system, product grid, configurator, and product detail experience.",
    phone: { maxWidth: 480, label: "Phone", text: "Phone: STACK becomes a focused single-column store with compact controls, stacked products, and a full-width configuration flow." },
    tablet: { maxWidth: 760, label: "Tablet", text: "Tablet: STACK preserves its editorial contrast while shifting the collection, builder, and product detail into paired and stacked layouts." },
    desktop: { label: "Desktop", text: "Desktop: STACK uses cinematic imagery, a disciplined modular grid, and a split-screen builder to connect brand story with commerce." }
  },
  createSite: createStackSite,
  initialize: initializeStackSite,
  loadCase: () => import("./case.js?v=20260814-2")
});
