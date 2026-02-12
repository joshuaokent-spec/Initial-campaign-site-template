# Accessibility audit — Campaign Site

Summary of quick accessibility improvements applied:

- Added `.sr-only` helper in `assets/css/styles.css` for visually hidden labels and screen-reader text.
- Added `:focus-visible` outlines for keyboard focus on links, buttons and form controls.
- Confirmed presence of `lang="en"` and a skip link in `index.html`.
- Ensured form fields include labels (newsletter and volunteer forms).

Recommended next steps (prioritized):

- Run an automated Lighthouse accessibility audit and capture issues.
- Check color contrast (WCAG AA) for text on backgrounds, adjust variables as needed.
- Add landmark roles where appropriate (e.g., `role="complementary"` for sidebars if present).
- Verify heading order and semantics across pages (use `h1` once per page, then `h2`/`h3`).
- Test with a screen reader (NVDA/VoiceOver) and keyboard-only navigation to validate focus order.
- Add `rel="noopener noreferrer"` to any external links that open in new tabs and explicit `target` usage.
- Add form validation error messages linked via `aria-describedby` for inputs on server-side responses.

If you want, I can run a Lighthouse audit and produce a prioritized fix list, or implement the contrast and semantic fixes next. Which would you like? 
