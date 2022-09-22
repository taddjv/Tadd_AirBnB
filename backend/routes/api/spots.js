const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Spot, Image, Review, User, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({
      max: 50,
    })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("stars")
    .isLength({
      max: 6,
      min: 0,
    })
    .withMessage("Stars must be an integer from 1 to 5"),
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  handleValidationErrors,
];

//! Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", restoreUser, async (req, res, next) => {
  const theSpot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
  });

  if (!theSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theSpot.ownerId !== req.user.id) {
    const err = new Error(
      "Only the owner of the spot is authorized to add an image"
    );
    err.status = 403;
    return next(err);
  }

  const theImage = await Image.create({
    imageableId: theSpot.id,
    imageableType: "Spot",
    url: req.body.url,
    userId: req.user.id,
  });

  const newImage = await Image.findByPk(theImage.id);
  res.json(newImage);
});

//! Add a Review to a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  restoreUser,
  validateReview,
  async (req, res, next) => {
    const { stars, review } = req.body;
    const theSpot = await Spot.findOne({
      where: {
        id: req.params.spotId,
      },
    });

    if (!theSpot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    //
    const pastReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });
    if (pastReview) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      return next(err);
    }
    //
    const newReview = await Review.create({
      stars,
      review,
      userId: req.user.id,
      spotId: Number(req.params.spotId),
    });
    res.json(newReview);
  }
);

//! Get all Spots owned by the Current User
//? i did /currentUser/spots
router.get("/current", restoreUser, async (req, res) => {
  const { id } = req.user;
  const spots = await Spot.findAll({
    where: {
      ownerId: id,
    },
  });

  res.json(spots);
});

//!Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const theSpot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
    include: [
      {
        model: Image,
      },
      {
        model: User,
        as: "Owner",
        attributes: {
          exclude: [
            "username",
            "email",
            "hashedPassword",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });
  if (!theSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  const reviewAggregateData = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "numReviews"],
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
    raw: false,
  });
  const final = Object.assign(
    theSpot.toJSON(),
    reviewAggregateData[0].dataValues
  );

  res.json(final);
});

//! Create a Spot
router.post("/", restoreUser, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const { id } = req.user;

  const newSpot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId: id,
  });
  res.json(newSpot);
});

//! Get all Spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  res.json(spots);
});

//! edit a spot based on spot's id
router.put("/:spotId", restoreUser, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const theSpot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
  });

  if (!theSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theSpot.ownerId !== req.user.id) {
    const err = new Error(
      "Only the owner of the spot is authorized to edit this spot"
    );
    err.status = 403;
    return next(err);
  }
  theSpot.set({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.json(theSpot);
});

//! delete a spot based on spot's id
router.delete("/:spotId", restoreUser, async (req, res, next) => {
  const theSpot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
  });

  if (!theSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theSpot.ownerId !== req.user.id) {
    const err = new Error(
      "Only the owner of the spot is authorized to delete this spot"
    );
    err.status = 403;
    return next(err);
  }
  await theSpot.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
