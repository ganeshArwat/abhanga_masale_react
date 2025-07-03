const factory = require("./handlerFactory");
const Cart = require("./../models/cartModel");


exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.status(200).json({ status: "success", data: cart || { items: [] } });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [{ product: productId, quantity }] });
  } else {
    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index >= 0) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json({ status: "success", data: cart });
};

// controllers/cartController.js
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const pid = req.params.pid;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === pid
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.status(200).json({
      status: "success",
      data: { items: populatedCart.items },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeFromCart = async (req, res) => {
  const pid = req.params.pid;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: pid } } },
    { new: true }
  ).populate("items.product");

  if (!cart) return res.status(404).json({ error: "Cart not found" });

  res.status(200).json({ status: "success", data: { items: cart.items } });
};