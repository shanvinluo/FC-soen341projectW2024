import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "../styles/Checkin.css"; 
const containerStyle = {
  width: '400px',
  height: '400px'
};

let key = "AIzaSyCg9ZMC5lLuUeTEt3H2jC5WjaScuJRCh2o"
const username = localStorage.getItem("user_session_name");
const reservationUrl = "http://127.0.0.1:5001/reservation/" + username;



function PostalCodeToCoordinates() {
    const [postalCode, setPostalCode] = useState('H1A 0A1');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setPostalCode(event.target.value);

    };
const fetchPostalCode = async () => {
    try {
      const response = await fetch(reservationUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch reservation data");
      }
      const data = await response.json();
      setPostalCode(data.reservations[0].postal_code);
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
  };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${key}`);
            const { status, results } = response.data;

            if (status === 'OK') {
                if (results.length > 0) {
                    const { lat, lng } = results[0].geometry.location;
                    setCoordinates({ latitude: lat, longitude: lng });
                    setError('');
                } else {
                    setCoordinates(null);
                    setError('No results found.');
                }
            } else {
                setCoordinates(null);
                setError(`Error: ${status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setCoordinates(null);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="checkin-container">

<form onSubmit={handleSubmit}>
    <label style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        Enter Postal Code:
        <input type="text" value={postalCode} onChange={handleChange} />
    </label>
    <button type="submit">Convert</button>
</form >
<div style={{display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'}}>
            {coordinates && (
                <LoadScript googleMapsApiKey={key}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: coordinates.latitude,
                            lng: coordinates.longitude
                        }}
                        zoom={10}
                    >
                        {/* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                </LoadScript>
)}
</div>
        </div>
    );
}

export default PostalCodeToCoordinates;
