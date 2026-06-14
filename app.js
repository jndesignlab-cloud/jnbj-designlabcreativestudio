const projectGrid = document.querySelector("#projectGrid");
const modal = document.querySelector("#projectModal");
const modalImage = document.querySelector("#modalImage");
const modalCategory = document.querySelector("#modalCategory");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalSkills = document.querySelector("#modalSkills");
const modalLink = document.querySelector("#modalLink");

const SITE_VERSION = "1.4.1";

document.querySelector("#year").textContent = new Date().getFullYear();

const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");

if (versionElement) {
  versionElement.textContent = SITE_VERSION;
}

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

const fallbackProjects = [
  {
    id: "sample-university-postings",
    title: "Recent University Postings",
    category: "Social Media Design",
    filterCategory: "Social Media",
    featured: true,
    skills: "Campaign Posters - Social Media Management - Graphic Design",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    description: "A curated presentation of campaign visuals, announcements, and social media postings designed for university communications.",
    problem: "The university needed clear, consistent, and professional campaign visuals for announcements and enrollment-related communications.",
    solution: "I created organized social media layouts with strong hierarchy, clean typography, and brand-aligned visuals to make each announcement easier to understand.",
    outcome: "The final outputs created a more consistent and polished online presence for university communications.",
    link: "https://bit.ly/JNBJ-Porfolio",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: "sample-designlab-downloads",
    title: "DesignLab Downloads",
    category: "Digital Products",
    filterCategory: "DesignLab",
    featured: true,
    skills: "Canva Templates - Digital Product Design - Content Systems",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    description: "Editable Canva template collections for professionals, business owners, and content creators.",
    problem: "Business owners and professionals needed ready-made content templates that looked professional without starting from scratch.",
    solution: "I designed editable Canva templates with structured layouts, reusable visual systems, and clear content sections.",
    outcome: "The template sets helped users save time, post more consistently, and maintain a more professional brand presence.",
    link: "https://bit.ly/JNBJ-Porfolio",
    galleryImages: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: "sample-brand-identity",
    title: "Brand Identity Projects",
    category: "Logo & Branding",
    filterCategory: "Branding",
    featured: true,
    skills: "Logo Design - Brand Identity - Visual Systems",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
    description: "Logo concepts, visual systems, and brand direction projects for different clients and small businesses.",
    problem: "Clients needed brand visuals that felt more recognizable, credible, and aligned with their business identity.",
    solution: "I developed logo concepts, visual directions, and supporting brand elements based on each client’s positioning and audience.",
    outcome: "The final brand assets gave each client a clearer and more professional visual identity.",
    link: "https://bit.ly/JNBJ-Porfolio",
    galleryImages: [
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
    ]
  }
];

async function loadProjects() {
  if (!API_URL || API_URL.includes("PASTE_YOUR")) {
    renderProjects(fallbackProjects);
    return;
  }

  try {
    const response = await fetch(`${API_URL}?action=listProjects`);
    const data = await response.json();

    if (!data.success || !Array.isArray(data.projects)) {
      throw new Error("Invalid project response.");
    }

    const featuredProjects = getFeaturedProjects(data.projects);
    renderProjects(featuredProjects.length ? featuredProjects : fallbackProjects.slice(0, 6));
  } catch (error) {
    console.error(error);
    renderProjects(fallbackProjects.slice(0, 6));
  }
}

function getFeaturedProjects(projects = []) {
  return projects
    .filter((project) => isFeatured(project))
    .slice(0, 6);
}

function isFeatured(project) {
  return project.featured === true || String(project.featured).toLowerCase() === "true" || String(project.featured).toLowerCase() === "yes";
}

function renderProjects(projects) {
  projectGrid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">
      </div>
      <div class="project-info">
        <p class="eyebrow">${escapeHtml(project.category || "Project")}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description || "")}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(project));
    projectGrid.appendChild(card);
  });
}

function openModal(project) {
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalCategory.textContent = project.category || "Project";
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description || "";
  renderSkillTags(modalSkills, project.skills);
  const projectId = project.id || createSlug(project.title);
  modalLink.href = `project.html?id=${encodeURIComponent(projectId)}`;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function renderSkillTags(container, skills = "") {
  if (!container) return;

  const skillList = parseSkills(skills);
  container.innerHTML = "";

  if (!skillList.length) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";

  skillList.forEach((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    container.appendChild(tag);
  });
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
