import React, { useState, useEffect } from "react";
import "../styles/Reservation.css";
import CarCardReservation from "../components/CarCardReservation";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  // Check if the user is logged in, and if not, redirect to the login page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== true && isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const username = localStorage.getItem("user_session_name");
    // Make sure username is not null or undefined
    if (!username) {
      console.error("Username is not set");
      // Redirect to login or handle the error as needed
      window.location.href = "/login";
      return;
    }

    const fetchReservations = async () => {
      try {
        // Adjust the URL to either use a hardcoded username or the one from storage
        // const url = `http://127.0.0.1:5001/reservation/${username}`; // Uncomment and use this if backend is ready
        const url = "http://127.0.0.1:5001/reservation/new_username"; // Temp: hardcoded for demonstration
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const allReservations = await response.json();
        setReservations(allReservations.reservations); // Adjust according to your actual data structure
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, []); // Dependency array is empty, so this effect runs once after the initial render

  const cancelReservation = (reservationId) => {
    console.log(`Cancel reservation ${reservationId}`);
    // Implementation for canceling a reservation goes here
  };

  const handleDateUpdate = (reservationId, newStart, newEnd) => {
    console.log(
      `Update reservation ${reservationId} to start: ${newStart}, end: ${newEnd}`
    );
    // Implementation for updating a reservation's date goes here
  };

  return (
    <div className="reservationLayout">
      <div className="sidebar">
        <button className="sidebarButton">User Information</button>
        <button className="sidebarButton">Manage Rentals</button>
      </div>
      <div className="containerHome">
        <h1>Manage Rentals</h1>
        <ul>
          {reservations.map((reservation) => (
            <CarCardReservation
              key={reservation.reservation_id}
              reservation={reservation}
              onCancel={() => cancelReservation(reservation.reservation_id)}
              onUpdate={handleDateUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservation;
