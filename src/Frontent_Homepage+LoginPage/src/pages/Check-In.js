import React, { useState, useEffect } from 'react';
import PostalCodeToCoordinates from '../components/convertPostalCode';
import "../styles/Checkin.css"; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CheckInPage = () => {
  const [bookingConfirmation, setBookingConfirmation] = useState(false);
  const [license, setLicense] = useState('');
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [reservationData, setReservationData] = useState("");
  const [damages, setDamages] = useState(false);
  const [depositRequested, setDepositRequested] = useState(false);
  const [carCondition, setCarCondition] = useState("");
  const [carDamaged, setCarDamaged] = useState(false); 
  const [showDamagesMessage, setShowDamagesMessage] = useState(false); // State to control the visibility of damages message
  const [carData, setCarData] = useState("");
  const [userData, setUserData] = useState("");
  const[usernamee, setUsernamee]= useState("");
  const[email,setEmail]=useState("");
  const[postal_code,setPostalCode]=useState("");
  
  useEffect(() => {

    fetchUserData();


    fetchReservationData();

    
  }, []);



  const username = localStorage.getItem("user_session_name");
  const reservationUrl = "http://127.0.0.1:5001/reservation/" + username;
  const userNom = localStorage.getItem("user_session_name");
  const userUrl = "http://127.0.0.1:5002/user/"+ userNom;

  // Inside your component function
const fetchUserData = async () => {
  try {
    const response = await fetch(userUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    console.log('User data:', data);
    setUserData(data.user); // Assuming the user data is nested under 'user' key
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
  

  const fetchReservationData = async () => {
    try {
      const response = await fetch(reservationUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch reservation data");
      }
      const data = await response.json();
      setReservationData(data.reservations[0]);
      // Extract car ID from reservation data and fetch car details
      const carId = data.reservations[0].vehicle_id; // Assuming "vehicle_id" is the key for car ID in reservation data
      if (carId) {
        fetchCarData(carId);
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
  };

  const fetchCarData = async (carId) => {
    try {
      const carUrl = `http://127.0.0.1:5000/Car/${carId}`;
      const response = await fetch(carUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const data = await response.json();
      setCarData(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleCheckIn = async () => {
    // Validate input data
    const driverLicenseInput = document.querySelector('input[name="driverLicense"]');
    const printNameInput = document.querySelector('input[name="printName"]');
    const licenseInput = document.querySelector('input[name="license"]');
    
    if (driverLicenseInput.value && printNameInput.value && licenseInput.value) {
    } else {
      alert('Please fill in all required fields.');
    }
    const pdfBlob = await generatePDF(); // You need to implement this function

    try {
        const response = await fetch('http://127.0.0.1:5002/user/verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/pdf', // Set the content type to application/pdf
            },
            body: pdfBlob,
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        alert('An error occurred while sending the email.');
    }
  };
  
  const generatePDF = () => {
    // Get the target element to capture the screenshot
    const targetElement = document.body;
  
    // Use html2canvas to capture the screenshot
    html2canvas(targetElement).then(canvas => {
      // Convert the canvas to an image data URL
      const imgData = canvas.toDataURL('image/png');
  
      // Initialize jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Add the image data to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
  
      // Save the PDF
      pdf.save('website_screenshot.pdf');
    });
  };


  const handleCheckInAndGeneratePDF = () => {
    handleCheckIn();
    generatePDF();
  };

  const callUsername =()=>{

    const username = localStorage.getItem("user_session_name");
    setUsernamee(username)
    
  }

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

          <div className="color-back">
          <div className="text">Check-In</div>
          <div className="underline"></div>
        </div>
      </div>
      <div className="checkin-form">
        <PostalCodeToCoordinates/>

       
        {showDamagesMessage && <p>Contact the branch for further instructions</p>}
        {depositRequested && <p>Deposit requested successfully.</p>}
      </div>
      <div>
      </div>
        
        <div className="container">
        <div className="text">Car Rental Agreement</div>
        <div className='subtitle'>Rental Agreement Number: <span>{reservationData.reservation_id} </span></div>
        <div className='subtitle'>This Rental Agreement ("Agreement") is entered into between Car Rental Montreal, located at {carData.postal_code}, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
        </div>
        <div className='subtitle'>1. Renter's Information:</div>
        <div className="inputs">
        <div className="input">
          <span className="label">Name:</span>
          <span>{username}</span>
        </div>

        <div className="input">
        <span className="label">Email:</span>
         <span>{userData.email}</span>
        </div>
        <div className="input">
        <span className="label">Postal Code:</span>
        <span>{userData ? userData.postal_code : 'Loading...'}</span>
        </div>

        <div className="input">
        <span className="label">Drivers license:</span>
        <input name="license" type="text" placeholder="Enter valid driver's license"/>
        </div>

        

        
            <div className='subtitle'>2. Vehicle Information:</div>
            </div>

          <div className="inputs">
          {carData && (
          <>
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
              <span className="icon">🕐</span>
              <span className="label">Year: </span>
              <span>{carData.model_year}</span>
            </div>

            <div className="input">
              <span className="icon">🌈</span>
              <span className="label">Color:</span>
              <span>{carData.color}</span>
            </div>

            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Mileage:</span>
              <span>{carData.mileage}</span>
            </div>
          </>
        )}
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Licence Plate Number:</span>
              <span>{generateLicensePlate()}</span>
            </div>
            <div className="input">
              <span className="icon">🚗</span>
              <span className="label">Vehicle Identification Number (VIN):</span>

              <text></text>
              <span>{}</span>
            </div>

            <div className="input">
  <input
    type="radio"
    id="carDamaged"
    name="carCondition"
    checked={carDamaged}
    onChange={() => setCarDamaged(true)}
  />
  <label htmlFor="carDamaged">Car is not in  same condition</label>
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

            <div className='subtitle'>3. Rental Details:</div>
            {reservationData && (
          <>
            <div className="input">
              <span className="icon">🗓️</span>
              <span className="label">Rent start:</span>
              <span>{reservationData.date_start}</span>
            </div>
            <div className="input">
              <span className="icon">🗓️</span>
              <span className="label">Rent end:</span>
              <span>{reservationData.date_end}</span>
            </div>

            <div className="input">
              <span className="icon">🗓️</span>
              <span className="label">Rental Period: </span>
              <span>{}</span>
              
            </div>
          </>
        )}
            <div className="input">
              <span className="icon">⚠️</span>
              <span className="label">Pickup Location:</span>
              <span>{carData.postal_code}</span>
            </div>
            <div className="input">
              <span className="icon">⚠️</span>
              <span className="label">Drop-off Location:</span>
              <span>{carData.postal_code}</span>
            </div>
            
            
            
            <div className="input">
              <span className="icon">⚠️</span>
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
            <li>Print Name: {username}</li>
            <li>Date:{today} </li>
          </ul>
          <span>Renter:</span>
          <ul>
            <li>Signature:<input name="driverLicense" type="text" placeholder="Signature"/></li>
            <li>Print Name:<input name="printName" type="text" placeholder="Name"/> </li>
            <li>Date:{today} </li>
          </ul>

          <button onClick={handleCheckInAndGeneratePDF}>Check In</button>
        </div>
        </div>

      </div>
      
    </div>
  );
};

export default CheckInPage;

