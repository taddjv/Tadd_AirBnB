import { csrfFetch } from "./csrf";

const GET_BOOKINGS_USER = "bookings/GET_BOOKINGS_USER";
const GET_BOOKINGS_SPOT = "bookings/GET_BOOKINGS_SPOT";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const EDIT_BOOKING = "bookings/EDIT_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const getBookingsUser = (bookings) => {
  return {
    type: GET_BOOKINGS_USER,
    payload: bookings,
  };
};
const getBookingsSpot = (bookings) => {
  return {
    type: GET_BOOKINGS_SPOT,
    payload: bookings,
  };
};

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    payload: booking,
  };
};
const editBooking = (booking) => {
  return {
    type: EDIT_BOOKING,
    payload: booking,
  };
};
const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    payload: bookingId,
  };
};

export const getTheBookingsUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  const data = await response.json();

  dispatch(getBookingsUser(data));
  return response;
};

export const getTheBookingsSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await response.json();
  dispatch(getBookingsSpot(data));
  return response;
};

export const createTheBooking = (booking, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createBooking(data));

    return "dispatchh";
  }

  return "no dispatch";
};

export const editTheBooking = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editBooking(data));
  }
};

export const deleteTheBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(deleteBooking(bookingId));
    return true;
  }
  return false;
};

const initialState = { bookings: {} };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKINGS_USER:
      newState = Object.assign({}, state);
      newState.bookings = {};
      action.payload.forEach((ele) => {
        newState.bookings[ele.id] = ele;
      });
      return newState;
    case GET_BOOKINGS_SPOT:
      newState = Object.assign({}, state);
      newState.bookings = action.payload;
      return newState;
    case CREATE_BOOKING:
      newState = Object.assign({}, state);
      newState.bookings = action.payload;
      return newState;
    case EDIT_BOOKING:
      newState = Object.assign({}, state);
      newState.bookings = action.payload;
      return newState;
    case DELETE_BOOKING:
      newState = Object.assign({}, state);

      delete newState.bookings[action.payload];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
