import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';
import "../styles/Checkin.css"; 
const containerStyle = {
  width: '400px',
  height: '400px'
};

let key = "AIzaSyCg9ZMC5lLuUeTEt3H2jC5WjaScuJRCh2o"
const username = localStorage.getItem("user_session_name");
const reservationUrl = "http://127.0.0.1:5001/reservation/" + username;



function PostalCodeToCoordinates() {
    console.log(username);
    const [postalCode, setPostalCode] = useState('H1A 0A1');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState('');
    const [fetchingComplete, setFetchingComplete] = useState('');
    const[carID, setCarID] = useState("");
    
    

    const fetchPostalCode = async () => {
      try {

        // First get the vehicle's ID
        const response = await fetch(reservationUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch reservation data");
        }
        const data = await response.json();
        let vehicleID = data.reservations[0].vehicle_id;
        setCarID(vehicleID)

        // Using the vehicle's ID, fetch the postal code of that vehicle
        const response_car = await fetch("http://127.0.0.1:5000/Car/" + vehicleID);
        const carData = await response_car.json()
        const postal_code = carData.postal_code
        setPostalCode(postal_code)

        convertToCoordinates(postalCode)
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };
    const convertToCoordinates = async (postal_code) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postal_code}&key=${key}`);
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
    
    useEffect(() => {
      fetchPostalCode();
  }, []); 
  const [trafficLayerActive, setTrafficLayerActive] = useState(false);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const toggleTrafficLayer = () => {
    setTrafficLayerActive(prevState => !prevState);
  };
    return (
        <div className="checkin-container">
          
          {coordinates &&(
            
            <LoadScript googleMapsApiKey={key}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                                lat: coordinates.latitude,
                                lng: coordinates.longitude
                            }}
                            zoom={13}
                        >
                          {trafficLayerActive && <TrafficLayer />}
                          {/* Child components, such as markers, info windows, etc. */}
                          
                            
                            <></>
                        </GoogleMap>
                    </LoadScript>)}

            <button onClick={toggleTrafficLayer}>
            {trafficLayerActive ? 'Hide Traffic Layer' : 'Show Traffic Layer'}
            </button>
        </div>
    );
}

export default PostalCodeToCoordinates;
