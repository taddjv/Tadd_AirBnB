const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email").isEmail().withMessage("Invalid email"),
  check("email").exists({ checkFalsy: true }).withMessage("Email is required"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("username")
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

router.get("/", async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  const token = await setTokenCookie(res, user);
  return res.json({
    user,
    password,
    token,
  });
});

module.exports = router;
