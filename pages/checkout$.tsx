import React from 'react';
import './App.css';
import Checkout from '../src/Components/Checkout';

function CheckoutPage () {
  return (
    <>
      <div className='bg-black flex-container'>
        <div className='text-white content'>
          <Checkout />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage ;
