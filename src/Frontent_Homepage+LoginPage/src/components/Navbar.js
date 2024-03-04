import "../App.css";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to="/home">Car Rental Montreal</Link>
      </div>
      <div className="rightSide">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default Navbar;