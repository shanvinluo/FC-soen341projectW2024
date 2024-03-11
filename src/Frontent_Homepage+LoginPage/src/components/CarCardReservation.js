import React, { useState } from "react";
import "../styles/CarCardReservation.css";
import user_icon from "../Assets/person.png";

function CarCardReservation({ car, onCancel, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [newStart, setNewStart] = useState(car?.availableFrom || "");
  const [newEnd, setNewEnd] = useState(car?.availableUntil || "");

  const handleUpdateClick = () => {
    // Toggle the edit mode to show/hide the date inputs
    setEditMode(!editMode);
  };

  const handleSaveDates = async () => {
    // Check if car is defined before updating

    if (!car) {
      console.error("Car is undefined");
      return;
    }

    // Call the onUpdate function passed from the parent component
    try {
      const response = await fetch("http://127.0.0.1:5001/reservation/2", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation_id: "1",
          date_start: newStart,
          date_end: newEnd,
          username: "new_username",
          vehicle_id: car.vehicle_id,
        }),
      });

      if (response.ok) {
        onUpdate(car.id, newStart, newEnd);
        setEditMode(false);
      } else {
        console.error("Error updating reservation");
      }
    } catch (error) {
      console.error("Error updating reservation", error);
    }
  };

  return (
    <div className="car-card">
      <div className="car-image" />
      <div className="car-details">
        <div className="car-feature">
          <span className="icon">🚗</span>
          <span>{car?.name || "N/A"}</span>
        </div>
        <div className="car-feature">
          <span className="icon">
            {" "}
            <img src={user_icon} alt="" />
          </span>
          <span>{car?.seats || "N/A"}</span>
        </div>
        <div className="car-feature">
          <span className="icon">💰</span>
          <span>{car?.price || "N/A"}</span>
        </div>
        <div className="car-feature">
          <span className="icon">🗓️</span>
          <span>
            {car?.availableFrom} to {car?.availableUntil}
          </span>
        </div>
      </div>

      {editMode ? (
        <div className="date-editing">
          <div className="car-feature">
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
            />
          </div>
          <div className="car-feature">
            <label htmlFor="end-date">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
            />
          </div>
          <button onClick={handleSaveDates} className="save-dates-button">
            Save Dates
          </button>
        </div>
      ) : (
        <button onClick={handleUpdateClick} className="ModifyReservation">
          Modify Dates
        </button>
      )}
      <button className={"CancelReservation"} onClick={onCancel}>
        Cancel Reservation
      </button>
    </div>
  );
}

export default CarCardReservation;
