const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authJwt = require("../middlewares/authJwt");
const authControllers = require("../controllers/auth");


router.route("/login").post(authControllers.login);
router.route("/signup").post(authControllers.register);


router.route("/api/test/all").get(usersController.allAccess);

module.exports = router;
