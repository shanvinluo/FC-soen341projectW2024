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
        <div className="mainContent"></div>
      </div>
    </body>
  );
};

export default Reservation;
