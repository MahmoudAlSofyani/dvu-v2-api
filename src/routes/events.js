const express = require("express");
const {
  searchEvents,
  createEvent,
  updateEventByUid,
  deleteEvents,
  handleMemberRegisterToEvent,
  getEventByUid,
  getAllUpcomingEvents,
  handleEventVisibility,
} = require("../controllers/events");
const { singleImage } = require("../controllers/file");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const { _GENERAL, _ADMIN, _VIP } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { eventsValidator } = require("../validators/events");

// ADMIN AUTHENTICATED ROUTES
/**
 * POST Create event                [*]
 * PATCH update event by uid        [*]
 * DELETE bulk delete events by uid [*]
 * POST Search events               [*]
 */
router.post(
  "/",
  singleImage,
  verifyToken,
  permittedRoles(..._ADMIN),
  eventsValidator("create"),
  processValidationError,
  createEvent
);

router.patch(
  "/:uid",
  singleImage,
  verifyToken,
  permittedRoles(..._ADMIN),
  eventsValidator("update"),
  processValidationError,
  updateEventByUid
);

router.delete(
  "/",
  verifyToken,
  permittedRoles(..._ADMIN),
  eventsValidator("delete"),
  processValidationError,
  deleteEvents
);

router.post("/search", verifyToken, permittedRoles(..._ADMIN), searchEvents);

router.patch(
  "/visibility/:uid",
  verifyToken,
  permittedRoles(..._ADMIN),
  handleEventVisibility
);

// AUTHENTICATED ACCESS ROUTES
/**
 * GET All upcoming events          [*]
 * GET event by uid                 [*]
 * POST Register/unregister         [*]
 */

router.get(
  "/:uid",
  verifyToken,
  permittedRoles(..._GENERAL, ..._ADMIN, ..._VIP),
  getEventByUid
);
router.get(
  "/",
  verifyToken,
  permittedRoles(..._GENERAL, ..._ADMIN, ..._VIP),
  getAllUpcomingEvents
);
router.post(
  "/status",
  verifyToken,
  permittedRoles(..._GENERAL, ..._ADMIN, ..._VIP),
  handleMemberRegisterToEvent
);

module.exports = router;
