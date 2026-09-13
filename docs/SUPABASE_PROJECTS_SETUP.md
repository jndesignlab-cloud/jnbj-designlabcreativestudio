# Supabase Projects — Production Setup

DesignLab v3.13.0 now reads and writes **portfolio projects** through Supabase.

## Safe frontend configuration already included

Project URL:

`https://fyhxipoayyhlrablgvll.supabase.co`

Publishable key:

`sb_publishable_62LdQNox7y8HFWzO9tPS0Q_1nQ8qV9g`

The publishable key is intentionally used in browser code. Database security
depends on the Row Level Security policies created in the migration SQL.

## Before deploying v3.13.0

Confirm these items in Supabase:

1. The `public.projects` table exists.
2. The 13 existing project rows were imported.
3. Row Level Security is enabled.
4. Public users can SELECT only rows where `status = 'Published'`.
5. You created your own user in **Authentication → Users**.
6. That user's UUID exists in `public.portfolio_admins`.

If steps 5–6 are not done yet, the public project archive will still work, but
`addproject.html` will not be allowed to insert new projects.

## Admin login

`addproject.html` no longer asks for the old project admin password.

It now uses:

- Supabase Auth email
- Supabase Auth password
- `portfolio_admins` allowlist
- Row Level Security

Do not put a service-role key, database password, or JWT secret in this website.

## What moved to Supabase

- `projects.html`
- `project.html`
- `addproject.html`
- Project totals on `admin.html`

## What still uses Apps Script

- Contact / inquiry submission
- Inquiry status checking
- Visitor count
- Inquiry information on the private admin dashboard
- Daily Task Tracker

This split is intentional so the migration can be tested safely before removing
the old Apps Script project database completely.

## Quick production test

After deploying:

1. Open `projects.html`.
2. Confirm all 13 Published projects load.
3. Open 2–3 project pages and check gallery images.
4. Open `addproject.html`.
5. Sign in with your Supabase Auth account.
6. Add a small test project as `Draft`.
7. Confirm the Draft does NOT appear publicly.
8. Delete the test row directly in Supabase Table Editor.

Once those checks pass, the Google Sheet Projects tab is no longer needed as the
live database, but keep the exported CSV as a backup.
