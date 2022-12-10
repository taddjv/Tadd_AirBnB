import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import logo from "./aLogo.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = showDropdown ? <Dropdown /> : null;

  useEffect(() => {
    // Update the document title using the browser API
  }, [showDropdown]);
  return (
    <div className="nav-container">
      {dropdown}
      <div className="nav-left">
        <NavLink to="/">
          <img src={logo} width="32" height="32" />
        </NavLink>
      </div>
      <div className="nav-right">
        <div className="profileButton">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="pr-bttn"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"></img>
            <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
