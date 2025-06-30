const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/getUser/:id", userController.getUserById);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadProfileMedia,
  userController.resizeProfileImage,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
