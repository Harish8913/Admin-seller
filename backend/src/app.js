const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const adminRoutes = require("./routes/admin.routes");
const sellerRoutes = require("./routes/seller.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running Successfully"
    });
});

module.exports = app;