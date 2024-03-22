import React, { useState } from "react";
import "../styles/Login.css"; 
import CarCard from "../components/CarCard";

function FindBranch() {
  const [postalCode, setPostalCode] = useState(""); 
  const [showMessage, setShowMessage] = useState(false); 

  const submitPress = () => {
    window.location.href = "/home";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postalCode.trim() !== "") {
      
      setShowMessage(true);
    }
  };

  return (
    <div className="container"> 
      <form onSubmit={handleSubmit} className="inputs"> 
        <div className="header"> 
          <div className="text">Find a branch</div> 
          <div className="underline"></div> 
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="submit-container"> 
          <button type="submit" className="submit" onClick={submitPress}> 
            Find a car near me
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindBranch;
