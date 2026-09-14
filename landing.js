const SITE_VERSION = "3.16.0";
const LAST_EDIT = "September 14, 2026";

document.querySelectorAll("#siteVersion").forEach((el) => (el.textContent = SITE_VERSION));
document.querySelectorAll("#lastEdit").forEach((el) => (el.textContent = LAST_EDIT));
document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));

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

function featureMarkup(project) {
  const tags = getProjectTags(project)
    .map((tag) => `<span>${escapeAgency(tag)}</span>`)
    .join("");

  return `
    <article class="dl-feature-card">
      <div class="dl-feature-media">
        ${project.image
          ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="eager" decoding="async">`
          : `<div class="dl-feature-empty">No preview available</div>`}
      </div>
      <div class="dl-feature-copy">
        <p class="agency-kicker">Featured work</p>
        <h3>${escapeAgency(project.title)}</h3>
        <p class="dl-feature-description">${escapeAgency(project.description || "Selected work from the DesignLab archive.")}</p>
        ${project.problem ? `<p><strong>The goal:</strong> ${escapeAgency(project.problem)}</p>` : ""}
        ${project.solution ? `<p><strong>What DesignLab did:</strong> ${escapeAgency(project.solution)}</p>` : ""}
        ${project.outcome ? `<p><strong>Result:</strong> ${escapeAgency(project.outcome)}</p>` : ""}
        ${tags ? `<div class="dl-feature-tags">${tags}</div>` : ""}
        <div class="dl-feature-actions">
          <a class="dl-feature-link" href="project.html?id=${encodeURIComponent(project.id)}">View full project</a>
        </div>
      </div>
    </article>`;
}

function testimonialMarkup(item) {
  return `
    <article class="dl-testimonial-card agency-stagger">
      <p class="dl-testimonial-quote">“${escapeAgency(item.quote)}”</p>
      <div class="dl-testimonial-meta">
        <strong>${escapeAgency(item.name)}</strong>
        <span>${escapeAgency(item.role)}</span>
      </div>
    </article>`;
}

async function loadFeaturedProject() {
  const featureRoot = document.querySelector("#homeFeaturedProject");
  if (!featureRoot || !window.DesignLabProjects) return;

  try {
    const featured = await window.DesignLabProjects.listPublished({ featured: true, limit: 8 });
    const published = await window.DesignLabProjects.listPublished({ limit: 12 });
    const project = featured[0] || published[0] || null;

    if (!project) {
      featureRoot.innerHTML = `
        <article class="dl-feature-card">
          <div class="dl-feature-copy only-copy">
            <p class="agency-kicker">Featured work</p>
            <h3>No featured project yet</h3>
            <p>Add or publish at least one project to show it here.</p>
          </div>
        </article>`;
      return;
    }

    featureRoot.innerHTML = featureMarkup(project);
  } catch (error) {
    console.error("Featured project load error:", error);
    featureRoot.innerHTML = `
      <article class="dl-feature-card">
        <div class="dl-feature-copy only-copy">
          <p class="agency-kicker">Featured work</p>
          <h3>Unable to load the featured project</h3>
          <p>Please check the Supabase connection and published project entries.</p>
        </div>
      </article>`;
  }
}

function loadTestimonials() {
  const grid = document.querySelector("#homeTestimonialsGrid");
  if (!grid) return;

  const items = Array.isArray(window.DESIGNLAB_TESTIMONIALS) && window.DESIGNLAB_TESTIMONIALS.length
    ? window.DESIGNLAB_TESTIMONIALS
    : [
        {
          quote: "Testimonial placeholder. Add a short line about the clarity, speed, and quality of the collaboration.",
          name: "Client feedback",
          role: "Placeholder"
        },
        {
          quote: "Testimonial placeholder. This can highlight how the final output was practical, polished, and ready to use.",
          name: "Client feedback",
          role: "Placeholder"
        },
        {
          quote: "Testimonial placeholder. Use this area for a short quote about communication, revisions, and overall experience.",
          name: "Client feedback",
          role: "Placeholder"
        }
      ];

  grid.innerHTML = items.map(testimonialMarkup).join("");
}

loadFeaturedProject();
loadTestimonials();
