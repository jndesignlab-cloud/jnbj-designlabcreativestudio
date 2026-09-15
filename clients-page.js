const SITE_VERSION = "3.16.34";
const LAST_EDIT = "September 15, 2026";

document.querySelectorAll("#siteVersion").forEach((el) => (el.textContent = SITE_VERSION));
document.querySelectorAll("#lastEdit").forEach((el) => (el.textContent = LAST_EDIT));
document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));

function escapeClient(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function iconMarkup(type = "website") {
  if (type === "facebook") {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.2v2.2H7.7V14h2.6v8h3.2Z"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3.2a15.8 15.8 0 0 0-1.2-5A8 8 0 0 1 18.9 11ZM12 4.1c.8 1 1.7 3.1 2.2 6H9.8c.5-2.9 1.4-5 2.2-6ZM4.9 13h3.2c.1 1.8.5 3.5 1.2 5A8 8 0 0 1 4.9 13Zm3.2-2H4.9a8 8 0 0 1 4.4-5c-.7 1.5-1.1 3.2-1.2 5Zm3.9 8.9c-.8-1-1.7-3.1-2.2-5h4.4c-.5 1.9-1.4 4-2.2 5Zm2.7-6.9H9.3a14.4 14.4 0 0 1 0-2h5.4a14.4 14.4 0 0 1 0 2Zm-.2 5c.7-1.5 1.1-3.2 1.2-5h3.2a8 8 0 0 1-4.4 5Z"/></svg>';
}

function renderLinks(item) {
  if (!Array.isArray(item.links) || !item.links.length) return "";
  return `
    <div class="client-profile-links" aria-label="External links for ${escapeClient(item.name)}">
      ${item.links.map((link) => `
        <a class="client-profile-link" href="${escapeClient(link.url)}" target="_blank" rel="noreferrer" aria-label="${escapeClient(link.label)} — ${escapeClient(item.name)}" title="${escapeClient(link.label)}">
          ${iconMarkup(link.type)}
        </a>`).join("")}
    </div>`;
}

function serviceHref(label = "") {
  const value = String(label).toLowerCase();
  if (/(website|web|system|digital)/.test(value)) {
    return "services.html#web-development-services";
  }
  if (/(social|campaign|content|promotional|launch|ads)/.test(value)) {
    return "services.html#social-campaign-services";
  }
  return "services.html#graphic-design-services";
}

function renderProjectPills(projects = "") {
  const items = String(projects)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) return "";

  return `
    <div class="client-projects" aria-label="Services used">
      <span class="client-projects-label">What we worked on</span>
      <div class="client-project-pills">
        ${items.map((item) => `
          <a class="client-project-pill" href="${serviceHref(item)}" title="View related DesignLab service">
            ${escapeClient(item)}
          </a>`).join("")}
      </div>
    </div>`;
}

function clientCard(item) {
  return `
    <article class="client-profile reveal-up" id="${escapeClient(item.id)}">
      ${renderLinks(item)}
      <div class="client-profile-logo" data-client-logo>
        <img src="${escapeClient(item.logoSrc)}" alt="${escapeClient(item.name)} logo" loading="lazy" decoding="async">
        <span>${escapeClient(item.logoText || item.name)}</span>
      </div>
      <div class="client-profile-copy">
        <h2 class="${escapeClient(item.titleClass || '')}">${escapeClient(item.name)}</h2>
        <p>${escapeClient(item.description)}</p>
        ${renderProjectPills(item.projects)}
      </div>
    </article>`;
}

const root = document.querySelector("#clientsDirectory");
const clients = Array.isArray(window.DESIGNLAB_CLIENTS) ? window.DESIGNLAB_CLIENTS : [];
if (root) {
  root.innerHTML = clients.map(clientCard).join("");
  root.querySelectorAll('[data-client-logo]').forEach((wrap) => {
    const img = wrap.querySelector('img');
    if (!img) return;
    const sync = () => wrap.classList.toggle('has-image', img.complete && img.naturalWidth > 0);
    img.addEventListener('load', sync, { once: true });
    img.addEventListener('error', sync, { once: true });
    sync();
  });
}
