import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5002/api/login", {
        username: username,
        password: password,
      });

      if (response && response.data && response.data.code === "OK") {
        console.log("Login successful!");

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_session_name", username);
        const storedUsername = localStorage.getItem("user_session_name");
        console.log("user_session_name:", storedUsername);
        window.location.href = "/home";
      } else {
        console.log("Login pas successful womp womp!");
        alert("username or password not correct try again");
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        console.log(isLoggedIn);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Log in</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="forgot-password">Forgot Password?</div>
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
