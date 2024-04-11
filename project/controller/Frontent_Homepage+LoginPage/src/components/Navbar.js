import "../App.css";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
//import { isLoggedIn } from '../pages/Login';

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  localStorage.removeItem("user_session_name");
  console.log(isLoggedIn);
};

function Navbar() {
  return (
    <div className="navbar">
      <div className="left-side">
        <Link to="/home">Car Rental Montreal</Link>
      </div>
      <div className="right-side">
        <Link to="/FindBranch">Find Branch</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/login" onClick={logout}>
          Log out
        </Link>
        <Link to="/reservation">manage reservation</Link>
      </div>
    </div>
  );
}

export default Navbar;
