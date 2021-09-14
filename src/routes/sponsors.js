const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  searchSponsors,
  createSponsor,
  updateSponsorByCode,
  deleteSponsors,
} = require("../controllers/sponsors");
const router = express.Router();
const { verifyAdminToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { sponsorsValidator } = require("../validators/sponsors");

router.post("/search", verifyAdminToken, searchSponsors);
router.post(
  "/",
  singleImage,
  verifyAdminToken,
  sponsorsValidator("create"),
  processValidationError,
  createSponsor
);
router.patch(
  "/:code",
  singleImage,
  verifyAdminToken,
  sponsorsValidator("update"),
  processValidationError,
  updateSponsorByCode
);

router.delete(
  "/",
  verifyAdminToken,
  sponsorsValidator("delete"),
  processValidationError,
  deleteSponsors
);

module.exports = router;
