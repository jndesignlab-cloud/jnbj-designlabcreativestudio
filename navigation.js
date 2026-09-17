(() => {
  const MOBILE_BREAKPOINT = 900;

  function closeMenu(header, button, panel) {
    header.classList.remove("mobile-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
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


// v3.16.16 shared header refinement
(() => {
  const headers = document.querySelectorAll(".site-header");
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const hash = window.location.hash;

  document.querySelectorAll(".nav-links a[href]").forEach((link) => {
    const raw = link.getAttribute("href") || "";
    const clean = raw.split("?")[0];
    const target = clean.split("#")[0].split("/").pop().toLowerCase();
    const targetHash = clean.includes("#") ? `#${clean.split("#")[1]}` : "";

    let active = false;
    if (["projects.html", "project.html"].includes(current) && target === "projects.html") active = true;
    else if (current === target && target !== "index.html") active = true;
    else if (current === "index.html" && target === "index.html" && targetHash && hash === targetHash) active = true;

    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  let ticking = false;
  function updateScrolledState() {
    headers.forEach((header) => header.classList.toggle("is-scrolled", window.scrollY > 14));
    ticking = false;
  }

  updateScrolledState();
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrolledState);
  }, { passive: true });
})();



/* v3.16.16 shared smart-navbar visibility */
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const hero = document.querySelector(".dl-hero-panel");
  let lastY = Math.max(0, window.scrollY);
  let ticking = false;

  function updateVisibility() {
    const y = Math.max(0, window.scrollY);
    const menuOpen = header.classList.contains("mobile-menu-open");
    const movingDown = y > lastY + 4;
    const movingUp = y < lastY - 4;
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    const onHero = hero ? y < Math.max(heroBottom - 72, 0) : y < 24;

    if (menuOpen || onHero || y < 24) {
      header.classList.remove("nav-hidden");
    } else if (movingDown) {
      header.classList.add("nav-hidden");
    } else if (movingUp) {
      header.classList.remove("nav-hidden");
    }

    if (movingDown || movingUp || onHero || menuOpen) lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateVisibility);
  }, { passive: true });

  window.addEventListener("resize", () => {
    header.classList.remove("nav-hidden");
    lastY = Math.max(0, window.scrollY);
  }, { passive: true });

  updateVisibility();
})();
