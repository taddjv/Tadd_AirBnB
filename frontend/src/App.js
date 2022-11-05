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

import LogInPop from "./components/Navbar/LogInPop";

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
            <Navbar />
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
          <Route path="/practice">
            <LogInPop />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
