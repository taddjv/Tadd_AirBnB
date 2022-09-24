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

//! Get all bookings owned by the Current User
router.get("/current", restoreUser, async (req, res) => {
  const { id } = req.user;
  const bookings = await Booking.findAll({
    where: {
      userId: id,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description", "avgRating", "createdAt", "updatedAt"],
      },
    },
  });

  res.json(bookings);
});

//! edit a booking based on spot's id
router.put(
  "/:bookingId",
  restoreUser,
  validateBooking,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const desiredStart = new Date(req.body.startDate);
    const desiredEnd = new Date(req.body.endDate);
    const today = new Date();

    const theBooking = await Booking.findOne({
      where: {
        id: req.params.bookingId,
      },
    });

    if (!theBooking) {
      const err = new Error("Booking couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (theBooking.userId !== req.user.id) {
      const err = new Error(
        "Only the owner of the booking is authorized to edit this booking"
      );
      err.status = 403;
      return next(err);
    }

    if (theBooking.endDate < today) {
      const err = new Error("Past bookings can't be modified");
      err.status = 403;
    }

    if (
      !dateChecker(
        theBooking.startDate,
        theBooking.startDate,
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

    theBooking.update({
      startDate: desiredStart,
      endDate: desiredEnd,
    });
    res.json(theBooking);
  }
);

//! delete a booking based on spot's id
router.delete("/:bookingId", restoreUser, async (req, res, next) => {
  const today = new Date();

  const theBooking = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });

  if (!theBooking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (theBooking.userId !== req.user.id) {
    const err = new Error(
      "Only the owner of the booking is authorized to delete this booking"
    );
    err.status = 403;
    return next(err);
  }

  if (theBooking.startDate < today) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
  }

  await theBooking.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
