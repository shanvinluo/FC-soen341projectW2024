import React from "react";
import "../styles/Reservation.css";
import { useState } from "react";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
const Login = () => {
  const [action, setAction] = useState("Log in");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name" />
          <input type="text" />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="text" placeholder="Email" />
          <input type="email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="text" placeholder="Password" />
          <input type="password" />
        </div>
        <div className="forgot-password">Forgot Password?</div>
        <div className="submit-container">
          <div
            className={"submit"}
            onClick={() => {
              setAction("Log in");
            }}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
