require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const cors = require('@fastify/cors');

fastify.register(cors, {
  origin: true,
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

fastify.get("/publishable-key", (req, reply) => {
  reply.send({ publishable_key: process.env.STRIPE_PUBLISHABLE_KEY });
});

fastify.post("/create-payment-intent", async (req, reply) => {
  const { price } = req.body;
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

fastify.post("/subscribe", async (req, reply) => {
  const { email } = req.body;

  if (!email) {
    fastify.log.error("No email provided");
    return reply.status(400).send({ error: "Email is required" });
  }

  try {
    fastify.log.info(`Subscribing email: ${email}`);
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    fastify.log.info("Subscription successful");
    reply.status(200).send({ message: "Subscription successful" });
  } catch (error) {
    fastify.log.error("Error subscribing email:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 5252 });
    console.log("Server listening on port 5252");
  } catch (err) {
    fastify.log.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
