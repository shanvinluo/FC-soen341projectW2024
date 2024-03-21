import React, { useState } from "react";
import "../styles/FindBranch.css";
import CarCard from "../components/CarCard";

function FindBranch() {
  const [postalCode, setPostalCode] = useState(""); // State for the postal code
  const [showMessage, setShowMessage] = useState(false); // State to control message visibility

  const submitPress = () => {
    window.location.href = "/home";
  };
  const update_location = async (postalCode) => {
    try {
      const user_name = localStorage.getItem("user_session_name");
      const response = await fetch(
        `http://127.0.0.1:5002/user-location/${user_name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postal_code: postalCode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update postal code.");
      }
    } catch (error) {
      throw new Error("Error updating postal code: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postalCode.trim() !== "") {
      // If postal code is entered, display the message
      update_location();
    }
  };

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
          <button
            type="submit"
            className="submitButton" /*onClick={submitPress}*/
          >
            Find a car near me
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindBranch;
