const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  Booking,
  Spot,
  Image,
  Review,
  User,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const {
  handleValidationErrors,
  dateChecker,
} = require("../../utils/validation");

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
    .custom((a) => {
      if (a < 1) {
        return false;
      } else if (a > 5) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Stars must be an integer from 1 to 5"),
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  handleValidationErrors,
];

const validateBooking = [
  check("endDate", "startDate")
    .custom((a, b) => {
      const { startDate, endDate } = b.req.body;
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    .custom((a) => {
      if (a < 0) {
        return false;
      } else if (a > 10) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .custom((a) => {
      if (a < 0) {
        return false;
      } else if (a > 20) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Size must be greater than or equal to 0"),
];

//! get all bookings for a spot from spot id
router.get("/:spotId/bookings", restoreUser, async (req, res, next) => {
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
  if (req.user.id === theSpot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: {
        model: User,
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
    });
    res.json(bookings);
  } else {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: {
        exclude: ["id", "userId", "createdAt", "updatedAt"],
      },
    });
    res.json(bookings);
  }
});

//! create a booking based on spot id
router.post(
  "/:spotId/bookings",
  restoreUser,
  validateBooking,
  async (req, res, next) => {
    const desiredStart = new Date(req.body.startDate);
    const desiredEnd = new Date(req.body.endDate);

    const { id } = req.user;
    const { spotId } = req.params;

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
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });
    for (let i = 0; i < bookings.length; i++) {
      const booked = bookings[i];
      if (
        !dateChecker(
          booked.startDate,
          booked.startDate,
          desiredStart,
          desiredEnd
        )
      ) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.status = 403;
        return next(err);
      }
    }
    const newBooking = await Booking.create({
      spotId,
      userId: id,
      startDate: desiredStart,
      endDate: desiredEnd,
    });
    res.json(newBooking);
  }
);

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
  if (req.body.previewImage) {
    theSpot.update({
      previewImage: req.body.url,
    });
  }
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
//! Get all Reviews owned by the spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
      },
      {
        model: Image,
      },
    ],
  });
  if (!reviews.length) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  res.json(reviews);
});

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
    attributes: {
      exclude: ["avgRating", "previewImage"],
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
router.get("/", validateQuery, async (req, res) => {
  let { page, size } = req.query;
  page = page || 0;
  size = size || 20;
  const spots = await Spot.findAll({
    limit: page == 0 ? null : size,
    offset: page === 0 ? null : size * Math.abs(page - 1),
  });

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
  theSpot.update({
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
