const SITE_VERSION = "3.16.8";
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
  splitSkills(project.skills).forEach((skill) => {
    if (tags.length < 3 && !tags.includes(skill)) tags.push(skill);
  });
  return tags.slice(0, 3);
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
        <p class="dl-eyebrow">${escapeAgency(project.category || "Featured project")}</p>
        <h3>${escapeAgency(project.title)}</h3>
        <p class="dl-feature-description">${escapeAgency(project.description || "Selected work from the DesignLab archive.")}</p>
        <div class="dl-feature-meta">
          ${project.category ? `<span class="dl-feature-category">${escapeAgency(project.category)}</span>` : ""}
          ${tags ? `<div class="dl-feature-tags">${tags}</div>` : ""}
        </div>
        <div class="dl-feature-actions">
          <a class="dl-feature-link" href="project.html?id=${encodeURIComponent(project.id)}">See more →</a>
        </div>
      </div>
    </article>`;
}

const HOME_CLIENTS = [
  {
    name: "Panpacific University",
    markType: "image",
    markSrc: "assets/client-panpacific.webp",
    description: "A private higher education institution serving students through academic programs, institutional communication, and campus-wide initiatives.",
    projects: "Projects done: campaigns, publications, event visuals, internal systems"
  },
  {
    name: "PACE",
    markType: "text",
    markClass: "pace",
    markText: "PACE",
    description: "Professional Advancement Continuing Education provides flexible and career-oriented learning opportunities for aspiring professionals and educators.",
    projects: "Projects done: website system, enrollment materials, promotional visuals"
  },
  {
    name: "Ion Ready Distribution Group",
    markType: "text",
    markClass: "ionready",
    markText: "ION READY",
    description: "A distribution-focused business handling product marketing, sales communication, and branded collateral across different product lines.",
    projects: "Projects done: catalogue brochures, product collaterals, branded layouts"
  },
  {
    name: "Catch of the Day",
    markType: "text",
    markClass: "catchoftheday",
    markText: "CATCH OF THE DAY",
    description: "A food-focused brand built around customer-facing communication, visual appetite appeal, and promotional content.",
    projects: "Projects done: brand visuals, food content, promotional graphics"
  },
  {
    name: "MyITHub Australia",
    markType: "text",
    markClass: "myithub",
    markText: "MyITHub Australia",
    description: "An Australia-based IT business supporting clients through digital services and professional technology solutions.",
    projects: "Projects done: social graphics, digital materials, brand support"
  },
  {
    name: "Sole Protect",
    markType: "image",
    markSrc: "assets/client-soleprotect.webp",
    description: "A sneaker-care product brand focused on clean product presentation, digital campaigns, and e-commerce-friendly creative materials.",
    projects: "Projects done: product visuals, campaign ads, launch graphics"
  }
];

const HERO_HIGHLIGHTS = [
  { title: "OSC Request System", subtitle: "Dashboard & tracking", image: "assets/insights-osc-system-wide.webp", href: "projects.html" },
  { title: "Task Tracker", subtitle: "Visual productivity tool", image: "assets/insights-task-tracker-wide.webp", href: "projects.html" },
  { title: "60 Days of Design", subtitle: "Content series", image: "assets/insights-60-days-wide.webp", href: "projects.html" },
  { title: "Daily Grind", subtitle: "Poster concept set", image: "assets/insights-daily-grind-wide.webp", href: "projects.html" },
  { title: "Sole Protect", subtitle: "Product visuals", image: "assets/client-soleprotect.webp", href: "projects.html" },
  { title: "CoziSleep", subtitle: "Promo creative", image: "assets/client-cozisleep.webp", href: "projects.html" }
];

function clientMarkup(item) {
  const mark = item.markType === "image"
    ? `<div class="dl-client-mark image"><img src="${escapeAgency(item.markSrc)}" alt="${escapeAgency(item.name)}" loading="lazy" decoding="async"></div>`
    : `<div class="dl-client-mark wordmark ${escapeAgency(item.markClass || "")}"><span>${escapeAgency(item.markText || item.name)}</span></div>`;

  return `
    <article class="dl-client-card">
      ${mark}
      <div class="dl-client-copy">
        <h3>${escapeAgency(item.name)}</h3>
        <p>${escapeAgency(item.description)}</p>
        <small>${escapeAgency(item.projects)}</small>
      </div>
    </article>`;
}

function heroHighlightMarkup(item) {
  return `
    <a class="dl-mini-project" href="${escapeAgency(item.href || "projects.html")}">
      <span class="dl-mini-project-media"><img src="${escapeAgency(item.image)}" alt="${escapeAgency(item.title)}" loading="lazy" decoding="async"></span>
      <span class="dl-mini-project-copy">
        <strong>${escapeAgency(item.title)}</strong>
        <span>${escapeAgency(item.subtitle)}</span>
      </span>
    </a>`;
}

function featureStripMarkup(project) {
  return `
    <a class="dl-feature-strip-item" href="project.html?id=${encodeURIComponent(project.id)}">
      <span class="dl-feature-strip-media">
        ${project.image
          ? `<img src="${escapeAgency(project.image)}" alt="${escapeAgency(project.title)}" loading="lazy" decoding="async">`
          : `<span class="dl-feature-strip-empty">No image</span>`}
      </span>
      <span class="dl-feature-strip-name">${escapeAgency(project.title)}</span>
    </a>`;
}

function testimonialCardMarkup(item, compact = false) {
  return `
    <article class="dl-testimonial-card${compact ? " is-compact" : " is-featured"}">
      ${compact ? "" : `<p class="dl-testimonial-kicker">Highlighted comment</p>`}
      <p class="dl-testimonial-quote">“${escapeAgency(item.quote)}”</p>
      <div class="dl-testimonial-meta">
        <strong>${escapeAgency(item.name)}</strong>
        <span>${escapeAgency(item.role)}</span>
      </div>
    </article>`;
}

async function loadFeaturedProject() {
  const featureRoot = document.querySelector("#homeFeaturedProject");
  const featureStripRoot = document.querySelector("#homeFeatureStrip");
  if ((!featureRoot && !featureStripRoot) || !window.DesignLabProjects) return;

  try {
    const featured = await window.DesignLabProjects.listPublished({ featured: true, limit: 12 });
    const published = await window.DesignLabProjects.listPublished({ limit: 12 });
    const featuredPool = featured.length ? featured : published;
    const project = featuredPool.length
      ? featuredPool[Math.floor(Math.random() * featuredPool.length)]
      : null;

    if (!project) {
      if (featureRoot) {
        featureRoot.innerHTML = `
          <article class="dl-feature-card">
            <div class="dl-feature-copy">
              <p class="dl-eyebrow">Highlighted Work</p>
              <h3>No featured project yet</h3>
              <p class="dl-feature-description">Add or publish at least one project to show it here.</p>
            </div>
          </article>`;
      }
      if (featureStripRoot) featureStripRoot.innerHTML = "";
      return;
    }

    if (featureRoot) featureRoot.innerHTML = featureMarkup(project);

    if (featureStripRoot) {
      const stripSource = featuredPool.slice(0, 8);
      const stripItems = stripSource.length > 1 ? stripSource.concat(stripSource) : stripSource;
      featureStripRoot.innerHTML = stripItems.map(featureStripMarkup).join("");
    }
  } catch (error) {
    console.error("Featured project load error:", error);
    if (featureRoot) {
      featureRoot.innerHTML = `
        <article class="dl-feature-card">
          <div class="dl-feature-copy">
            <p class="dl-eyebrow">Highlighted Work</p>
            <h3>Unable to load the featured project</h3>
            <p class="dl-feature-description">Please check the Supabase connection and published project entries.</p>
          </div>
        </article>`;
    }
    if (featureStripRoot) featureStripRoot.innerHTML = "";
  }
}

function loadHeroHighlights() {
  const root = document.querySelector("#homeHeroHighlights");
  if (!root) return;
  root.innerHTML = HERO_HIGHLIGHTS.concat(HERO_HIGHLIGHTS).map(heroHighlightMarkup).join("");
}

function loadClients() {
  const root = document.querySelector("#homeClientsGrid");
  if (!root) return;
  root.innerHTML = HOME_CLIENTS.map(clientMarkup).join("");
}

function loadTestimonials() {
  const grid = document.querySelector("#homeTestimonialsGrid");
  if (!grid) return;
  const items = Array.isArray(window.DESIGNLAB_TESTIMONIALS) ? window.DESIGNLAB_TESTIMONIALS : [];
  if (!items.length) {
    grid.innerHTML = "";
    return;
  }

  const [featured, ...rest] = items;
  grid.innerHTML = `
    ${testimonialCardMarkup(featured, false)}
    <div class="dl-testimonial-mini-grid">
      ${rest.map((item) => testimonialCardMarkup(item, true)).join("")}
    </div>`;
}

loadHeroHighlights();
loadClients();
loadFeaturedProject();
loadTestimonials();

/* Premium hero motion */
(() => {
  const hero = document.querySelector(".dl-hero-panel");
  const canvas = document.querySelector("#dlHeroParticles");
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

  const nodeCount = Math.max(26, Math.min(38, Math.round(window.innerWidth / 58)));
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00018,
    radius: 1.25 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2
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
      x: node.x * width + Math.sin(time * 0.00048 + node.phase) * 10,
      y: node.y * height + Math.cos(time * 0.00039 + node.phase) * 9
    };
  }

  function draw(time = 0) {
    if (!isVisible) {
      raf = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    const positions = nodes.map((node) => updateNode(node, time));
    const maxDistance = Math.min(Math.max(width * 0.22, 220), 330);

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > maxDistance) continue;
        const alpha = (1 - distance / maxDistance) * 0.38;
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, `rgba(255, 205, 158, ${alpha * 0.78})`);
        gradient.addColorStop(1, `rgba(188, 207, 255, ${alpha})`);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    positions.forEach((point, index) => {
      const pulse = 0.85 + Math.sin(time * 0.0015 + nodes[index].phase) * 0.22;
      ctx.beginPath();
      ctx.arc(point.x, point.y, nodes[index].radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(244, 247, 255, 0.88)";
      ctx.fill();
    });

    if (!coarsePointer) {
      smoothX += (mouseX - smoothX) * 0.07;
      smoothY += (mouseY - smoothY) * 0.07;
      parallaxX += (((smoothX - 0.5) * 15) - parallaxX) * 0.055;
      parallaxY += (((smoothY - 0.5) * 12) - parallaxY) * 0.055;
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
