const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },

  filename: (req, file, cb) => {

    const extension = path.extname(file.originalname);

    cb(null, uuid() + extension);

  },
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }

};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;