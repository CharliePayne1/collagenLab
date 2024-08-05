import { useState } from 'react';
import Button from './Button';

const EmailSignup = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });


        if (!response.ok) {
            alert('Failed to subscribe. Please try again.');
            console.log(response);
        }
        setEmail('');
    };

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
