const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const UserSchema = require("../models/Users");
const RoleSchema = require("../models/Role");

let User = UserSchema.User;
let Role = RoleSchema.Role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
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
  isModerator
};
module.exports = authJwt;