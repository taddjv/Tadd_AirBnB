import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bookingsReducer, * as bookingsActions from "../../store/bookings";
import StarLogo from "./StarLogo";

const BookSpot = ({ spot, spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const booking = useSelector((state) => state.bookings);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [booked, setBooked] = useState("");
  const [done, setDone] = useState(false);

  const createdSpotMessage =
    booked === "yes" ? <>Successfully booked </> : null;

  const onSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    setBooked("yes");

    dispatch(bookingsActions.createTheBooking(bookingInfo, spotId)).catch(
      async (res) => {
        const data = await res.json();
        setBooked("no");
        if (data && data.errors) setErrors(data.errors);
        if (data && !data.errors) {
          if (data && data.message) setErrors([data.message]);
        }
      }
    );

    setStartDate("");
    setEndDate("");
    setErrors([]);
  };

  return (
    <>
      <div className="sdr-price">${spot.price} CAD night</div>
      <div className="sdr-book">
        <form className="form-container" onSubmit={onSubmit}>
          <ul>
            {errors.map((ele) => (
              <li>{ele}</li>
            ))}
          </ul>
          {createdSpotMessage}
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
      </div>
      <div className="sdr-total"></div>
    </>
  );
};
export default BookSpot;
