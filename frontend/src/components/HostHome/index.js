import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./HostHome.css";

const HostHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const createdSpot = {
      address,
      city,
      state,
      country: country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price,
      previewImage: image,
    };

    dispatch(spotActions.createTheSpot(createdSpot)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

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
  useEffect(() => {
    if (spot.spots) {
      history.push(`/spots/${spot.spots.id}`);
      history.go(0);
    }
  }, [spot]);

  return (
    <>
      <form className="formContainer" onSubmit={onSubmit}>
        <div className="title">
          <h1>Host your home !</h1>
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
        <p> image isn't needed</p>
        <div className="spotImage">
          <label htmlFor="image">Preview Image:</label>
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            id="image"
            type="string"
          />
        </div>
        <button className="book-button">Submit</button>
      </form>
    </>
  );
};

export default HostHome;
