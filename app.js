const projectGrid = document.querySelector("#projectGrid");
const modal = document.querySelector("#projectModal");
const modalImage = document.querySelector("#modalImage");
const modalCategory = document.querySelector("#modalCategory");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalLink = document.querySelector("#modalLink");

const SITE_VERSION = "1.1.1";

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
    title: "Recent University Postings",
    category: "Social Media Design",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    description: "A curated presentation of campaign visuals, announcements, and social media postings designed for university communications.",
    link: "https://bit.ly/JNBJ-Porfolio"
  },
  {
    title: "DesignLab Downloads",
    category: "Digital Products",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    description: "Editable Canva template collections for professionals, business owners, and content creators.",
    link: "https://bit.ly/JNBJ-Porfolio"
  },
  {
    title: "Brand Identity Projects",
    category: "Logo & Branding",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
    description: "Logo concepts, visual systems, and brand direction projects for different clients and small businesses.",
    link: "https://bit.ly/JNBJ-Porfolio"
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

    renderProjects(data.projects.length ? data.projects : fallbackProjects);
  } catch (error) {
    console.error(error);
    renderProjects(fallbackProjects);
  }
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
  modalLink.href = project.link || project.image;
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

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadProjects();
