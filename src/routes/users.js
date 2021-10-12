const express = require("express");
const {
  getUserByCode,
  updateUserByCode,
  deleteUsers,
  createUser,
  searchUsers,
  bulkUpdateUsersStatus,
  getUserProfile,
} = require("../controllers/users");
const { verifyToken, permittedRoles } = require("../middlewares");
const { _protected, _public } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { usersValidator } = require("../validators/users");
const router = express.Router();

router.post(
  "/",
  verifyToken,
  permittedRoles(..._protected),
  usersValidator("create"),
  processValidationError,
  createUser
);
router.post(
  "/search",
  verifyToken,
  permittedRoles(..._protected),
  permittedRoles("SPONSOR", "MEMBER"),
  searchUsers
);
router.get("/:code", verifyToken, permittedRoles(..._protected), getUserByCode);
router.patch(
  "/:code",
  verifyToken,
  permittedRoles(..._protected),
  usersValidator("update"),
  processValidationError,
  updateUserByCode
);
router.patch(
  "/bulk/status",
  verifyToken,
  permittedRoles(..._protected),
  usersValidator("bulk-update-status"),
  processValidationError,
  bulkUpdateUsersStatus
);
router.delete(
  "/",
  verifyToken,
  permittedRoles(..._protected),
  usersValidator("bulk-delete"),
  processValidationError,
  deleteUsers
);

router.get("/", verifyToken, permittedRoles(..._public), getUserProfile);

module.exports = router;
