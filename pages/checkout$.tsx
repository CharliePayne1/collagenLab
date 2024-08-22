import React from 'react';
import './App.css';
import Checkout from '../src/Components/Checkout';

function CheckoutPage () {
  return (
    <>
      <div className='bg-dark-green flex-container'>
        <div className='text-beige content'>
          <Checkout />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage ;
