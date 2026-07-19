const SITE_VERSION = "3.6.1";

const yearElement = document.querySelector("#year");
const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");
const visitorCountElement = document.querySelector("#visitorCount");

if (yearElement) yearElement.textContent = new Date().getFullYear();
if (versionElement) versionElement.textContent = SITE_VERSION;
if (lastEditElement) {
  const lastModified = new Date(document.lastModified);
  lastEditElement.textContent = lastModified.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function recordVisitor() {
  if (!visitorCountElement) return;
  if (!API_URL || API_URL.includes("PASTE_YOUR")) {
    visitorCountElement.textContent = "—";
    return;
  }
  try {
    const response = await fetch(`${API_URL}?action=recordVisit&t=${Date.now()}`, { cache: "no-store" });
    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Unable to record visit.");
    visitorCountElement.textContent = Number(data.visits || 0).toLocaleString("en-PH");
  } catch (error) {
    console.error("Visitor counter error:", error);
    visitorCountElement.textContent = "—";
  }
}

recordVisitor();


const HOME_SERVICE_CONTENT = {
  packages: {
    eyebrow: "Ongoing creative support",
    title: "Design Packages",
    description: "Planned social media and campaign visuals for brands that need consistent creative output.",
    items: ["Static social media graphics", "Carousel posts and campaign sets", "Organized revisions and delivery"],
    fit: "Best for recurring monthly or campaign-based content.",
    link: "services.html#design-packages",
    label: "Explore design packages"
  },
  individual: {
    eyebrow: "Flexible one-off requests",
    title: "Individual Services",
    description: "Focused creative support when the project needs one clear deliverable or a small set of assets.",
    items: ["Posters, pubmats, and event visuals", "Brochures, presentations, and publication layouts", "Branding, packaging, and design adaptations"],
    fit: "Best for urgent requests, launches, and standalone creative needs.",
    link: "services.html#individual-services",
    label: "Explore individual services"
  },
  web: {
    eyebrow: "Practical digital builds",
    title: "Website / System Packages",
    description: "Responsive digital experiences and lightweight systems that make information and workflows easier to manage.",
    items: ["Landing pages and portfolio websites", "Inquiry forms, trackers, and dashboards", "Basic SEO, deployment, and responsive setup"],
    fit: "Best for campaigns, service businesses, portfolios, and internal tools.",
    link: "services.html#website-packages",
    label: "Explore website packages"
  }
};

const homeServiceTabs = document.querySelectorAll("[data-home-service]");
const homeServiceEyebrow = document.querySelector("#homeServiceEyebrow");
const homeServiceTitle = document.querySelector("#homeServiceTitle");
const homeServiceDescription = document.querySelector("#homeServiceDescription");
const homeServiceList = document.querySelector("#homeServiceList");
const homeServiceFit = document.querySelector("#homeServiceFit");
const homeServiceLink = document.querySelector("#homeServiceLink");

function selectHomeService(key) {
  const item = HOME_SERVICE_CONTENT[key];
  if (!item) return;
  homeServiceTabs.forEach((tab) => {
    const selected = tab.dataset.homeService === key;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  if (homeServiceEyebrow) homeServiceEyebrow.textContent = item.eyebrow;
  if (homeServiceTitle) homeServiceTitle.textContent = item.title;
  if (homeServiceDescription) homeServiceDescription.textContent = item.description;
  if (homeServiceList) homeServiceList.innerHTML = item.items.map((entry) => `<li>${entry}</li>`).join("");
  if (homeServiceFit) homeServiceFit.textContent = item.fit;
  if (homeServiceLink) {
    homeServiceLink.href = item.link;
    homeServiceLink.innerHTML = `${item.label} <b aria-hidden="true">→</b>`;
  }
}

homeServiceTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectHomeService(tab.dataset.homeService));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const tabs = Array.from(homeServiceTabs);
    const current = tabs.indexOf(tab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(current + direction + tabs.length) % tabs.length];
    next.focus();
    selectHomeService(next.dataset.homeService);
  });
});


// Random project picker powered by the live Projects sheet.
const randomProjectCard = document.querySelector("#randomProjectCard");
const randomProjectShuffle = document.querySelector("#randomProjectShuffle");
let randomProjectArchive = [];
let currentRandomProjectKey = "";

