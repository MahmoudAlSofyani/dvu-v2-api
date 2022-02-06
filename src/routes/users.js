const express = require("express");
const { singleImage } = require("../controllers/file");
const {
  getUserByUid,
  updateUserByUid,
  createUser,
  searchUsers,
  bulkUpdateUsersStatus,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/users");
const { verifyToken, permittedRoles } = require("../middlewares");
const { _ADMIN, _GENERAL, _VIP } = require("../middlewares/roles");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { usersValidator } = require("../validators/users");
const router = express.Router();

// ADMIN AUTHENTICATED ROUTES
/**
 * GET user by uid           [*]
 * PATCH update user by uid  [*]
 * PATCH Purge/Unpurge user   [*]
 * POST Search Users          [*]
 */
router.get("/:uid", verifyToken, permittedRoles(..._ADMIN), getUserByUid);
router.patch(
  "/:uid",
  singleImage(false),
  verifyToken,
  permittedRoles(..._ADMIN),
  usersValidator("update"),
  processValidationError,
  updateUserByUid
);
router.patch(
  "/status/:isActive",
  verifyToken,
  permittedRoles(..._ADMIN),
  usersValidator("update-user-status"),
  processValidationError,
  bulkUpdateUsersStatus
);
router.post("/search", verifyToken, permittedRoles(..._ADMIN), searchUsers);

// AUTHENTICATED ACCESS ROUTES
/**
 * GET Users profile          [*]
 * PATCH update users profile [*]
 * DELETE Own users account   [*]
 */
router.get(
  "/",
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP),
  getUserProfile
);
router.patch(
  "/",
  singleImage(false),
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP),
  updateUserProfile
);
router.delete(
  "/",
  verifyToken,
  permittedRoles(..._GENERAL, ..._VIP),
  deleteUserProfile
);

// NO AUTH ACCESS ROUTES
/**
 * POST Create new user       [*]
 */
router.post("/", usersValidator("create"), processValidationError, createUser);

module.exports = router;
