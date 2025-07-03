const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.placeOrder = async (req, res) => {
  try {
    const { shippingInfo, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ status: "fail", message: "No items in order." });
    }

    // Calculate total price using product data
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;

    const validatedItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.product);
      const price = product?.currentPrice || 0;
      totalAmount += price * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: req.user.id,
      items: validatedItems,
      shippingInfo,
      totalAmount,
    });

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error while placing order" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.status(200).json({ status: "success", orders });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to fetch orders" });
  }
};


exports.getOrderByOrderId = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId })
    .populate("items.product", "name image currentPrice") // populate product fields
    .populate("user", "fname email");

  if (!order) {
    return res.status(404).json({ status: "fail", message: "Order not found" });
  }

  const response = {
    id: order.orderId,
    date: order.placedAt,
    status: order.status,
    total: order.totalAmount,
    shipping: order.shippingInfo,
    items: order.items.map((item) => ({
      name: item.product.name,
      image: item.product.image,
      price: item.product.currentPrice,
      quantity: item.quantity,
    })),
  };

  res.status(200).json({
    status: "success",
    order: response,
  });
};