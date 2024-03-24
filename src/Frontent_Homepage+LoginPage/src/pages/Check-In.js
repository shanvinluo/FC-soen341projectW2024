import React, { useState, useEffect } from 'react';
import PostalCodeToCoordinates from '../components/convertPostalCode';
import "../styles/Checkin.css"; 

const CheckInPage = () => {
  const [bookingConfirmation, setBookingConfirmation] = useState(false);
  const [license, setLicense] = useState('');
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [reservationData, setReservationData] = useState({
    reservation_id: '123456',
    postal_code: 'H1A 0A1',
    date_start: new Date('2024-03-25'), // Example start date
    date_end: new Date('2024-03-30')     // Example end date
  });
  const [damages, setDamages] = useState(false);
  const [depositRequested, setDepositRequested] = useState(false);
  const [carCondition, setCarCondition] = useState("");
  const [carDamaged, setCarDamaged] = useState(false); 
  const [showDamagesMessage, setShowDamagesMessage] = useState(false); // State to control the visibility of damages message
  const [carData, setCarData] = useState({ // Mock car data for testing
    make_name: 'Toyota',
    model_name: 'Corolla',
    model_year: '2021',
    vehicule_id: '123456',
    color: 'Black',
    price: '$50',
    postal_code: 'H4L 2L9'
  });
  const [userData, setUserData] = useState({ // Mock user data for testing
    username:'JohnDoe',
    email: 'john@doe.com',
    postal_code: 'H1A 0A1'
  });

  const handleCheckIn = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    let allFieldsFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFieldsFilled = false;
            return;
        }
    });

    if (allFieldsFilled) {
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
  function generateLicensePlate() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    let licensePlate = '';
    // Generate 3 random letters
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      licensePlate += letters.charAt(randomIndex);
    }
    // Add a dash
    licensePlate += '-';
    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      licensePlate += numbers.charAt(randomIndex);
    }
  
    return licensePlate;
  }
  function getDaysElapsed(startDate, endDate) {
    // Convert both dates to milliseconds
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();
  
    // Calculate the difference in milliseconds
    const differenceMillis = endMillis - startMillis;
  
    // Convert milliseconds to days
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysElapsed = Math.floor(differenceMillis / millisecondsInDay);
  
    return daysElapsed;
  }
  return (
    <div className="checkin-container">
      <div className="container">
        <div className="header">
          <div className="text">Check-In</div>
          <div className="underline"></div>
        </div>
      </div>
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

      </div>
      <div>
        
        <div className="container">
        <div className="text">Car Rental Agreement</div>
        <div className='subtitle'>Rental Agreement Number: <span>{reservationData.reservation_id} </span></div>
        <div className='subtitle'>This Rental Agreement ("Agreement") is entered into between Car Rental Montreal, located at {carData.postal_code}, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
        </div>
        <div className='subtitle'>1. Renter's Information:</div>
        <div className="inputs">
            <div className="input">
              <span className="label">Name:</span>
              <span>{userData.username}</span>
            </div>
            <div className="input">
              <span className="label">email:</span>
              <span>{userData.email}</span>
            </div>
            <div className="input">
              <span className="label">Address:</span>
              <span>{userData.postal_code}</span>
            </div>
            <div className='subtitle'>2. Vehicle Information:</div>
            </div>
          <div className="inputs">
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Car Make:</span>
              <span>{carData.make_name}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Car Model:</span>
              <span>{carData.model_name}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Year:</span>
              <span>{carData.model_year}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Licence Plate Number:</span>
              <span>{generateLicensePlate()}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Vehicle Identification Number (VIN):</span>
              <span>{carData.vehicule_id}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Color:</span>
              <span>{carData.color}</span>
            </div>
            <div className='subtitle'>3. Rental Details:</div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Rental Start Date:</span>
              <span>{reservationData.date_start.toDateString()}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Rental End Date:</span>
              <span>{reservationData.date_end.toDateString()}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Pickup Location:</span>
              <span>{carData.postal_code}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Drop-off Location:</span>
              <span>{carData.postal_code}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Rental Period:</span>
              <span>{getDaysElapsed(reservationData.date_start, reservationData.date_end)} days</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Mileage limit:</span>
              <span>{carData.mileage}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Price per day:</span>
              <span>{carData.price}</span>
            </div>
            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Additional Services:</span>
              <span>{}</span>
            </div>
          </div>
          <div className="info-box">
          <span className="info-title">Important Points:</span>
          <ol className="info-list">
            <li>Rental Terms and Conditions:
The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.</li>
            <li>Indemnification: The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.</li>
            <li>Indemnification:The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.</li>
            <li>Entire Agreement:This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</li>
            <li>The parties hereto have executed this Agreement as of the date first written above.</li>
          </ol>
          <span>Rental Company:</span>
          <ul>
            <li>Signature: Car Rental Montreal</li>
            <li>Print Name: Ahmed Baboucar</li>
            <li>Date:{today} </li>
          </ul>
          <span>Renter:</span>
          <ul>
            <li>Signature:<input type="text" placeholder="Signature"/></li>
            <li>Print Name:<input type="text" placeholder="Name"/> </li>
            <li>Date:{today} </li>
          </ul>
        </div>
        <div className="checkin-form">
      <button onClick={handleCheckIn}>Check In</button>
        {showDamagesMessage && <p>Contact the branch for further instructions</p>}
        {depositRequested && <p>Deposit requested successfully.</p>}
        </div>
        </div>

      </div>

    </div>
  );
};

export default CheckInPage;
