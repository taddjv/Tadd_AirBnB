import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../store/session";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
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

  const demo = () => {
    dispatch(
      sessionActions.login({ credential: "demouser", password: "demouser" })
    );
  };

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
          <div onClick={null} className="hostYourHomeButton">
            <NavLink to="/host/home">
              <button className="hyh-bttn">Host your home</button>
            </NavLink>
          </div>
          <div onClick={null} className="manageMyVenuesButton">
            <NavLink to="/my/venues">
              <button className="mmv-bttn">Manage my venues</button>
            </NavLink>
          </div>
          <div onClick={null} className="manageBookingsButton">
            <NavLink to="/my/bookings">
              <button className="mb-bttn">Manage bookings</button>
            </NavLink>
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
              <button className="li-bttn">Log in</button>
            </div>
            <div
              onClick={() => {
                setShowSignup(!showSignup);
              }}
              className="signUpButton"
            >
              <button className="su-bttn">Sign up</button>
            </div>
            <div
              onClick={() => {
                demo();
              }}
              className="signUpButton"
            >
              <button className="su-bttn">Demo User</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return sessionLinks;
};

export default Dropdown;
