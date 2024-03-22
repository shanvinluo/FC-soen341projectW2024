import axios from "axios";
import React, { useState } from "react";
import "../styles/Login.css";
import CarCard from "../components/CarCard";

function FindBranch() {
  const [postalCode, setPostalCode] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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

  const find_nearest_branch = async () => {
    try {
      const user_name = localStorage.getItem("user_session_name");
      const response = await axios.get(
        `http://127.0.0.1:5003/nearest-branch/${user_name}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postalCode.trim() !== "") {
      // If postal code is entered, display the message
      update_location();
      find_nearest_branch();
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
          <button type="submit" className="submitButton" onClick={submitPress}>
            Find a car near me
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindBranch;
