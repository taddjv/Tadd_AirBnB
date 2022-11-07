import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import "./EditVenue.css";

const EditVenue = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spot);

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
    dispatch(spotsActions.getTheSpot(spotId));
  }, [name]);

  const onSubmit = (e) => {
    e.preventDefault();
    const editedSpot = {
      address,
      city,
      state,
      country: country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price,
    };

    dispatch(spotsActions.editTheSpot(editedSpot, spotId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    setAddress("");
    setName("");
    setCity("");
    setState("");
    setCountry("");
    setLongitude("");
    setLatitude("");
    setDescription("");
    setPrice("");
    setErrors([]);
  };
  const renderedSpot = spot ? (
    <NavLink to={`/spots/${spot.id}`} target="_blank">
      <div className="card">
        <div className="top">
          <img src={spot.previewImage} />
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <div className="bl1">
              {spot.city}, {spot.country}
            </div>
            <div className="bl2">*100km away*</div>
            <div className="bl3">Sep. 2 - 7</div>
            <div className="bl4">${spot.price} CAD night</div>
          </div>
          <div className="bottom-right">
            <div className="br1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </div>
            <div className="br2">{spot.avgRating}</div>
          </div>
        </div>
      </div>
    </NavLink>
  ) : null;

  return (
    <>
      <>
        {renderedSpot}
        <form className="formContainer" onSubmit={onSubmit}>
          <div className="title">
            <h1>Edit your home !</h1>
          </div>
          <ul>
            {errors.map((ele) => (
              <li>{ele}</li>
            ))}
          </ul>
          <div className="spotName">
            <label htmlFor="name">Name:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
            />
          </div>
          <div className="spotAddress">
            <label htmlFor="address">Address:</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              type="text"
            />
          </div>
          <div className="spotCity">
            <label htmlFor="city">City:</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              id="city"
              type="text"
            />
          </div>
          <div className="spotState">
            <label htmlFor="state">State:</label>
            <input
              onChange={(e) => setState(e.target.value)}
              value={state}
              id="state"
              type="text"
            />
          </div>
          <div className="spotCountry">
            <label htmlFor="country">Country:</label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              id="country"
            >
              <option value="">Select country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>
          <div className="spotLongitude">
            <label htmlFor="longitude">Longitude:</label>
            <input
              onChange={(e) => setLongitude(e.target.value)}
              value={longitude}
              id="longitude"
              type="number"
            />
          </div>
          <div className="spotLatitude">
            <label htmlFor="latitude">Latitude:</label>
            <input
              onChange={(e) => setLatitude(e.target.value)}
              value={latitude}
              id="latitude"
              type="number"
            />
          </div>
          <div className="spotDescription">
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
            ></textarea>
          </div>
          <div className="spotPrice">
            <label htmlFor="price">Price:</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="price"
              type="number"
            />
          </div>
          <button className="book-button">Submit</button>
        </form>
      </>
    </>
  );
};

export default EditVenue;
