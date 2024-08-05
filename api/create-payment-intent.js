import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { price } = req.body;
  const amount = Math.round(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      payment_method_types: ["card"],
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
