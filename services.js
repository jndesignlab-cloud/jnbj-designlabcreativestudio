const SITE_VERSION = "3.6.5";
const LAST_EDIT = "July 19, 2026";

const categoryTriggers = [...document.querySelectorAll("[data-service-panel]")];
const categoryPanels = [...document.querySelectorAll("[data-service-section]")];
const itemTriggers = [...document.querySelectorAll("[data-service-item]")];
const modal = document.querySelector("#serviceModal");
const modalContent = document.querySelector("#serviceModalContent");
const modalDialog = modal?.querySelector(".service-modal-dialog");
let lastServiceTrigger = null;

const FINDER_RECOMMENDATIONS = {
  content: { category: "Design Package", name: "Brand Growth", description: "A stronger content package for active brands that need several coordinated posts and a more recognizable visual direction.", tags: ["15 static pubmats", "3 carousels", "Priority revisions"], item: "brand-growth", step: "01 / 04" },
  launch: { category: "Campaign Package", name: "Full Content System", description: "A coordinated visual system for launches, enrollment drives, promotions, and month-long campaigns with several formats.", tags: ["20–25 pubmats", "4–6 carousels", "Story versions"], item: "full-content-system", step: "02 / 04" },
  focused: { category: "Individual Service", name: "Social Media Design", description: "A focused creative service for one clear announcement, promotion, campaign message, or branded post.", tags: ["Custom layout", "Brand-aligned", "Ready to post"], item: "social-media-design", step: "03 / 04" },
  web: { category: "Website Package", name: "Business Landing Page", description: "A complete business landing page with custom direction, inquiry form, analytics, and practical lead-capture features.", tags: ["Up to 8 sections", "Inquiry form", "Analytics"], item: "business-landing-page", step: "04 / 04" }
};

