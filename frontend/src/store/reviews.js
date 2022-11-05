import { csrfFetch } from "./csrf";

const GET_REVIEWS_USER = "reviews/GET_REVIEWS_USER";
const GET_REVIEWS_SPOT = "reviews/GET_REVIEWS_SPOT";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getReviewsUser = (reviews) => {
  return {
    type: GET_REVIEWS_USER,
    payload: reviews,
  };
};
const getReviewsSpot = (reviews) => {
  return {
    type: GET_REVIEWS_SPOT,
    payload: reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};
const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    payload: review,
  };
};
const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    payload: review,
  };
};

export const getTheReviewsUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");
  const data = await response.json();
  dispatch(getReviewsUser(data));
  return response;
};

export const getTheReviewsSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(getReviewsSpot(data));
  return response;
};

export const createTheReview = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
  }
};

export const editTheReview = (review, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editReview(data));
  }
};

export const deleteTheReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS_USER:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    case GET_REVIEWS_SPOT:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    case CREATE_REVIEW:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
