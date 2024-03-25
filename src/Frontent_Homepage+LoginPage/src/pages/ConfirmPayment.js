import React, { useState } from "react";
import "../styles/ConfirmPayment.css";

const ConfirmPayment = () => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      nameOnCard &&
      creditCardNumber.length === 16 &&
      validateExpiryDate(expiryDate) &&
      cvv.length === 3
    ) {
      // All fields are filled correctly
      setSuccessMessage("Payment successful!");
      setErrorMessage(""); // Clear any previous error message
    } else {
      setSuccessMessage(""); // Clear any previous success message
      setErrorMessage("Please fill all fields correctly.");
    }
  };

  const validateExpiryDate = (date) => {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return pattern.test(date);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Payment</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            placeholder="Name on Card"
            id="nameOnCard"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="Credit Card Number"
            id="creditCardNumber"
            autoComplete="cc-number"
            maxLength="16"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="MM/YY"
            id="expiryDate"
            maxLength="5"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            id="cvv"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <div className="pay-container">
          <button type="submit" className="pay" onClick={handleSubmit}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
