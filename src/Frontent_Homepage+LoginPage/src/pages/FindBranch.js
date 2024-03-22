import axios from "axios";
import React, { useState } from "react";
import "../styles/FindBranch.css";
import CarCard from "../components/CarCard";

function FindBranch() {
  const [postalCode, setPostalCode] = useState(""); // State for the postal code
  const [showMessage, setShowMessage] = useState(false); // State to control message visibility

  const submitPress = () => {
    window.location.href = "/home";
  };

  const update_location = async () => {
    try {
      const user_name = localStorage.getItem("user_session_name");

      const response = await axios.put(
        `http://127.0.0.1:5002/user-location/${user_name}`,
        {
          postal_code: postalCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.error("Response data is missing or invalid:", response);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.error);
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
