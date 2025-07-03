const express = require("express");
const { placeOrder, getMyOrders, getOrderByOrderId } = require("../controllers/orderController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);
router.get("/", getMyOrders);
router.get("/:orderId", getOrderByOrderId);

module.exports = router;
