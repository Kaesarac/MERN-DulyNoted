const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const Users = User.create({
      name,
      email,
      password,
      pic,
    });
    if (Users) {
      res.status(201).json({
        _id: Users._id,
        name: Users.name,
        email: Users.email,
        isAdmin: Users.isAdmin,
        pic: Users.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Users = await User.findOne({ email });

  if (Users && (await Users.matchPassword(password))) {
    res.json({ Users, token: generateToken(User._id) });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

module.exports = { registerUser, authUser };
