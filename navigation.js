(() => {
  const MOBILE_BREAKPOINT = 900;

  function closeMenu(header, button, panel) {
    header.classList.remove("mobile-menu-open");
    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
  }

  function initHeader(header, index) {
    if (header.querySelector(".mobile-menu-toggle")) return;

    const desktopNav = header.querySelector(".nav-links");
    if (!desktopNav) return;

    const desktopCta = header.querySelector(".signal-header-cta");
    const menuId = `mobileNavigation${index + 1}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "mobile-menu-toggle";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-controls", menuId);
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span></span><span></span><span></span>';

    const panel = document.createElement("div");
    panel.className = "mobile-nav-panel";
    panel.id = menuId;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");

    const mobileLinks = document.createElement("nav");
    mobileLinks.className = "mobile-nav-links";
    mobileLinks.setAttribute("aria-label", "Mobile navigation");

    desktopNav.querySelectorAll("a").forEach((link) => {
      const clone = link.cloneNode(true);
      clone.addEventListener("click", () => closeMenu(header, button, panel));
      mobileLinks.appendChild(clone);
    });

    panel.appendChild(mobileLinks);

    if (desktopCta) {
      const ctaClone = desktopCta.cloneNode(true);
      ctaClone.classList.add("mobile-nav-cta");
      ctaClone.addEventListener("click", () => closeMenu(header, button, panel));
      panel.appendChild(ctaClone);
    }

    header.appendChild(button);
    header.appendChild(panel);

    button.addEventListener("click", () => {
      const willOpen = !header.classList.contains("mobile-menu-open");
      header.classList.toggle("mobile-menu-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      button.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
      panel.hidden = !willOpen;
      panel.setAttribute("aria-hidden", String(!willOpen));
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target) && header.classList.contains("mobile-menu-open")) {
        closeMenu(header, button, panel);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("mobile-menu-open")) {
        closeMenu(header, button, panel);
        button.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && header.classList.contains("mobile-menu-open")) {
        closeMenu(header, button, panel);
      }
    });
  }

  function initMobileNavigation() {
    document.querySelectorAll(".site-header").forEach(initHeader);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNavigation);
  } else {
    initMobileNavigation();
  }
})();


// v3.15.3 editorial agency header refinement
(() => {
  const headers = document.querySelectorAll(".site-header");
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".nav-links a[href]").forEach((link) => {
    const target = (link.getAttribute("href") || "").split("?")[0].split("#")[0].split("/").pop().toLowerCase();
    const active =
      target === current ||
      (["projects.html", "project.html"].includes(current) && target === "projects.html");

    if (active) link.setAttribute("aria-current", "page");
  });

  let ticking = false;
  function update() {
    headers.forEach((header) => header.classList.toggle("is-scrolled", window.scrollY > 14));
    ticking = false;
  }

  update();
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
})();
