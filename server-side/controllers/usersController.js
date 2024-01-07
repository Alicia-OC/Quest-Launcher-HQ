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
          creationDate,
        }) => {
          return {
            _id,
            creationDate,
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
  const { fullName, username, password, email, creationDate, title } = req.body;

  if (
    !fullName ||
    !username ||
    !password ||
    !title ||
    !email ||
    !creationDate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for username duplicatedUsername

  const duplicatedUsername = await User.findOne({ username }).lean().exec();
  const duplicatedEmail = await User.findOne({ email }).lean().exec();

  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.

  if (duplicatedUsername || duplicatedEmail) {
    return res.status(409).json({
      message: "duplicated username or email, please choose a different one",
    });
  }
  const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds

  const userObject = {
    creationDate: creationDate,
    fullName: fullName,
    username: username,
    email: email,
    password: hashedPwd,
    title: title,
  };

  const newUser = await User.create(userObject);

  if (newUser) {
    console.log(newUser);
    res.status(201).json({
      message: `New user ${username} with title ${title} has been succesfully created!`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
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

    const token = jwt.sign({ id: user._id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
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
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
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
