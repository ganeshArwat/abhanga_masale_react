const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    active: {
      type: Boolean,
      default: true,
      select: false, // hidden by default
    },
  },
  { timestamps: true }
);

// Auto-create slug from name
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Filter out inactive categories globally
categorySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
