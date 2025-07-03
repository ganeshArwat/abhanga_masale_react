const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getCart)
  .post(addToCart);

router.route("/:pid")
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;