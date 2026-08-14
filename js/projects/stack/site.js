export const STACK_COMMERCE_KEY = "stack";

const PRODUCT_DATA = Object.freeze([
  { id: "frame-lounge", name: "Frame Lounge", type: "living", price: 46800, image: "images/stack/stack-lounge.webp", note: "New configuration" },
  { id: "span-console", name: "Span Console", type: "living", price: 52900, image: "images/stack/stack-shelving.webp", note: "Modular storage" },
  { id: "rail-workstation", name: "Rail Workstation", type: "work", price: 61400, image: "images/stack/stack-workspace.webp", note: "Workspace system" },
  { id: "grid-shelf", name: "Grid Shelf 04", type: "storage", price: 74900, image: "images/stack/stack-shelving.webp", note: "Bestseller" },
  { id: "block-ottoman", name: "Block Ottoman", type: "living", price: 18900, image: "images/stack/stack-lounge.webp", note: "Add-on module" },
  { id: "rail-desk", name: "Rail Desk 02", type: "work", price: 44300, image: "images/stack/stack-workspace.webp", note: "Compact footprint" }
]);

const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);

function productCards() {
  return PRODUCT_DATA.map((product, index) => `
    <article class="stack-product stack-reveal" data-stack-product data-type="${product.type}">
      <a href="#stack-product" aria-label="View ${product.name}">
        <span class="stack-product__image">
          <img src="${product.image}" alt="${product.name}, a modular STACK furniture piece" loading="lazy">
          <span>${String(index + 1).padStart(2, "0")}</span>
        </span>
        <span class="stack-product__meta">
          <span><strong>${product.name}</strong><small>${product.note}</small></span>
          <span>${money(product.price)}</span>
        </span>
      </a>
    </article>
  `).join("");
}

