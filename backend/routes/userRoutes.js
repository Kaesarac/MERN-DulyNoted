const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { Protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", function (req, res) {
  registerUser();
});
router.post("/login", function (req, res) {
  authUser();
});
router.post("/profile", function (req, res) {
  Protect, updateUserProfile();
});

module.exports = router;
