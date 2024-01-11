const UserSchema = require("../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = UserSchema.User;
const config = require("../config/auth.config.js");

const getUser = asyncHandler(async (req, res) => {
  try {
    User.find({}).then((data) => {
      const formattedUser = data.map(
        ({
          _id,
          fullName,
          username,
          email,
          role,
          active,
          requests,
          templates,
          title,
        }) => {
          return {
            _id,
            active,
            role,
            title,
            fullName,
            username,
            email,
            templates,
            requests,
          };
        }
      );
      res.status(200).json(formattedUser);
      return formattedUser;
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, username, password, email, title } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds
    const duplicatedUsername = await User.findOne({ username }).lean().exec();
    const duplicatedEmail = await User.findOne({ email }).lean().exec();

    if (duplicatedUsername || duplicatedEmail) {
      return res.status(409).json({
        message: "duplicated username or email, please choose a different one",
      });
    }

    const userObject = {
      fullName: fullName,
      username: username,
      email: email,
      password: hashedPwd,
      title: title,
    };
    const newUser = await User.create(userObject);

    if (newUser) {
      console.log(newUser);
      res.status(200).json({
        message: `New user ${username} with title ${title} has been succesfully created!`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  const { userId, reqId, templateId } = req.body;

  try {
    User.findById(userId).then((user) => {
      if (reqId) {
        user.requests.push(reqId);
      }
      if (templateId) {
        user.templates.push(templateId);
      }
      user.save();
      res.json({ message: `${user.username} requests updated` });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {});

const logUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ message: "User doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 3600, // 1 hour
    });

    let authorities = "ROLE_" + user.role.toUpperCase();
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const allAccess = (req, res) => {
  console.log("public");
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  console.log("user");

  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  console.log("admin");
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  console.log("moderator");
  res.status(200).send("Moderator Content.");
};

module.exports = {
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
  logUser,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
};
