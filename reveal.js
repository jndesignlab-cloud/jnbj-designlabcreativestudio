(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('motion-enabled');

  const selector = [
    'main > section',
    'main > article',
    'main > .cv-layout',
    'main > .article-back',
    '.project-card',
    '.managed-page-card',
    '.service-category-trigger',
    '.package-tier',
    '.website-tier',
    '.flexible-service-card',
    '.case-study-card',
    '.insight-card',
    '.cv-panel',
    '.cv-section',
    '.contact-intro-panel',
    '.contact-form-shell',
    '.tracking-info-panel',
    '.tracking-card-shell',
    '.admin-panel',
    '.admin-guide'
  ].join(',');

  let observer;

  function revealImmediately(element) {
    element.classList.add('reveal-up', 'is-visible');
  }

  function prepare(element, index = 0) {
    if (!(element instanceof HTMLElement)) return;
    if (element.matches('[hidden], .theme-dock, .visitor-float, .mobile-nav-panel')) return;
    if (element.dataset.revealReady === 'true') return;

    element.dataset.revealReady = 'true';
    element.classList.add('reveal-up');
    element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 55}ms`);

    if (reducedMotion || !observer) {
      revealImmediately(element);
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      requestAnimationFrame(() => element.classList.add('is-visible'));
    } else {
      observer.observe(element);
    }
  }

  function scan(scope = document) {
    const elements = Array.from(scope.querySelectorAll(selector));
    const grouped = new Map();

    elements.forEach((element) => {
      const parent = element.parentElement || document.body;
      if (!grouped.has(parent)) grouped.set(parent, []);
      grouped.get(parent).push(element);
    });

    grouped.forEach((items) => items.forEach((element, index) => prepare(element, index)));
  }

  function init() {
    if (!reducedMotion && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -6% 0px'
      });
    }

    scan(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector)) prepare(node);
          scan(node);
        });

        if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
          const element = mutation.target;
          if (!element.hidden && element.matches(selector)) prepare(element);
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
