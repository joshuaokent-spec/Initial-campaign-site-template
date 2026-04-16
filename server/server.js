const path = require("path");
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const siteRoot = path.resolve(__dirname, "..");

app.use(cors());
app.use(express.json());
app.use(express.static(siteRoot, { extensions: ["html"] }));

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY is not set. Donation checkout will return a setup message until configured.");
}

const stripe = stripeSecret ? Stripe(stripeSecret) : null;
const PRESET_AMOUNTS = [1000, 2500, 5000];

app.get("/health", function (_req, res) {
  res.json({
    ok: true,
    checkoutConfigured: Boolean(stripe)
  });
});

app.post("/create-checkout-session", async function (req, res) {
  if (!stripe) {
    res.status(503).json({
      error: "Stripe checkout is not configured yet. Add STRIPE_SECRET_KEY to enable live donations."
    });
    return;
  }

  try {
    const amount = Number(req.body.amount);
    const selectedAmount = PRESET_AMOUNTS.includes(amount) ? amount : 2500;
    const origin = req.get("origin") || (req.protocol + "://" + req.get("host"));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Campaign contribution"
            },
            unit_amount: selectedAmount
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: origin + "/thank-you.html?type=donation",
      cancel_url: origin + "/donate.html?donation=cancel"
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("checkout error", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", function (_req, res) {
  res.sendFile(path.join(siteRoot, "index.html"));
});

const port = process.env.PORT || 4242;
app.listen(port, function () {
  console.log("Campaign site server listening on http://localhost:" + port);
});
