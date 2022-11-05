import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as bookingsActions from "../../store/bookings";
import StarLogo from "./StarLogo";

const BookSpot = ({ spot, spotId }) => {
  const dispatch = useDispatch();
  //   console.log(spotId);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    dispatch(bookingsActions.createTheBooking(bookingInfo, spotId));

    setStartDate("");
    setEndDate("");
  };
  return (
    <>
      <div className="sdr-price">${spot.price} CAD night</div>
      <div className="sdr-review">
        <div className="s-r-logo">
          <StarLogo />
        </div>
        <div className="s-r-avgReviews">
          {spot.avgStarRating ? spot.avgStarRating : "9.99"}
        </div>
        <div className="s-r-reviews">{spot.numReviews} reviews</div>
      </div>
      <div className="sdr-book">
        <form onSubmit={onSubmit}>
          <label for="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          ></input>
          <label for="end">End date:</label>
          <input
            type="date"
            id="end"
            name="trip-end"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          ></input>
          <button>Submit</button>
        </form>
      </div>
      <div className="sdr-total"></div>
    </>
  );
};
export default BookSpot;
