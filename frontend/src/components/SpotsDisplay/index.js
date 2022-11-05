import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";
import SpotsIndividual from "../SpotsIndividual";
import "./SpotsDisplay.css";

function SpotsDisplay() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(spotsActions.getTheSpots());
  }, []);
  if (!spots.spots) {
    return null;
  } else {
    return (
      <>
        {spots.spots.map((ele) => {
          return (
            <>
              <SpotsIndividual spot={ele} />
            </>
          );
        })}
      </>
    );
  }
}

export default SpotsDisplay;
