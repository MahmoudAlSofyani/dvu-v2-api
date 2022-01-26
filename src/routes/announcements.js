const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  searchAnnouncements,
  createAnnouncement,
  updateAnnouncementByUid,
  deleteAnnouncements,
  getAllAnnouncements,
  getAnnouncementByUid,
  handleAnnouncementsVisibility,
} = require("../controllers/announcements");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { announcementsValidator } = require("../validators/announcements");
const { _ADMIN, _GENERAL, _VIP } = require("../middlewares/roles");

// ADMIN AUTHENTICATED ROUTES
/**
 * POST Create announcements            [*]
 * PATCH Edit annoumcements             [*]
 * DELETE bulk delete announcements     [*]
 * POST Search announcements            [*]
 */

router.post(
  "/",
  singleImage,
  verifyToken,
  permittedRoles(..._ADMIN),
  announcementsValidator("create"),
  processValidationError,
  createAnnouncement
);

router.patch(
  "/:uid",
  singleImage,
  verifyToken,
  permittedRoles(..._ADMIN),
  announcementsValidator("update"),
  processValidationError,
  updateAnnouncementByUid
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._ADMIN),
  announcementsValidator("delete"),
  processValidationError,
  deleteAnnouncements
);

router.post(
  "/search",
  verifyToken,
  permittedRoles(..._ADMIN),
  searchAnnouncements
);

router.patch(
  "/visibility/:uid",
  verifyToken,
  permittedRoles(..._ADMIN),
  handleAnnouncementsVisibility
);

// AUTHENTICATED ACCESS ROUTES
/**
 * GET all announcments                 [*]
 * GET announcement by uid              [*]
 */

router.get(
  "/",
  verifyToken,
  permittedRoles(..._ADMIN, ..._GENERAL, ..._VIP),
  getAllAnnouncements
);
router.get(
  "/:uid",
  verifyToken,
  permittedRoles(..._ADMIN, ..._GENERAL, ..._VIP),
  getAnnouncementByUid
);

module.exports = router;
