const express = require("express");
const {
  getAllCarMakes,
  getAllModelsByMake,
  getAllCarColors,
} = require("../controllers/cars");
const router = express.Router();

router.get("/makes", getAllCarMakes);
router.get("/models/:make", getAllModelsByMake);

router.get("/colors", getAllCarColors);

module.exports = router;
