import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm.jsx';

async function initStripe() {
  try {
    const response = await axios.get("/api/publishable-key");
    const publishableKey = response.data.publishable_key; // Note: publishableKey, not publishable_key

    if (!publishableKey) {
      throw new Error("Publishable key not found in the response.");
    }

    return loadStripe(publishableKey); 
  } catch (error) {
    console.error("Error fetching publishable key:", error);
    // Handle the error gracefully (e.g., display an error message to the user)
    return null; // Or return a default Stripe instance if needed
  }
}

const Checkout = ({
  price
}: {
  price: number;
}) => {
  const stripePromise = initStripe();
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await axios.post("/api/create-payment-intent", {
          price,
        });
  
        setClientSecretSettings({
          clientSecret: response.data.client_secret,
          loading: false,
        });
      } catch (error) {
        // Handle errors here, e.g., display an error message to the user
        console.error("Error creating payment intent:", error); 
      } 
    }
    createPaymentIntent();
  }, []);

  return (
    <div>
      {clientSecretSettings.loading ? (
        <h1>Loading ...</h1>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecretSettings.clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          <CheckoutForm price={price} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;