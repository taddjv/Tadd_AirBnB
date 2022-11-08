import { csrfFetch } from "./csrf";

const CREATE_IMAGE_SPOT = "images/CREATE_IMAGE_SPOT";
const CREATE_IMAGE_REVIEW = "images/CREATE_IMAGE_REVIEW";
const DELETE_IMAGE = "images/DELETE_IMAGE";

const createImageReview = (image) => {
  return {
    type: CREATE_IMAGE_REVIEW,
    payload: image,
  };
};
const createImageSpot = (image) => {
  return {
    type: CREATE_IMAGE_SPOT,
    payload: image,
  };
};
const deleteImage = (image) => {
  return {
    type: DELETE_IMAGE,
    payload: image,
  };
};

export const createTheImageSpot = (image, spotId) => async (dispatch) => {
  // const response = await csrfFetch(`/api/spots/${spotId}/images`);
  // const data = await response.json();
  // dispatch(createImageSpot(data));
  // return response;
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(image),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createImageSpot(data));
  }
};

export const createTheImageReview = (image, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}/images`);
  const data = await response.json();
  dispatch(createImageReview(data));
  return response;
};

export const deleteTheImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteImage(data));
  }
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_IMAGE_REVIEW:
      newState = Object.assign({}, state);
      newState.images = action.payload;
      return newState;
    case CREATE_IMAGE_SPOT:
      newState = Object.assign({}, state);
      newState.images = action.payload;
      return newState;
    case DELETE_IMAGE:
      newState = Object.assign({}, state);
      newState.images = action.payload;
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;
