import React from "react";
import SignupFormPage from "../SignupFormPage";

const SignUpPop = (props) => {
  return (
    <>
      <div
        onClick={() => {
          props.props[1](false);
        }}
        className="blackout"
      ></div>
      <div className="LogInForm">
        <SignupFormPage />
      </div>
    </>
  );
};

export default SignUpPop;
