import React, { useState, useEffect } from "react";


const Checkout = () => {
  const [reservationData, setReservationData] = useState(null);
  const [carData, setCarData] = useState(null); // State to store car details
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [carCondition, setCarCondition] = useState("");
  const [carDamaged, setCarDamaged] = useState(false); 
  

  useEffect(() => {
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
      const carId = data.reservations[0].vehicle_id;
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


  };

  