const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templatesController");
const authJwt = require("../middlewares/authJwt");


router
  .route("/")
  .get(templateController.getAllTemplates)
  .post(templateController.createTemplate)
  .patch(templateController.updateTemplate)
  .delete(templateController.deleteTemplate);

router.patch("/:id", templateController.starTemplate);

router.get("/:userId/alltemplates", authJwt.verifyToken, templateController.getUserTemplates);
//router.get("/:userId/allrequests", authJwt.verifyToken, templateController.getAllUserRequests);

module.exports = router;
