import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsDisplay from "./components/SpotsDisplay";
import SpotsDetail from "./components/SpotsDetail";
import Navbar from "./components/Navbar";
import HostHome from "./components/HostHome";

import LogInPop from "./components/Navbar/LogInPop";
import Dropdown from "./components/Navbar/Dropdown";
import MyVenues from "./components/MyVenues";
import EditVenue from "./components/EditVenue.js";
import MyBookings from "./components/MyBookings";
import EditBooking from "./components/EditBooking.js";
import AddImage from "./components/AddImage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navbar isLoaded={isLoaded} />
            <div className="body-container">
              <SpotsDisplay />
            </div>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/:spotId">
            <Navbar />
            <SpotsDetail />
          </Route>
          <Route path="/host/home">
            <Navbar />
            <HostHome />
          </Route>
          <Route path="/my/venues/add-image/:spotId">
            <Navbar />
            <AddImage />
          </Route>
          <Route path="/my/venues/:spotId">
            <Navbar />
            <EditVenue />
          </Route>
          <Route path="/my/venues">
            <Navbar />
            <MyVenues />
          </Route>
          <Route path="/my/bookings/:bookingId/spot/:spotId">
            <Navbar />
            <EditBooking />
          </Route>
          <Route path="/my/bookings">
            <Navbar />
            <MyBookings />
          </Route>
          <Route path="/practiceee">
            <LoginFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
