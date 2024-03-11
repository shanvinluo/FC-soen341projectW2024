import React from "react";
import "../styles/CarCard.css";
import user_icon from "../Assets/person.png";
import { useState } from "react";

function CarCard({ car, startDesiredDate, endDesiredDate, isLoggedIn }) {
  const [carAdded, setCarAdded] = useState(false); // State to track if car is successfully added

  function generateReservationId() {
    const timestamp = new Date().getTime() / 100000000000;
    const randomNum = Math.floor(Math.random() * 50) + 1;

    return `${timestamp}-${randomNum}`;
  }

  const handleAddCar = async () => {
    if (!localStorage.getItem("isLoggedIn")) {
      alert("Please log in first!");
      return;
    }
    if (!startDesiredDate || !endDesiredDate) {
      alert("Please select start and end dates before adding a car.");
      return;
    }

    if (!startDesiredDate || !endDesiredDate) {
      alert("Please select start and end dates before adding a car.");
      return;
    }
    const user_name = localStorage.getItem("user_name");
    console.log(user_name);
    console.log(localStorage.getItem("user_session_name"));
    const reservationData = {
      reservation_id: generateReservationId(),
      date_start: startDesiredDate,
      date_end: endDesiredDate,
      username: user_name, // Placeholder: Replace with actual user logic.
      vehicule_id: car.vehicule_id,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/reservation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setCarAdded(true);
        alert("Car added to reservations!");
      } else {
        const errorData = await response.json();
        alert(`Failed to add car: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to add car to reservations:", error);
      alert("Network error when trying to add car.");
    }
  };
  return (
    <div className="car-card">
      <div className="car-image" />
      <div className="car-details">
        <div className="car-feature">
          <span className="icon">🚗</span>
          <span>
            {car.year}
            {car.model_name}
            {car.make_name}
          </span>
        </div>
        <div className="car-feature">
          <span className="icon">
            {" "}
            <img src={user_icon} alt="" />
          </span>
          <span>{car.seats}</span>
        </div>
        <div className="car-feature">
          <span className="icon">💰</span>
          <span>{car.price}</span>
        </div>
        <div className="car-feature">
          <span className="icon"></span>
          <span>{car.features}</span>
        </div>
      </div>
      <button
        onClick={handleAddCar}
        className={`addCarbtn ${carAdded ? "car-added" : ""}`} // This allows you to use CSS for styling as well
      >
        {carAdded ? "Car Added" : "Add Car"}
      </button>
    </div>
  );
}

export default CarCard;
