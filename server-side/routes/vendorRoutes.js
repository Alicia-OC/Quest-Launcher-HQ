const express = require("express");
const router = express.Router();
const vendorsController = require("../controllers/vendorsController");

router
  .route("/")
  .get(vendorsController.getAllVendors)
  .post(vendorsController.createNewVendor)
  .patch(vendorsController.updateVendor)
  .delete(vendorsController.deleteVendor);

module.exports = router;
