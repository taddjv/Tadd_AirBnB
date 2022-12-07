import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AirbnbLogo from "./AirbnbLogo";
import Dropdown from "./Dropdown";

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
          <AirbnbLogo />
        </NavLink>
      </div>
      <div className="nav-right">
        <div className="translateButton">
          <button className="tr-bttn">
            <img src="https://cdn-icons-png.flaticon.com/512/2767/2767210.png"></img>
          </button>
        </div>
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
