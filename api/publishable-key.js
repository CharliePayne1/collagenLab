export default function handler(_, res) {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}
  