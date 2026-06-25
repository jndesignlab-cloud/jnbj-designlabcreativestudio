const SITE_VERSION = "3.2.6";
const LAST_EDIT = "June 25, 2026";

const triggers = [...document.querySelectorAll("[data-service-target]")];
const modal = document.querySelector("#serviceModal");
const modalContent = document.querySelector("#serviceModalContent");
const modalDialog = modal?.querySelector(".service-modal-dialog");
let lastServiceTrigger = null;

function setFooterMeta() {
  const year = document.querySelector("#year");
  const version = document.querySelector("#siteVersion");
  const lastEdit = document.querySelector("#lastEdit");
  if (year) year.textContent = new Date().getFullYear();
  if (version) version.textContent = SITE_VERSION;
  if (lastEdit) lastEdit.textContent = LAST_EDIT;
}

function openServiceModal(targetId, trigger = null, updateHash = true) {
  const template = document.getElementById(targetId);
  if (!template || !modal || !modalContent) return;

  lastServiceTrigger = trigger || document.querySelector(`[data-service-target="${targetId}"]`);
  modalContent.innerHTML = template.innerHTML;
  modalContent.querySelectorAll(".service-panel-close").forEach((button) => button.remove());
  modalContent.querySelectorAll("[hidden]").forEach((element) => element.removeAttribute("hidden"));

  triggers.forEach((item) => {
    const active = item.dataset.serviceTarget === targetId;
    item.classList.toggle("active", active);
    item.setAttribute("aria-expanded", String(active));
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  if (updateHash) history.replaceState(null, "", `#${targetId}`);
  requestAnimationFrame(() => modalDialog?.focus());
}

function closeServiceModal({ restoreFocus = true, clearHash = true } = {}) {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  triggers.forEach((item) => {
    item.classList.remove("active");
    item.setAttribute("aria-expanded", "false");
  });
  if (clearHash && window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  if (restoreFocus) lastServiceTrigger?.focus();
}

triggers.forEach((trigger) => {
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", () => openServiceModal(trigger.dataset.serviceTarget, trigger));
});

document.querySelectorAll("[data-close-service-modal]").forEach((element) => {
  element.addEventListener("click", () => closeServiceModal());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("active")) closeServiceModal();
});

setFooterMeta();
const initialHash = window.location.hash.replace("#", "");
if (["design-packages", "flexible-services", "website-packages", "custom-projects"].includes(initialHash)) {
  openServiceModal(initialHash, null, false);
}
