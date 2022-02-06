const express = require("express");
const {
  getAllPlateSources,
  getPlateCodesBySource,
} = require("../controllers/plates");
const router = express.Router();

router.get("/sources", getAllPlateSources);

router.get("/codes/:source", getPlateCodesBySource);

module.exports = router;
