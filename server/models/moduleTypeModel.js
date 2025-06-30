const mongoose = require("mongoose");

const moduleTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a Module type name"],
    trim: true,
  },
  label: {
    type: String,
    required: [true, "Please enter a Module type label"],
    trim: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updatedAt: {
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


const defaultModuleTypes = [
  { name: "certificate", label: "Certificate" },
  { name: "education", label: "Education" },
  { name: "experience", label: "Experience" },
  { name: "project", label: "Project" },
];

moduleTypeSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});


const ModuleType = mongoose.model("ModuleType", moduleTypeSchema);

module.exports = ModuleType;
