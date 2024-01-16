const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authJwt = require("../middlewares/authJwt");
const authControllers = require("../controllers/auth");


router.route("/").post(authControllers.login);

router.route("/api/test/all").get(usersController.allAccess);
router
  .route("/api/test/user")
  .get([authJwt.verifyToken], usersController.userBoard);
router
  .route("/api/test/mod")
  .get([authJwt.verifyToken, authJwt.isModerator], usersController.adminBoard);
router
  .route("/api/test/admin")
  .get([authJwt.verifyToken, authJwt.isAdmin], usersController.moderatorBoard);

module.exports = router;
