const SITE_VERSION = "3.2.2";
const LAST_EDIT = "June 25, 2026";

const triggers = [...document.querySelectorAll("[data-service-target]")];
const panels = [...document.querySelectorAll(".service-detail-panel")];
const closeButtons = [...document.querySelectorAll(".service-panel-close")];

function setFooterMeta() {
  const year = document.querySelector("#year");
  const version = document.querySelector("#siteVersion");
  const lastEdit = document.querySelector("#lastEdit");

  if (year) year.textContent = new Date().getFullYear();
  if (version) version.textContent = SITE_VERSION;
  if (lastEdit) lastEdit.textContent = LAST_EDIT;
}

function closeAllPanels(updateHash = true) {
  panels.forEach((panel) => {
    panel.hidden = true;
    panel.classList.remove("is-open");
  });

  triggers.forEach((trigger) => {
    trigger.classList.remove("active");
    trigger.setAttribute("aria-selected", "false");
    const symbol = trigger.querySelector(".service-category-action b");
    if (symbol) symbol.textContent = "+";
  });

  if (updateHash && window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

function openPanel(targetId, shouldScroll = true) {
  const panel = document.getElementById(targetId);
  const trigger = document.querySelector(`[data-service-target="${targetId}"]`);
  if (!panel || !trigger) return;

  closeAllPanels(false);
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add("is-open"));
  trigger.classList.add("active");
  trigger.setAttribute("aria-selected", "true");

  const symbol = trigger.querySelector(".service-category-action b");
  if (symbol) symbol.textContent = "−";

  history.replaceState(null, "", `#${targetId}`);

  if (shouldScroll) {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetId = trigger.dataset.serviceTarget;
    const alreadyOpen = trigger.classList.contains("active");
    if (alreadyOpen) closeAllPanels();
    else openPanel(targetId);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeAllPanels();
    document.querySelector(".service-category-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

setFooterMeta();

const initialHash = window.location.hash.replace("#", "");
if (["design-packages", "flexible-services", "website-packages"].includes(initialHash)) {
  openPanel(initialHash, false);
}
