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

//! Get all Reviews owned by the Current User
router.get("/current", restoreUser, async (req, res) => {
  const { id } = req.user;
  const reviews = await Review.findAll({
    where: {
      userId: id,
    },
  });

  res.json(reviews);
});

module.exports = router;
