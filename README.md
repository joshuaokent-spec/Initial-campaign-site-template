# Joshua Kent Campaign Site

This repository contains a polished static campaign website for Joshua Kent's Michigan House run, with shared assets under `assets/`, standalone content pages at the repo root, and an optional Node server for Stripe Checkout previews.

## Quick start

For a fast static preview:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Full local preview with donation checkout

The `server/` folder can now serve the website and the Stripe checkout endpoint from the same local origin.

1. Install the server dependencies:

```powershell
cd server
npm install
```

2. Add a Stripe secret key:

```powershell
setx STRIPE_SECRET_KEY "sk_test_your_key_here"
```

3. Start the local server:

```powershell
npm start
```

Then open [http://localhost:4242](http://localhost:4242).

If `STRIPE_SECRET_KEY` is not set, the donation page will stay honest: it will explain that checkout is not configured instead of sending visitors to dead links.

## Project structure

- `index.html` - homepage and primary campaign entry point
- `issues.html`, `for-lansing.html`, `for-michigan.html`, `press.html` - long-form platform and campaign messaging
- `events.html`, `volunteer.html`, `contact.html`, `donate.html` - conversion and engagement flows
- `thank-you.html` - shared success page for contact, volunteer, updates, and donation flows
- `assets/css/styles.css` - the active visual system
- `assets/js/main.js` - navigation, donation, reveal, and thank-you page behavior
- `assets/img/` - logo, hero illustration, and share card artwork
- `server/server.js` - optional Express + Stripe preview server

## Deployment notes

- The site works as a plain static deployment on GitHub Pages, Netlify, or Vercel.
- If you want live donations, deploy the `server/` code or replace the donate buttons with hosted checkout links.
- If you deploy somewhere other than GitHub Pages, update the absolute URLs in `robots.txt` and `sitemap.xml`.

## Maintenance notes

- Forms submit directly to Formspree.
- The thank-you page uses query params so each form can land on a tailored success state.
- Social links were intentionally removed until official campaign accounts are ready, which is better than shipping broken stand-ins.
