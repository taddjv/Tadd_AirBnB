import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import "./EditVenue.css";

const EditVenue = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
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
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [redir, setRedir] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getTheSpot(spotId));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const editedSpot = {
      address: address || spot.address,
      city: city || spot.city,
      state: state || spot.state,
      country: country || spot.country,
      lat: latitude || spot.lat,
      lng: longitude || spot.lng,
      name: name || spot.name,
      description: description || spot.description,
      price: price || spot.price,
      previewImage: image || spot.previewImage,
    };

    dispatch(spotsActions.editTheSpot(editedSpot, spotId))
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
        // console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
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
      {redir && <Redirect to={`/spots/${spotId}`} />};
      {spot && (
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
              <input
                onChange={(e) => setName(e.target.value)}
                value={name || spot.name}
                placeholder="Name"
                id="name"
                type="text"
              />
            </div>
            <div className="spotAddress">
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address || spot.address}
                placeholder="Address"
                id="address"
                type="text"
              />
            </div>
            <div className="spotCity">
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city || spot.city}
                placeholder="City"
                id="city"
                type="text"
              />
            </div>
            <div className="spotState">
              <input
                onChange={(e) => setState(e.target.value)}
                value={state || spot.state}
                placeholder="State"
                id="state"
                type="text"
              />
            </div>
            <div className="spotCountry">
              <select
                onChange={(e) => setCountry(e.target.value)}
                value={country || spot.country}
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
                value={longitude || spot.lng}
                placeholder="Longitude"
                id="longitude"
                type="number"
              />
            </div>
            <div className="spotLatitude">
              <input
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude || spot.lat}
                placeholder="Latitude"
                id="latitude"
                type="number"
              />
            </div>
            <div className="spotDescription">
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description || spot.description}
                placeholder="Description"
                id="description"
              ></textarea>
            </div>
            <div className="spotPrice">
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price || spot.price}
                placeholder="Price"
                id="price"
                type="number"
              />
            </div>

            <div className="spotImage">
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image || spot.previewImage}
                id="image"
                placeholder="Preview Image (not needed)"
                type="string"
              />
            </div>
            <button className="hh-button">Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default EditVenue;
