// routes/wishlistRoutes.js

const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.use(protect);

router.get("/", getWishlist);
router.post("/:productId", toggleWishlist); // toggle (add/remove)
router.delete("/:productId", removeFromWishlist); // delete

module.exports = router;
