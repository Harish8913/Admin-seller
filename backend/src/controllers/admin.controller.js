const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const admin = await User.findOne({
      email,
      role: "ADMIN",
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(admin);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: admin.role,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createSeller = async (req, res) => {
  try {
    const { name, email, mobile, country, state, skills, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      return res.status(409).json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    const seller = await User.create({
      name,
      email,
      mobile,
      country,
      state,
      skills,
      password,
      role: "SELLER",
    });

    res.status(201).json({
      success: true,
      message: "Seller created successfully",
      data: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        mobile: seller.mobile,
        country: seller.country,
        state: seller.state,
        skills: seller.skills,
        role: seller.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSellers = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const skip = (page - 1) * limit;

    const totalRecords = await User.countDocuments({
      role: "SELLER",
    });

    const sellers = await User.find({
      role: "SELLER",
    })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data: sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  createSeller,
  getSellers,
};
