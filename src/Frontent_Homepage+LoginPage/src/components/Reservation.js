import React, { useState, useEffect } from "react";
import "../styles/Reservation.css";
import CarCardReservation from "./CarCardReservation";

const Reservation = () => {
  const [results, setResults] = useState([]);

  const fetchResults = () => {
    const allCars = [
      { id: 1, name: "Car A", seats: "4 Seats", price: 100, availableFrom: '2024-01-01', availableUntil: '2024-01-10' },
      { id: 2, name: "Car B", seats: "2 Seats", price: 150, availableFrom: '2024-01-05', availableUntil: '2024-02-15' },
      { id: 3, name: "Car C", seats: "6 Seats", price: 300, availableFrom: '2024-02-01', availableUntil: '2024-02-20' },
      // more cars...
    ];
    return allCars;
  };

  useEffect(() => {
    const reservedCars = fetchResults();
    setResults(reservedCars);
  }, []);
  const cancelReservation = (carId) => {
    setResults(results.filter(car => car.id !== carId));
  };
  const handleDateUpdate = (carId, newStart, newEnd) => {
    setResults(results.map(car => {
      if (car.id === carId) {
        return { ...car, availableFrom: newStart, availableUntil: newEnd };
      }
      return car;
    }));
  };

  return (
    <div className="reservationLayout">
      <div className="sidebar">
      <button className="sidebarButton">User Information</button>
  <button className="sidebarButton">Manage Rentals</button>
      </div>
      <div className="containerHome">
        <h1>Manage Rentals</h1>
        <ul>
          {results.map((car) => (
            <CarCardReservation key={car.id} car={car}              
             onCancel={() => cancelReservation(car.id)
            }          
            onUpdate={handleDateUpdate}

            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reservation;