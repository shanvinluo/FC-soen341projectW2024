import React from "react";
import "../styles/Reservation.css";
import { useState } from "react";

const Reservation = () => {
  return (
    <body className="bodyReserv">
      <div className="containerReserv">
        <div className="sideContent">
          <button className="userInformation">User Information</button>
          <button className="manageRentals">Manage manageRentals</button>
        </div>
        <div className="mainContent">
          <div className="locationHistory">
            <h3 className="locationTitle">Current Location</h3>
            <div className="locationMap">insert map here</div>
            <h3 className="historyTitle">Car Rental History</h3>
            <div className="reservedCars">insert vehicle history here</div>
          </div>
          <div className="sideButtons">
            <button className="userInformation">Modify Rental Period</button>
            <button className="manageRentals">Cancel Reservation</button>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Reservation;
