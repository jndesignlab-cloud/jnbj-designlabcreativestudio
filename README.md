# DesignLab Creative Studio Website

Current production package: **v3.12.1**

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

The live site still uses the deployed Google Apps Script endpoints in `config.js`
for projects, inquiries, visitor counts, and admin data.

A copy of the current Apps Script backend is preserved in:

`legacy/google-apps-script/Code.gs`

This is being kept only as a migration/reference copy while the project database
is prepared for Supabase.

## Studio Notes tooling

The old CSV/Python generator is archived under:

`legacy/blog-generator/`

It is **not part of the live website runtime** and should not be run against the
current site without updating its templates first.

## Clean production rule

Files in `legacy/` and `docs/` are reference material only. The browser does not
depend on them for the public site.
