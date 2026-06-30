const express = require("express");

const router = express.Router();

const { sellerLogin } = require("../controllers/seller.controller");

router.post("/login", sellerLogin);

module.exports = router;