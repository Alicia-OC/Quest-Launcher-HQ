const express = require("express");
const router = express.Router();
const vendorsController = require("../controllers/vendorsController");
const authJwt = require("../middlewares/authJwt");

router
  .route("/")
  .get(vendorsController.getAllVendors)
  .post(vendorsController.createNewVendor)
  .patch(vendorsController.updateVendor)
  .delete(vendorsController.deleteVendor);
  router.get('/:language', authJwt.verifyToken, vendorsController.getLanguageBasedVendors)

module.exports = router;
