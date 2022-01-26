const express = require("express");
const { streamFile } = require("../controllers/file");
const router = express.Router();

router.get("/:uid", streamFile);

module.exports = router;