const SITE_MARKUP = `
  <div class="stack-site" data-canonical-project="stack">
    <header class="stack-header">
      <a class="stack-wordmark" href="#stack-home" aria-label="STACK home">STACK<span>®</span></a>
      <button class="stack-menu" type="button" data-stack-menu aria-expanded="false" aria-controls="stack-nav">Menu</button>
      <nav id="stack-nav" class="stack-nav" aria-label="Store navigation">
        <a href="#stack-collection">Collection</a>
        <a href="#stack-builder">Build yours</a>
        <a href="#stack-journal">Journal</a>
      </nav>
      <div class="stack-actions">
        <button type="button" aria-label="Search the concept store">Search</button>
        <button type="button" data-stack-cart-open>Bag <span data-stack-count>0</span></button>
      </div>
    </header>

    <main>
      <section class="stack-hero" id="stack-home">
        <img src="images/stack/stack-hero.webp" alt="A compact apartment furnished with the STACK modular system">
        <div class="stack-hero__shade"></div>
        <div class="stack-hero__content stack-reveal">
          <p>Furniture for spaces in motion / 2026</p>
          <h1>Your space changes.<br>Your furniture should too.</h1>
          <a class="stack-link stack-link--light" href="#stack-builder">Build your system <span>↗</span></a>
        </div>
        <p class="stack-hero__caption">01 / The living system<br>Smoked oak · Carbon textile · Bronze</p>
      </section>

      <section class="stack-manifesto stack-reveal" aria-label="Brand statement">
        <p>One rail. Many lives.</p>
        <h2>We make considered furniture that adapts before it gets replaced.</h2>
        <p class="stack-manifesto__body">A modular system for compact rooms, changing routines, and objects worth keeping. Start with what you need. Add only when life asks for more.</p>
      </section>

      <section class="stack-spaces" aria-labelledby="stack-spaces-title">
        <div class="stack-section-head stack-reveal">
          <p>Shop by space</p>
          <h2 id="stack-spaces-title">Made to move<br>through the home.</h2>
        </div>
        <div class="stack-spaces__grid">
          <a class="stack-space stack-space--wide stack-reveal" href="#stack-collection" data-stack-go-filter="living">
            <img src="images/stack/stack-hero.webp" alt="Modular furniture arranged in a living room" loading="lazy">
            <span><strong>Living</strong><small>12 systems</small></span>
          </a>
          <a class="stack-space stack-reveal" href="#stack-collection" data-stack-go-filter="work">
            <img src="images/stack/stack-workspace.webp" alt="A modular workstation in a compact apartment" loading="lazy">
            <span><strong>Work</strong><small>08 systems</small></span>
          </a>
          <a class="stack-space stack-reveal" href="#stack-collection" data-stack-go-filter="storage">
            <img src="images/stack/stack-shelving.webp" alt="An adaptable modular shelving wall" loading="lazy">
            <span><strong>Storage</strong><small>10 systems</small></span>
          </a>
        </div>
      </section>

      <section class="stack-collection" id="stack-collection" aria-labelledby="stack-collection-title">
        <div class="stack-section-head stack-reveal">
          <p>Core collection / 01—06</p>
          <h2 id="stack-collection-title">Pieces with<br>more than one future.</h2>
        </div>
        <div class="stack-filter" role="group" aria-label="Filter collection">
          <button type="button" data-stack-filter="all" aria-pressed="true">All</button>
          <button type="button" data-stack-filter="living" aria-pressed="false">Living</button>
          <button type="button" data-stack-filter="work" aria-pressed="false">Work</button>
          <button type="button" data-stack-filter="storage" aria-pressed="false">Storage</button>
        </div>
        <div class="stack-products" data-stack-products>${productCards()}</div>
      </section>

      <section class="stack-builder" id="stack-builder" aria-labelledby="stack-builder-title">
        <div class="stack-builder__visual stack-reveal">
          <img src="images/stack/stack-shelving.webp" alt="STACK shelving system being configured" data-stack-builder-image>
          <span data-stack-dimensions>2400 W × 420 D × 2100 H</span>
        </div>
        <div class="stack-builder__panel stack-reveal">
          <p>System builder / Live prototype</p>
          <h2 id="stack-builder-title">Build around<br>the way you live.</h2>
          <div class="stack-builder__step">
            <span>01 / Width</span>
            <div role="group" aria-label="Choose system width">
              <button type="button" data-stack-option="width" data-value="160" aria-pressed="false">160 cm</button>
              <button type="button" data-stack-option="width" data-value="240" aria-pressed="true">240 cm</button>
              <button type="button" data-stack-option="width" data-value="320" aria-pressed="false">320 cm</button>
            </div>
          </div>
          <div class="stack-builder__step">
            <span>02 / Primary use</span>
            <div role="group" aria-label="Choose primary use">
              <button type="button" data-stack-option="use" data-value="display" aria-pressed="true">Display</button>
              <button type="button" data-stack-option="use" data-value="work" aria-pressed="false">Work</button>
              <button type="button" data-stack-option="use" data-value="media" aria-pressed="false">Media</button>
            </div>
          </div>
          <div class="stack-builder__step">
            <span>03 / Finish</span>
            <div role="group" aria-label="Choose finish">
              <button class="stack-swatch stack-swatch--carbon" type="button" data-stack-option="finish" data-value="Carbon oak" aria-pressed="true"><span></span>Carbon oak</button>
              <button class="stack-swatch stack-swatch--natural" type="button" data-stack-option="finish" data-value="Natural oak" aria-pressed="false"><span></span>Natural oak</button>
            </div>
          </div>
          <div class="stack-builder__summary" aria-live="polite">
            <span><small>Configuration</small><strong data-stack-configuration>Grid 240 / Display / Carbon oak</strong></span>
            <strong data-stack-builder-price>${money(74900)}</strong>
          </div>
          <button class="stack-button" type="button" data-stack-builder-add>Add configuration to bag <span>↗</span></button>
        </div>
      </section>

      <section class="stack-pdp" id="stack-product" aria-labelledby="stack-pdp-title">
        <div class="stack-pdp__gallery stack-reveal">
          <img src="images/stack/stack-lounge.webp" alt="Frame Lounge in charcoal fabric">
          <span>Frame Lounge / Carbon textile</span>
        </div>
        <div class="stack-pdp__details stack-reveal">
          <p>Living / Seating / FL—01</p>
          <h2 id="stack-pdp-title">Frame Lounge</h2>
          <strong>${money(46800)}</strong>
          <p>Two upholstered volumes, one honest frame. Reconfigure the seat, extend it with a block, or repair each component independently.</p>
          <fieldset>
            <legend>Upholstery <span data-stack-finish-name>Carbon weave</span></legend>
            <button class="stack-finish stack-finish--carbon" type="button" data-stack-finish="Carbon weave" aria-pressed="true" aria-label="Carbon weave"></button>
            <button class="stack-finish stack-finish--clay" type="button" data-stack-finish="Clay wool" aria-pressed="false" aria-label="Clay wool"></button>
            <button class="stack-finish stack-finish--oat" type="button" data-stack-finish="Oat bouclé" aria-pressed="false" aria-label="Oat boucle"></button>
          </fieldset>
          <div class="stack-pdp__buy">
            <div class="stack-quantity" aria-label="Quantity selector">
              <button type="button" data-stack-qty="minus" aria-label="Decrease quantity">−</button>
              <output data-stack-quantity>1</output>
              <button type="button" data-stack-qty="plus" aria-label="Increase quantity">+</button>
            </div>
            <button class="stack-button" type="button" data-stack-product-add>Add to bag <span>↗</span></button>
          </div>
          <details open><summary>Dimensions & care</summary><p>780 W × 830 D × 710 H mm. Removable covers. Wipe the oak frame with a dry cloth.</p></details>
          <details><summary>Delivery</summary><p>Concept delivery estimate: 4–6 weeks. Modules arrive separately for easier access.</p></details>
          <details><summary>Designed for repair</summary><p>Frames, covers, cushions, and connectors can be replaced as independent parts.</p></details>
        </div>
      </section>

      <section class="stack-journal" id="stack-journal" aria-labelledby="stack-journal-title">
        <div class="stack-journal__lead stack-reveal">
          <p>Notes on adaptable living / Issue 01</p>
          <h2 id="stack-journal-title">The room is not finished.</h2>
          <p>Homes keep changing long after the floor plan is drawn. We designed a furniture system that expects that.</p>
          <a class="stack-link" href="#stack-home">Read the field note <span>↗</span></a>
        </div>
        <img class="stack-reveal" src="images/stack/stack-workspace.webp" alt="A compact workspace showing how furniture adapts" loading="lazy">
      </section>
    </main>

    <footer class="stack-footer">
      <a class="stack-wordmark" href="#stack-home">STACK<span>®</span></a>
      <p>Furniture for spaces in motion.<br>Designed in Manila / Concept 2026.</p>
      <nav aria-label="Footer links"><a href="#stack-collection">Collection</a><a href="#stack-builder">Builder</a><a href="#stack-journal">Journal</a></nav>
      <p>Self-initiated portfolio concept<br>No transactions are processed.</p>
    </footer>

    <div class="stack-cart-layer" data-stack-cart-layer hidden>
      <button class="stack-cart-overlay" type="button" data-stack-cart-close aria-label="Close bag"></button>
      <aside class="stack-cart" data-stack-cart role="dialog" aria-modal="true" aria-labelledby="stack-cart-title">
        <header><p id="stack-cart-title">Your bag / <span data-stack-cart-total-count>0</span></p><button type="button" data-stack-cart-close>Close</button></header>
        <div class="stack-cart__empty" data-stack-cart-empty><strong>Start with one piece.</strong><p>Your configuration will appear here.</p></div>
        <div class="stack-cart__items" data-stack-cart-items></div>
        <div class="stack-cart__upsell" data-stack-cart-upsell hidden>
          <img src="images/stack/stack-lounge.webp" alt="Block Ottoman compatible module">
          <span><small>Compatible with Frame Lounge</small><strong>Block Ottoman · ${money(18900)}</strong></span>
          <button type="button" data-stack-upsell-add aria-label="Add Block Ottoman">+</button>
        </div>
        <footer><span>Subtotal <strong data-stack-subtotal>${money(0)}</strong></span><button class="stack-button" type="button" data-stack-checkout disabled>Checkout concept <span>↗</span></button><small>Prototype only. No payment will be collected.</small></footer>
      </aside>
    </div>
  </div>
`;

