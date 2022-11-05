import React, { useState, useEffect } from "react";
import { signup } from "../../store/session";
import LogInPop from "./LogInPop";
import SignUpPop from "./SigninPop";

const Dropdown = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const login = showLogin ? (
    <LogInPop props={[showLogin, setShowLogin]} />
  ) : null;
  const signup = showSignup ? (
    <SignUpPop props={[showSignup, setShowSignup]} />
  ) : null;

  useEffect(() => {}, [showLogin]);

  return (
    <div className="dd-container">
      {login}
      {signup}
      <div className="dd-top">
        <div
          //? onclick will only work inside the div and not the button
          onClick={() => {
            setShowLogin(!showLogin);
          }}
          className="logInButton"
        >
          <button
            // onClick={() => {
            //   console.log("hello");
            //   setShowDLogin(!showLogin);
            // }}
            className="li-bttn"
          >
            Log in
          </button>
        </div>
        <div
          onClick={() => {
            setShowSignup(!showSignup);
          }}
          className="signUpButton"
        >
          <button className="su-bttn">Sign up</button>
        </div>
      </div>

      <div className="dd-below">
        <div className="hostHomeButton">
          <button className="hh-bttn">Host your home</button>
        </div>
        <div className="hostExpButton">
          <button className="he-bttn">Host an experience</button>
        </div>
        <div className="helpButton">
          <button className="h-bttn">Help</button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
