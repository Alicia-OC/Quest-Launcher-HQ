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

router.patch("/:id", authJwt.verifyToken, templateController.starTemplate);

router.get("/:userId/allTemplates", authJwt.verifyToken, templateController.getUserTemplates);
router.get("/:userId/favTemplates", authJwt.verifyToken, templateController.getUserFavTemplates);

module.exports = router;
