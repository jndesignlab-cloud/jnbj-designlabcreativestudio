(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.classList.add("motion-enabled");

  function showPage() {
    const main = document.querySelector("main");
    if (!main) return;
    main.classList.add("page-reveal");

    if (reducedMotion) {
      main.classList.add("is-visible");
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => main.classList.add("is-visible"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showPage, { once: true });
  } else {
    showPage();
  }
})();
