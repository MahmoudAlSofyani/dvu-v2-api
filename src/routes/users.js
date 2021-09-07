const express = require("express");
const {
  getUserByCode,
  updateUserByCode,
  deleteUsers,
  createUser,
  searchUsers,
} = require("../controllers/users");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { usersValidator } = require("../validators/users");
const router = express.Router();

router.post("/", usersValidator("create"), processValidationError, createUser);
router.post("/search", searchUsers);
router.get("/:code", getUserByCode);
router.patch("/:code", updateUserByCode);
router.delete("/", deleteUsers);

module.exports = router;
