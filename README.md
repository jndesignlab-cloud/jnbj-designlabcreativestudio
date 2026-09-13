# DesignLab Creative Studio Website

Current production package: **v3.15.2**

Website: https://madebydesignlab.com  
Personal portfolio: https://jannjaravata.madebydesignlab.com

## Public pages

- `index.html` — homepage
- `projects.html` — project archive
- `project.html` — individual project view
- `services.html` — services and localized pricing
- `downloads.html` — free DesignLab downloads
- `insights.html` + `insights/` — Studio Notes
- `creator.html` — creator overview
- `contact.html` — project inquiry
- `inquiry-status.html` — inquiry tracking
- `cv.html` — redirect to the personal portfolio CV

## Private / admin pages

- `admin.html`
- `addproject.html`

These pages are excluded from search indexing through `robots.txt`.

## Current backend

Portfolio projects now use **Supabase**.

Apps Script remains active only for inquiries, visitor analytics, and the private
dashboard's legacy inquiry data. The archived Apps Script backend remains in
`legacy/google-apps-script/` while the remaining systems are migrated.

See `docs/SUPABASE_PROJECTS_SETUP.md` for the project-database setup.

## Studio Notes tooling

The old CSV/Python generator is archived under:

`legacy/blog-generator/`

It is **not part of the live website runtime** and should not be run against the
current site without updating its templates first.

## Clean production rule

Files in `legacy/` and `docs/` are reference material only. The browser does not
depend on them for the public site.


## Editorial agency visual system

`agency.css` is the active DesignLab visual layer for v3.15.2.

The design direction borrows high-level editorial agency principles—large type,
work-first presentation, simple service grouping, client proof, and confident
calls to action—while keeping original DesignLab branding, content, structure,
and implementation.


## v3.15.2 homepage note

The homepage now follows a Bou-inspired structure: cinematic hero, selected work grid, brand wall, and project spotlight, while still using DesignLab content and Supabase-driven work data.


## v3.15.2 note

This patch specifically fixes the homepage hero layout so it is full-screen and no longer constrained by the shared main container width.
