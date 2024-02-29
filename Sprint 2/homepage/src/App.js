import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup"; // Ensure you have a Signup component
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/Home" element={<Home />} />          {/* Add more Route components as needed */}
       {/* Add more Route components as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
