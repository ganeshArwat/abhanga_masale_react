const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Setup multer to use memory storage
const multerStorage = multer.memoryStorage();

// Allow only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image file.", 400), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// 🟢 Export middleware for single image upload field 'image'
exports.uploadProductImage = upload.single("image");

// 🟢 Resize and save product image
exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `product-${Date.now()}.jpeg`;
   req.body.image = `client_media/products/${filename}`;

  await sharp(req.file.buffer)
    .resize(800, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, "../public/client_media/products/", filename));

  next();
});

// 🟢 Factory CRUD exports
exports.createProduct = factory.createOne(Product);
exports.getAllProducts = factory.getAll(Product, false, 0, "category");
exports.getProduct = factory.getOne(Product, 0, "category");
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
