const SITE_VERSION = "3.0.1";

const fallbackProjects = [
  {
    id: "sample-university-postings",
    title: "Recent University Postings",
    category: "Social Media Design",
    filterCategory: "Social Media",
    featured: true,
    skills: "Campaign Posters - Social Media Management - Graphic Design",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    description: "A curated presentation of campaign visuals, announcements, and social media postings designed for university communications."
  },
  {
    id: "sample-designlab-downloads",
    title: "DesignLab Downloads",
    category: "Digital Products",
    filterCategory: "DesignLab",
    featured: true,
    skills: "Canva Templates - Digital Product Design - Content Systems",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    description: "Editable Canva template collections for professionals, business owners, and content creators."
  },
  {
    id: "sample-brand-identity",
    title: "Brand Identity Projects",
    category: "Logo & Branding",
    filterCategory: "Branding",
    featured: true,
    skills: "Logo Design - Brand Identity - Visual Systems",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
    description: "Logo concepts, visual systems, and brand direction projects for different clients and small businesses."
  }
];

const grid = document.querySelector("#allProjectGrid");
const filterTabs = document.querySelector("#filterTabs");
let allProjects = [];
let activeFilter = "All";

document.querySelector("#year").textContent = new Date().getFullYear();

const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");

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

async function loadProjects() {
  allProjects = fallbackProjects;

  if (API_URL && !API_URL.includes("PASTE_YOUR")) {
    try {
      const response = await fetch(`${API_URL}?action=listProjects`);
      const data = await response.json();

      if (data.success && Array.isArray(data.projects) && data.projects.length) {
        allProjects = data.projects;
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderProjects();
}

function renderProjects() {
  const projects = activeFilter === "All"
    ? allProjects
    : allProjects.filter((project) => projectMatchesFilter(project, activeFilter));

  grid.innerHTML = "";

  if (!projects.length) {
    grid.innerHTML = `<div class="loading-card">No projects found for this category yet.</div>`;
    return;
  }

  projects.forEach((project) => {
    const projectId = project.id || createSlug(project.title);
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = `project.html?id=${encodeURIComponent(projectId)}`;
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">
      </div>
      <div class="project-info">
        <p class="eyebrow">${escapeHtml(project.category || "Project")}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <div class="project-skill-tags">${renderSkillsInline(project.skills)}</div>
        <p>${escapeHtml(project.description || "")}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

filterTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll("#filterTabs button").forEach((tab) => {
    tab.classList.toggle("active", tab === button);
  });

  renderProjects();
});

function projectMatchesFilter(project, activeFilter) {
  const categories = parseFilterCategories(project.filterCategory || project.category);
  return categories.some((category) => normalizeFilter(category) === normalizeFilter(activeFilter));
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
