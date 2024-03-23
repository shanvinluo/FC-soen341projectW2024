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
  const [color, setColor] = useState('');
const [mileage, setMileage] = useState('');
//const [mileage, setMileage] = useState({ min: '', max: '' });

const [transmissionType, setTransmissionType] = useState('');
const [year, setYear] = useState('');




  /*useEffect(()=>{
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(isLoggedIn);

  
    if(isLoggedIn==true){
      window.location.href = "/home"
    }

    else{

      window.location.href = "/login"

    }
  })*/


  
  // const fetchResults = () => {
  //   // Simulated fetching of data
  //   const allCars = [
  //     { id: 1, name: "Car A", seats: "4 Seats", price: 100, availableFrom: '2024-01-01', availableUntil: '2024-01-10' },
  //     { id: 2, name: "Car B", seats: "2 Seats", price: 150,  availableFrom: '2024-01-05', availableUntil: '2024-02-15' },
  //     { id: 3, name: "Car C", seats: "6 Seats", price: 300,  availableFrom: '2024-02-01', availableUntil: '2024-02-20' },
  //     // ... more cars
  //   ];

  //   // Filter the dataset based on price range and date range
  //   const priceLimits = priceRange.split('-').map(Number);
  //   const startDateObj = startDesiredDate ? new Date(startDesiredDate) : null;
  //   const endDateObj = endDesiredDate ? new Date(endDesiredDate) : null;

  //   const filteredCars = allCars.filter(car => {
  //     const carAvailableFrom = new Date(car.availableFrom);
  //     const carAvailableUntil = new Date(car.availableUntil);
  //     const isWithinPriceRange = (!priceLimits[0] || car.price >= priceLimits[0]) && (!priceLimits[1] || car.price <= priceLimits[1]);

  //     // Check if dates are valid and if the selected date range falls within the car's availability range
  //     const isAvailable = (!startDateObj || !endDateObj) ? true : (startDateObj >= carAvailableFrom && endDateObj <= carAvailableUntil);

  //     return isWithinPriceRange && isAvailable;
  //   });

  //   return filteredCars;
  // };

// no


  // const fetchResults = async () => {
  //   // Construct the URL with query parameters for price range, start date, and end date if needed
  //   const url = new URL("http://127.0.0.1:5000/Cars/list");

   

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const allCars = await response.json();

  //     // You can implement any additional filtering on the client side if necessary
  //     const filteredCars = allCars.filter((car) => {
  //       const carAvailableFrom = new Date(car.availability_start_date);
  //       const carAvailableUntil = new Date(car.availability_end_date);
  //       // Example: Filter by price range, you can add more conditions as needed
  //       const priceLimits = priceRange.split('-').map(Number);
  //   const startDateObj = startDesiredDate ? new Date(startDesiredDate) : null;
  //   const endDateObj = endDesiredDate ? new Date(endDesiredDate) : null;

  //   const isAvailable = (!startDateObj || !endDateObj) ? true : (startDateObj >= carAvailableFrom && endDateObj <= carAvailableUntil);

 

  
  //   const isWithinPriceRange = (!priceLimits[0] || car.price >= priceLimits[0]) && (!priceLimits[1] || car.price <= priceLimits[1]);

  //   return isWithinPriceRange && isAvailable;

  //     });

  //     return filteredCars;
  //   } catch (error) {
  //     console.error("Failed to fetch cars:", error);
  //     return []; // Return an empty array in case of error
  //   }
  // };
  const fetchResults = async () => {
    const queryParams = new URLSearchParams();
  
    // Add each filter to queryParams only if it has been selected (is not empty)
    if (priceRange) queryParams.append('priceRange', priceRange);
    if (startDesiredDate) queryParams.append('startDesiredDate', formatDate(startDesiredDate));
    if (endDesiredDate) queryParams.append('endDesiredDate', formatDate(endDesiredDate));
    if (fuelType) queryParams.append('fuelType', fuelType);
    if (color) queryParams.append('color', color);
    if (mileage) queryParams.append('mileage', mileage);
    if (transmissionType) queryParams.append('transmissionType', transmissionType);
    if (year) queryParams.append('year', year);
  
    //const url = 'http://127.0.0.1:5000/Cars/list?${queryParams.toString()}';
    const url = `http://127.0.0.1:5000/Cars/list?${queryParams.toString()}`;
    //const url = new URL("http://127.0.0.1:5000/Cars/list");
   
  
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
  
  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const fetchedResults = fetchResults();
  //   setResults(fetchedResults);
  //   setShowResults(true);
  //   console.log({ priceRange, startDate, endDate }); // Logging form data to the console
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedResults = await fetchResults(); // Use await here
    setResults(fetchedResults);
    setShowResults(true);
  }

  useEffect(() => {
    // Optionally, fetch results immediately on component mount or when certain states change
  }, [year,color,mileage,transmissionType,fuelType,priceRange, startDesiredDate, endDesiredDate]);

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
        <div className="More_Filter"
                  onClick={toggleMoreFilters}
                  >Add More Filters+</div>
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
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
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
            </div></div>
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
              <CarCard key={car.id} car={car} startDesiredDate={formatDate(startDesiredDate)}
              endDesiredDate={formatDate(endDesiredDate)}/>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;

