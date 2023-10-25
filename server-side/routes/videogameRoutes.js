const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router
  .route("/")
  .get(gamesController.getAllGames)
  .post(gamesController.createnewGame)

module.exports = router;