const SERVICE_DETAILS = {
  "content-essentials": {
    eyebrow: "Design Package",
    title: "Content Essentials",
    price: "₱3,500",
    priceNote: "Approx. $60 USD",
    intro: "A compact starter package for brands that need a reliable batch of social content without committing to a larger monthly system.",
    bestFor: "Small businesses, new pages, short campaigns, and brands preparing their first organized content batch.",
    includes: ["1 carousel post", "8 static social media pubmats", "Up to 3 revisions per design", "Custom layout direction", "Organized Google Drive delivery"],
    note: "Final scheduling depends on the approved brief, content availability, and revision turnaround.",
    cta: "Inquire about Content Essentials",
    href: "contact.html?source=service-modal&service=Design%20Packages&package=Content%20Essentials"
  },
  "brand-growth": {
    eyebrow: "Design Package · Client Favorite",
    title: "Brand Growth",
    price: "₱7,500",
    priceNote: "Approx. $120 USD",
    intro: "A stronger content package for brands that need consistent visual output across several posts and campaign angles.",
    bestFor: "Growing businesses, service brands, product launches, and pages that need a more recognizable visual direction.",
    includes: ["15 static social media pubmats", "3 carousel posts", "Priority revisions", "Stronger brand consistency", "Campaign-style creative direction", "Organized Google Drive delivery"],
    note: "This package works best when copy, offers, photos, and campaign dates are prepared before production begins.",
    cta: "Choose Brand Growth",
    href: "contact.html?source=service-modal&service=Design%20Packages&package=Brand%20Growth"
  },
  "full-content-system": {
    eyebrow: "Design Package",
    title: "Full Content System",
    price: "₱12,000",
    priceNote: "Approx. $190 USD",
    intro: "A complete visual content package for brands that need a larger, coordinated campaign rather than isolated graphics.",
    bestFor: "Month-long content plans, enrollment or launch campaigns, recurring promotions, and brands managing multiple content formats.",
    includes: ["20–25 static pubmats", "4–6 carousel posts", "Story versions included", "Priority turnaround", "Brand consistency supervision", "Organized content folders"],
    note: "The final number of outputs depends on complexity, format mix, and the approved campaign scope.",
    cta: "Build a Full Content System",
    href: "contact.html?source=service-modal&service=Design%20Packages&package=Full%20Content%20System"
  },
  "social-media-design": {
    eyebrow: "Individual Service",
    title: "Social Media Design",
    price: "Starts at ₱350",
    priceNote: "Per static artwork",
    intro: "Single-format social media graphics designed around your brand, announcement, offer, or campaign message.",
    bestFor: "Announcements, promotions, quotations, event reminders, product highlights, and regular branded posting.",
    includes: ["One approved canvas size", "Custom layout based on supplied content", "Brand-aligned typography and color", "Export-ready JPG or PNG", "Source file terms based on project agreement"],
    note: "Complex infographics, multiple sizes, heavy photo manipulation, or rush work may require a separate quote.",
    cta: "Request Social Media Design",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Social%20Media%20Design"
  },
  "carousel-design": {
    eyebrow: "Individual Service",
    title: "Carousel Design",
    price: "Starts at ₱800",
    priceNote: "Based on slide count and complexity",
    intro: "A connected set of slides for educational, promotional, storytelling, or campaign content.",
    bestFor: "LinkedIn posts, Facebook and Instagram education, service explainers, product benefits, and step-by-step content.",
    includes: ["Cohesive visual direction", "Cover and supporting slides", "Readable hierarchy and pacing", "Platform-ready exports", "Basic slide-flow recommendations"],
    note: "Copywriting, research-heavy content, and extended slide counts are quoted separately.",
    cta: "Request a Carousel",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Carousel%20Design"
  },
  "poster-event-design": {
    eyebrow: "Individual Service",
    title: "Poster & Event Design",
    price: "₱500–₱1,500",
    priceNote: "Depends on detail and format",
    intro: "Promotional posters and event visuals designed to make schedules, announcements, and key information easy to understand.",
    bestFor: "Institutional events, seminars, enrollment campaigns, competitions, product promotions, and public announcements.",
    includes: ["One main visual direction", "Clear information hierarchy", "Brand-aligned styling", "Digital or print-ready export", "Optional size adaptations by quote"],
    note: "Large-format print, extensive photo compositing, and multiple derivatives may increase the final rate.",
    cta: "Discuss a Poster Project",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Poster%20and%20Event%20Design"
  },
  "logo-design": {
    eyebrow: "Individual Service",
    title: "Logo Design",
    price: "₱2,500–₱5,000",
    priceNote: "Based on scope",
    intro: "A focused logo-development service for new brands, small businesses, or projects that need a clear visual mark.",
    bestFor: "Startups, local businesses, product names, personal brands, and small service companies.",
    includes: ["Creative direction based on the brief", "Primary logo concept", "Basic alternate version", "Color and monochrome exports", "Final files for common digital use"],
    note: "Full brand strategy, naming, extensive guidelines, and trademark services are not included unless quoted separately.",
    cta: "Start a Logo Project",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Logo%20Design"
  },
  "packaging-design": {
    eyebrow: "Individual Service",
    title: "Packaging Design",
    price: "Starts at ₱3,000",
    priceNote: "Per packaging scope",
    intro: "Packaging visuals developed around the product, required information, dimensions, and production specifications.",
    bestFor: "Small product launches, labels, boxes, pouches, sleeves, and branded product presentation.",
    includes: ["Front-facing visual direction", "Required information placement", "Production-size layout", "Print-ready export", "Basic mockup presentation when applicable"],
    note: "Dielines, regulatory copy, professional product photography, and multiple variants may require added fees.",
    cta: "Discuss Packaging Design",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Packaging%20Design"
  },
  "story-adaptation": {
    eyebrow: "Individual Add-on",
    title: "Story Adaptation",
    price: "₱150 each",
    priceNote: "For an approved existing design",
    intro: "An existing approved graphic is reformatted into a vertical story layout while keeping the important content readable.",
    bestFor: "Facebook Stories, Instagram Stories, campaign reminders, event countdowns, and vertical reposting.",
    includes: ["9:16 resize", "Layout rebalancing", "Safe-area adjustment", "Export-ready story file"],
    note: "This rate applies to adaptations, not completely new story designs.",
    cta: "Request Story Adaptations",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Story%20Adaptation"
  },
  "motion-graphics": {
    eyebrow: "Individual Service",
    title: "Simple Motion Graphics",
    price: "Starts at ₱800",
    priceNote: "Based on duration and complexity",
    intro: "Basic animation applied to text, graphics, or an existing visual for social media and presentation use.",
    bestFor: "Animated announcements, logo reveals, promotional loops, countdowns, and simple presentation visuals.",
    includes: ["Simple movement and transitions", "Short-form export", "Platform-appropriate format", "One approved visual direction"],
    note: "Character animation, advanced compositing, full video editing, and complex sound design require a custom quote.",
    cta: "Request Simple Animation",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Simple%20Motion%20Graphics"
  },
  "rush-delivery": {
    eyebrow: "Priority Add-on",
    title: "Rush Delivery",
    price: "+30%",
    priceNote: "Added to the qualified project fee",
    intro: "Priority scheduling for selected projects with deadlines under three working days.",
    bestFor: "Urgent announcements, last-minute campaigns, event materials, and time-sensitive promotional requirements.",
    includes: ["Priority production slot", "Compressed review schedule", "Clear delivery deadline", "Availability confirmation before payment"],
    note: "Rush acceptance depends on current workload, project complexity, and how complete the submitted materials are.",
    cta: "Check Rush Availability",
    href: "contact.html?source=service-modal&service=Individual%20Services&package=Rush%20Delivery"
  },
  "launch-landing-page": {
    eyebrow: "Website Package",
    title: "Launch Landing Page",
    price: "₱12,000",
    priceNote: "Approx. $210 USD",
    intro: "A clean one-page website for introducing a service, project, event, product, or professional profile.",
    bestFor: "New businesses, personal brands, campaigns, portfolios, and focused service presentations.",
    includes: ["One responsive landing page", "Up to 5 content sections", "Brand colors and typography", "Contact and social links", "Basic SEO and social preview setup", "GitHub Pages deployment", "2 revision rounds"],
    note: "Domain, hosting beyond GitHub Pages, copywriting, and third-party integrations are quoted separately.",
    cta: "Start a Launch Landing Page",
    href: "contact.html?source=service-modal&service=Static%20Website%20Package&package=Launch%20Landing%20Page"
  },
  "business-landing-page": {
    eyebrow: "Website Package · Recommended",
    title: "Business Landing Page",
    price: "₱18,000",
    priceNote: "Approx. $310 USD",
    intro: "A more complete business landing page with custom direction, lead capture, and practical supporting features.",
    bestFor: "Service businesses, creative studios, consultants, local companies, and campaigns that need inquiries.",
    includes: ["One custom responsive landing page", "Up to 8 content sections", "Custom visual and layout direction", "Inquiry form integration", "Basic visitor analytics", "Subtle interactions and animations", "SEO and deployment setup", "3 revision rounds"],
    note: "Advanced databases, user accounts, online payments, and custom backend systems require a separate development quote.",
    cta: "Choose Business Landing Page",
    href: "contact.html?source=service-modal&service=Static%20Website%20Package&package=Business%20Landing%20Page"
  },
  "premium-landing-system": {
    eyebrow: "Website Package",
    title: "Premium Landing System",
    price: "₱25,000",
    priceNote: "Approx. $430 USD",
    intro: "A conversion-focused landing system with more sections, stronger content hierarchy, and an advanced inquiry workflow.",
    bestFor: "Campaign launches, premium services, institutional microsites, and businesses needing a more complete lead journey.",
    includes: ["One premium responsive landing page", "Up to 10 structured sections", "Conversion-focused hierarchy", "Advanced inquiry or registration form", "Analytics and visit tracking", "Performance and image optimization", "Custom-domain deployment support", "4 revision rounds", "30 days of minor support"],
    note: "Complex custom applications, e-commerce, and content-management dashboards require separate scoping.",
    cta: "Plan a Premium Landing System",
    href: "contact.html?source=service-modal&service=Static%20Website%20Package&package=Premium%20Landing%20System"
  },
  "custom-project": {
    eyebrow: "Custom Project",
    title: "Build a custom creative scope",
    price: "Custom quote",
    priceNote: "Based on deliverables, complexity, and timeline",
    intro: "Combine the exact design, web, publication, packaging, or adaptation support your project requires.",
    bestFor: "Campaigns with mixed deliverables, unusual formats, recurring creative support, and projects that do not fit a standard package.",
    includes: ["Recommended deliverable mix", "Clear project scope", "Timeline and revision plan", "Itemized estimate", "Organized production and delivery workflow"],
    note: "Share the project goals, required formats, deadline, and available assets so the scope can be estimated accurately.",
    cta: "Start a Custom Inquiry",
    href: "contact.html?source=service-modal&service=Custom%20Project"
  }
};

