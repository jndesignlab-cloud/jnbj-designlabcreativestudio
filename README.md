# DesignLab Portfolio Website

A clean personal portfolio website for GitHub Pages with:

- Public viewer client: `index.html`
- Admin client: `admin.html`
- Google Apps Script backend: `Code.gs`
- Google Sheets project database
- Project cards with 16:9 preview modal
- DesignLab-inspired blue, white, navy, and violet visual system

## 1. Create Google Sheet

Create a new Google Sheet. You can leave it blank.

## 2. Add Apps Script

In the Sheet:

1. Extensions > Apps Script
2. Paste the contents of `Code.gs`
3. Change this line:

```js
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";
```

Use your own password.

## 3. Deploy Apps Script

1. Click Deploy > New deployment
2. Select type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy
6. Copy the Web App URL

## 4. Connect frontend

Open `config.js` and replace:

```js
const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your deployed Web App URL.

## 5. Upload to GitHub

Upload these files to your GitHub repository:

- `index.html`
- `admin.html`
- `style.css`
- `config.js`
- `app.js`
- `admin.js`

Then enable GitHub Pages.

## 6. Add projects

Open:

```txt
https://your-github-username.github.io/your-repo-name/admin.html
```

Add project details and use your admin password.

## Notes

For best results, use 16:9 images such as 1920×1080, 1600×900, or 1280×720.


## Update v1.1.0

- Reduced hero section scale for a better 100% browser view.
- Updated experience to 8+ years.
- Updated Adobe stat to Adobe Certified Professional.
- Added DesignLab Downloads stat.
- Removed Links header from the links section.
- Added footer version and dynamic last edit date/time using `document.lastModified`.


## Update v1.1.1

- Updated quick introduction copy.
- Updated skills and specialties list.


## Update v1.1.2

- Replaced sample testimonials with two real client highlights.
- Removed Main Portfolio and Facebook links.
- Updated LinkedIn link.
- Kept email as mailto:jannjaravata@gmail.com.


## Update v1.1.3

- Added profile photo to the Quick Introduction section.
- Reduced the Quick Introduction headline size for better balance.
- Improved alignment of the About section layout.
- Added `profile-photo.png` to the package for GitHub upload.


## Update v1.1.4

- Changed the About section layout to a smaller photo card on the left.
- Moved the quick intro description and skills into a stacked right column.
- Reduced the quick intro heading size for a more balanced layout.


## Update v1.1.5

- Added two DesignLab client testimonials from Richard Dhean V. and Darren L.
- Adjusted testimonials grid to two columns for better balance with four cards.


## Update v1.2.0

- Added `project.html`, a reusable individual project page template.
- Added `project.js` for individual project page loading and carousel logic.
- Project modal now opens the individual project page.
- Added a 16:9 image carousel for project galleries.
- Updated admin form with `Project Gallery Image URLs`.
- Updated Apps Script `Code.gs` with gallery support.

### Upload these frontend files to GitHub

```txt
index.html
admin.html
project.html
style.css
config.js
app.js
admin.js
project.js
profile-photo.png
```

### Update Apps Script

Replace your current `Code.gs` with the new `Code.gs`, set your admin password again, and redeploy as a new Web App version.

In the admin page, paste one 16:9 image URL per line in the Gallery Image URLs field.


## Update v1.2.1

- Added Skills / Services Used field to the admin project form.
- Added project skill tags under the project title in the modal preview and project detail page.
- Updated Apps Script with the new `Skills / Services Used` sheet column.
- Example format: `Social Media Management - Graphic Design - Campaign Posters`.


## Update v1.3.0

- Turned the individual project page into a case study style layout.
- Added admin fields:
  - The Problem / Goal
  - What I Did
  - Result / Outcome
- Added case study cards on `project.html`.
- Updated Apps Script with new sheet columns for case study content.


## Update v1.4.0

- Homepage now displays only up to 6 projects marked as Featured.
- Added `projects.html`, a full project archive page.
- Added `projects.js` for the archive page and category filters.
- Added admin fields:
  - Filter Category
  - Featured Project checkbox
- Added filters:
  - All
  - Social Media
  - Branding
  - Web / Digital
  - Publications
  - DesignLab
  - University
- Updated Apps Script with new columns:
  - Filter Category
  - Featured

### Upload these frontend files to GitHub

```txt
index.html
admin.html
projects.html
project.html
style.css
app.js
admin.js
projects.js
project.js
```

### Update Apps Script

Replace `Code.gs`, set your admin password again, and redeploy as a new Web App version.


## Update v1.4.1

- Updated project filter categories to better match actual portfolio work.
- Replaced `Publications` with `Print & Publications`.
- Added `Client Work` as a filter category.
- Final filters:
  - All
  - Social Media
  - Branding
  - Web / Digital
  - Print & Publications
  - DesignLab
  - University
  - Client Work


## Update v1.4.2

- Added multi-filter category support.
- A single project can now appear under multiple filters.
- Admin now uses multiple checkboxes for Filter Categories instead of a single dropdown.
- Selected categories are saved in the same `Filter Category` column as comma-separated values.
- Archive page filters now correctly match projects with multiple categories.

### Example

A project can now be saved like:

```txt
DesignLab, Social Media
```

This means it will appear under both filters on `projects.html`.


## Update v1.4.3

- Added cache-busting query strings to JavaScript files in the HTML pages.
- This helps GitHub Pages/browser cache load the newest scripts immediately.
- Made project archive filter matching more robust for comma-separated multi-filter categories.
- Filter values like `DesignLab, Social Media` now match both `DesignLab` and `Social Media`.


## Update v1.5.0

- Added a compact Managed Pages section below the homepage Projects section.
- Added managed page cards for Panpacific University, DesignLab Creative Studio, and DesignLab Downloads.
- Added an active visitor counter on the homepage.
- Visitor count is stored in a new `Site Analytics` Google Sheet tab.
- Reduced loaded Inter font weights.
- Softened heavy font weights and tight letter spacing.
- Added lazy loading and asynchronous image decoding.
- Added lightweight off-screen rendering optimizations.

### Required Apps Script update

Replace your current `Code.gs` with the new version, set your admin password again, and redeploy the Web App.

The script automatically creates a `Site Analytics` sheet with Total Visits and Last Visit.

Each homepage load records one visit. Reloads, bots, and repeat visits may also increase the count.


## Update v1.5.1

- Added clickable Facebook links to all Managed Pages cards.
- Added Panpacific University Tayug as a separate managed page.
- Managed Pages now include:
  - Panpacific University
  - Panpacific University Tayug
  - DesignLab Creative Studio
  - DesignLab Downloads
- Updated the section to a balanced 2×2 layout.


## Update v1.5.2

- Moved the Site Visits counter from the bottom section to a compact floating badge.
- Positioned the badge at the lower-left corner of the homepage.
- Added a smaller mobile version to avoid covering important content.
- No Apps Script changes are required if the v1.5.1 visitor counter backend is already deployed.
