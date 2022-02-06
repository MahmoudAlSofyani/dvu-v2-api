const express = require("express");
const {
  getAllPlateSources,
  getPlateCodesBySource,
} = require("../controllers/plates");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares/index");
const { _GENERAL, _ADMIN, _VIP } = require("../middlewares/roles");

router.get(
  "/sources",
  verifyToken,
  permittedRoles(..._GENERAL),
  getAllPlateSources
);

router.get(
  "/codes/:source",
  verifyToken,
  permittedRoles(..._GENERAL),
  getPlateCodesBySource
);

module.exports = router;
