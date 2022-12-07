import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as bookingsActions from "../../store/bookings";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";

import "./MyBookings.css";

const MyBookings = () => {
  const dispatch = useDispatch();
  const bookingsObj = useSelector((state) => state.bookings);
  // console.log(bookingsObj);
  const bookings = Object.values(bookingsObj.bookings);
  const [deleted, setDeleted] = useState(false);
  const deleteMessage = deleted ? <>deleted</> : null;
  // console.log(bookings, "hello");
  useEffect(() => {
    dispatch(bookingsActions.getTheBookingsUser());
  }, []);
  if (!bookings.length) {
    return null;
  } else {
    return (
      <div className="booking-container">
        {bookings &&
          bookings.length &&
          bookings.map((ele) => {
            console.log(ele);
            return (
              <>
                <div className="card">
                  <div className="card-name">{ele.Spot.name}</div>
                  <div className="card-booking">
                    {ele.startDate.slice(0, 10)} to {ele.endDate.slice(0, 10)}
                  </div>
                  <div className="card-delete">
                    <div
                      onClick={() => {
                        setDeleted(true);
                        dispatch(bookingsActions.deleteTheBooking(ele.id));
                      }}
                      className="del"
                    >
                      <button>Delete</button>
                    </div>
                    {/* {deleteMessage} */}
                  </div>
                  <div className="card-makeChanges">
                    <button>
                      <NavLink
                        to={`/my/bookings/${ele.id}/spot/${ele.Spot.id}`}
                      >
                        Make Changes
                      </NavLink>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    );
  }
};

export default MyBookings;
