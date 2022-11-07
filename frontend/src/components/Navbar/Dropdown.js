import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../store/session";
import * as sessionActions from "../../store/session";
import LogInPop from "./LogInPop";
import SignUpPop from "./SigninPop";

const Dropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const login = showLogin ? (
    <LogInPop props={[showLogin, setShowLogin]} />
  ) : null;
  const signup = showSignup ? (
    <SignUpPop props={[showSignup, setShowSignup]} />
  ) : null;

  useEffect(() => {}, [showLogin]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="dd-container2">
          <div onClick={logout} className="logOutButton">
            <button className="lo-bttn">Log out</button>
          </div>
          <div onClick className="hostYourHomeButton">
            <a href="/host/home">
              <button className="hyh-bttn">Host your home</button>
            </a>
          </div>
          <div onClick className="manageMyVenuesButton">
            <a href="/my/venues">
              <button className="mmv-bttn">Manage my venues</button>
            </a>
          </div>
          <div onClick className="manageBookingsButton">
            <a href="/my/bookings">
              <button className="mb-bttn">Manage bookings</button>
            </a>
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
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
        </div>
      </>
    );
  }

  return sessionLinks;
};

export default Dropdown;
