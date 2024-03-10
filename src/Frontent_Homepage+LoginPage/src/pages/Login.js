import React, { useState } from "react";
import '../styles/Login.css';
import axios from "axios";

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: email,
                password: password
            });

            if (response && response.data && response.data.success) {
                // Login successful, redirect the user or do something else
                console.log("Login successful!");
            } else {
                // Login failed, display error message
                setErrorMessage("Invalid email or password.");
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
                    <img src={email_icon} alt=""/>
                    <input type="text" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt=""/>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="forgot-password">Forgot Password?</div>
                <div className="submit-container">
                    <div className="submit" onClick={handleLogin}>Log in</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
