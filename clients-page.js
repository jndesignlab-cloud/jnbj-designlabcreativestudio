const SITE_VERSION = "3.16.21";
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

function clientCard(item) {
  return `
    <article class="client-profile reveal-up" id="${escapeClient(item.id)}">
      <div class="client-profile-logo" data-client-logo>
        <img src="${escapeClient(item.logoSrc)}" alt="${escapeClient(item.name)} logo" loading="lazy" decoding="async">
        <span>${escapeClient(item.logoText || item.name)}</span>
      </div>
      <div class="client-profile-copy">
        <h2>${escapeClient(item.name)}</h2>
        <p>${escapeClient(item.description)}</p>
        <small>Projects done: ${escapeClient(item.projects)}</small>
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
