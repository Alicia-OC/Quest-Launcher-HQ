const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const UserSchema = require("../models/Users");
const RoleSchema = require("../models/Role");

let User = UserSchema.User;
let Role = RoleSchema.Role;

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["Authorization"];
    if (!token) {
      return res.status(403).send({ message: "Access Denied" });
    }
    if (token.startsWith("Bearer")) {
      // we want the token to start with 'Bearer ' which will be set in the frontend
      token = token.slice(7, token.lench).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "Admin") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Requires Admin Role" });
      return;
    }
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "Moderator") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Requires Moderator Role" });
      return;
    }
  });
};

isUser = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "User") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Requires User Role" });
      return;
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isUser,
  isModerator,
};
module.exports = { verifyToken, isAdmin, isUser, isModerator };
