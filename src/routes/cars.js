const express = require("express");
const {
  getAllCarMakes,
  getAllModelsByMake,
  getAllCarColors,
} = require("../controllers/cars");
const { verifyToken, permittedRoles } = require("../middlewares");
const { _GENERAL } = require("../middlewares/roles");
const router = express.Router();

router.get("/makes", verifyToken, permittedRoles(..._GENERAL), getAllCarMakes);
router.get(
  "/models/:make",
  verifyToken,
  permittedRoles(..._GENERAL),
  getAllModelsByMake
);

router.get(
  "/colors",
  verifyToken,
  permittedRoles(..._GENERAL),
  getAllCarColors
);

module.exports = router;
