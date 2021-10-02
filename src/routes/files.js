const express = require("express");
const { streamFile } = require("../controllers/file");
const router = express.Router();

router.get("/:code", streamFile);

module.exports = router;
