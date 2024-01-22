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
        Home
      </NavLink>
      <NavLink
        to="/user"
        className="nav-link"
      >
        User
      </NavLink>
      <NavLink
        to="/trips"
        className="nav-link"
      >
        Trips
      </NavLink>
    </nav>
  );
};

export default NavBar;