function setFooterMeta() {
  const year = document.querySelector("#year");
  const version = document.querySelector("#siteVersion");
  const lastEdit = document.querySelector("#lastEdit");
  if (year) year.textContent = new Date().getFullYear();
  if (version) version.textContent = SITE_VERSION;
  if (lastEdit) lastEdit.textContent = LAST_EDIT;
}

function showCategory(panelId, trigger = null, updateHash = true) {
  categoryPanels.forEach((panel) => {
    const active = panel.id === panelId;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  categoryTriggers.forEach((button) => {
    const active = button.dataset.servicePanel === panelId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-expanded", String(active));
  });
  if (updateHash) history.replaceState(null, "", `#${panelId}`);
  const panel = document.getElementById(panelId);
  if (trigger && panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderServiceModal(detail) {
  const list = detail.includes.map((item) => `<li>${item}</li>`).join("");
  return `
    <div class="service-detail-modal-layout">
      <div class="service-detail-modal-head">
        <p class="eyebrow">${detail.eyebrow}</p>
        <h2>${detail.title}</h2>
        <div class="service-detail-price"><strong>${detail.price}</strong><span>${detail.priceNote}</span></div>
        <p class="service-detail-intro">${detail.intro}</p>
      </div>
      <div class="service-detail-modal-grid">
        <section><span class="service-detail-label">Best for</span><p>${detail.bestFor}</p></section>
        <section><span class="service-detail-label">What is included</span><ul>${list}</ul></section>
      </div>
      <div class="service-detail-note"><strong>Before starting</strong><p>${detail.note}</p></div>
      <div class="service-detail-modal-cta">
        <div><strong>Ready to discuss this service?</strong><span>Your selection will be pre-filled in the inquiry form.</span></div>
        <a class="btn btn-primary service-modal-cta-button" href="${detail.href}"><span>${detail.cta}</span><b aria-hidden="true">↗</b></a>
      </div>
    </div>`;
}

function openServiceModal(itemId, trigger = null) {
  const detail = SERVICE_DETAILS[itemId];
  if (!detail || !modal || !modalContent) return;
  lastServiceTrigger = trigger;
  modalContent.innerHTML = renderServiceModal(detail);
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modalDialog?.focus());
}

function closeServiceModal({ restoreFocus = true } = {}) {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (restoreFocus) lastServiceTrigger?.focus();
}

categoryTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => showCategory(trigger.dataset.servicePanel, trigger));
});

