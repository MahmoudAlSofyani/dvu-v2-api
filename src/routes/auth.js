const express = require("express");
const { login, resetPassword, changePassword } = require("../controllers/auth");
const { sendResetPassword } = require("../controllers/emails");
const { verifyToken } = require("../middlewares");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { authValidator } = require("../validators/auth");
const router = express.Router();

// Change Password  [*]
// Reset Password   [*]
// Login            [*]

router.post("/login", authValidator("login"), processValidationError, login);

router.post(
  "/reset-password/:token",
  authValidator("reset-password-with-token"),
  processValidationError,
  resetPassword
);

router.post(
  "/reset-password",
  authValidator("reset-password"),
  processValidationError,
  sendResetPassword
);

router.post(
  "/change-password",
  verifyToken,
  authValidator("change-password"),
  processValidationError,
  changePassword
);

module.exports = router;
