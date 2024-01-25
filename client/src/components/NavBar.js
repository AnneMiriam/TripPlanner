import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

/* define the NavBar component */
function NavBar() {
  const location = useLocation();

  return (
    <nav>
      {/* <div class="logo"></div> */}
      {location.pathname === "/user" && (
        <NavLink
          to="/trips"
          className="nav-link tripLink"
          activeClassName="active">
          ✈️
        </NavLink>
      )}
      <NavLink
        to="/"
        /* add styling to Navlink */
        className="nav-link homeLink"
        activeClassName="active">
        🏠
      </NavLink>
      <NavLink
        to="/login"
        className="nav-link loginLink"
        activeClassName="active">
        🧑🔓
      </NavLink>
      <NavLink

        to="/sign_up"
        className="nav-link signupLink"
        activeClassName="active">

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
}

export default NavBar;
