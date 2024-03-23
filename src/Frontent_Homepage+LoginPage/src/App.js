import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup"; // Ensure you have a Signup component
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmPayment from "./pages/ConfirmPayment";
import ConfirmPaymentOUT from "./pages/Payment_pages/Checkoutpayment";
import ConfirmPaymentIN from "./pages/Payment_pages/Checkinpayment";
import Price from "./pages/Payment_pages/Price";


import FindBranch from "./pages/FindBranch"
import CheckOut from "./pages/CheckOut"
import CheckInPage from "./pages/Check-In";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ConfirmPayment" element={<ConfirmPayment />} />
          <Route path="/ConfirmPaymentOUT" element={<ConfirmPaymentOUT />} />
          <Route path="/ConfirmPaymentIN" element={<ConfirmPaymentIN />} />
          <Route path="/reservation" element={<Reservation />} />{" "}
          <Route path="/FindBranch" element={<FindBranch />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Price" element={<Price />} />
          <Route path="/Check-In" element={<CheckInPage />} />

          {/* Add more Route components as needed */}
          {/* Add more Route components as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
