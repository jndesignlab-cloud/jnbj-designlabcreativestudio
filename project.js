const SITE_VERSION = "1.2.1";

const fallbackProjects = [
  {
    id: "sample-university-postings",
    title: "Recent University Postings",
    category: "Social Media Design",
    skills: "Campaign Posters - Social Media Management - Graphic Design",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
    description: "A curated presentation of campaign visuals, announcements, and social media postings designed for university communications.",
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
    skills: "Canva Templates - Digital Product Design - Content Systems",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    description: "Editable Canva template collections for professionals, business owners, and content creators.",
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
    skills: "Logo Design - Brand Identity - Visual Systems",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
    description: "Logo concepts, visual systems, and brand direction projects for different clients and small businesses.",
    link: "https://bit.ly/JNBJ-Porfolio",
    galleryImages: [
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
    ]
  }
];

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const titleElement = document.querySelector("#projectTitle");
const categoryElement = document.querySelector("#projectCategory");
const descriptionElement = document.querySelector("#projectDescription");
const skillsElement = document.querySelector("#projectSkills");
const externalLink = document.querySelector("#projectExternalLink");
const carouselImage = document.querySelector("#carouselImage");
const slideCounter = document.querySelector("#slideCounter");
const dotsWrapper = document.querySelector("#carouselDots");
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");

let gallery = [];
let currentSlide = 0;

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

async function loadProject() {
  let projects = fallbackProjects;

  if (API_URL && !API_URL.includes("PASTE_YOUR")) {
    try {
      const response = await fetch(`${API_URL}?action=listProjects`);
      const data = await response.json();

      if (data.success && Array.isArray(data.projects) && data.projects.length) {
        projects = data.projects;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const project = projects.find((item) => {
    const id = item.id || createSlug(item.title);
    return id === projectId;
  }) || projects[0];

  renderProject(project);
}

function renderProject(project) {
  titleElement.textContent = project.title || "Untitled Project";
  categoryElement.textContent = project.category || "Project";
  renderSkillTags(skillsElement, project.skills);
  descriptionElement.textContent = project.description || "";

  if (project.link) {
    externalLink.href = project.link;
    externalLink.style.display = "inline-flex";
  } else {
    externalLink.style.display = "none";
  }

  gallery = normalizeGallery(project);
  currentSlide = 0;
  renderDots();
  renderSlide();
}

function normalizeGallery(project) {
  if (Array.isArray(project.galleryImages) && project.galleryImages.length) {
    return project.galleryImages.filter(Boolean);
  }

  if (typeof project.galleryImages === "string" && project.galleryImages.trim()) {
    return project.galleryImages
      .split(/\n|,/)
      .map((url) => url.trim())
      .filter(Boolean);
  }

  return [project.image].filter(Boolean);
}

function renderSlide() {
  const image = gallery[currentSlide];

  carouselImage.src = image || "";
  carouselImage.alt = `${titleElement.textContent} preview ${currentSlide + 1}`;
  slideCounter.textContent = `${currentSlide + 1} / ${gallery.length}`;

  prevButton.disabled = gallery.length <= 1;
  nextButton.disabled = gallery.length <= 1;

  document.querySelectorAll(".carousel-dots button").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function renderDots() {
  dotsWrapper.innerHTML = "";

  gallery.forEach((_, index) => {
    const button = document.createElement("button");
    button.setAttribute("aria-label", `Go to image ${index + 1}`);
    button.addEventListener("click", () => {
      currentSlide = index;
      renderSlide();
    });
    dotsWrapper.appendChild(button);
  });
}

prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + gallery.length) % gallery.length;
  renderSlide();
});

nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % gallery.length;
  renderSlide();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") prevButton.click();
  if (event.key === "ArrowRight") nextButton.click();
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

loadProject();