export function createStackSite() {
  const template = document.createElement("template");
  template.innerHTML = SITE_MARKUP.trim();
  const site = template.content.firstElementChild;
  if (!site) throw new Error("STACK website factory could not create the site.");
  return site;
}

export function initializeStackSite(root) {
  if (!root?.matches?.('[data-canonical-project="stack"]')) return null;

  const controller = new AbortController();
  const { signal } = controller;
  const cart = [];
  let quantity = 1;
  let lastFocus = null;
  const builder = { width: "240", use: "display", finish: "Carbon oak" };
  const prices = { "160": 52900, "240": 74900, "320": 96900, work: 8400, media: 6200, "Natural oak": 4300 };
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const layer = $("[data-stack-cart-layer]");

  function smoothLink(event) {
    const href = event.currentTarget.getAttribute("href");
    const target = href?.startsWith("#") ? root.querySelector(href) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  $$("a[href^='#']").forEach((link) => link.addEventListener("click", smoothLink, { signal }));

  const menu = $("[data-stack-menu]");
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    root.classList.toggle("stack-menu-open", open);
  }, { signal });

  function applyFilter(filter) {
    $$("[data-stack-filter]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.stackFilter === filter)));
    $$("[data-stack-product]").forEach((card) => { card.hidden = filter !== "all" && card.dataset.type !== filter; });
  }
  $$("[data-stack-filter]").forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.stackFilter), { signal }));
  $$("[data-stack-go-filter]").forEach((link) => link.addEventListener("click", () => applyFilter(link.dataset.stackGoFilter), { signal }));

  function updateBuilder() {
    const label = `Grid ${builder.width} / ${builder.use[0].toUpperCase()}${builder.use.slice(1)} / ${builder.finish}`;
    const total = prices[builder.width] + (prices[builder.use] || 0) + (prices[builder.finish] || 0);
    $("[data-stack-configuration]").textContent = label;
    $("[data-stack-builder-price]").textContent = money(total);
    $("[data-stack-dimensions]").textContent = `${Number(builder.width) * 10} W × 420 D × 2100 H`;
    const image = $("[data-stack-builder-image]");
    image.src = builder.use === "work" ? "images/stack/stack-workspace.webp" : "images/stack/stack-shelving.webp";
    return { label, total };
  }
  $$("[data-stack-option]").forEach((button) => button.addEventListener("click", () => {
    const group = button.dataset.stackOption;
    builder[group] = button.dataset.value;
    $$(`[data-stack-option="${group}"]`).forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
    updateBuilder();
  }, { signal }));

  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $("[data-stack-count]").textContent = count;
    $("[data-stack-cart-total-count]").textContent = count;
    $("[data-stack-subtotal]").textContent = money(subtotal);
    $("[data-stack-cart-empty]").hidden = count > 0;
    $("[data-stack-cart-upsell]").hidden = count === 0;
    const checkout = $("[data-stack-checkout]");
    checkout.disabled = count === 0;
    $("[data-stack-cart-items]").innerHTML = cart.map((item, index) => `
      <article class="stack-cart-item">
        <img src="${item.image}" alt="">
        <span><small>${item.detail}</small><strong>${item.name}</strong><button type="button" data-stack-remove="${index}">Remove</button></span>
        <span>${item.quantity} × ${money(item.price)}</span>
      </article>`).join("");
    $$("[data-stack-remove]").forEach((button) => button.addEventListener("click", () => { cart.splice(Number(button.dataset.stackRemove), 1); renderCart(); }, { signal }));
  }

  function addItem(item) {
    const match = cart.find((entry) => entry.name === item.name && entry.detail === item.detail);
    if (match) match.quantity += item.quantity;
    else cart.push(item);
    renderCart();
    openCart();
  }
  function openCart() {
    lastFocus = document.activeElement;
    layer.hidden = false;
    requestAnimationFrame(() => { layer.classList.add("is-open"); $("[data-stack-cart-close]")?.focus(); });
  }
  function closeCart() {
    layer.classList.remove("is-open");
    setTimeout(() => { layer.hidden = true; }, 260);
    lastFocus?.focus?.();
  }
  $$("[data-stack-cart-open]").forEach((button) => button.addEventListener("click", openCart, { signal }));
  $$("[data-stack-cart-close]").forEach((button) => button.addEventListener("click", closeCart, { signal }));
  root.addEventListener("keydown", (event) => { if (event.key === "Escape" && !layer.hidden) closeCart(); }, { signal });

  $("[data-stack-builder-add]")?.addEventListener("click", () => {
    const config = updateBuilder();
    addItem({ name: "Grid System", detail: config.label, price: config.total, quantity: 1, image: "images/stack/stack-shelving.webp" });
  }, { signal });
  $$("[data-stack-finish]").forEach((button) => button.addEventListener("click", () => {
    $$("[data-stack-finish]").forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
    $("[data-stack-finish-name]").textContent = button.dataset.stackFinish;
  }, { signal }));
  $$("[data-stack-qty]").forEach((button) => button.addEventListener("click", () => {
    quantity = Math.max(1, Math.min(8, quantity + (button.dataset.stackQty === "plus" ? 1 : -1)));
    $("[data-stack-quantity]").textContent = quantity;
  }, { signal }));
  $("[data-stack-product-add]")?.addEventListener("click", () => addItem({ name: "Frame Lounge", detail: $("[data-stack-finish-name]").textContent, price: 46800, quantity, image: "images/stack/stack-lounge.webp" }), { signal });
  $("[data-stack-upsell-add]")?.addEventListener("click", () => addItem({ name: "Block Ottoman", detail: "Carbon weave", price: 18900, quantity: 1, image: "images/stack/stack-lounge.webp" }), { signal });
  $("[data-stack-checkout]")?.addEventListener("click", (event) => { event.currentTarget.innerHTML = "Prototype confirmed <span>✓</span>"; }, { signal });

  const reveals = $$(".stack-reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveals.forEach((item) => observer.observe(item));
    signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  } else reveals.forEach((item) => item.classList.add("is-visible"));

  updateBuilder();
  renderCart();
  return () => controller.abort();
}
