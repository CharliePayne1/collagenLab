export default function handler(_, res) {
  console.log("Stripe Publishable Key:", process.env.STRIPE_PUBLISHABLE_KEY);
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}
  