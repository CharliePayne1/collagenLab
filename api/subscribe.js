import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default async function handler(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    res.status(200).send({
      message: "Subscription successful",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}
