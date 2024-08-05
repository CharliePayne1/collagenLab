import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from './Button';

const CheckoutForm = ({
  price
}: {
  price: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the client secret from the server
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price }),
    })
      .then(response => response.json())
      .then(data => setClientSecret(data.client_secret))
      .catch(error => setErrorMessage(error.message));
  }, [price]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
      },
      clientSecret,
    });

    if (error) {
      setErrorMessage(error.message ?? null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button 
        text={`Pay ${new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP'
        }).format(price)}`} 
        onClick={handleSubmit} 
        disabled={!stripe || !clientSecret} 
      />
      {errorMessage && <div className='text-red'>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
