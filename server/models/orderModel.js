const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  shippingInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Processing", // or "Confirmed", "Shipped", "Delivered"
  },
});

// Auto-generate orderId before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString().slice(-6); // last 6 digits of timestamp
    const random = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
    this.orderId = `ORD${timestamp}${random}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
