# Changelog

## v3.16.3 — Hero Motion & Alignment Fix

- Made the connected particle network more visible and slightly faster.
- Added stronger cursor-follow glow and subtle background parallax.
- Reduced the homepage navigation height to a compact 64px.
- Improved logo contrast over the hero and restored the normal logo after scroll.
- Recentered the hero content against the viewport rather than the header block.
- Preserved the Clients, Featured Project, and Testimonials section repairs.

## v3.16.3 — Section Repair + Premium Hero Motion

- Fully isolated the homepage hero styles so they no longer affect the sections below.
- Repaired the Clients grid with controlled logo sizes, responsive columns, and consistent card spacing.
- Repaired the single Featured Project section and its Supabase-driven content layout.
- Repaired testimonial blob cards and the normal light-page flow below the hero.
- Added a subtle connected-particle canvas inside the hero.
- Added a soft cursor-follow blue/violet glow for pointer devices.
- Added slow gradient movement to the hero highlight text.
- Kept section entrance motion intentionally simple: opacity only, with no chunky vertical sliding.
- Featured Project continues to use one project marked Featured from Supabase.

## v3.16.3 — Hero Readability & Motion Fix

- Made the homepage header transparent over the hero and frosted only after scrolling.
- Corrected the hero to use the full viewport height without the white top block.
- Tightened the hero copy to one short statement with a readable gradient highlight.
- Removed the low-contrast summary text from the hero.
- Reworked alignment and sizing for a cleaner centered composition.
- Replaced slide/stagger reveals with subtle opacity-only transitions.

## v3.16.3 — Homepage Overhaul

- Rebuilt the homepage with a new full-screen hero panel instead of the previous reused structure.
- Shortened the hero message and added a gradient text highlight for a cleaner, more premium first impression.
- Replaced the homepage sections with a clearer flow: Hero Panel, Clients, Project Feature, and Testimonials.
- Added a selected client grid with logo-supported cards and short descriptions.
- Reduced the homepage clutter by removing the floating theme and visitor UI from the public-facing experience.
- Refined the shared navigation for the main portfolio pages to a simpler Work / Services / About / Contact structure.

## v3.16.3 — Bou-style Hero Refinement

- Rebuilt the homepage hero to more closely match the Bou-style reference while keeping DesignLab branding.
- Reduced the headline size and centered the composition for a cleaner premium first screen.
- Simplified the header navigation to Work, Services, About, and Contact for a more editorial homepage feel.
- Removed homepage floating utility UI so the landing screen feels cleaner and more focused.
- Created a new cinematic hero background asset using DesignLab visuals with a warm-to-blue gradient treatment.

## v3.16.3 — Homepage Fullscreen Fix

- Fixed the homepage hero so it now spans the full screen instead of sitting inside a constrained centered container.
- Made the homepage header float transparently over the hero for a closer Bou-style first impression.
- Improved hero readability with stronger overlay treatment and a larger white headline.
- Kept the remaining homepage sections intact while preserving the Supabase project connection.

## v3.16.3 — Bou-style Home Refresh

- Rebuilt the homepage structure to follow a Bou-inspired flow while keeping DesignLab content and branding.
- Added a fullscreen cinematic hero with centered message and compact CTA pills.
- Replaced the previous editorial home sequence with a 6-item work showcase grid.
- Added a brand and organization logo wall.
- Added a project spotlight section driven by a featured Supabase project.
- Kept the existing Supabase project source and site structure intact.
- Maintained the closing CTA and overall compact spacing preference.

## v3.16.3 — Editorial Agency System

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