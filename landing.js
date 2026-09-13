const SITE_VERSION = "3.15.0";
const LAST_EDIT = "September 13, 2026";

document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
document.querySelectorAll("#lastEdit").forEach((el) => el.textContent = LAST_EDIT);
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());

function escapeAgency(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function splitSkills(value = "") {
  return String(value)
    .split(/\n|-|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function loadAgencyWork() {
  if (!window.DesignLabProjects) return;

  const featuredHolder = document.querySelector("#agencyFeaturedProject");
  const workGrid = document.querySelector("#agencyWorkGrid");

  try {
    const featured = await window.DesignLabProjects.listPublished({ featured: true });
    const all = await window.DesignLabProjects.listPublished({ limit: 12 });

    if (featuredHolder && featured.length) {
      const project = featured[Math.floor(Math.random() * featured.length)];
      const tags = splitSkills(project.skills)
        .slice(0, 4)
        .map((skill) => `<span>${escapeAgency(skill)}</span>`)
        .join("");

      featuredHolder.innerHTML = `
        <a class="agency-featured-media" href="project.html?id=${encodeURIComponent(project.id)}">
          ${project.image
            ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="eager" decoding="async">`
            : `<span class="project-thumb-empty">No preview</span>`}
        </a>
        <div class="agency-featured-copy">
          <p class="agency-kicker">${escapeAgency(project.category || "Featured work")}</p>
          <h2>${escapeAgency(project.title)}</h2>
          <p>${escapeAgency(project.description || "")}</p>
          ${tags ? `<div class="agency-tags">${tags}</div>` : ""}
          <div class="agency-home-hero-actions">
            <a class="agency-button agency-button-primary" href="project.html?id=${encodeURIComponent(project.id)}">View project →</a>
          </div>
        </div>`;
    }

    if (workGrid) {
      const featuredIds = new Set(featured.map((project) => project.id));
      const selected = all
        .filter((project) => !featuredIds.has(project.id))
        .slice(0, 4);

      const fallback = selected.length >= 4
        ? selected
        : all.slice(0, 4);

      workGrid.innerHTML = fallback.map((project, index) => `
        <a class="agency-work-card agency-stagger" style="--agency-delay:${index * 50}ms"
           href="project.html?id=${encodeURIComponent(project.id)}">
          <div class="agency-work-card-media">
            ${project.image
              ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="lazy" decoding="async">`
              : `<span class="project-thumb-empty">No preview</span>`}
          </div>
          <div class="agency-work-card-copy">
            <small>${escapeAgency(project.category || "Project")}</small>
            <h3>${escapeAgency(project.title)}</h3>
          </div>
        </a>`).join("");
    }
  } catch (error) {
    console.error("Agency homepage work:", error);
  }
}

function renderAgencyTestimonials() {
  const section = document.querySelector("#agencyTestimonials");
  const grid = document.querySelector("#agencyTestimonialGrid");
  const items = Array.isArray(window.DESIGNLAB_TESTIMONIALS)
    ? window.DESIGNLAB_TESTIMONIALS.filter((item) => item?.quote && item?.name)
    : [];

  if (!section || !grid || !items.length) return;

  grid.innerHTML = items.slice(0, 3).map((item, index) => `
    <article class="agency-testimonial-card agency-stagger" style="--agency-delay:${index * 55}ms">
      <blockquote>“${escapeAgency(item.quote)}”</blockquote>
      <div>
        <strong>${escapeAgency(item.name)}</strong>
        <span>${escapeAgency(item.role || "DesignLab client")}</span>
      </div>
    </article>`).join("");

  section.hidden = false;
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-countup]");
  if (!counters.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.countup || 0);
    if (reduceMotion) {
      counter.textContent = target.toLocaleString();
      return;
    }

    const duration = 850;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

loadAgencyWork();
renderAgencyTestimonials();
animateCounters();
