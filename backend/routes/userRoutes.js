const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { Protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/profile", function (req, res) {
  Protect, updateUserProfile(req, res);
});

module.exports = router;
