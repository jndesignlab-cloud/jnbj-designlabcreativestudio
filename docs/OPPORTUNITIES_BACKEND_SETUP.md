# Opportunities backend

Version 4 includes a dedicated `submitOpportunity` handler in `legacy/google-apps-script/Code.gs`.

## Current compatibility

The public Opportunities form first tries the dedicated opportunity action. If the currently deployed Apps Script has not yet been updated, the browser automatically falls back to the existing DesignLab inquiry endpoint so the application can still reach `jannjaravata@gmail.com`.

## Recommended backend update

When convenient, replace/reconcile the deployed Apps Script with the bundled `Code.gs` and deploy a new web-app version. After that:

- submissions are saved to **Opportunity Applications**
- DesignLab receives a purpose-built application email
- the applicant email becomes the Reply-To address
- the front end stops needing the inquiry fallback
