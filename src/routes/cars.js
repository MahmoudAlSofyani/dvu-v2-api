const express = require("express");
const {
  getAllCarMakes,
  getAllModelsByMake,
  getAllCarColors,
  createNewCar,
  deleteCarByUid,
} = require("../controllers/cars");
const router = express.Router();
const { verifyToken, permittedRoles } = require("../middlewares");
const { _ADMIN, _GENERAL, _VIP } = require("../middlewares/roles");

router.get("/makes", getAllCarMakes);
router.get("/models/:make", getAllModelsByMake);

router.get("/colors", getAllCarColors);

router.post(
  "/",
  verifyToken,
  permittedRoles(..._ADMIN, ..._GENERAL, ..._VIP),
  createNewCar
);

router.delete(
  "/:uid",
  verifyToken,
  permittedRoles(..._ADMIN, ..._GENERAL, ..._VIP),
  deleteCarByUid
);

module.exports = router;
