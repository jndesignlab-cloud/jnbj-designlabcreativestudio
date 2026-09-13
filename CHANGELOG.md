# Changelog

## v3.15.2 — Homepage Fullscreen Fix

- Fixed the homepage hero so it now spans the full screen instead of sitting inside a constrained centered container.
- Made the homepage header float transparently over the hero for a closer Bou-style first impression.
- Improved hero readability with stronger overlay treatment and a larger white headline.
- Kept the remaining homepage sections intact while preserving the Supabase project connection.

## v3.15.2 — Bou-style Home Refresh

- Rebuilt the homepage structure to follow a Bou-inspired flow while keeping DesignLab content and branding.
- Added a fullscreen cinematic hero with centered message and compact CTA pills.
- Replaced the previous editorial home sequence with a 6-item work showcase grid.
- Added a brand and organization logo wall.
- Added a project spotlight section driven by a featured Supabase project.
- Kept the existing Supabase project source and site structure intact.
- Maintained the closing CTA and overall compact spacing preference.

## v3.15.2 — Editorial Agency System

- Reset the visual direction from v3.14 and rebuilt from the v3.13 Supabase baseline.
- Added a bold editorial agency-style homepage with DesignLab branding.
- Kept a single-column hero with oversized typography.
- Added one primary Featured Work case selected from Supabase `featured=true` projects.
- Added a compact secondary work stream driven by Supabase.
- Added a proof section combining studio statistics and selected client logos.
- Rebuilt homepage services as large editorial service rows instead of cards/tabs.
- Added a verified-testimonial-ready section that remains hidden until real quotes are supplied.
- Added a clearer independent-studio positioning section and closing CTA.
- Refined Work and Services page hierarchy to match the new agency system.
- Added `agency.css` as the dedicated visual layer.
- Supabase, Apps Script, inquiries, downloads, and authentication behavior remain unchanged.

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
