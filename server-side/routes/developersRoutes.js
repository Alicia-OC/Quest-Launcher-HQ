const express = require("express");
const router = express.Router();
const developersController = require("../controllers/developersController");

router
  .route("/")
  .get(developersController.getAllDevelopers)
  .post(developersController.createnewDeveloper)

module.exports = router;
