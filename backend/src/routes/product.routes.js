const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/role");
const upload = require("../middlewares/upload");

const { addProduct, getProducts, deleteProduct, viewProductPDF } = require("../controllers/product.controller");

router.post(
  "/",
  auth,
  authorize("SELLER"),
  upload.array("images", 10),
  addProduct
);

router.get(
  "/",
  auth,
  authorize("SELLER"),
  getProducts
);

router.delete(
  "/:id",
  auth,
  authorize("SELLER"),
  deleteProduct
);

router.get(
    "/:id/pdf",
    auth,
    authorize("SELLER"),
    viewProductPDF
);

module.exports = router;