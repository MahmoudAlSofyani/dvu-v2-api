const express = require("express");
const { multipleImage } = require("../controllers/file");
const {
  searchAdvertisements,
  createAdvertisement,
  updateAdvertismentByUid,
  deleteAdvertisement,
  getAllVerifiedAdvertisments,
  getAdvertismentByUid,
  markAdvertismentAsSold,
} = require("../controllers/advertisements");
const { verifyToken, permittedRoles } = require("../middlewares/index");
const router = express.Router();
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { advertisementsValidator } = require("../validators/advertisements");
const { _ADMIN, _GENERAL, _VIP } = require("../middlewares/roles");

// ADMIN AUTHENTICATED ROUTES
/**
 * POST Search advertisments        [*]
 * DELETE Bulk delete advertisments [*]
 */

router.post(
  "/search",
  verifyToken,
  permittedRoles(..._ADMIN),
  searchAdvertisements
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._ADMIN),
  advertisementsValidator("delete"),
  processValidationError,
  deleteAdvertisement
);

// AUTHENTICATED ACCESS ROUTES
/**
 * GET all advertisments - VERIFIED            [*]
 * GET Advertismeent by uid                    [*]
 * PATCH update advertisment by uid            [*]
 * POST Create advertisment                    [*]
 * PATCH Mark as sold                          [*]
 */

router.get(
  "/:uid",
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP, ..._ADMIN),
  getAdvertismentByUid
);

router.get(
  "/",
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP, ..._ADMIN),
  getAllVerifiedAdvertisments
);

router.post(
  "/",
  multipleImage,
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP, ..._ADMIN),
  advertisementsValidator("create"),
  processValidationError,
  createAdvertisement
);

router.patch(
  "/sold/:uid",
  verifyToken,
  permittedRoles(..._GENERAL, ..._ADMIN, ..._VIP),
  markAdvertismentAsSold
);

router.patch(
  "/:uid",
  multipleImage,
  verifyToken,
  permittedRoles(..._GENERAL, ..._ADMIN, ..._VIP),
  advertisementsValidator("update"),
  processValidationError,
  updateAdvertismentByUid
);

module.exports = router;
