const express = require("express");
const {
  searchEvents,
  createEvent,
  updateEventByCode,
  deleteEvents,
  handleMemberRegisterToEvent,
  getAllEvents,
  getEventByCode,
} = require("../controllers/events");
const { singleImage } = require("../controllers/file");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const { _public, _protected } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { eventsValidator } = require("../validators/events");

router.get("/:code", verifyToken, permittedRoles(_public), getEventByCode);
router.get("/", verifyToken, permittedRoles(_public), getAllEvents);
router.post(
  "/register",
  verifyToken,
  permittedRoles(_public),
  handleMemberRegisterToEvent
);
router.post("/search", permittedRoles(_public), searchEvents);
router.post(
  "/",
  verifyToken,
  permittedRoles(_protected),
  eventsValidator("create"),
  processValidationError,
  createEvent
);
router.patch(
  "/:code",
  verifyToken,
  permittedRoles(_protected),
  eventsValidator("update"),
  processValidationError,
  updateEventByCode
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(_protected),
  eventsValidator("delete"),
  processValidationError,
  deleteEvents
);

module.exports = router;
