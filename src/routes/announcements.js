const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  searchAnnouncements,
  createAnnouncement,
  updateAnnouncementByCode,
  deleteAnnouncements,
  getAllAnnouncements,
  getAnnouncementByCode,
} = require("../controllers/announcements");
const router = express.Router();
const { verifyAdminToken, verifyMemberToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { announcementsValidator } = require("../validators/announcements");

router.get("/", verifyMemberToken, getAllAnnouncements);
router.get("/:code", verifyMemberToken, getAnnouncementByCode);

router.post("/search", verifyAdminToken, searchAnnouncements);
router.post(
  "/",
  singleImage,
  verifyAdminToken,
  announcementsValidator("create"),
  processValidationError,
  createAnnouncement
);
router.patch(
  "/:code",
  singleImage,
  verifyAdminToken,
  announcementsValidator("update"),
  processValidationError,
  updateAnnouncementByCode
);

router.delete(
  "/",
  verifyAdminToken,
  announcementsValidator("delete"),
  processValidationError,
  deleteAnnouncements
);

module.exports = router;
