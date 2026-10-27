# SEO launch checklist

Changes are prepared on experiment/academy-seo, not deployed to production.

## Confirm before merging
- Confirm online/in-person availability for each plan; copy now directs students to confirm rather than making contradictory promises.
- Confirm current prices and whether the $15 enrollment fee applies to individual lessons.
- Google reviews are linked to the existing Maps destination; no testimonials or ratings were invented.
- The customer-support page is a free guide, not a purchasable course.

## Search Console (owner access required)
1. Open https://search.google.com/search-console and add the domain property ercacademynic.com if it is not already configured.
2. Add Google's exact TXT verification value at the DNS provider; do not invent a verification token. Existing Analytics does not confirm Search Console ownership.
3. After the production deployment, submit https://ercacademynic.com/sitemap.xml.
4. Use URL Inspection to check the homepage and new pages, live-test them, and request indexing where appropriate.
5. Record baseline impressions, clicks, queries, and indexing status. Compare after several weeks; indexing/ranking is not guaranteed.

## Vercel preview
Verify that Vercel Deployment Protection or X-Robots-Tag: noindex protects the preview from indexing. Production canonical URLs are intentional. Do not add a global noindex header that would apply to production. Do not merge until reviewed.

## Follow-up
- Review the real Google Business Profile for accurate details and eligibility; online-only businesses should not claim a physical storefront.
- Measure mobile performance with PageSpeed Insights after deployment. No performance score has been measured in this change.
- Add genuine student feedback with permission and publish original, useful articles linked to relevant services.
