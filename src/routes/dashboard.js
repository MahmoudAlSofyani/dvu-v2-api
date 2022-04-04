const { getEventDescription } = require("@sentry/utils");
const express = require("express");
const {
  getMemberStatistics,
  getAdvertisementStatistics,
  getEventsStatistics,
} = require("../controllers/dashboard");
const router = express.Router();

const { verifyToken, permittedRoles } = require("../middlewares");
const { _ADMIN } = require("../middlewares/roles");

router.get(
  "/members",
  verifyToken,
  permittedRoles(..._ADMIN),
  getMemberStatistics
);

router.get(
  "/advertisements",
  verifyToken,
  permittedRoles(..._ADMIN),
  getAdvertisementStatistics
);

router.get(
  "/events",
  verifyToken,
  permittedRoles(..._ADMIN),
  getEventsStatistics
);

module.exports = router;
