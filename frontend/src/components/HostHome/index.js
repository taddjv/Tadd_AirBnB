import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
  const [redir, setRedir] = useState(false);

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
      previewImage:
        image ||
        "https://img.freepik.com/premium-vector/sketch-house-architecture-drawing-free-hand-vector-illustration_231873-6096.jpg?w=2000",
    };

    dispatch(spotActions.createTheSpot(createdSpot))
      .then(() => {
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
        setRedir(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      {redir && <Redirect to="/" />};
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
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            id="name"
            type="text"
          />
        </div>
        <div className="spotAddress">
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            id="address"
            type="text"
          />
        </div>
        <div className="spotCity">
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City"
            id="city"
            type="text"
          />
        </div>
        <div className="spotState">
          <input
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="State"
            id="state"
            type="text"
          />
        </div>
        <div className="spotCountry">
          <select
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            id="country"
          >
            <option value="">Select Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
        <div className="spotLongitude">
          <input
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
            placeholder="Longitude"
            id="longitude"
            type="number"
          />
        </div>
        <div className="spotLatitude">
          <input
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
            placeholder="Latitude"
            id="latitude"
            type="number"
          />
        </div>
        <div className="spotDescription">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            id="description"
          ></textarea>
        </div>
        <div className="spotPrice">
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Price"
            id="price"
            type="number"
          />
        </div>

        <div className="spotImage">
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            id="image"
            placeholder="Preview Image (not needed)"
            type="string"
          />
        </div>
        <button className="hh-button">Submit</button>
      </form>
    </>
  );
};

export default HostHome;
