const express = require("express");
const { singleImage, multipleImage } = require("../controllers/file");
const {
  searchAdvertisements,
  createAdvertisement,
  updateAdvertisementByCode,
  deleteAdvertisement,
} = require("../controllers/advertisements");
const router = express.Router();
const { verifyAdminToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { advertisementsValidator } = require("../validators/advertisements");

router.post("/search", verifyAdminToken, searchAdvertisements);
router.post(
  "/",
  multipleImage,
  verifyAdminToken,
  advertisementsValidator("create"),
  processValidationError,
  createAdvertisement
);
router.patch(
  "/:code",
  multipleImage,
  verifyAdminToken,
  advertisementsValidator("update"),
  processValidationError,
  updateAdvertisementByCode
);

router.delete(
  "/",
  verifyAdminToken,
  advertisementsValidator("delete"),
  processValidationError,
  deleteAdvertisement
);

module.exports = router;
