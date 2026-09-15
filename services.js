const SITE_VERSION = "3.16.38";
const LAST_EDIT = "September 15, 2026";

const SERVICE_DETAILS = {
  "social-media-design": {category:"Social & Campaigns",title:"Social Media Design",mode:"from",min:400,unit:"per static artwork",intro:"Branded graphics for announcements, promotions, campaigns, and regular social posting.",best:"Businesses, organizations, campaigns, events, announcements, and product highlights.",includes:["One approved canvas size","Custom layout based on supplied content","Brand-aligned typography and color","Export-ready JPG or PNG","Basic revision round"],note:"Complex infographics, heavy compositing, multiple sizes, or rush work may require a separate quote.",href:"contact.html?source=service-modal&service=social-media-design"},
  "carousel-design": {category:"Social & Campaigns",title:"Carousel Design",mode:"from",min:900,unit:"based on slide count",intro:"Connected slide designs for educational, promotional, storytelling, and service-focused content.",best:"LinkedIn, Facebook, and Instagram explainers, product features, and step-by-step content.",includes:["Cover and supporting slides","Consistent visual direction","Readable pacing and hierarchy","Platform-ready exports"],note:"Copywriting, research-heavy content, and extended slide counts are quoted separately.",href:"contact.html?source=service-modal&service=carousel-design"},
  "content-essentials": {category:"Social & Campaigns",title:"Content Essentials",mode:"fixed",min:4000,unit:"8 pubmats + 1 carousel",intro:"A compact first content batch for brands that need a clean starting point.",best:"New pages, small businesses, short promotions, and first-time content planning.",includes:["8 static pubmats","1 carousel post","Up to 3 revisions per design","Custom layout direction","Google Drive delivery"],note:"Final scheduling depends on the brief, supplied content, and revision turnaround.",href:"contact.html?source=service-modal&service=content-essentials"},
  "brand-growth": {category:"Social & Campaigns",title:"Brand Growth",mode:"fixed",min:8500,unit:"15 pubmats + 3 carousels",intro:"A balanced campaign package for active brands that need stronger consistency and content variety.",best:"Growing businesses, service brands, product launches, enrollment drives, and active pages.",includes:["15 static pubmats","3 carousel posts","Priority revisions","Campaign-style creative direction","Google Drive delivery"],note:"Works best when copy, offers, photos, and campaign dates are ready before production.",href:"contact.html?source=service-modal&service=brand-growth"},
  "full-content-system": {category:"Social & Campaigns",title:"Full Content System",mode:"fixed",min:13500,unit:"20–25 pubmats + 4–6 carousels",intro:"A larger coordinated visual system for month-long content, launches, and multi-format promotions.",best:"Month-long campaigns, launches, recurring promotions, and brands managing several formats.",includes:["20–25 static pubmats","4–6 carousel posts","Story versions","Priority turnaround","Brand consistency supervision"],note:"Final output count depends on complexity, format mix, and approved campaign scope.",href:"contact.html?source=service-modal&service=full-content-system"},
  "poster-event-design": {category:"Brand, Print & Packaging",title:"Poster & Event Design",mode:"range",min:600,max:1800,unit:"depends on detail and format",intro:"Promotional posters and event visuals with clear information hierarchy for digital or print use.",best:"Events, seminars, promotions, campaigns, competitions, and announcements.",includes:["One main visual direction","Clear hierarchy","Brand-aligned styling","Digital or print-ready export"],note:"Large-format print, extensive compositing, and multiple derivatives may increase the final rate.",href:"contact.html?source=service-modal&service=poster-event-design"},
  "logo-design": {category:"Brand, Print & Packaging",title:"Logo & Visual Identity",mode:"range",min:3000,max:6000,unit:"based on scope",intro:"A focused identity service for new brands, products, projects, and small businesses.",best:"Startups, local businesses, personal brands, product names, and small service companies.",includes:["Creative direction","Primary logo concept","Basic alternate version","Color and monochrome exports"],note:"Naming, full strategy, extensive guidelines, and trademark services are scoped separately.",href:"contact.html?source=service-modal&service=logo-design"},
  "packaging-design": {category:"Brand, Print & Packaging",title:"Packaging Design",mode:"from",min:3500,unit:"per packaging scope",intro:"Labels, boxes, sleeves, pouches, and product-facing layouts prepared around production needs.",best:"Small product launches, labels, boxes, pouches, sleeves, and product presentation.",includes:["Visual direction","Information placement","Production-size layout","Print-ready export","Basic mockup when applicable"],note:"Dielines, regulatory copy, photography, and multiple variants may require added fees.",href:"contact.html?source=service-modal&service=packaging-design"},
  "motion-graphics": {category:"Brand, Print & Packaging",title:"Simple Motion Graphics",mode:"from",min:900,unit:"based on duration and complexity",intro:"Short motion applied to text, graphics, logos, or an existing visual.",best:"Animated announcements, logo reveals, promotional loops, countdowns, and presentation visuals.",includes:["Simple movement and transitions","Short-form export","Platform-ready format","One approved direction"],note:"Advanced compositing, character animation, and full video editing require a custom quote.",href:"contact.html?source=service-modal&service=motion-graphics"},
  "launch-landing-page": {category:"Websites & Digital",title:"Launch Landing Page",mode:"fixed",min:13500,unit:"up to 5 sections",intro:"A focused one-page website for a service, project, event, product, or professional profile.",best:"New businesses, personal brands, campaigns, portfolios, events, and focused services.",includes:["Responsive landing page","Up to 5 sections","Brand styling","Basic SEO","GitHub Pages deployment","2 revision rounds"],note:"Domain, paid hosting, copywriting, and third-party integrations are quoted separately.",href:"contact.html?source=service-modal&service=launch-landing-page"},
  "business-landing-page": {category:"Websites & Digital",title:"Business Landing Page",mode:"fixed",min:20000,unit:"up to 8 sections",intro:"A fuller business page with stronger content direction, inquiry forms, analytics, and refined interactions.",best:"Service businesses, studios, consultants, local companies, and campaigns that need inquiries.",includes:["Custom responsive page","Up to 8 sections","Inquiry form","Basic analytics","Subtle interactions","SEO and deployment","3 revision rounds"],note:"Advanced databases, accounts, payments, and custom backends require separate development scoping.",href:"contact.html?source=service-modal&service=business-landing-page"},
  "premium-landing-system": {category:"Websites & Digital",title:"Premium Landing System",mode:"fixed",min:28000,unit:"up to 10 sections",intro:"A more complete conversion-focused website with advanced inquiry flow, analytics, and post-launch support.",best:"Premium services, launches, institutional microsites, and businesses needing a fuller lead journey.",includes:["Premium responsive page","Up to 10 sections","Advanced inquiry form","Analytics","Performance optimization","4 revision rounds","30 days minor support"],note:"Complex applications, e-commerce, and CMS dashboards require separate scoping.",href:"contact.html?source=service-modal&service=premium-landing-system"},
  "story-adaptation": {category:"Add-ons & Custom",title:"Story Adaptation",mode:"from",min:200,unit:"per approved design",intro:"An approved graphic reformatted for vertical story publishing.",best:"Facebook Stories, Instagram Stories, reminders, countdowns, and vertical reposting.",includes:["9:16 resize","Layout rebalancing","Safe-area adjustment","Export-ready story file"],note:"This rate applies to adaptations, not a completely new story design.",href:"contact.html?source=service-modal&service=story-adaptation"},
  "rush-delivery": {category:"Add-ons & Custom",title:"Rush Delivery",mode:"percent",percent:35,unit:"added to qualified project fee",intro:"Priority scheduling for selected projects that need delivery in under three working days.",best:"Urgent announcements, event materials, last-minute campaigns, and time-sensitive promotions.",includes:["Priority production slot","Compressed review schedule","Clear delivery deadline"],note:"Rush acceptance depends on workload, complexity, and completeness of supplied materials.",href:"contact.html?source=service-modal&service=rush-delivery"},
  "custom-project": {category:"Add-ons & Custom",title:"Custom Project",mode:"custom",unit:"quoted after the brief",intro:"A flexible scope for mixed deliverables, recurring support, unusual formats, or non-standard requests.",best:"Projects with mixed outputs, unusual formats, recurring support, and one-off requirements.",includes:["Recommended deliverable mix","Clear scope","Timeline and revision plan","Itemized estimate"],note:"Share the goal, formats, deadline, and available assets so the scope can be estimated accurately.",href:"contact.html?source=service-modal&service=custom-project"}
};

