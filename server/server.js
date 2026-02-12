const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Load secret from environment
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
if (!stripeSecret) {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe endpoints will fail until configured.');
}
const stripe = Stripe(stripeSecret);

// Allowed preset donation amounts (in cents)
const PRESET_AMOUNTS = [1000, 2500, 5000];

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body;
    const selected = PRESET_AMOUNTS.includes(Number(amount)) ? Number(amount) : 2500;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Campaign donation' },
            unit_amount: selected,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: (req.headers.origin || 'http://localhost:8000') + '/?donation=success',
      cancel_url: (req.headers.origin || 'http://localhost:8000') + '/donate.html?donation=cancel',
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('checkout error', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Stripe example server listening on port ${port}`));
