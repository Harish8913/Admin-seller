const { body, validationResult } = require("express-validator");

const addProductValidation = [

  body("productName")
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("brands")
    .notEmpty()
    .withMessage("Brands are required"),

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
  addProductValidation,
};