const SERVICE_CATEGORIES = {
  social: {
    title: "Social & Campaigns",
    description: "Flexible visual systems for brands that need consistent content, clear campaigns, and polished social communication.",
    image: "assets/hero-float-social-design.webp",
    alt: "DesignLab social media design sample",
    anchor: "social-campaign-services",
    services: ["social-media-design","carousel-design","content-essentials","brand-growth","full-content-system"]
  },
  brand: {
    title: "Brand, Print & Packaging",
    description: "Identity, campaign visuals, print-ready materials, packaging, and presentation assets built around clear communication and practical production.",
    image: "assets/designlab-transformation-hero.webp",
    alt: "DesignLab branding and campaign design sample",
    anchor: "graphic-design-services",
    services: ["poster-event-design","logo-design","packaging-design","motion-graphics"]
  },
  web: {
    title: "Websites & Digital",
    description: "Responsive landing pages and focused digital experiences that make a business, service, event, or campaign easier to understand and act on.",
    image: "assets/designlab-bou-hero.webp",
    alt: "DesignLab website and digital experience visual",
    anchor: "web-development-services",
    services: ["launch-landing-page","business-landing-page","premium-landing-system"]
  },
  custom: {
    title: "Add-ons & Custom",
    description: "Useful extensions, priority support, and flexible scopes for projects that do not fit neatly into a preset package.",
    image: "assets/hero-float-cozisleep.webp",
    alt: "DesignLab custom campaign design sample",
    anchor: "custom-services",
    services: ["story-adaptation","rush-delivery","custom-project"]
  }
};