itemTriggers.forEach((trigger) => {
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.addEventListener("click", () => openServiceModal(trigger.dataset.serviceItem, trigger));
});

document.querySelectorAll("[data-close-service-modal]").forEach((element) => {
  element.addEventListener("click", () => closeServiceModal());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("active")) closeServiceModal();
});

const finderGoals = [...document.querySelectorAll("[data-brief-goal]")];
const finderCategory = document.querySelector("#finderCategory");
const finderName = document.querySelector("#finderName");
const finderDescription = document.querySelector("#finderDescription");
const finderTags = document.querySelector("#finderTags");
const finderOpen = document.querySelector("#finderOpen");
const finderStep = document.querySelector(".finder-step");

function updateFinder(goalKey) {
  const recommendation = FINDER_RECOMMENDATIONS[goalKey];
  if (!recommendation) return;
  finderGoals.forEach((button) => {
    const active = button.dataset.briefGoal === goalKey;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (finderCategory) finderCategory.textContent = recommendation.category;
  if (finderName) finderName.textContent = recommendation.name;
  if (finderDescription) finderDescription.textContent = recommendation.description;
  if (finderTags) finderTags.innerHTML = recommendation.tags.map((tag) => `<span>${tag}</span>`).join("");
  if (finderOpen) finderOpen.dataset.serviceItem = recommendation.item;
  if (finderStep) finderStep.textContent = recommendation.step;
  document.querySelector(".finder-result")?.animate([
    { opacity: .4, transform: "translateY(8px)" },
    { opacity: 1, transform: "translateY(0)" }
  ], { duration: 260, easing: "ease-out" });
}

finderGoals.forEach((button) => button.addEventListener("click", () => updateFinder(button.dataset.briefGoal)));

setFooterMeta();
const initialHash = window.location.hash.replace("#", "");
if (["design-packages", "individual-services", "website-packages"].includes(initialHash)) {
  showCategory(initialHash, null, false);
} else {
  showCategory("design-packages", null, false);
}
