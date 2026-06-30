const Product = require("../models/Product");
const generatePDF = require("../utils/generatePdf");

const addProduct = async (req, res) => {
  try {
    const { productName, description } = req.body;

    if (!req.body.brands) {
      return res.status(400).json({
        success: false,
        message: "Brands are required",
      });
    }

    const brands = JSON.parse(req.body.brands);

    if (!Array.isArray(brands) || brands.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one brand is required",
      });
    }

    if (!req.files || req.files.length !== brands.length) {
      return res.status(400).json({
        success: false,
        message: "Each brand must have one image",
      });
    }

    const brandData = brands.map((brand, index) => ({
      brandName: brand.brandName,
      detail: brand.detail,
      price: Number(brand.price),
      image: `uploads/products/${req.files[index].filename}`,
    }));

    const totalPrice = brandData.reduce((sum, brand) => sum + brand.price, 0);

    const product = await Product.create({
      sellerId: req.user._id,
      productName,
      description,
      brands: brandData,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const skip = (page - 1) * limit;

    const totalRecords = await Product.countDocuments({
      sellerId: req.user._id,
    });

    const products = await Product.find({
      sellerId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        success:false,
        message:"Product not found"
      });

    }

    if (product.sellerId.toString() !== req.user._id.toString()) {

      return res.status(403).json({
        success:false,
        message:"Unauthorized"
      });

    }

    await product.deleteOne();

    res.status(200).json({
      success:true,
      message:"Product deleted successfully"
    });

  } catch(error){

      res.status(500).json({
        success:false,
        message:error.message
      });

  }

};

const viewProductPDF = async (req,res)=>{

    try{

        const product = await Product.findById(req.params.id);

        if(!product){

            return res.status(404).json({
                success:false,
                message:"Product not found"
            });

        }

        if(product.sellerId.toString()!==req.user._id.toString()){

            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            });

        }

        generatePDF(product,res);

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  viewProductPDF
};