const menuButtons = [...document.querySelectorAll("[data-service-category]")];
const titleEl = document.querySelector("#servicesPageTitle");
const descriptionEl = document.querySelector("#serviceCategoryDescription");
const itemsGrid = document.querySelector("#serviceItemsGrid");
const imageEl = document.querySelector("#serviceCategoryImage");
const visualFrame = document.querySelector("#serviceVisualFrame");
const visualLabel = document.querySelector("#serviceVisualLabel");
const modal = document.querySelector("#serviceModal");
const modalContent = document.querySelector("#serviceModalContent");
const modalDialog = modal?.querySelector(".service-modal-dialog");
let lastTrigger = null;

function setFooterMeta() {
  document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll("#siteVersion").forEach((el) => (el.textContent = SITE_VERSION));
  document.querySelectorAll("#lastEdit").forEach((el) => (el.textContent = LAST_EDIT));
}

function fallbackPrice(d) {
  if (d.mode === "custom") return "Custom quote";
  if (d.mode === "percent") return `+${d.percent}%`;
  const usd = (p) => Math.max(1, Math.round(p / 58));
  if (d.mode === "range") return `₱${d.min.toLocaleString()}–₱${d.max.toLocaleString()} / ~$${usd(d.min)}–$${usd(d.max)} USD`;
  if (d.mode === "from") return `From ₱${d.min.toLocaleString()} / ~$${usd(d.min)} USD`;
  return `₱${d.min.toLocaleString()} / ~$${usd(d.min)} USD`;
}

function serviceButton(id) {
  const service = SERVICE_DETAILS[id];
  if (!service) return "";
  return `<button class="dl-services-item" type="button" data-service-item="${id}"><span class="dl-services-check" aria-hidden="true"></span><span>${service.title}</span></button>`;
}

function selectCategory(key, updateHash = true) {
  const category = SERVICE_CATEGORIES[key] || SERVICE_CATEGORIES.social;
  menuButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.serviceCategory === key));
  titleEl.textContent = category.title;
  descriptionEl.textContent = category.description;
  visualLabel.textContent = category.title;
  itemsGrid.innerHTML = category.services.map(serviceButton).join("");

  visualFrame.classList.add("is-changing");
  window.setTimeout(() => {
    imageEl.src = category.image;
    imageEl.alt = category.alt;
    visualFrame.classList.remove("is-changing");
  }, 140);

  if (updateHash) history.replaceState(null, "", `#${category.anchor}`);
}

function categoryFromHash() {
  const hash = location.hash.replace("#", "");
  const entry = Object.entries(SERVICE_CATEGORIES).find(([, category]) => category.anchor === hash);
  return entry ? entry[0] : "social";
}

function renderServiceModal(d) {
  const list = d.includes.map((item) => `<li>${item}</li>`).join("");
  return `<div class="service-detail-modal-layout">
    <div class="service-detail-modal-head">
      <p class="eyebrow">${d.category}</p>
      <h2>${d.title}</h2>
      <div class="service-detail-price"><strong>${fallbackPrice(d)}</strong><span>${d.unit}</span></div>
      <p class="service-detail-intro">${d.intro}</p>
    </div>
    <div class="service-detail-modal-grid">
      <section><span class="service-detail-label">Best for</span><p>${d.best}</p></section>
      <section><span class="service-detail-label">Included</span><ul>${list}</ul></section>
    </div>
    <div class="service-detail-note"><strong>Before starting</strong><p>${d.note}</p></div>
    <div class="service-detail-modal-cta">
      <div><strong>Ready to discuss this?</strong><span>The final quote is confirmed after the brief is reviewed.</span></div>
      <a class="service-modal-cta-button" href="${d.href}"><span>Start this project</span><b>↗</b></a>
    </div>
  </div>`;
}

function openService(id, trigger) {
  const detail = SERVICE_DETAILS[id];
  if (!detail || !modal || !modalContent) return;
  lastTrigger = trigger || null;
  modalContent.innerHTML = renderServiceModal(detail);
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modalDialog?.focus());
}

function closeService() {
  modal?.classList.remove("active");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastTrigger?.focus();
}

menuButtons.forEach((button) => button.addEventListener("click", () => selectCategory(button.dataset.serviceCategory)));
itemsGrid?.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-service-item]");
  if (trigger) openService(trigger.dataset.serviceItem, trigger);
});
document.querySelectorAll("[data-close-service-modal]").forEach((el) => el.addEventListener("click", closeService));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("active")) closeService();
});
window.addEventListener("hashchange", () => selectCategory(categoryFromHash(), false));

setFooterMeta();
selectCategory(categoryFromHash(), false);
