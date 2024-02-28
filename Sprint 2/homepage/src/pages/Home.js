import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home" style={{ backgroundImage: `linear-gradient(to right top, #6D9197, #99AEAD)` }}>

<div className="search-bar">
    <div clssName="search-inputs">
      <input type="text" placeholder="Price range" />
      <input type="date" placeholder="Start date" />
      <input type="date" placeholder="Return date" /></div>
      <button>Select Car</button>
    </div>
    </div>
  );
}

export default Home;