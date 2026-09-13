const SITE_VERSION = "3.14.0";

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


// Animated homepage statistics. Runs once when the record section enters view.
const countUpNodes = document.querySelectorAll("[data-countup]");

function formatCountUpValue(value) {
  return Math.round(value).toLocaleString("en-PH");
}

function animateCountUp(node) {
  if (!node || node.dataset.counted === "true") return;
  node.dataset.counted = "true";
  const target = Number(node.dataset.countup || 0);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.textContent = formatCountUpValue(target);
    return;
  }
  const duration = target >= 1000 ? 1700 : 1300;
  const started = performance.now();
  function frame(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = formatCountUpValue(target * eased);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if (countUpNodes.length) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUpNodes.forEach(animateCountUp);
      observer.disconnect();
    });
  }, { threshold: .28 });
  const statsBand = document.querySelector(".rp-stats-band");
  if (statsBand) statsObserver.observe(statsBand);
}

// Keep the FAQ concise by opening only one answer at a time.
document.querySelectorAll(".rp-faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".rp-faq-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});


// Premium Selected Work — existing Supabase data, no duplicate content source.
const premiumWorkGrid = document.querySelector("#premiumWorkGrid");

function escapeWorkHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadPremiumSelectedWork() {
  if (!premiumWorkGrid || !window.DesignLabProjects) return;

  try {
    let projects = await window.DesignLabProjects.listPublished({
      featured: true,
      limit: 4
    });

    // Keep the homepage useful even if Featured has fewer than four records.
    if (projects.length < 4) {
      const allPublished = await window.DesignLabProjects.listPublished({ limit: 8 });
      const existing = new Set(projects.map((project) => project.id));
      for (const project of allPublished) {
        if (!existing.has(project.id)) {
          projects.push(project);
          existing.add(project.id);
        }
        if (projects.length >= 4) break;
      }
    }

    premiumWorkGrid.innerHTML = projects.slice(0, 4).map((project, index) => {
      const media = project.image
        ? `<img src="${escapeWorkHtml(project.image)}" alt="${escapeWorkHtml(project.title)}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async">`
        : `<span class="project-thumb-empty">No preview</span>`;

      return `
        <a class="premium-work-card" href="project.html?id=${encodeURIComponent(project.id)}">
          <div class="premium-work-media">${media}</div>
          <div class="premium-work-card-copy">
            <div class="premium-work-meta">
              <span>${escapeWorkHtml(project.category || "Project")}</span>
              <span>${String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>${escapeWorkHtml(project.title)}</h3>
            <p>${escapeWorkHtml(project.description || "")}</p>
          </div>
        </a>`;
    }).join("");

    premiumWorkGrid.querySelectorAll(".premium-work-card").forEach((card, index) => {
      card.classList.add("motion-stagger-child");
      card.style.setProperty("--stagger-delay", `${index * 70}ms`);
    });
  } catch (error) {
    console.error("Homepage selected work:", error);
    premiumWorkGrid.innerHTML = `
      <div class="project-empty-state">
        <strong>Selected work is temporarily unavailable.</strong>
        <a href="projects.html">Open the full project archive ↗</a>
      </div>`;
  }
}

loadPremiumSelectedWork();
