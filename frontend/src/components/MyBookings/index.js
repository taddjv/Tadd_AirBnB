import React, { useState, useEffect } from "react";
import * as bookingsActions from "../../store/bookings";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";

import "./MyBookings.css";

const MyBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const spots = [];
  const [deleted, setDeleted] = useState(false);
  const deleteMessage = deleted ? <>deleted</> : null;

  useEffect(() => {
    dispatch(bookingsActions.getTheBookingsUser());
    setTimeout(() => {
      setDeleted(false);
    }, 200);
  }, [deleted]);

  if (bookings.bookings) {
    if (!bookings.bookings.message) {
      bookings.bookings.forEach((ele) => {
        spots.push(ele.Spot);
      });
    }
    // bookings.bookings.forEach((ele) => {
    //   spots.push(ele.Spot);
    // });
  }

  if (!bookings.bookings) {
    return <>deleted</>;
  } else {
    if (!bookings.bookings.message) {
      return (
        <div className="booking-container">
          {bookings.bookings.map((ele) => {
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
                    {deleteMessage}
                  </div>
                  <div className="card-makeChanges">
                    <button>
                      <a href={`/my/bookings/${ele.id}/spot/${ele.Spot.id}`}>
                        Make Changes
                      </a>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      );
    }
  }
};

export default MyBookings;
