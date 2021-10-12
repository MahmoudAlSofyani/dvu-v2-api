const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  searchSponsors,
  createSponsor,
  updateSponsorByCode,
  deleteSponsors,
} = require("../controllers/sponsors");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const { _protected, _public } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { sponsorsValidator } = require("../validators/sponsors");

router.post("/search", verifyToken, permittedRoles(..._public), searchSponsors);
router.post(
  "/",
  singleImage,
  verifyToken,
  permittedRoles(..._protected),
  sponsorsValidator("create"),
  processValidationError,
  createSponsor
);
router.patch(
  "/:code",
  singleImage,
  verifyToken,
  permittedRoles(..._protected),
  sponsorsValidator("update"),
  processValidationError,
  updateSponsorByCode
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._protected),
  sponsorsValidator("delete"),
  processValidationError,
  deleteSponsors
);

module.exports = router;
