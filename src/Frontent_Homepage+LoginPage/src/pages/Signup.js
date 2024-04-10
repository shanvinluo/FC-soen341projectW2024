import React from "react";
import "../styles/Signup.css";
import { useState } from "react";
import axios from "axios";
//hash from js file
//import bcrypt from 'bcryptjs';

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [action, ] = useState("Sign up");
  const [status, setStatus] = useState("0");

  const signUpUser = async () => {
   await handleSignup();
  };

  const handleSignup = async () => {
    //hash from js file, atai hashed in flask
    //const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const response = await axios.post("http://127.0.0.1:5002/user", {
        username: username,
        email: email,
        password: password,
        status: status, // Include status in the request
      });
      if (response && response.data && response.data.message) {
        console.log(response.data.message);
        if (response.data.code === "OK") {
          window.location.href = "/login";
        }
      } else {
        console.error("Response data is missing or invalid:", response);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
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
          <input type="text" />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input type="email" />
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
          <input type="password" />
        </div>
        <div className="inputss">
  <div className="inputa">
    <p>Status</p>
    <select
  onChange={(e) => {
    console.log("Selected value:", e.target.value);
    setStatus(e.target.value);
  }}
>
  <option value="0">customer</option>
  <option value="1">employee</option>
</select>

  </div>
</div>

        
        <div className="submit-container">
          <div
            className={"submit"}
            onClick={() => {
              signUpUser();
            }}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
