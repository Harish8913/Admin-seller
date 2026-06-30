const { body, validationResult } = require("express-validator");

const createSellerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits")
    .isNumeric()
    .withMessage("Mobile number must contain only digits"),

  body("country")
    .notEmpty()
    .withMessage("Country is required"),

  body("state")
    .notEmpty()
    .withMessage("State is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with at least one skill"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  createSellerValidation,
};