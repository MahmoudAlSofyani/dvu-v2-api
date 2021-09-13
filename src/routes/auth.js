const express = require("express");
const { login, register } = require("../controllers/auth");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { authValidator } = require("../validators/auth");
const router = express.Router();

router.post("/login", authValidator("login"), processValidationError, login);
router.post(
  "/register",
  authValidator("register"),
  processValidationError,
  register
);

module.exports = router;
