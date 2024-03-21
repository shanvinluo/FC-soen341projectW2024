import React, { useEffect, useState } from 'react';

function Price() {
    const [reservationData, setReservationData] = useState(null);
    const [carData, setCarData] = useState(null); // State to store car details
    
  
    useEffect(() => {
      // Fetch reservation data when the component mounts
      fetchReservationData();
    }, []);
  
    const username = localStorage.getItem("user_session_name");
    const reservationUrl = "http://127.0.0.1:5001/reservation/" + username;
  
    const fetchReservationData = async () => {
      try {
        const response = await fetch(reservationUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch reservation data");
        }
        const data = await response.json();
        setReservationData(data.reservations[0]);
        // Extract car ID from reservation data and fetch car details
        const carId = data.reservations[0].vehicle_id; // Assuming "vehicle_id" is the key for car ID in reservation data
        if (carId) {
          fetchCarData(carId);
        }
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };
  
    const fetchCarData = async (carId) => {
      try {
        const carUrl = `http://127.0.0.1:5000/Car/${carId}`;
        const response = await fetch(carUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    const getDaysBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Calculate the total price
    const calculateTotalPrice = () => {
        if (!reservationData || !carData || !reservationData.date_start || !reservationData.date_end) {
            return 0; // Not enough data to calculate
        }
        const days = getDaysBetweenDates(reservationData.date_start, reservationData.date_end);
        return days * carData.price;
    };

    const totalPrice = calculateTotalPrice();

    return (
        <div>
            <h2>Total Price: ${totalPrice}</h2>
            
            {/* Additional content here */}
        </div>
    );
}

export default Price
   