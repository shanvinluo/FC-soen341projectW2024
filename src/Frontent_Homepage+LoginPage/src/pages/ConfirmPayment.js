import React from "react";
import "../styles/ConfirmPayment.css";
import { useState } from "react";

const ConfirmPayment = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Payment</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Name on Card" id="nameOnCard" />
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="Credit Card Number"
            id="creditCardNumber"
            autocomplete="cc-number"
            maxLength="16"
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="MM/YY"
            id="expiryDate"
            maxLength="5"
          />
          <input type="text" placeholder="CVV" id="cvv" maxLength="3" />
        </div>
        <div className="pay-container">
          <div className="pay">Pay Now</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
