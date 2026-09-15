const SITE_VERSION = "3.16.19";

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const titleElement = document.querySelector("#projectTitle");
const categoryElement = document.querySelector("#projectCategory");
const descriptionElement = document.querySelector("#projectDescription");
const skillsElement = document.querySelector("#projectSkills");
const problemElement = document.querySelector("#projectProblem");
const solutionElement = document.querySelector("#projectSolution");
const outcomeElement = document.querySelector("#projectOutcome");
const externalLink = document.querySelector("#projectExternalLink");
const carouselImage = document.querySelector("#carouselImage");
const slideCounter = document.querySelector("#slideCounter");
const dotsWrapper = document.querySelector("#carouselDots");
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");
const similarProjectCta = document.querySelector("#similarProjectCta");

let gallery = [];
let currentSlide = 0;

document.querySelector("#year").textContent = new Date().getFullYear();

const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");

if (versionElement) versionElement.textContent = SITE_VERSION;
if (lastEditElement) lastEditElement.textContent = "September 13, 2026";

async function loadProject() {
  if (!projectId) {
    renderNotFound();
    return;
  }

  if (!window.DesignLabProjects) {
    renderUnavailable();
    return;
  }

  try {
    const project = await window.DesignLabProjects.getPublishedProject(projectId);

    if (!project) {
      renderNotFound();
      return;
    }

    renderProject(project);
  } catch (error) {
    console.error("Supabase project:", error);
    renderUnavailable();
  }
}

function renderProject(project) {
  const projectTitle = project.title || "Untitled Project";

  titleElement.textContent = projectTitle;
  document.title = `${projectTitle} | DesignLab Creative Studio`;
  categoryElement.textContent = project.category || "Project";

  renderSkillTags(skillsElement, project.skills);

  descriptionElement.textContent = project.description || "";
  problemElement.textContent =
    project.problem ||
    "This project focused on solving a communication, branding, or presentation need through clearer and more strategic visuals.";
  solutionElement.textContent =
    project.solution ||
    "I handled the design direction, layout structure, visual hierarchy, and final creative execution based on the project requirements.";
  outcomeElement.textContent =
    project.outcome ||
    "The final output provided a more polished, organized, and professional visual presentation.";

  if (project.link) {
    externalLink.href = project.link;
    externalLink.style.display = "inline-flex";
  } else {
    externalLink.style.display = "none";
  }

  if (similarProjectCta) {
    const inquiryParams = new URLSearchParams({
      source: "project-case-study",
      service: project.category || "General Inquiry",
      package: `Similar to: ${projectTitle}`
    });

    similarProjectCta.href = `contact.html?${inquiryParams.toString()}`;
  }

  updateProjectMetadata(project);

  gallery = normalizeGallery(project);
  currentSlide = 0;
  renderDots();
  renderSlide();
}

function updateProjectMetadata(project) {
  const description =
    project.description ||
    `View ${project.title} by DesignLab Creative Studio.`;

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);

  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", `${project.title} | DesignLab Creative Studio`);

  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);

  if (project.image) {
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute("content", project.image);
  }
}

function renderNotFound() {
  titleElement.textContent = "Project not found";
  categoryElement.textContent = "Portfolio";
  descriptionElement.textContent =
    "This project is unavailable, unpublished, or the link is no longer valid.";

  skillsElement.style.display = "none";
  problemElement.textContent = "Return to the project archive to browse published work.";
  solutionElement.textContent = "";
  outcomeElement.textContent = "";
  externalLink.style.display = "none";

  gallery = [];
  renderDots();
  renderSlide();
}

function renderUnavailable() {
  titleElement.textContent = "Project temporarily unavailable";
  categoryElement.textContent = "Portfolio";
  descriptionElement.textContent =
    "The project database could not be reached. Please try again shortly.";

  skillsElement.style.display = "none";
  problemElement.textContent = "";
  solutionElement.textContent = "";
  outcomeElement.textContent = "";
  externalLink.style.display = "none";

  gallery = [];
  renderDots();
  renderSlide();
}

function normalizeGallery(project) {
  if (Array.isArray(project.galleryImages) && project.galleryImages.length) {
    return project.galleryImages.filter(Boolean);
  }

  if (typeof project.galleryImages === "string" && project.galleryImages.trim()) {
    const images = project.galleryImages
      .split(/\n|,/)
      .map((url) => url.trim())
      .filter(Boolean);

    if (project.image && !images.includes(project.image)) {
      images.unshift(project.image);
    }

    return images;
  }

  return [project.image].filter(Boolean);
}

function renderSlide() {
  if (!gallery.length) {
    carouselImage.removeAttribute("src");
    carouselImage.alt = "";
    carouselImage.style.display = "none";
    slideCounter.textContent = "0 / 0";
    prevButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  carouselImage.style.display = "";
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
  if (!gallery.length) return;
  currentSlide = (currentSlide - 1 + gallery.length) % gallery.length;
  renderSlide();
});

nextButton.addEventListener("click", () => {
  if (!gallery.length) return;
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

loadProject();
