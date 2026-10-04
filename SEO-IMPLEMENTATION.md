# SEO Implementation Notes

## Repository Audit

- Architecture: Vite + React + TanStack Router/Start with file-based routes.
- Styling: Tailwind CSS v4, local design tokens in `src/styles.css`.
- Existing SEO: route-level metadata, canonical links, JSON-LD, dynamic sitemap, robots.txt, product and region data in `src/lib/site.ts`.
- Existing conversions: Formspree contact form, WhatsApp links, brochure downloads and floating contact actions.

## Changes Implemented

- Added canonical informational routes: `/about`, `/export-process`, `/quality`, `/packaging`, `/logistics`, `/markets`, `/markets/africa`, `/markets/uae`, `/markets/middle-east`.
- Added the new indexable routes to `/sitemap.xml`.
- Expanded the contact RFQ form to capture B2B buying intent: name, company, business email, country, phone, product, quantity, destination, packaging, message and optional target price.
- Preserved the existing Formspree integration, honeypot spam field, loading/success/error states and WhatsApp fallback.
- Added `npm run seo:audit` for lightweight route metadata, canonical, duplicate title/description and robots checks.
- Added `SEO-STRATEGY.md` as the content and internal-linking roadmap.

## Remaining Recommendations

- Verify all certificates and board registrations with current documents before making stronger claims.
- Replace any damaged mojibake text in older copy as a separate editorial pass.
- Add first-party analytics or GTM only when the business provides the real measurement ID.
- Add deeper buyer guides under `/blog` or `/resources` after the owner approves topics and factual details.
