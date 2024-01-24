import { NavLink } from "react-router-dom";
import "./NavBar.css";

/* define the NavBar component */
function NavBar() {
  return (
    <nav>
      <NavLink
        to="/"
        /* add styling to Navlink */
        className="nav-link"
      >
        🏠
      </NavLink>
      <NavLink
        to="/login"
        className="nav-link"
      >
        🧑🔓
      </NavLink>
      <NavLink
        to="/sign_up"
        className="nav-link"
      >
        🧑✍️
      </NavLink>
      <NavLink
        to="/trips"
        className="nav-link"
      >
        ✈️
      </NavLink>
    </nav>
  );
};

export default NavBar;