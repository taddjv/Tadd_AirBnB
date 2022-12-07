import React, { useState, useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SpotsIndividual from "../SpotsIndividual";
import "./MyVenues.css";

const MyVenues = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const [deleted, setDeleted] = useState(false);
  const [changes, setChanges] = useState(false);
  const deleteMessage = deleted ? <>deleted</> : null;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(spotsActions.getTheCurrentSpots());
    setTimeout(() => {
      setDeleted(false);
    }, 200);
  }, [deleted]);

  if (!spots.spots) {
    return null;
  } else {
    return (
      <div className="spots-container">
        {spots.spots.map((ele) => {
          return (
            <div className={`spot-${ele.id}`}>
              <SpotsIndividual spot={ele} />
              <div className="buttons">
                <div
                  onClick={() => {
                    setDeleted(true);

                    dispatch(spotsActions.deleteTheSpot(ele.id));
                  }}
                  className="del"
                >
                  <button>Delete</button>
                </div>
                {deleteMessage}
                <div className="addIm">
                  <button>
                    <NavLink
                      className="ataggg"
                      to={`/my/venues/add-image/${ele.id}`}
                    >
                      Add Images
                    </NavLink>
                  </button>
                </div>
                <div className="makeCh">
                  <button>
                    <NavLink className="atagg" to={`/my/venues/${ele.id}`}>
                      Make Changes
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default MyVenues;
