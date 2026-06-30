const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const seller = await User.findOne({
      email,
      role: "SELLER",
    });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await seller.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(seller);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: seller.role,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  sellerLogin,
};