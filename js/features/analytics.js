const GOOGLE_MEASUREMENT_ID = "G-4E1B4ET6MC";
const CLARITY_PROJECT_ID = "y3akn96h5f";
const PRODUCTION_HOSTNAME = "jezielcamara.github.io";
const CONSENT_STORAGE_KEY = "jc-analytics-consent-v1";
const CONSENT_GRANTED = "granted";
const CONSENT_DENIED = "denied";

let analyticsEnabled = false;
let consentState = null;
let returnFocusElement = null;
let leadConfirmationPending = false;

function readConsent() {
  try {
    const savedConsent = window.localStorage.getItem(
      CONSENT_STORAGE_KEY
    );

    return savedConsent === CONSENT_GRANTED ||
      savedConsent === CONSENT_DENIED
      ? savedConsent
      : null;
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      value
    );
  } catch {
    return;
  }
}

function defineGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });
}

function loadExternalScript({ id, src }) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  script.referrerPolicy = "strict-origin-when-cross-origin";
  document.head.append(script);
}

function defineClarity() {
  window.clarity = window.clarity || function clarity() {
    window.clarity.q = window.clarity.q || [];
    window.clarity.q.push(arguments);
  };
}

function enableAnalytics() {
  if (analyticsEnabled) {
    return;
  }

  analyticsEnabled = true;

  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted"
  });

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const isProduction =
    window.location.hostname === PRODUCTION_HOSTNAME;

  if (isProduction) {
    loadExternalScript({
      id: "google-analytics-tag",
      src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`
    });
  }

  defineClarity();
  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted"
  });

  if (isProduction) {
    loadExternalScript({
      id: "microsoft-clarity-tag",
      src: `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
    });
  } else {
    document.documentElement.dataset.analyticsPreview = "enabled";
  }

  if (leadConfirmationPending) {
    trackEvent("generate_lead", {
      form_id: "contact-form"
    });
    leadConfirmationPending = false;
  }
}

function removeAnalyticsCookies() {
  const measurementCookie = GOOGLE_MEASUREMENT_ID.replace(
    "G-",
    ""
  );

  ["_ga", `_ga_${measurementCookie}`].forEach(
    (cookieName) => {
      document.cookie =
        `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`;
    }
  );
}

function disableAnalytics() {
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  if (typeof window.clarity === "function") {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied"
    });
    window.clarity("consent", false);
  }

  removeAnalyticsCookies();
  analyticsEnabled = false;
}

function cleanValue(value) {
  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  return String(value || "").trim().slice(0, 100);
}

function cleanParameters(parameters) {
  return Object.fromEntries(
    Object.entries(parameters)
      .filter(([key, value]) =>
        key && value !== undefined && value !== null
      )
      .map(([key, value]) => [key, cleanValue(value)])
  );
}

function trackEvent(name, parameters = {}) {
  if (
    !analyticsEnabled ||
    consentState !== CONSENT_GRANTED
  ) {
    return;
  }

  const eventName = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 40);

  if (!eventName) {
    return;
  }

  const eventParameters = cleanParameters(parameters);
  window.gtag("event", eventName, eventParameters);

  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);

    Object.entries(eventParameters)
      .slice(0, 8)
      .forEach(([key, value]) => {
        window.clarity("set", key, String(value));
      });
  }
}

function getPlacement(element) {
  if (element.closest(".hero-stage")) {
    return "hero";
  }

  if (element.closest(".side-rail")) {
    return "navigation";
  }

  if (element.closest(".case-dialog")) {
    return "case-study";
  }

  if (element.closest(".work-section")) {
    return "selected-work";
  }

  if (element.closest(".site-footer")) {
    return "footer";
  }

  return "page";
}

