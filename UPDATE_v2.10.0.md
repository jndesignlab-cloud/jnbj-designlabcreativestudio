# DesignLab Portfolio v2.10.0

## Inquiry system upgrades

- Redesigned admin notification email using a professional DesignLab system card.
- Added an automatic client confirmation email with the submitted request summary.
- Uses the inquiry reference as a secure tracking number.
- Added `inquiry-status.html` and `inquiry-status.js` for live status lookup.
- Tracking requires both the inquiry reference and the original submitted email address.
- Added client email delivery status/error columns and a Tracking URL column to the `Inquiries` sheet.
- Updated the contact success screen with confirmation delivery information and a Track Inquiry button.

## Apps Script setup

1. Replace the Apps Script `Code.gs` with the v2.10.0 file.
2. Restore your private `ADMIN_PASSWORD` after replacement.
3. Deploy the Apps Script Web App as a new version.
4. Existing email authorization is normally sufficient. Run `authorizeInquiryEmail` only if Google requests permission again.
5. Optionally run `testInquiryEmailSystem` to preview both redesigned email templates in your own inbox.

## Suggested Status values

The public tracker recognizes these stages:

1. `New` or `Received`
2. `Under Review` or `Reviewing`
3. `Awaiting Details`, `Quotation Sent`, `Proposal Sent`, or `For Approval`
4. `Approved`, `Scheduled`, `In Progress`, `Ongoing`, or `Production`
5. `Completed`, `Delivered`, or `Closed`

Update the `Status` cell in the `Inquiries` sheet to change what the client sees.