const RANDOM_PROJECT_FALLBACK = [
  {
    id: "pirc-evaluation-form",
    title: "PIRC Evaluation Form and Automated Certificate System",
    category: "Web / Digital System",
    description: "A custom event evaluation workflow with response validation, Google Sheets storage, certificate generation, and automated email delivery.",
    image: "assets/insights-osc-system-wide.webp",
    skills: "Google Apps Script - Google Sheets - Workflow Automation"
  },
  {
    id: "cozisleep-storefront",
    title: "CoziSleep E-Commerce Storefront and Product Visuals",
    category: "Client Work",
    description: "A multi-platform e-commerce visual system covering storefront banners, product listing graphics, and feature-focused marketing assets.",
    image: "assets/insights-daily-grind-wide.webp",
    skills: "E-Commerce Design - Product Marketing - Visual Branding"
  },
  {
    id: "pu-fest-2025",
    title: "PU Fest 2025 — Gloc-9 Event Visuals",
    category: "University Campaign",
    description: "A complete concert-style event visual system covering campaign posters, IDs, merchandise, and supporting event materials.",
    image: "assets/insights-60-days-wide.webp",
    skills: "Event Visuals - Campaign Design - Print Collateral"
  }
];

function escapeProjectText(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function randomProjectKey(project = {}) {
  return String(project.id || project.title || "").trim().toLowerCase();
}

function randomProjectImage(project = {}) {
  if (project.image) return project.image;
  if (Array.isArray(project.galleryImages) && project.galleryImages.length) return project.galleryImages[0];
  if (typeof project.galleryImages === "string" && project.galleryImages.trim()) {
    return project.galleryImages.split(/[\n,|]/).map((item) => item.trim()).find(Boolean) || "profile-photo.webp";
  }
  return "profile-photo.webp";
}

function randomProjectSkills(value) {
  if (Array.isArray(value)) return value.filter(Boolean).slice(0, 4);
  return String(value || "")
    .split(/\s+-\s+|[,|\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function chooseRandomArchiveProject(excludeKey = "") {
  const available = randomProjectArchive.filter((project) => randomProjectKey(project) !== excludeKey);
  const pool = available.length ? available : randomProjectArchive;
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function renderRandomArchiveProject(project) {
  if (!randomProjectCard) return;
  if (!project) {
    randomProjectCard.innerHTML = '<div class="rp-random-project-loading">No project is available yet.</div>';
    return;
  }

  currentRandomProjectKey = randomProjectKey(project);
  const projectId = project.id || String(project.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const projectUrl = `project.html?id=${encodeURIComponent(projectId)}`;
  const skills = randomProjectSkills(project.skills);
  const image = randomProjectImage(project);
  const description = project.description || project.shortDescription || "A selected project from the DesignLab Creative Studio archive.";

  randomProjectCard.innerHTML = `
    <a class="rp-random-project-media" href="${projectUrl}" aria-label="View ${escapeProjectText(project.title)}">
      <img src="${escapeProjectText(image)}" alt="${escapeProjectText(project.title)}" loading="lazy" decoding="async">
      <span>Random archive pick</span>
    </a>
    <div class="rp-random-project-copy">
      <div class="rp-random-project-meta"><span>${escapeProjectText(project.category || "Selected project")}</span><span>DesignLab archive</span></div>
      <h3>${escapeProjectText(project.title)}</h3>
      <p>${escapeProjectText(description)}</p>
      ${skills.length ? `<div class="rp-random-project-skills">${skills.map((skill) => `<span>${escapeProjectText(skill)}</span>`).join("")}</div>` : ""}
      <div class="rp-random-project-actions">
        <a class="rp-btn rp-btn-primary" href="${projectUrl}">View project <span aria-hidden="true">→</span></a>
        <button class="rp-text-action" type="button" data-random-project-next>Show another <span aria-hidden="true">↻</span></button>
      </div>
    </div>`;

  randomProjectCard.querySelector("[data-random-project-next]")?.addEventListener("click", showAnotherRandomProject);
}

function showAnotherRandomProject() {
  const next = chooseRandomArchiveProject(currentRandomProjectKey);
  renderRandomArchiveProject(next);
  if (randomProjectCard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    randomProjectCard.animate(
      [{ opacity: .2, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 360, easing: "cubic-bezier(.2,.75,.25,1)" }
    );
  }
}

async function loadRandomArchiveProject() {
  randomProjectArchive = RANDOM_PROJECT_FALLBACK;
  if (typeof API_URL !== "undefined" && API_URL && !API_URL.includes("PASTE_YOUR")) {
    try {
      const response = await fetch(`${API_URL}?action=listProjects&t=${Date.now()}`, { cache: "no-store" });
      const data = await response.json();
      if (data.success && Array.isArray(data.projects) && data.projects.some((project) => project && project.title)) {
        randomProjectArchive = data.projects.filter((project) => project && project.title);
      }
    } catch (error) {
      console.error("Random project picker error:", error);
    }
  }
  renderRandomArchiveProject(chooseRandomArchiveProject());
}

randomProjectShuffle?.addEventListener("click", showAnotherRandomProject);
loadRandomArchiveProject();
