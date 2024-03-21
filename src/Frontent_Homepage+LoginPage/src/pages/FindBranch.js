import React, { useState } from "react";
import "../styles/FindBranch.css";
import CarCard from "../components/CarCard";

function FindBranch() {
  const [postalCode, setPostalCode] = useState(""); // State for the postal code
  const [showMessage, setShowMessage] = useState(false); // State to control message visibility

  const submitPress =() => {

    window.location.href = "/home";
        
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postalCode.trim() !== "") {
      // If postal code is entered, display the message
      setShowMessage(true);
    }

    
    
  }
  
  ;

  return (
    <div>
      <form onSubmit={handleSubmit} className="containerHomeee">
        <div className="findcartext">find a car near you</div>
        <div className="inputss">
          <div className="veryveryspecific">
            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submitButton" onClick={submitPress}>
            Find a car near me
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default FindBranch;
