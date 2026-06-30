require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(async () => {
    try {
      const adminExists = await User.findOne({
        email: "admin@gmail.com",
      });

      if (adminExists) {
        console.log("Admin already exists.");
        process.exit();
      }

      const admin = new User({
        name: "Admin",
        email: "admin@gmail.com",
        mobile: "9999999999",
        country: "India",
        state: "Maharashtra",
        skills: [],
        password: "Admin@123",
        role: "ADMIN",
      });

      await admin.save();

      console.log("Admin Created Successfully");
      process.exit();
    } catch (err) {
      console.log(err);
      process.exit();
    }
  })
  .catch(console.error);