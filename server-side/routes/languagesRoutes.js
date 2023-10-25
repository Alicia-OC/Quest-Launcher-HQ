const express = require("express");
const router = express.Router();
const languagesController = require("../controllers/languagesController");

router
  .route("/")
  .get(languagesController.getAllLanguages)
  .post(languagesController.createNewLanguage)
  //.delete(vendorsController.deleteVendor);

module.exports = router;
