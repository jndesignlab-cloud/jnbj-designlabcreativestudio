# Changelog

## v3.14.0 — Premium UI System

A visual and motion refinement release. No backend or database architecture changed.

### Visual system
- Added a dedicated `premium.css` design-system layer instead of adding more one-off rules to the legacy stylesheet.
- Unified page width, gutters, section spacing, typography hierarchy, radii, borders, shadows, and button behavior.
- Reduced the boxed/card-heavy appearance throughout the site.
- Refined Light and Blue themes around a cleaner neutral + blue visual language.
- Rebuilt header behavior with active-page indicators and a compact blurred scroll state.

### Homepage
- Refined the hero composition and visual hierarchy.
- Restyled Studio Record as a cleaner editorial data band.
- Added a Supabase-driven Selected Work section using the existing project database.
- Simplified the service selector presentation.
- Refined process, FAQ, trust logos, and final CTA.

### Work
- Made the project archive more image-led with larger previews, lighter dividers, and restrained hover motion.
- Refined individual project galleries and story sections.

### Services / Downloads / Contact
- Reduced visible card chrome and standardized component styling.
- Refined service modal and download modal motion.
- Refined forms, filters, search fields, and pricing presentation.

### Motion
- Rebuilt section reveal timing.
- Added subtle staggered grid/list reveals.
- Added header scroll transition.
- Added restrained image hover zoom.
- Added polished modal entrance motion.
- Added full `prefers-reduced-motion` support.

## v3.13.0 — Supabase Projects migration

- Migrated the public project archive from Google Sheets / Apps Script to Supabase.
- Migrated individual project loading to Supabase.
- Rebuilt Add Project around Supabase Auth and RLS.
- Added Draft / Published support to Add Project.
- Added `show_on_personal_portfolio` when adding projects.
- Project totals on the private dashboard now come from Supabase.
- Inquiries, visitor tracking, and task data remain on Apps Script for now.
- Removed sample/fallback projects from the public archive.
- Added a small reusable `project-db.js` Supabase client.

## v3.12.1 — Repository cleanup

- Removed unused `app.js`.
- Removed unused `service-playground.js`.
- Removed the old DesignLab CV JavaScript.
- Replaced the old DesignLab CV page with a redirect to the dedicated personal CV.
- Removed six unused placeholder logo assets.
- Removed unused `designlab-float-logo.webp`.
- Removed unused `client-overdrive.webp`.
- Removed historical `UPDATE_v*.md` files from the deployment root.
- Moved the existing Google Apps Script backend into `legacy/google-apps-script/`.
- Moved the old Studio Notes CSV/Python generator into `legacy/blog-generator/`.
- Moved image notes into `docs/`.
- Cleaned the sitemap and robots rules.
- Kept the current Apps Script-backed production behavior unchanged.

## v3.12.0 — One-stop services

- Simplified the Services page into grouped service grids.
- Increased standard listed rates.
- Added country-aware currency display with PHP/USD fallback.

## v3.11.0 — Compact downloads

- Simplified Downloads into search + resource grid.
- Added three free Google Sheets resources.
