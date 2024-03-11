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
  const fetchResults = async () => {
    // Construct the URL with query parameters for price range, start date, and end date if needed
    const url = new URL("http://localhost:5000/Cars/list");

   

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allCars = await response.json();

      // You can implement any additional filtering on the client side if necessary
      const filteredCars = allCars.filter((car) => {
        const carAvailableFrom = new Date(car.availability_start_date);
        const carAvailableUntil = new Date(car.availability_end_date);
        // Example: Filter by price range, you can add more conditions as needed
        const priceLimits = priceRange.split('-').map(Number);
    const startDateObj = startDesiredDate ? new Date(startDesiredDate) : null;
    const endDateObj = endDesiredDate ? new Date(endDesiredDate) : null;

    const isAvailable = (!startDateObj || !endDateObj) ? true : (startDateObj >= carAvailableFrom && endDateObj <= carAvailableUntil);

 

  
    const isWithinPriceRange = (!priceLimits[0] || car.price >= priceLimits[0]) && (!priceLimits[1] || car.price <= priceLimits[1]);

    return isWithinPriceRange && isAvailable;

      });

      return filteredCars;
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      return []; // Return an empty array in case of error
    }
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
  }, [priceRange, startDesiredDate, endDesiredDate]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="containerHome">
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

