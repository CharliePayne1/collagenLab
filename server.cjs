require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(cors());
app.use(express.json());

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

app.get("/publishable-key", (req, res) => {
  res.send({ publishable_key: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/create-payment-intent", async (req, res) => {
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
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.error("No email provided");
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    console.info(`Subscribing email: ${email}`);
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    console.info("Subscription successful");
    res.status(200).send({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing email:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
