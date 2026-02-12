# QA Report — static checks (2026-02-12)

Summary:

- Images: all `<img>` elements include `alt` text. The hero image is a decorative background with `aria-hidden="true"` — acceptable when the image conveys no extra content. Consider providing an image with descriptive `alt` on pages where the image conveys meaning.
- Headings: each page has a single `h1` and appropriate `h2` sections — good for SEO and screen-reader navigation.
- Forms: newsletter and volunteer forms include labels; volunteer inputs use `aria-required` and `aria-describedby` for status messages.
- Navigation: skip link, `role="navigation"`, and labeled nav toggles are present.
- Footer: contact is now clickable (`mailto:` and `tel:`) across pages.
- Structured data: Organization JSON-LD and Event JSON-LD were added; update real URLs, social handles, and event datetimes/addresses.
- Robots & Sitemap: `robots.txt` and `sitemap.xml` added. Replace `example.org` with your production domain.

Recommended next manual tests:

- Run Lighthouse (Chrome DevTools) Accessibility + SEO audits and fix high-priority items.
- Keyboard-only navigation: tab through the site to verify logical focus order and visible focus outlines.
- Screen reader test (NVDA or VoiceOver): navigate main landmarks, forms, and event listings.
- Color contrast: use automated contrast tools (axe DevTools or Lighthouse) to confirm WCAG AA compliance for all text sizes.

How to run Lighthouse locally (quick):

1. Open site in Chrome (e.g., `http://localhost:8000`).
2. Open DevTools → Lighthouse → select categories (Accessibility, Best practices, SEO) → Generate report.

Or install CLI:

```powershell
npm install -g lighthouse
lighthouse http://localhost:8000 --output html --output-path ./lighthouse-report.html
```

If you'd like, I can run the CLI Lighthouse on your machine by giving commands to run, or I can parse a saved Lighthouse report and produce prioritized fixes.
