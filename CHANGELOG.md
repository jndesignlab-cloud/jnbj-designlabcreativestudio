# DesignLab Portfolio Website — Changelog

<<<<<<< HEAD
## v4.0.0 — Opportunities & Client Acquisition Partner Launch

- replaced **Downloads** in the public navigation with **Opportunities**
- added a dedicated Client Acquisition Partner opportunity page
- presented the full 25% standard / up-to-30% full-sales commission structure
- added role, acquisition, commission, client ownership, target market, and partner-fit sections
- added a short application form for name, location, email, contact number, interest, and message
- application submissions route to the DesignLab inquiry backend and `jannjaravata@gmail.com`
- bundled a dedicated `submitOpportunity` Apps Script handler for the next backend deployment
- preserved a legacy `downloads.html` redirect to avoid broken old URLs
- updated public navigation and sitemap for the Opportunities section
=======
## v3.16.41 — Pricing Sync, Local Currency & Visitor Counter Fix

- synchronized Services with the DesignLab Updated Price List dated 17 September 2026
- expanded the Services explorer to Social, Print, Branding & Events, Images & Presentations, Websites & Systems, and Booking Terms
- refined hierarchy and spacing in the right-hand service detail workspace
- restored location-aware currency display: Philippines shows PHP + USD; other detected countries show local currency + USD while retaining PHP as the base rate
- uses the price-list guide of US$1 = ₱60 as the canonical USD conversion
- fixed the floating visitor counter being hidden by legacy high-specificity CSS rules
- visitor badge now forces visible positioning at the lower-left on all public pages and falls back to the read-only visit count if recording fails
>>>>>>> 7f39293e2f5678adeb0e99f8ea9505061eeddde1
