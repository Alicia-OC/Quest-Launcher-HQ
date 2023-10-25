const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templatesController");

router
  .route("/")
  .get(templateController.getAllTemplates)
  .post(templateController.createTemplate)
  .patch(templateController.updateTemplate)
  .delete(templateController.deleteTemplate);

module.exports = router;
