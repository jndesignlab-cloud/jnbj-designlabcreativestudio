# DesignLab Portfolio v3.13.0 — Site-Wide Visual Refinement & Responsive Hardening

Unifies the site around one polished visual language and tightens mobile support, without changing brand colors, copy, navigation, or page structure.

## What changed

- **One consistent look, not two.** The homepage used a soft, rounded, shadowed "reference-polish" style. Every other page (Projects, Services rows, Contact, CV, Insights, Creator, Downloads, project/article detail, Admin) used a flat, borderless "editorial" style with radius and shadow stripped out. Rows, cards, and panels across those pages now get the same soft radius, subtle shadow, and hover lift as the homepage.
- **Refined motion.** Buttons, nav links, list rows, and cards now share one smooth easing curve for hover/press states — nav links get an animated underline, primary buttons lift with a soft glow, list rows lift and highlight on hover.
- **One-Stop Services grid** softened from a flat spreadsheet-style grid into rounded, elevated cards that match the rest of the site.
- **Small-phone tier added.** Existing breakpoints stopped refining around 480–520px; a new tier at 460px and 380px tightens header height, type scale, button size, and grid columns for iPhone SE–class and small Android screens across the homepage, editorial rows, and the Services grid.
- **Accessibility:** consistent `:focus-visible` outlines added across buttons, links, form fields, and FAQ toggles.
- **`prefers-reduced-motion`** respected for all newly added transitions.
- Bumped `style.css` cache-buster to `v3.13.0` across every page, including the four existing blog/insight articles, and updated `generate_blog.py`'s `VERSION` constant so future generated posts pick it up automatically.

No Apps Script, `config.js`, or content changes required — this release is CSS/markup polish only.
