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
      <div className="nav-middle">
        <div className="n-v-container">
          <button className="anywhere-btn">Anywhere</button>
          <span className="buttonLine"></span>
          <button className="anyweek-btn">Any week</button>
          <span className="buttonLine"></span>
          <button className="addGuests-btn">
            <div className="addGuests-btn-text">Add guests</div>
            <div className="addGuests-btn-logo">
              {/* <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"
              >
                <g fill="none">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                </g>
              </svg> */}
            </div>
          </button>
        </div>
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
