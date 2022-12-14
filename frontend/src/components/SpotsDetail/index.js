import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotsActions from "../../store/spots";

import "./SpotsDetail.css";
import StarLogo from "./StarLogo";
import BookSpot from "./BookSpot";

function SpotsDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spot);
  const spots = useSelector((state) => state.spots);

  const [otherWay, setOtherWay] = useState(false);

  useEffect(async () => {
    dispatch(spotsActions.getTheSpot(spotId));
    dispatch(spotsActions.getTheSpots());
  }, []);

  if (!spot) {
    return null;
  } else {
    return (
      <>
        <div className="spot-details">
          <div className="spot-title">{spot.name}</div>
          <div className="spot-info">
            <div className="s-i-left">
              <div className="spot-reviews">
                <div className="s-r-logo">
                  <StarLogo />
                </div>
                <div className="s-r-avgReviews">
                  {spot.avgStarRating ? spot.avgStarRating : "9.99"}
                </div>
                <div className="s-r-reviews">{spot.numReviews} reviews</div>
              </div>
              <div className="spot-location">
                {spot.city}, {spot.state}, {spot.country}
              </div>
            </div>
            <div className="s-i-right">
              <div className="share">
                <div className="share-logo">
                  <i className="fa-regular fa-share-from-square"></i>
                </div>
                <div className="share-text">Share</div>
              </div>
              <div className="save">
                <div className="save-logo">
                  <i class="fa-regular fa-heart"></i>
                </div>
                <div className="save-text">Save</div>
              </div>
            </div>
          </div>
          <div className="spot-pictures">
            <div className={`s-p1`}>
              <img
                src={
                  spots
                    ? spots.spots.find((ele) => ele.id == spotId).previewImage
                    : null
                }
              />
            </div>

            {spot.Images.slice(0, 4).map((ele, i) => {
              return (
                <div className={`s-p${i + 2}`}>
                  <img src={ele.url} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="spot-description">
          <div className="s-d-left"></div>
          <div className="s-d-right">
            <BookSpot spot={spot} spotId={spotId} />
          </div>
        </div>
      </>
    );
  }
}

export default SpotsDetail;
