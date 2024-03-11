import React, { useState, useEffect } from "react";
import "../styles/Reservation.css";
import CarCardReservation from "../components/CarCardReservation";

const Reservation = () => {

//if user is not logged in then it will redirect to login
  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    //console.log(isLoggedIn);

    if(isLoggedIn!==true && isLoggedIn!=="true"){
     window.location.href = "/login"

    }
  })

  




  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // const username = localStorage.getItem('username');
    
    // // Make sure username is not null or undefined
    // if (!username) {
    //   console.error("Username is not set");
    //   return;
    // }    
    const fetchReservations = async () => {
      try {
        // Use a hardcoded 'new_username' or retrieve from storage/environment
        const url = 'http://127.0.0.1:5001/reservation/new_username';
        // const url = `http://localhost:5002/reservation/${username}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const allReservations = await response.json();
        setReservations(allReservations.reservations); // Make sure to adjust according to the actual response structure
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Implement cancelReservation functionality
  const cancelReservation = (reservationId) => {
    console.log(`Cancel reservation ${reservationId}`);
    // Implementation for canceling a reservation
  };

  // Implement handleDateUpdate functionality
  const handleDateUpdate = (reservationId, newStart, newEnd) => {
    console.log(`Update reservation ${reservationId} to start: ${newStart}, end: ${newEnd}`);
    // Implementation for updating a reservation's date
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

