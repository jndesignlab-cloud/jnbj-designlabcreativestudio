const SITE_VERSION = "3.16.4";
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
    const project = featured.length
      ? featured[Math.floor(Math.random() * featured.length)]
      : (published[0] || null);

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


/* =========================================================
   v3.16.4 — Premium hero motion
   More visible connected particles, cursor glow + parallax.
   ========================================================= */
(() => {
  const hero = document.querySelector(".dl-hero-panel");
  const canvas = document.querySelector("#dlHeroParticles");
  const glow = document.querySelector("#dlHeroCursorGlow");

  if (!hero || !canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  if (reduceMotion) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  let raf = 0;
  let isVisible = true;
  let mouseX = 0.5;
  let mouseY = 0.48;
  let smoothX = mouseX;
  let smoothY = mouseY;
  let parallaxX = 0;
  let parallaxY = 0;

  const nodeCount = Math.max(20, Math.min(30, Math.round(window.innerWidth / 70)));
  const nodes = Array.from({ length: nodeCount }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00013,
    vy: (Math.random() - 0.5) * 0.00013,
    radius: 1.05 + Math.random() * 1.45,
    phase: Math.random() * Math.PI * 2,
    seed: index
  }));

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function updateNode(node, time) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -0.04) node.x = 1.04;
    if (node.x > 1.04) node.x = -0.04;
    if (node.y < -0.04) node.y = 1.04;
    if (node.y > 1.04) node.y = -0.04;

    return {
      x: node.x * width + Math.sin(time * 0.00048 + node.phase) * 8,
      y: node.y * height + Math.cos(time * 0.00039 + node.phase) * 7
    };
  }

  function draw(time = 0) {
    if (!isVisible) {
      raf = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const positions = nodes.map((node) => updateNode(node, time));
    const maxDistance = Math.min(Math.max(width * 0.17, 150), 245);

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance > maxDistance) continue;

        const alpha = (1 - distance / maxDistance) * 0.22;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(176, 197, 255, ${alpha})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }

    positions.forEach((point, index) => {
      const pulse = 0.82 + Math.sin(time * 0.0015 + nodes[index].phase) * 0.2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, nodes[index].radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(221, 229, 255, .64)";
      ctx.fill();
    });

    if (!coarsePointer) {
      smoothX += (mouseX - smoothX) * 0.065;
      smoothY += (mouseY - smoothY) * 0.065;
      parallaxX += (((smoothX - 0.5) * 14) - parallaxX) * 0.055;
      parallaxY += (((smoothY - 0.5) * 10) - parallaxY) * 0.055;

      hero.style.setProperty("--cursor-x", `${smoothX * 100}%`);
      hero.style.setProperty("--cursor-y", `${smoothY * 100}%`);
      hero.style.setProperty("--parallax-x", `${parallaxX}px`);
      hero.style.setProperty("--parallax-y", `${parallaxY}px`);
    }

    raf = requestAnimationFrame(draw);
  }

  if (!coarsePointer) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      mouseX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      mouseY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      mouseX = 0.5;
      mouseY = 0.48;
    }, { passive: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === hero) isVisible = entry.isIntersecting;
    });
  }, { threshold: 0 });

  observer.observe(hero);
  resize();
  window.addEventListener("resize", resize, { passive: true });
  raf = requestAnimationFrame(draw);

  window.addEventListener("pagehide", () => cancelAnimationFrame(raf), { once: true });
})();
