const express = require("express");
const router = express.Router();
const greetingsController = require("../controllers/greetingsController");

router
  .route("/")
  .get(greetingsController.getAllGreetings)
  .delete(greetingsController.deleteGreeting);

module.exports = router;