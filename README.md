# Campaign Site — Candidate Name

This is a simple static campaign website scaffold with pages for issues, events, press, volunteering, and donations.

Quick start (preview locally):

1. From the `Campaign SIte` folder run a local static server. With Python 3:

```powershell
python -m http.server 8000

# then open http://localhost:8000 in your browser
```

Deployment suggestions:
- Host on GitHub Pages by pushing this folder to a repository and enabling Pages.
- Or use Netlify / Vercel for automatic deploys from a Git branch.

Next tasks:
- Integrate a payment processor (Stripe, ActBlue) for `donate.html`.
- Add analytics, forms backend, and accessibility audits.
- Replace placeholder content (candidate name, logos, contact info) with final copy.
 
Stripe example server (optional)
--------------------------------
If you want to handle donations using Stripe Checkout, there's a minimal example server in `server/`.

1. Change into the `server` folder and install dependencies:

```powershell
cd server
npm install
```

2. Set your secret key and start the server:

```powershell
setx STRIPE_SECRET_KEY "sk_test_your_key_here"
npm start
```

3. Client flow (simple): POST JSON to `http://localhost:4242/create-checkout-session` with `{ "amount": 2500 }` and redirect the browser to the returned `url`.

Note: This is an example for development. For production, securely store keys, validate amounts, add receipts, and ensure compliance with campaign finance rules.

Image generation (optional but recommended)
---------------------------------------
This project includes a small Node script that generates WebP and JPEG responsive hero images and PNG fallbacks for the SVG logo. Run these steps from the `Campaign SIte` folder:

```powershell
cd "Campaign SIte"
npm install
npm run images
```

The script will generate `assets/img/hero-400.webp`, `hero-800.webp`, `hero-1200.webp`, corresponding JPEGs, and `logo-48.png` / `logo-96.png`.

If you prefer not to generate images locally, provide appropriately sized images in `assets/img` with those filenames and the site will use them.

Files of interest:
- `index.html` — homepage
- `assets/css/styles.css` — stylesheet
- `assets/js/main.js` — nav and simple form handlers
- `volunteer.html`, `issues.html`, `events.html`, `press.html`, `donate.html` — scaffolded pages

If you want, I can wire Stripe Checkout, add form backends, or create a deployment workflow next.
