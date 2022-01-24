const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    console.log(Error);
    throw new Error("User already exists");
  } else {
    const Users = await User.create({
      name,
      email,
      password,
    });
    if (Users) {
      res.status(201).json({
        _id: Users.id,
        name: Users.name,
        email: Users.email,
        isAdmin: Users.isAdmin,
        token: generateToken(Users.id),
      });
    } else {
      res.status(400);
      console.log(Error);
      throw new Error("Error Occured!");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Users = await User.findOne({ email });

  if (Users && (await Users.matchPassword(password))) {
    res.json({ Users, token: generateToken(Users.id) });
  } else {
    res.status(401);
    console.log(Error);
    throw new Error("Invalid Email or Password!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    console.log(Error);
    throw new Error("User not found!");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
