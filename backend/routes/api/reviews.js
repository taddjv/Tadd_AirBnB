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

//! Add an Image to a review based on the review's id
router.post("/:reviewId/images", restoreUser, async (req, res, next) => {
  const theReview = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
    include: {
      model: Image,
    },
  });
  if (!theReview.dataValues.id) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (theReview.Images.length) {
    let numOfImages = theReview.Images[0].dataValues.imageCount;
    if (numOfImages > 9) {
      const err = new Error(
        "Maximum number of images for this resource was reached"
      );
      err.status = 403;
      return next(err);
    }
  }

  if (theReview.userId !== req.user.id) {
    const err = new Error(
      "Only the owner of the spot is authorized to add an image"
    );
    err.status = 403;
    return next(err);
  }

  const theImage = await Image.create({
    imageableId: theReview.id,
    imageableType: "Review",
    url: req.body.url,
    userId: req.user.id,
  });

  const newImage = await Image.findByPk(theImage.id);
  res.json(newImage);
});

//! Get all Reviews owned by the Current User
router.get("/current", restoreUser, async (req, res) => {
  const { id } = req.user;
  const reviews = await Review.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Spot,
        attributes: {
          exclude: [
            "description",
            "avgRating",
            "previewImage",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      {
        model: Image,
      },
    ],
  });

  res.json(reviews);
});

// //! edit a review based on review's id
router.put(
  "/:reviewId",
  restoreUser,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const theReview = await Review.findOne({
      where: {
        id: req.params.reviewId,
      },
    });
    if (!theReview) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (theReview.userId !== req.user.id) {
      const err = new Error(
        "Only the owner of the review is authorized to edit this review"
      );
      err.status = 403;
      return next(err);
    }
    theReview.update({
      review,
      stars,
    });
    res.json(theReview);
  }
);

//! delete a review based on review's id
router.delete("/:reviewId", restoreUser, async (req, res, next) => {
  const theReview = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
  });

  if (!theReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theReview.userId !== req.user.id) {
    const err = new Error(
      "Only the owner of the review is authorized to delete this review"
    );
    err.status = 403;
    return next(err);
  }
  await theReview.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
