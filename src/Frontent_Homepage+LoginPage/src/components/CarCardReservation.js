import React, { useState } from "react";
import "../styles/CarCardReservation.css";
import user_icon from "../Assets/person.png";
import { useHref } from "react-router-dom";

function CarCardReservation({ car, onCancel, onUpdate, reservation }) {
  console.log(reservation);

  const [editMode, setEditMode] = useState(false);
  const [newStart, setNewStart] = useState(car?.availableFrom || "");
  const [newEnd, setNewEnd] = useState(car?.availableUntil || "");
  const [error, setError] = useState(null);

  const handleUpdateClick = () => {
    // Toggle the edit mode to show/hide the date inputs
    setEditMode(!editMode);
  };

  const onCheckOut = () => {
    // Toggle the edit mode to show/hide the date inputs
    window.location.href="/CheckOut"
  };

  const handleSaveDates = async () => {
    try {
      // Check if car is defined before updating
      if (!car) {
        throw new Error("Car is undefined");
      }

      // Validate if the new dates are within the availability range of the car
      const startDate = new Date(newStart);
      const endDate = new Date(newEnd);
      const availabilityStartDate = new Date(car.availability_start_date);
      const availabilityEndDate = new Date(car.availability_end_date);

      if (startDate < availabilityStartDate || endDate > availabilityEndDate) {
        throw new Error(
          "Selected dates are not within the availability range of the car."
        );
      }

      // Perform the update action by calling the API
      await updateReservationDates(
        reservation.reservation_id,
        newStart,
        newEnd
      );

      // Exit edit mode after successful update
      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateReservationDates = async (
    reservationId,
    newStartDate,
    newEndDate
  ) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/reservation/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_start: newStartDate,
            date_end: newEndDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update reservation dates.");
      }

      // If the update is successful, call the onUpdate callback to reflect the changes in the UI
      onUpdate(reservationId, newStartDate, newEndDate);
    } catch (error) {
      throw new Error("Error updating reservation dates: " + error.message);
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
        <button onClick={handleUpdateClick} className="ModifyReservation">
          Modify Dates
        </button>
      )}
      <button className={"CancelReservation"} onClick={onCancel}>
        Cancel Reservation
      </button>
      <button className={"CancelReservation"} onClick={onCheckOut}>
        Check Out
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default CarCardReservation;
