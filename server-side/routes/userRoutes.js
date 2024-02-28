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

router.get("/:userId/:templateId/template", authJwt.verifyToken, usersController.getUserTemplate);
router.get("/:userId/:requestId/request", authJwt.verifyToken, usersController.getUserRequest);

router.get("/:userId/alltemplates", authJwt.verifyToken, usersController.getAllUserTemplates);
router.get("/:userId/allrequests", authJwt.verifyToken, usersController.getAllUserRequests);


/**
 * 
 *router.route("/:id").get(verifyToken, usersController.getUser);
  router.route("/:id/templates").get(verifyToken, usersController.getUser);
  router.route("/:id/requests").get(verifyToken, usersController.getUser);
 */
module.exports = router;
