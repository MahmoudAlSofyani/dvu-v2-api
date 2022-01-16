const express = require("express");
const {
  searchEvents,
  createEvent,
  updateEventByUid,
  deleteEvents,
  handleMemberRegisterToEvent,
  getAllEvents,
  getEventByUid,
} = require("../controllers/events");
const { singleImage } = require("../controllers/file");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const { _public, _protected } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { eventsValidator } = require("../validators/events");

router.get("/:uid", verifyToken, permittedRoles(_public), getEventByUid);
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
  "/:uid",
  verifyToken,
  permittedRoles(_protected),
  eventsValidator("update"),
  processValidationError,
  updateEventByUid
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
