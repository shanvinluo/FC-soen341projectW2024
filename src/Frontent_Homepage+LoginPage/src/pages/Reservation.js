import React, { useState, useEffect } from "react";
import "../styles/Reservation.css";
import CarCardReservation from "../components/CarCardReservation";
import ConfirmPaymentOUT from "./Payment_pages/Checkoutpayment";

const Reservation = (newStart) => {
  console.log(newStart);
  const [reservations, setReservations] = useState([]);
  // Check if the user is logged in, and if not, redirect to the login page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== true && isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const username = localStorage.getItem("user_session_name");
    // Make sure username is not null or undefined

    console.log(username);
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
        const url = `http://127.0.0.1:5001/reservation/${username}`; // Temp: hardcoded for demonstration
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

  window.addEventListener("popstate", function (reservation) {
    if (window.location.href === "/ConfirmPaymentOUT") {
      cancelReservation(reservation.reservation_id);
    }
  });

  const cancelReservation = async (reservationId) => {
    console.log(`Cancel reservation ${reservationId}`);
    // Implementation for canceling a reservation goes here

    try {
      const response = await fetch(
        `http://127.0.0.1:5001/reservation/${reservationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Reservation cancelled successfully");
      } else {
        console.error(
          "Error cancelling reservation. Server responded with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleDateUpdate = async (reservationId, newStart, newEnd) => {
    console.log(
      `Update reservation ${reservationId} to start: ${newStart}, end: ${newEnd}`
    );
    // Implementation for updating a reservation's date goes here
    try {
      const username = localStorage.getItem("user_session_name");

      const response = await fetch(
        `http://127.0.0.1:5001/reservation/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {},
            {
              reservation_id: reservationId,
              date_start: newStart,
              date_end: newEnd,
              username: username,
            }
          ),
        }
      );
      if (response.ok) {
        console.log("modification was succesfull");
      } else {
        console.error("error updating reservation.");
      }
    } catch (error) {
      console.log("error updating reservation.", error);
    }
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
              //car={{car: "info"}}
              key={reservation.reservation_id}
              reservation={reservation}
              onCancel={() => {
                cancelReservation(reservation.reservation_id);
              }}
              onUpdate={handleDateUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservation;
