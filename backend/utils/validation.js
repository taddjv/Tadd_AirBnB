const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Validation Error";
    next(err);
  }
  next();
};

const dateChecker = (
  start_date_booked,
  end_date_booked,
  start_date_desired,
  end_date_desired
) => {
  if (start_date_desired >= start_date_booked) {
    if (start_date_desired <= end_date_booked) {
      return false;
    }
  }
  if (end_date_desired <= end_date_booked) {
    if (end_date_desired >= start_date_booked) {
      return false;
    }
  }
  return true;
};

module.exports = {
  handleValidationErrors,
  dateChecker,
};
