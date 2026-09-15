# DesignLab v3.16.19 — foundation refinement

Baseline: supplied v3.16.18 ZIP. This is a complete static-site update for the existing GitHub Pages project. No database migration or credential change is required.

## Changes

- Removed superseded exact-selector CSS declarations under matching media conditions while retaining surviving rule order. Removed inactive release-specific homepage selectors in agency.css and unused hero-marquee/mini-project styles.
- Removed homepage navbar overrides so navbar.css owns the public navbar. Existing mobile-menu styles in style.css remain an inherited dependency.
- Preserved the stable designlab-home class, homepage panel order, hero wording, white supporting copy, existing typography, assets, client content, and temporary testimonials.
- Only request the published-project fallback when the featured pool is empty. Keep one-item strips stationary; exclude duplicate animated items from keyboard and screen-reader navigation. Pause/reset the strip for keyboard access and honor reduced motion.
- Hide decorative hero cards on compact or short viewports and when their measured bounds approach hero content. Allow a safety margin for floating motion.
- Correct the mobile menu's accessible label on close. Accumulate small scroll movements so the navbar responds to slow scrolling.
- Align active HTML asset query versions and JavaScript footer versions to 3.16.19.
- Keep public project-load messages understandable without backend instructions.

## Files to edit going forward

| Area | Source |
| --- | --- |
| Homepage structure and locked copy | index.html |
| Homepage layout and responsive behavior | home.css |
| Project/client rendering and hero interaction | landing.js |
| Testimonial content | testimonials.js |
| Shared navigation | navbar.css and navigation.js |
| Project data contract | project-db.js |
| Connection settings | config.js |
| Local imagery | assets/ |

Inspect inherited style.css before layout changes. agency.css still serves other public pages. preview.html and legacy/ are historical material, not production design references. Historical documentation is retained.

## Validation

Passed:
- Syntax checks for all 17 top-level JavaScript files.
- CSS parser validation for home.css, agency.css, and navbar.css.
- Featured-project behavior checks: success with one query, empty-featured fallback, multiple items with accessible duplicate markup, empty database, and backend failure.
- config.js is byte-for-byte unchanged. All original files remain in this package.

Not completed:
- Browser rendering, viewport/zoom screenshots, and interactive navigation checks. A browser executable was unavailable and its download timed out.
- Live Supabase, inquiry, analytics, and administrative integration checks. No live records were written.

Before production upload, preview at desktop 100%, 125%, and 150% zoom, tablet, and narrow mobile. Confirm hero copy/floats do not overlap; Highlighted Work and its strip remain centered; navbar hides downward and returns upward; mobile links open and close; public pages and existing forms work. This release has not been deployed.

## Deployment and rollback

Upload the contents of this release folder into the existing repository using your normal GitHub Pages workflow. Preserve any repository-managed CNAME or workflow files that were not present in the source ZIP. Keep the v3.16.18 ZIP available for rollback. Do not replace config.js with a sample configuration.
