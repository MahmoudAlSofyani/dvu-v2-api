const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  searchAnnouncements,
  createAnnouncement,
  updateAnnouncementByUid,
  deleteAnnouncements,
  getAllAnnouncements,
  getAnnouncementByUid,
} = require("../controllers/announcements");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { announcementsValidator } = require("../validators/announcements");
const { _public, _protected } = require("../middlewares/roles");

router.get("/", verifyToken, permittedRoles(..._public), getAllAnnouncements);
router.get(
  "/:uid",
  verifyToken,
  permittedRoles(..._public),
  getAnnouncementByUid
);

router.post(
  "/search",
  verifyToken,
  permittedRoles(..._public),
  searchAnnouncements
);
router.post(
  "/",
  singleImage,
  verifyToken,
  permittedRoles(..._protected),
  announcementsValidator("create"),
  processValidationError,
  createAnnouncement
);
router.patch(
  "/:uid",
  singleImage,
  verifyToken,
  permittedRoles(..._protected),
  announcementsValidator("update"),
  processValidationError,
  updateAnnouncementByUid
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._protected),
  announcementsValidator("delete"),
  processValidationError,
  deleteAnnouncements
);

module.exports = router;
