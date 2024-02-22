const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authJwt = require("../middlewares/authJwt");

router
  .route("/")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

router.get("/:id", authJwt.verifyToken, usersController.getUser);

router.get("/:id/:id/template", authJwt.verifyToken, usersController.getUserTemplate);
router.get("/:id/:id/request", authJwt.verifyToken, usersController.getUserRequest);

router.get("/:id/alltemplates", authJwt.verifyToken, usersController.getAllUserTemplates);
router.get("/:id/allrequests", authJwt.verifyToken, usersController.getAllUserRequests);


/**
 * 
 *router.route("/:id").get(verifyToken, usersController.getUser);
  router.route("/:id/templates").get(verifyToken, usersController.getUser);
  router.route("/:id/requests").get(verifyToken, usersController.getUser);
 */
module.exports = router;
