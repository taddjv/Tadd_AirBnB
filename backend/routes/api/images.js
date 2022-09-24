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

//! delete an image
router.delete("/:imageId", restoreUser, async (req, res, next) => {
  const theImage = await Image.findOne({
    where: {
      id: req.params.imageId,
    },
  });

  if (!theImage) {
    const err = new Error("Image couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theImage.userId !== req.user.id) {
    const err = new Error(
      "Only the owner of the image is authorized to delete this image"
    );
    err.status = 403;
    return next(err);
  }

  await theImage.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
