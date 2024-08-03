require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", (req, reply) => {
  reply.send({ publishable_key: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Create a payment intent and return its client secret
fastify.post("/create-payment-intent", async (req, reply) => {
  const { price } = req.body;

  // Ensure the price is converted to the smallest currency unit (e.g., pence for GBP)
  const amount = Math.round(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      payment_method_types: ["card"],
    });

    reply.send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(5252);
    console.log("Server listening on port 5252");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

