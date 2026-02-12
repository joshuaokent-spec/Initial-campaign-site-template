# SEO checklist — Campaign Site

Quick actions applied:

- Added page `title` and `meta description` tags for primary pages.
- Added Open Graph and Twitter meta tags (`og:title`, `og:description`, `og:image`, `twitter:card`) to improve social sharing.

Recommended SEO improvements:

- Create unique `title` and `meta description` per page (avoid duplicates).
- Add structured data (JSON-LD) for organization and events (Event schema for `events.html`).

Actions taken:

- Added Organization JSON-LD to `index.html`.
- Added Event JSON-LD to `events.html` for two sample events. Update event `startDate` and addresses to match real data.
- Provide meaningful `alt` attributes on all images (hero image already set; ensure other images follow suit).
- Generate and add a sitemap.xml and robots.txt for crawlers.
- Use semantic headings and ensure one `h1` per page.
- Add canonical link tags for pages when serving the site from multiple domains.
- Implement accessible, crawlable navigation; avoid JS-only navigational structures that prevent crawlers from finding pages.
- Add share/open-graph images sized appropriately (1200x630 for OG recommended).

If you'd like, I can add JSON-LD for the campaign as an Organization and add an `events` schema for upcoming events next.
