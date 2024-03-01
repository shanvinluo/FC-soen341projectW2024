import React from 'react'
import "../styles/CarCard.css";
import user_icon from '../Assets/person.png'
import { useState } from 'react';



function CarCard({ car }) {
    const [carAdded, setCarAdded] = useState(false); // State to track if car is successfully added

    const handleAddCar = () => {
        // Logic to add car goes here...
        // After the car is added successfully:
        setCarAdded(true);}
    return (
      <div className="car-card">
        <div className="car-image" />
        <div className="car-details">
          <div className="car-feature">
            <span className="icon">🚗</span>
            <span>{car.name}</span>
          </div>
          <div className="car-feature">
            <span className="icon"> <img src={user_icon} alt=""/></span>
            <span>{car.seats}</span>
          </div>
          <div className="car-feature">
            <span className="icon">💰</span>
            <span>{car.price}</span>
          </div>
        </div>
        <button
        onClick={handleAddCar}
        className={`addCarbtn ${carAdded ? 'car-added' : ''}`} // This allows you to use CSS for styling as well
      >
        {carAdded ? 'Car Added' : 'Add Car'}
      </button>
      </div>
    );
  }
  

export default CarCard
