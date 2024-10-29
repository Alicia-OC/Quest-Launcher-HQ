const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");
const authJwt = require("../middlewares/authJwt");

router
  .route("/")
  .get(gamesController.getAllGames)
  .post(gamesController.createnewGame);
router.get("/:gameTitle", gamesController.getOneGame);

module.exports = router;
