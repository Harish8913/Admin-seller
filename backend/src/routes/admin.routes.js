const express = require("express");

const router = express.Router();

const {
  adminLogin,
  createSeller,
  getSellers
} = require("../controllers/admin.controller");

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/role");

const {
  createSellerValidation,
} = require("../validations/admin.validations");

router.post("/login", adminLogin);

router.post(
  "/seller",
  auth,
  authorize("ADMIN"),
  createSellerValidation,
  createSeller
);

router.get(
  "/sellers",
  auth,
  authorize("ADMIN"),
  getSellers
);

module.exports = router;