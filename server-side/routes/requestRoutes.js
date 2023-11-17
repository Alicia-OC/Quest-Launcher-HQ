const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router
  .route("/")
  .get(requestController.getAllRequest)
  .post(requestController.createNewRequest);

module.exports = router;
