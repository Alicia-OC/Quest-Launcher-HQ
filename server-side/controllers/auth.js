const UserSchema = require("../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = UserSchema.User;
const config = require("../config/auth.config.js");

const register = asyncHandler(async (req, res) => {
  try {
    const { fullName, password, username, email, title } = req.body;

    const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds
    const duplicatedEmail = await User.findOne({ email }).lean().exec();

    if (duplicatedEmail) {
      return res.status(409).json({
        message: "duplicated email, please choose a different one",
      });
    }

    const userObject = {
      fullName: fullName,
      email: email,
      username: username,
      password: hashedPwd,
      title: title,
    };
    const newUser = await User.create(userObject);

    if (newUser) {
      res.status(200).json({
        message: `New user with title ${title} has been succesfully created!`,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        accessToken: null,
        msg: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 3600, // 1 hour
    });
    delete user.password; //make sure the pw isn't sent to the frontend for security

    let authorities = "ROLE_" + user.role.toUpperCase();
    res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  register,
  login,
};
