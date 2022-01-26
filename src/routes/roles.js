const express = require("express");
const { getAllRoles } = require("../controllers/roles");
const router = express.Router();

const { verifyToken, permittedRoles } = require("../middlewares");
const { _ADMIN } = require("../middlewares/roles");

router.get("/", verifyToken, permittedRoles(..._ADMIN), getAllRoles);

module.exports = router;
