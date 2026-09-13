(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.classList.add("motion-enabled");

  const staggerSelectors = [
    ".premium-work-grid",
    ".rp-stats-grid",
    ".rp-process-line",
    ".one-stop-grid",
    ".downloads-file-grid",
    ".editorial-project-list",
    ".editorial-article-list",
    ".compact-index-list"
  ];

  function setStaggerChildren(container) {
    if (!container) return;

    const children = Array.from(container.children).filter((child) => {
      return !child.matches(".loading-card, .project-empty-state, [hidden]");
    });

    children.forEach((child, index) => {
      child.classList.add("motion-stagger-child");
      child.style.setProperty("--stagger-delay", `${Math.min(index * 58, 290)}ms`);
    });
  }

  function preparePage() {
    const main = document.querySelector("main");
    if (!main) return;

    main.classList.add("page-reveal");

    staggerSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach(setStaggerChildren);
    });

    const revealTargets = new Set([
      ...document.querySelectorAll(".reveal-up"),
      ...main.querySelectorAll(":scope > section, :scope > article")
    ]);

    revealTargets.forEach((target, index) => {
      target.classList.add("section-reveal");
      target.style.setProperty(
        "--section-reveal-delay",
        `${Math.min(index * 22, 88)}ms`
      );
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      main.classList.add("is-visible");
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      document
        .querySelectorAll(".motion-stagger-child")
        .forEach((child) => child.classList.add("is-visible"));
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => main.classList.add("is-visible"));
    });

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -9% 0px"
      }
    );

    revealTargets.forEach((target) => sectionObserver.observe(target));

    // Dynamic content can be inserted after page load (Supabase projects/download cards).
    const dynamicObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const parent = node.parentElement;
          if (
            parent &&
            staggerSelectors.some((selector) => parent.matches(selector))
          ) {
            setStaggerChildren(parent);
            requestAnimationFrame(() => {
              parent.querySelectorAll(".motion-stagger-child").forEach((child) => {
                child.classList.add("is-visible");
              });
            });
          }
        });
      });
    });

    dynamicObserver.observe(main, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preparePage, { once: true });
  } else {
    preparePage();
  }
})();