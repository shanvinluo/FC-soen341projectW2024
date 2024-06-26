import React from "react";
import "../styles/CarCard.css";
import user_icon from "../Assets/person.png";
//import { useState } from "react";
import { useState, useEffect } from "react";
//import { createReservationData } from '../components/reservationData';
import Comment from "./Comment"; // Adjust the path as needed

function CarCard({ car, startDesiredDate, endDesiredDate, isLoggedIn }) {
  const [carAdded, setCarAdded] = useState(false); // State to track if car is successfully added
  const [, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  function generateReservationId() {
    const timestamp = new Date().getTime() / 100000000000000;
    const randomNum = Math.floor(Math.random() * 50) + 1;

    return `${timestamp}-${randomNum}`;
  }
  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      // If comments are about to be shown, re-fetch them
      fetchComments();
    }
  };

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
    const user_name = localStorage.getItem("user_session_name");

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
        const username = localStorage.getItem("user_session_name");
        console.log(username);
        // alert("Car added to reservations for the user: " + username);
      } else {
        const errorData = await response.json();
        alert(`Failed to add car: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to add car to reservations:", error);
      alert("Network error when trying to add car.");
    }

    window.location.href = "/CheckIn";
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5004/comments/${car.vehicule_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Fetching comments failed:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []); // The empty array means it will run once on mount

  return (
    <div className="car-card">
      <div className="car-card-content">
        <div className="car-image" />
        <div className="car-details">
          <div className="car-feature">
            <span className="icon">🚗</span>
            <span>
              {car.model_year} {car.model_name} {car.make_name}
            </span>
          </div>
          <div className="features-container">
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
              <span>Mileage: {car.mileage} km</span>
            </div>
          </div>
          <div className="features-container">
            <div className="car-feature">
              <span className="icon"></span>
              <span>Color: {car.color}</span>
            </div>
            <div className="car-feature">
              <span className="icon"></span>
              <span>Transmission Type: {car.transmission} </span>
            </div>
            <div className="car-feature">
              <span className="icon"></span>
              <span>Fuel Type:{car.fuel_type}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddCar}
          className={`add-car-btn ${carAdded ? "car-added" : ""}`} // This allows you to use CSS for styling as well
        >
          {carAdded ? "Car Added" : "Reserve this Car"}
        </button>

        <span className="view-comments-button" onClick={toggleComments}>
          {" "}
          View Reviews
        </span>
      </div>

      {showComments && (
        <div className="comments">
          <Comment vehicule_id={car.vehicule_id} />
        </div>
      )}
    </div>
  );
}

export default CarCard;
