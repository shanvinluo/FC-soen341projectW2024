import React from "react";
// import { Link } from "react-router-dom";
import "../styles/Home.css";
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';


function Home() {

  return (
   <div className="containerHome"> 
       
        <div className="inputss">
            {<div className="inputa">
              <p>Price Range</p>
              <select>
                <option>0-100$</option>
                <option>100-200$</option>
                <option>200$-300$</option>
                <option>300$-400$</option>
                <option>400$-500$</option>
                <option>500$+</option>

              </select>
                {/* <input type="text" placeholder="Price Range"/> */}
                </div>}
            
                <div className="inputa">
                <p>Start Date</p>
                <input type="date"/> 
                </div>
                <div className="inputa">
                <p>End Date</p>
                <input type="date"/> 
                </div></div>
                <div className="submit-containerr">
                    <div className="submitButton" >Select Car</div>
                </div> 
        </div>
  );

//  <div className="home">

// <div className="search-bar">
//     <div className="inputs">
//       <input type="text" placeholder="Price range" />
//       <input type="text" placeholder="Start date" />
//       <input type="text" placeholder="Return date" /></div>
//       <div className="CarButton" onClick={()=>{setAction("Car Selected")}}>Select Car</div>
//     </div>
//     </div>

  
}

export default Home;