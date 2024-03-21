import React, { useState } from "react";
import "../styles/CarCardReservation.css";
import user_icon from "../Assets/person.png";
//import { reservationData } from '../components/CarCard';
function CarCardReservation({ car, onCancel, onUpdate, reservation }) {
  console.log(reservation);
  //console.log(reservationData); // Logging reservationData
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
  };

  return (
    <div className="car-card">
      <div className="car-image" />
      <div className="car-details">
        <div className="car-feature">
          <span className="icon">
            {" "}
            <img src={user_icon} alt="" />
          </span>
          <span>
            {"Reserved in the name:  " + reservation.username || "N/A"}
          </span>
        </div>

        <div className="car-feature">
          <span className="icon">🗓️</span>
          <span>
            {reservation.date_start} to {reservation.date_end}
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
        <button onClick={onUpdate} className="ModifyReservation">
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
