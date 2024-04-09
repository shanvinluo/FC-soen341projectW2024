import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import CarCard from "../components/CarCard";

const formatDate = (dateString) => {
  return dateString ? new Date(dateString).toISOString().slice(0, 10) : "";
};
function Home() {
  const [priceRange, setPriceRange] = useState("");
  const [startDesiredDate, setDestiredStartDate] = useState("");
  const [endDesiredDate, setDesiredEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [postal_code,SetPostal_code]=useState("")
  const [transmissionType, setTransmissionType] = useState("");
  const [year, setYear] = useState("");
  const [allReservations, setAllReservations] = useState([]);
  const fetchCars = async () => {
    SetPostal_code(localStorage.getItem("nearest_branch"))
    // console.log(localStorage.getItem("nearest_branch"));
    const queryParams = new URLSearchParams();

    // Add each filter to queryParams only if it has been selected (is not empty)
    queryParams.append('postal_code',postal_code)
    if (priceRange) queryParams.append("priceRange", priceRange);
    if (startDesiredDate)
      queryParams.append("startDesiredDate", formatDate(startDesiredDate));
    if (endDesiredDate)
      queryParams.append("endDesiredDate", formatDate(endDesiredDate));
    if (fuelType) queryParams.append("fuelType", fuelType);
    if (color) queryParams.append("color", color);
    if (mileage) queryParams.append("mileage", mileage);
    if (transmissionType)
      queryParams.append("transmissionType", transmissionType);
    if (year) queryParams.append("year", year);
    const url = `http://127.0.0.1:5000/Cars/list?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cars = await response.json();
      return cars; // Assuming the backend directly returns the filtered cars
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      return []; // Return an empty array in case of error
    }
  };
  
  const fetchAllReservations = async () => {
    const url = `http://127.0.0.1:5001/reservation/AllReservations`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setAllReservations(data.reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setAllReservations([]);
    }
  };

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedCars = await fetchCars();
    const availableCars = fetchedCars.filter(car => {
      const hasOverlappingReservation = allReservations.some(reservation => {
        if (reservation.vehicle_id !== car.vehicule_id) return false;
  
        const reservationStart = new Date(reservation.date_start);
        const reservationEnd = new Date(reservation.date_end);
        const desiredStart = new Date(startDesiredDate);
        const desiredEnd = new Date(endDesiredDate);
  
        // overlaps conditions
        const startsDuringDesired = desiredStart < reservationStart && reservationStart < desiredEnd;
        const endsDuringDesired = desiredStart < reservationEnd && reservationEnd < desiredEnd;
        const encompassesDesired = reservationStart <= desiredStart && desiredEnd <= reservationEnd;
  
        return startsDuringDesired || endsDuringDesired || encompassesDesired;
      });
  
      return !hasOverlappingReservation;
    });
  
    setResults(availableCars);
    setShowResults(true);
  }
  useEffect(() => {
    fetchAllReservations();}, [year,color,mileage,transmissionType,fuelType,priceRange, startDesiredDate, endDesiredDate]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="containerHome">
        <div className="inputss">
          <div className="inputa">
            <p> Start Date</p>
            <input
              type="date"
              value={formatDate(startDesiredDate)}
              onChange={(e) => setDestiredStartDate(new Date(e.target.value))}
            />
          </div>
          <div className="inputa">
            <p> End Date</p>
            <input
              type="date"
              value={formatDate(endDesiredDate)}
              onChange={(e) => setDesiredEndDate(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="More_Filter" onClick={toggleMoreFilters}>
          Add More Filters+
        </div>
        {showMoreFilters && (
          <div className="more-filters">
            <div className="inputss">
              <div className="inputa">
                <p> Price Range</p>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Price Range</option>
                  <option value="0-100">0-100$</option>
                  <option value="100-200">100-200$</option>
                  <option value="200-300">200$-300$</option>
                  <option value="300-400">300$-400$</option>
                  <option value="400-500">400$-500$</option>
                  <option value="500">500$+</option>
                </select>
              </div>

              <div className="inputa">
                <p>Mileage (in km)</p>
                <select
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                >
                  <option value="">Select Mileage</option>
                  <option value="0-10000">0 - 10,000</option>
                  <option value="10001-50000">10,001 - 50,000</option>
                  <option value="50001-100000">50,001 - 100,000</option>
                  <option value="100000">100,000+</option>
                </select>
              </div>
              <div className="inputa">
                <p>Year</p>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select Year</option>
                  <option value="2020-2024">2020 - 2024</option>
                  <option value="2015-2019">2015 - 2019</option>
                  <option value="2010-2014">2010 - 2014</option>
                  <option value="2005-2009">2005 - 2009</option>
                  <option value="2000-2004">2000 - 2004</option>
                  <option value="0-2000">Before 2000</option>
                </select>
              </div>
            </div>
            <div className="inputss">
              <div className="inputa">
                <p>Transmission Type</p>
                <select
                  value={transmissionType}
                  onChange={(e) => setTransmissionType(e.target.value)}
                >
                  <option value="">Select Transmission Type</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div className="inputa">
                <p>Fuel Type</p>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="gazoline">Gazoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="inputa">
                <p>Color</p>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="submit-container">
          <button type="submit" className="submitButton">
            Select Car
          </button>
        </div>
      </form>
      {showResults && (
        <div className="containerHome">
          <h1>Results</h1>
          <ul>
            {results.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                startDesiredDate={formatDate(startDesiredDate)}
                endDesiredDate={formatDate(endDesiredDate)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
