const express = require("express");
const { singleImage, multipleImage } = require("../controllers/file");
const {
  searchAdvertisements,
  createAdvertisement,
  updateAdvertismentByUid,
  deleteAdvertisement,
} = require("../controllers/advertisements");
const { verifyToken, permittedRoles } = require("../middlewares/index");
const router = express.Router();
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { advertisementsValidator } = require("../validators/advertisements");
const { _public, _protected } = require("../middlewares/roles");

router.post(
  "/search",
  verifyToken,
  permittedRoles(..._public),
  searchAdvertisements
);
router.post(
  "/",
  multipleImage,
  verifyToken,
  permittedRoles(..._protected),
  advertisementsValidator("create"),
  processValidationError,
  createAdvertisement
);
router.patch(
  "/:uid",
  multipleImage,
  verifyToken,
  permittedRoles(..._protected),
  advertisementsValidator("update"),
  processValidationError,
  updateAdvertismentByUid
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._protected),
  advertisementsValidator("delete"),
  processValidationError,
  deleteAdvertisement
);

module.exports = router;
