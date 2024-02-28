const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const authJwt = require("../middlewares/authJwt");

router
  .route("/")
  .get(requestController.getAllRequest)
  .post(requestController.createNewRequest);

router.get(
  "/:userId/allrequests",
  authJwt.verifyToken,
  requestController.getUserRequests
);

module.exports = router;
