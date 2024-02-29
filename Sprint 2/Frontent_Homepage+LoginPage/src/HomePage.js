import React from 'react';
import './HomePage.css'; // Assuming your CSS file is named HomePage.css


const Header = ({ onSignUpClick, onLoginClick }) => (
  <div className="head">
    <div className="fl">Car Rental Montreal</div>
    <nav className="p">
      <button className="mt-8" onClick={onSignUpClick}>sign up</button>
      <button className="mt-8" onClick={onLoginClick}>login</button>
    </nav>
  </div>
);



const HomePage = () => {
  
  const handleSignUpClick = () => {
    console.log("Sign Up Clicked");
  };

  const handleLoginClick = () => {
    console.log("Login Clicked");
  };

  const handleSelectCarClick = () => {
    console.log("Select Car Clicked");
  };

  return (
    
    <div className="gradientBackground">
    <Header onSignUpClick={handleSignUpClick} onLoginClick={handleLoginClick} />
    {/* Other components */}
  </div>
);
};

export default HomePage;

