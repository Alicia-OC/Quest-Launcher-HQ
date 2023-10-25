const express = require("express");
const router = express.Router();
const handoffController = require("../controllers/handoffController");

router
  .route("/")
  .get(handoffController.getAllHandoff)
  .post(handoffController.createNewHandoff);

module.exports = router;