function trackClick(event) {
  const target = event.target instanceof Element
    ? event.target
    : null;

  if (!target) {
    return;
  }

  if (
    target.closest(
      "[data-analytics-accept], [data-analytics-decline], [data-analytics-manage]"
    )
  ) {
    return;
  }

  const projectAction = target.closest("[data-project-action]");

  if (projectAction) {
    const action = projectAction.dataset.projectAction;

    trackEvent(
      action === "case"
        ? "case_study_opened"
        : "project_preview_opened",
      {
        project: projectAction.dataset.project,
        placement: getPlacement(projectAction)
      }
    );
    return;
  }

  const contactLink = target.closest('a[href="#contact"]');

  if (contactLink) {
    trackEvent("start_project_clicked", {
      placement: getPlacement(contactLink)
    });
    return;
  }

  const nextProject = target.closest("#case-next");

  if (nextProject) {
    trackEvent("case_study_next_clicked", {
      project: nextProject.closest("[data-project]")
        ?.dataset.project || ""
    });
    return;
  }

  const link = target.closest("a[href]");

  if (!link) {
    return;
  }

  let destination;

  try {
    destination = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (destination.origin === window.location.origin) {
    if (destination.hash) {
      trackEvent("navigation_clicked", {
        destination: destination.hash.slice(1) || "home",
        placement: getPlacement(link)
      });
    }
    return;
  }

  const project = link.closest("[data-project]")
    ?.dataset.project || "";

  const eventName = project
    ? "project_website_clicked"
    : destination.hostname === "github.com"
      ? "social_link_clicked"
      : "outbound_link_clicked";

  trackEvent(eventName, {
    project,
    link_domain: destination.hostname,
    placement: getPlacement(link)
  });
}

function prepareLeadConfirmation() {
  const url = new URL(window.location.href);

  leadConfirmationPending =
    url.searchParams.get("sent") === "1";

  if (!leadConfirmationPending) {
    return;
  }

  url.searchParams.delete("sent");
  window.history.replaceState(
    null,
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
}

export function initAnalytics() {
  const consentPanel = document.querySelector(
    "#analytics-consent"
  );
  const acceptButton = consentPanel?.querySelector(
    "[data-analytics-accept]"
  );
  const declineButton = consentPanel?.querySelector(
    "[data-analytics-decline]"
  );
  const manageButton = document.querySelector(
    "[data-analytics-manage]"
  );
  const contactForm = document.querySelector("#contact-form");

  if (
    !consentPanel ||
    !acceptButton ||
    !declineButton ||
    !manageButton
  ) {
    return null;
  }

  defineGoogleTag();
  prepareLeadConfirmation();
  consentState = readConsent();

  document.documentElement.dataset.analyticsConsent =
    consentState || "unset";

  function openConsentPanel(trigger = null) {
    returnFocusElement = trigger;
    consentPanel.hidden = false;

    window.requestAnimationFrame(() => {
      acceptButton.focus();
    });
  }

  function closeConsentPanel() {
    consentPanel.hidden = true;

    if (
      returnFocusElement &&
      returnFocusElement.isConnected
    ) {
      returnFocusElement.focus();
    }

    returnFocusElement = null;
  }

  function chooseConsent(value) {
    const previousConsent = consentState;
    consentState = value;
    saveConsent(value);
    document.documentElement.dataset.analyticsConsent = value;

    if (value === CONSENT_GRANTED) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    closeConsentPanel();

    if (
      previousConsent === CONSENT_GRANTED &&
      value === CONSENT_DENIED
    ) {
      window.location.reload();
    }
  }

  function handleAccept() {
    chooseConsent(CONSENT_GRANTED);
  }

  function handleDecline() {
    chooseConsent(CONSENT_DENIED);
  }

  function handleManage() {
    openConsentPanel(manageButton);
  }

  function handlePanelKeydown(event) {
    if (event.key === "Escape" && consentState) {
      closeConsentPanel();
    }
  }

  acceptButton.addEventListener("click", handleAccept);
  declineButton.addEventListener("click", handleDecline);
  manageButton.addEventListener("click", handleManage);
  consentPanel.addEventListener("keydown", handlePanelKeydown);
  document.addEventListener("click", trackClick);

  let formStarted = false;

  function handleFormStart() {
    if (formStarted) {
      return;
    }

    formStarted = true;
    trackEvent("contact_form_started", {
      form_id: "contact-form"
    });
  }

  function handleFormSubmit() {
    trackEvent("contact_form_submitted", {
      form_id: "contact-form"
    });
  }

  contactForm?.addEventListener("focusin", handleFormStart);
  contactForm?.addEventListener("submit", handleFormSubmit);

  if (consentState === CONSENT_GRANTED) {
    enableAnalytics();
  } else if (!consentState) {
    openConsentPanel();
  }

  return {
    destroy() {
      acceptButton.removeEventListener("click", handleAccept);
      declineButton.removeEventListener("click", handleDecline);
      manageButton.removeEventListener("click", handleManage);
      consentPanel.removeEventListener(
        "keydown",
        handlePanelKeydown
      );
      document.removeEventListener("click", trackClick);
      contactForm?.removeEventListener(
        "focusin",
        handleFormStart
      );
      contactForm?.removeEventListener(
        "submit",
        handleFormSubmit
      );
    }
  };
}
