import React, { useState, useEffect } from "react";
import "../styles/Login.css"; // Reusing the same CSS file for styling

const Checkout = () => {
  const [reservationData, setReservationData] = useState(null);
  const [carID, setCarId] = useState(null); // Added state for car ID
  const [carData, setCarData] = useState(null); // State to store car details
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [carCondition, setCarCondition] = useState("");
  const [carDamaged, setCarDamaged] = useState(false);
  const [comment, setComment] = useState(""); // State for the comment


  useEffect(() => {
    // Fetch reservation data when the component mounts
    fetchReservationData();
  }, []);

  const username = localStorage.getItem("user_session_name");
  const reservationUrl = "http://127.0.0.1:5001/reservation/" + username;

  const postComment = async () => {
    const commentUrl = `http://127.0.0.1:5004/comments`;
    try {
      const response = await fetch(commentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle_id: carID,
          comment,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      const responseData = await response.json();
      console.log("Comment posted successfully:", responseData);
    } catch (error) {
      console.error("Error posting comment:", error);
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
      const carId = data.reservations[0].vehicle_id; 
      // Assuming "vehicle_id" is the key for car ID in reservation data
      const fetchedCarId = data.reservations[0].vehicle_id;
      setCarId(fetchedCarId);
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

  const getDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    if (
      !reservationData ||
      !carData ||
      !reservationData.date_start ||
      !reservationData.date_end
    ) {
      return 0; // Not enough data to calculate
    }
    const days = getDaysBetweenDates(
      reservationData.date_start,
      reservationData.date_end
    );
    return days * carData.price;
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = async () => {
    if (!agreementAccepted) {
      alert("You must accept the terms and conditions to proceed to payment.");
      return;
    }

    await postComment(); // Make sure to await this if it's async
    console.log("Form submitted!");
    window.location.href = "/ConfirmPaymentOUT";
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Checkout</div>
        <div className="underline"></div>
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
              <span className="icon">💰</span>
              <span className="label">Price per day:</span>
              <span>{carData.price}</span>
            </div>

            <div className="input">
              <span className="icon">💰</span>
              <span className="label">Price per day:</span>
              <span>{totalPrice}</span>
            </div>
          </>
        )}

        {reservationData && (
          <>
            <div className="input">
              <span className="icon">🗓️</span>
              <span className="label">Reservation was made on:</span>
              <span>{reservationData.date_start}</span>
            </div>
            <div className="input">
              <span className="icon">🗓️</span>
              <span className="label">Return needs to be made on:</span>
              <span>{reservationData.date_end}</span>
            </div>
          </>
        )}

        <div className="input">
          <input
            type="radio"
            id="carDamaged"
            name="carCondition"
            checked={carDamaged}
            onChange={() => setCarDamaged(true)}
          />
          <label htmlFor="carDamaged">Car is not in same condition</label>
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

        <div className="input">
          <span className="icon">📝</span>
          <span className="label">Leave a comment:</span>
          <textarea
          rows="4"
          cols="50"
            value={comment}
        onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="info-box">
          <span className="info-title">Important Points:</span>
          <ul className="info-list">
            <li>
              Booking Confirmation: Once you confirm your booking, you'll
              receive a confirmation email containing all the details of your
              rental, including pick-up instructions and rental specifics.
              Please review this information carefully to ensure accuracy.
            </li>
            <li>
              Payment Information: Your payment information will be securely
              processed using industry-standard encryption methods. Rest assured
              that your financial data is handled with the utmost
              confidentiality and security.
            </li>
            <li>
              Rental Agreement: Prior to finalizing your booking, you'll be
              asked to review and accept our rental agreement. This document
              outlines the terms and conditions of your rental, including
              responsibilities, liabilities, and usage guidelines. Please take
              the time to read through it thoroughly.
            </li>
            <li>
              Deposit Requirement: As part of our policy, a deposit of 500 CAD
              will be authorized on your credit card at the time of pick-up.
              This deposit is held temporarily and will be released upon the
              successful return of the vehicle, provided there are no damages or
              outstanding fees.
            </li>
            <li>
              Return Process: When returning the vehicle, please ensure that
              it's in the same condition as when you received it, barring normal
              wear and tear. Our staff will conduct a brief inspection to assess
              any damages and finalize the rental transaction accordingly.
            </li>
            <li>
              Receipt and Feedback: Upon completion of the rental, you'll
              receive a detailed receipt outlining the charges incurred during
              your rental period. We also value your feedback, so feel free to
              share your experience with us to help us improve our services.
            </li>
          </ul>
        </div>

        <div className="agreement">
          <input
            type="radio"
            id="acceptAgreement"
            checked={agreementAccepted}
            onChange={() => setAgreementAccepted(!agreementAccepted)}
          />
          <label htmlFor="acceptAgreement">
            I agree to the terms and condition
          </label>
        </div>

        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Proceed to payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
