import { NavLink } from "react-router-dom";
import "./NavBar.css";


/* define the NavBar component */
function NavBar() {
  return (
    <nav>
      {/* <div class="logo"></div> */}
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
        to="/signup"
        className="nav-link signupLink"
        activeClassName="active">
        🧑✍️
      </NavLink>
    </nav>
  );
}

export default NavBar;
