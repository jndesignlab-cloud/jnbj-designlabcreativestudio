const SITE_VERSION = "3.15.1";
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
    .split(/[\n,•·]+|\s-\s/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getProjectTags(project) {
  const tags = [];
  if (project.category) tags.push(project.category);
  splitSkills(project.skills).forEach((skill) => {
    if (tags.length < 4 && !tags.includes(skill)) tags.push(skill);
  });
  return tags.slice(0, 4);
}

function cardMarkup(project, index) {
  const tags = getProjectTags(project)
    .map((tag) => `<span>${escapeAgency(tag)}</span>`)
    .join("");

  return `
    <a class="bou-work-card agency-stagger" style="--agency-delay:${index * 55}ms" href="project.html?id=${encodeURIComponent(project.id)}">
      <div class="bou-work-card-media">
        ${project.image
          ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="lazy" decoding="async">`
          : `<span class="project-thumb-empty">No preview</span>`}
      </div>
      <div class="bou-work-card-copy">
        <h3>${escapeAgency(project.title)}</h3>
        <p>${escapeAgency(project.description || "")}</p>
        ${tags ? `<div class="bou-card-tags">${tags}</div>` : ""}
      </div>
    </a>`;
}

function spotlightMarkup(project) {
  const tags = getProjectTags(project)
    .map((tag) => `<span>${escapeAgency(tag)}</span>`)
    .join("");

  return `
    <div class="bou-spotlight-media">
      ${project.image
        ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="eager" decoding="async">`
        : `<span class="project-thumb-empty">No preview</span>`}
    </div>
    <div class="bou-spotlight-copy">
      <p class="agency-kicker">Project spotlight</p>
      <h2>${escapeAgency(project.title)}</h2>
      <p class="bou-spotlight-lead">${escapeAgency(project.description || "Selected work from the DesignLab archive.")}</p>
      ${tags ? `<div class="bou-card-tags bou-card-tags-dark">${tags}</div>` : ""}
      <div class="bou-spotlight-actions">
        <a class="bou-pill bou-pill-primary" href="project.html?id=${encodeURIComponent(project.id)}">View full project →</a>
      </div>
    </div>`;
}

async function loadAgencyHome() {
  if (!window.DesignLabProjects) return;

  const workGrid = document.querySelector("#homeWorkGrid");
  const spotlight = document.querySelector("#homeSpotlightProject");

  try {
    const featured = await window.DesignLabProjects.listPublished({ featured: true });
    const all = await window.DesignLabProjects.listPublished({ limit: 18 });

    const byId = new Map();
    [...featured, ...all].forEach((project) => {
      if (project?.id && !byId.has(project.id)) byId.set(project.id, project);
    });

    const projects = Array.from(byId.values());
    const showcase = projects.slice(0, 6);
    const spotlightProject = featured[0] || projects[0];

    if (workGrid) {
      workGrid.innerHTML = showcase.map((project, index) => cardMarkup(project, index)).join("");
    }

    if (spotlight && spotlightProject) {
      spotlight.innerHTML = spotlightMarkup(spotlightProject);
    }
  } catch (error) {
    console.error("Bou-style homepage load error:", error);
  }
}

loadAgencyHome();
