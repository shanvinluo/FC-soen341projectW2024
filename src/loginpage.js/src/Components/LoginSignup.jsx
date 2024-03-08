import React from "react"
import './LoginSignup.css'
import { useState } from 'react';


import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'
const LoginSignup=()=>{
    const [action,setAction]=useState("Sign up");

    return (
        <div className="container"> 
        <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={user_icon} alt=""/>
                <input type="text" placeholder="Name"/>
                <input type="text"/> 
                </div>}
            
                <div className="input">
                <img src={email_icon} alt=""/>
                <input type="text" placeholder="Email"/>
                <input type="email"/> 
                </div>
                <div className="input">
                <img src={password_icon} alt=""/>
                <input type="text" placeholder="Password"/>
                <input type="password"/> 
                </div>
                {action==="Sign up"?<div></div>:<div className="forgot-password">Forgot Password?</div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray": "submit"} onClick={()=>{setAction("Sign Up")}}>Sign up</div>
                    <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
        </div>
            </div>
    )
}

export default LoginSignup