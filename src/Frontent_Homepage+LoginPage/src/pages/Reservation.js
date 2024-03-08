import React from "react";
import "../styles/Reservation.css";
import { useState } from "react";

const Reservation = () => {
  return (
    <div className="container">
      <div className="sideContent">
        <button className="userInformation">User Information</button>
        <button className="manageRentals">Manage manageRentals</button>
      </div>
      <div className="mainContent"></div>
    </div>
  );
};

export default Reservation;
