import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/GET_SPOTS";
const GET_CURRENT_SPOTS = "spots/GET_CURRENT_SPOTS";
const GET_SPOT = "spots/GET_SPOT";
const GET_SPOTS_USER = "spots/GET_SPOTS_USER";
const CREATE_SPOT = "spots/CREATE_SPOT";
const EDIT_SPOT = "spots/EDIT_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    payload: spots,
  };
};
const getCurrentSpots = (spots) => {
  return {
    type: GET_CURRENT_SPOTS,
    payload: spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot,
  };
};

const getSpotsUser = (spots) => {
  return {
    type: GET_SPOTS_USER,
    payload: spots,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    payload: spot,
  };
};

const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    payload: spot,
  };
};

export const getTheSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data));
  return response;
};
export const getTheCurrentSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const data = await response.json();

  dispatch(getCurrentSpots(data));
  return response;
};

export const getTheSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(getSpot(data));
  return response;
};

export const getTheSpotsUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  const data = await response.json();

  dispatch(getSpotsUser(data));
  return response;
};

export const createTheSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createSpot(data));
  }
};
export const editTheSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data));
  }
};
export const deleteTheSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    case GET_CURRENT_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    case GET_SPOT:
      newState = Object.assign({}, state);
      newState.spot = action.payload;
      return newState;
    case GET_SPOTS_USER:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    case CREATE_SPOT:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
