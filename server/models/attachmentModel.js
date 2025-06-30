const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    trim: true,
  },
  file: {
    type: String,
    required: [true, "File is required"],
  },
  description: String,
  module_type: {
    type: String, // [1-certificate, 2-education, 3-experience, 4-project]
    required: [true, "Module type is required"],
    select: false,
  },
  module_id: {
    type: String,
    required: [true, "Moudle id is required"],
    select: false,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Attachment must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

attachmentSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
