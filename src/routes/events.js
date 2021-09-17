const express = require("express");
const {
  searchEvents,
  createEvent,
  updateEventByCode,
  deleteEvents,
  handleMemberRegisterToEvent,
} = require("../controllers/events");
const { singleImage } = require("../controllers/file");
const router = express.Router();
const { verifyAdminToken, verifyMemberToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { eventsValidator } = require("../validators/events");

router.post("/register", verifyMemberToken, handleMemberRegisterToEvent);
router.post("/search", verifyAdminToken, searchEvents);
router.post(
  "/",
  verifyAdminToken,
  eventsValidator("create"),
  processValidationError,
  createEvent
);
router.patch(
  "/:code",
  verifyAdminToken,
  eventsValidator("update"),
  processValidationError,
  updateEventByCode
);

router.delete(
  "/",
  verifyAdminToken,
  eventsValidator("delete"),
  processValidationError,
  deleteEvents
);

module.exports = router;
