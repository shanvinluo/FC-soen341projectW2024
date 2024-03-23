import React, { useState } from 'react';
import PostalCodeToCoordinates from '../components/convertPostalCode';
import "../styles/Checkin.css"; 

const CheckInPage = () => {
  const [bookingConfirmation, setBookingConfirmation] = useState(false);
  const [license, setLicense] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [damages, setDamages] = useState(false);
  const [depositRequested, setDepositRequested] = useState(false);
  const [carCondition, setCarCondition] = useState("");
  const [carDamaged, setCarDamaged] = useState(false); 
  const [showDamagesMessage, setShowDamagesMessage] = useState(false); // State to control the visibility of damages message

  const handleCheckIn = () => {
    // Validate input data
    if (bookingConfirmation && license && creditCard) {
      // Inspect car for damages
      // Report damages if any
      if (damages) {
        setShowDamagesMessage(true); // Set state to true to show damages message
      } else {
        setDepositRequested(true); // For demonstration, set deposit requested to true
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  function showBookingConfirmation() {
    setBookingConfirmation(true);
  }
  
  let key = "AIzaSyCg9ZMC5lLuUeTEt3H2jC5WjaScuJRCh2o";

  return (
    <div className="checkin-container">
      <h2>Check In Page</h2>
      <div className="checkin-form">
      <PostalCodeToCoordinates/>

        <div className="input">
          <input
            type="radio"
            id="carDamaged"
            name="carCondition"
            checked={carDamaged}
            onChange={() => setCarDamaged(true)}
          />
          <label htmlFor="carDamaged">Car is not in the same condition</label>
        </div>

        <div className="input">
          <input
            type="radio"
            id="sameCondition"
            name="carCondition"
            checked={!carDamaged}
            onChange={() => setCarDamaged(false)}
          />
          <label htmlFor="sameCondition">Car is in the same condition</label>
        </div>

        <div className="input">
          <span className="icon">📝</span>
          <span className="label">Explain damages:</span>
          <textarea
            rows="4"
            cols="50"
            value={carCondition}
            onChange={(e) => setCarCondition(e.target.value)}
          ></textarea>
        </div>

        <button onClick={handleCheckIn}>Check In</button>
        {showDamagesMessage && <p>Contact the branch for further instructions</p>}
        {depositRequested && <p>Deposit requested successfully.</p>}
      </div>
      <div>
      Car Rental Agreement

Rental Agreement Number: [Unique Rental Agreement Number]

This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name], located at [Address], hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":

      </div>
    </div>
  );
};

export default CheckInPage;
