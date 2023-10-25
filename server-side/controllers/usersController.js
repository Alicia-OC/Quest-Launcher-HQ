const User = require("../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");


const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for username duplicate

  const duplicate = await User.findOne({ username }).lean().exec();
  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate nickname" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {});

// @desc Update a user
// @route PATCH /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};
