const express = require("express");
const router = express.Router();
const templatesController = require("../controllers/templatesController");
const authJwt = require("../middlewares/authJwt");


router
  .route("/")
  .get(templatesController.getAllTemplates)
  .post(templatesController.createTemplate)
  .patch(templatesController.updateTemplate)
  .delete(templatesController.deleteTemplate);

router.patch("/:id", authJwt.verifyToken, templatesController.updateTemplate);

router.get("/:userId/allTemplates", authJwt.verifyToken, templatesController.getUserTemplates);
router.get("/:userId/favTemplates", authJwt.verifyToken, templatesController.getUserFavTemplates);
router.get("/:userId/:templateId", authJwt.verifyToken, templatesController.getOneTemplate);

module.exports = router;
