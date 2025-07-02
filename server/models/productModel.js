const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
      default: "/assets/img/product.jpg", // Default fallback image
      required: false,
    },

    description: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: [true, "Current price is required"],
    },

    oldPrice: {
      type: Number,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: String, // e.g., "9.2k"
      default: "0",
    },

    sold: {
      type: String, // e.g., "10k"
      default: "0",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

// ✅ Auto-generate slug on create
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// ✅ Auto-update slug on update
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
    this.setUpdate(update);
  }
  next();
});

// ✅ Hide inactive products by default
productSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
