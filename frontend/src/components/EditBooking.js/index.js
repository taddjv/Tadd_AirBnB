import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Redirect } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import * as bookingsActions from "../../store/bookings";
import * as sessionsActions from "../../store/session";
import "./EditBooking.css";

const EditBooking = () => {
  const { bookingId, spotId } = useParams();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings);
  const spot = useSelector((state) => state.spots.spot);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [booked, setBooked] = useState("");
  const [redir, setRedir] = useState(false);

  const editedSpotMessage =
    booked === "yes" ? <>Successfully edited booking </> : null;

  useEffect(() => {
    dispatch(spotsActions.getTheSpot(spotId));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const editedBooking = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    setBooked("yes");
    dispatch(bookingsActions.editTheBooking(editedBooking, bookingId))
      .then(() => {
        setStartDate("");
        setEndDate("");
        setErrors([]);
        setRedir(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        setBooked("no");
        if (data && data.message) setErrors([data.message]);
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
      <>
        {redir && <Redirect to="/my/bookings" />};{renderedSpot}
        <form className="formContainer" onSubmit={onSubmit}>
          <div className="title">
            <h1>Edit your booking !</h1>
          </div>
          <ul>
            {errors.map((ele) => (
              <li>{ele}</li>
            ))}
          </ul>
          <div className="start-date">
            <label htmlFor="start">Start date:</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            ></input>
          </div>
          <div className="end-date">
            <label htmlFor="end">End date:</label>
            <input
              type="date"
              id="end"
              name="trip-end"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            ></input>
          </div>
          <button className="book-button">Submit</button>
        </form>
      </>
    </>
  );
};

export default EditBooking;
