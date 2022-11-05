import React from "react";
import LoginFormPage from "../LoginFormPage";

const LogInPop = (props) => {
  return (
    <>
      <div
        onClick={() => {
          props.props[1](false);
        }}
        className="blackout"
      ></div>
      <div className="LogInForm">
        <LoginFormPage />
      </div>
    </>
  );
};

export default LogInPop;
