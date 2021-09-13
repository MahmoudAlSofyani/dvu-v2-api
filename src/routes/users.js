const express = require("express");
const {
  getUserByCode,
  updateUserByCode,
  deleteUsers,
  createUser,
  searchUsers,
  bulkUpdateUsersStatus,
} = require("../controllers/users");
const { verifyAdminToken } = require("../middlewares");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { usersValidator } = require("../validators/users");
const router = express.Router();

router.post(
  "/",
  verifyAdminToken,
  usersValidator("create"),
  processValidationError,
  createUser
);
router.post("/search", verifyAdminToken, searchUsers);
router.get("/:code", verifyAdminToken, getUserByCode);
router.patch(
  "/:code",
  verifyAdminToken,
  usersValidator("update"),
  processValidationError,
  updateUserByCode
);
router.patch(
  "/bulk/status",
  verifyAdminToken,
  usersValidator("bulk-update-status"),
  processValidationError,
  bulkUpdateUsersStatus
);
router.delete(
  "/",
  verifyAdminToken,
  usersValidator("bulk-delete"),
  processValidationError,
  deleteUsers
);

module.exports = router;
