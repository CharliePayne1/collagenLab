import { useState } from 'react';
import Button from './Button';
import axios from "axios";

const EmailSignup = () => {
    const [email, setEmail] = useState('');

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        try {
            const response = await axios.post("/api/subscribe", { email });

            if (response.status === 200) {
                // Successful subscription
                setEmail('');
            } else {
                alert('Unexpected error. Please try again.');
                console.error("Subscription failed:", response.data.error);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    alert("Email is required.");
                } else {
                    alert("Failed to subscribe. Please try again.");
                    console.error("Subscription error:", error.response?.data?.error || error.message);
                }
            } else {
                // Handle unexpected errors
                alert("An unexpected error occurred. Please try again.");
                console.error("Subscription error:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>Want to know when we launch?</div>
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                placeholder="Enter your email"
                className='bg-black mr-4'
                required
            />
            <Button
                text="Join"
                onClick={(event) => handleSubmit(event)}
                disabled={!email}
            />
        </form>
    );
};

export default EmailSignup;
