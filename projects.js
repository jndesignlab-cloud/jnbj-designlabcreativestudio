const SITE_VERSION = "3.13.0";

const grid = document.querySelector("#allProjectGrid");
const filterTabs = document.querySelector("#filterTabs");
const searchInput = document.querySelector("#projectSearch");
const clearSearchButton = document.querySelector("#clearProjectSearch");
const resultCount = document.querySelector("#projectResultCount");

let allProjects = [];
let activeFilter = "All";

const initialSearchParams = new URLSearchParams(window.location.search);
let searchQuery = initialSearchParams.get("search") || "";
if (searchInput && searchQuery) searchInput.value = searchQuery;

document.querySelector("#year").textContent = new Date().getFullYear();

const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");

if (versionElement) versionElement.textContent = SITE_VERSION;
if (lastEditElement) lastEditElement.textContent = "September 13, 2026";

async function loadProjects() {
  if (!window.DesignLabProjects) {
    showLoadError("Project database is unavailable.");
    return;
  }

  try {
    allProjects = await window.DesignLabProjects.listPublished();
    renderProjects();
  } catch (error) {
    console.error("Supabase project archive:", error);
    showLoadError("Projects are temporarily unavailable. Please try again.");
  }
}

function showLoadError(message) {
  if (resultCount) resultCount.textContent = "Unable to load projects";
  if (grid) {
    grid.innerHTML = `
      <div class="project-empty-state">
        <strong>${escapeHtml(message)}</strong>
        <span>The public portfolio database could not be reached.</span>
      </div>`;
  }
}

function renderProjects() {
  const normalizedQuery = normalizeSearch(searchQuery);
  const projects = allProjects.filter((project) => {
    const matchesCategory =
      activeFilter === "All" || projectMatchesFilter(project, activeFilter);

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return createSearchText(project).includes(normalizedQuery);
  });

  grid.innerHTML = "";
  updateSearchUi(projects.length);

  if (!projects.length) {
    grid.innerHTML = `
      <div class="project-empty-state">
        <strong>No matching projects.</strong>
        <span>Try another keyword or choose a different category.</span>
      </div>`;
    return;
  }

  projects.forEach((project, index) => {
    const projectId = project.id || createSlug(project.title);
    const row = document.createElement("a");
    row.className = "editorial-project-row";
    row.href = `project.html?id=${encodeURIComponent(projectId)}`;

    const number = String(index + 1).padStart(2, "0");
    const imageMarkup = project.image
      ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">`
      : `<span class="project-thumb-empty">No preview</span>`;

    row.innerHTML = `
      <span class="editorial-row-index">${number}</span>
      <div class="editorial-project-thumb">${imageMarkup}</div>
      <div class="editorial-row-copy">
        <div class="editorial-row-meta">
          <span>${escapeHtml(project.category || "Project")}</span>
        </div>
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description || "")}</p>
        <div class="editorial-project-skills">${renderSkillsInline(project.skills)}</div>
      </div>
      <span class="editorial-row-arrow" aria-hidden="true">↗</span>
    `;

    grid.appendChild(row);
  });
}

filterTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll("#filterTabs button").forEach((tab) => {
    tab.classList.toggle("active", tab === button);
  });

  renderProjects();
});

searchInput?.addEventListener("input", () => {
  searchQuery = searchInput.value;
  renderProjects();
});

clearSearchButton?.addEventListener("click", () => {
  searchQuery = "";
  searchInput.value = "";
  searchInput.focus();
  renderProjects();
});

function updateSearchUi(count) {
  if (resultCount) {
    const label = count === 1 ? "project" : "projects";
    resultCount.textContent = `${count} ${label} shown`;
  }

  if (clearSearchButton) {
    clearSearchButton.hidden = !searchQuery.trim();
  }
}

function createSearchText(project) {
  return normalizeSearch([
    project.title,
    project.category,
    project.filterCategory,
    project.description,
    project.skills
  ].filter(Boolean).join(" "));
}

function normalizeSearch(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&amp;/g, "&")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function projectMatchesFilter(project, filter) {
  const categories = parseFilterCategories(
    project.filterCategory || project.category
  );

  return categories.some(
    (category) => normalizeFilter(category) === normalizeFilter(filter)
  );
}

function parseFilterCategories(value = "") {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(/\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFilter(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderSkillsInline(skills = "") {
  return parseSkills(skills)
    .slice(0, 4)
    .map((skill) => `<span>${escapeHtml(skill)}</span>`)
    .join("");
}

function parseSkills(skills = "") {
  if (Array.isArray(skills)) {
    return skills.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(skills)
    .split(/\n|-|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadProjects();
