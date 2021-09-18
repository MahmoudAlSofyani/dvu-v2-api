const express = require("express");
const {
  createComment,
  searchComments,
  updateCommentByCode,
  deleteComments,
} = require("../controllers/comments");
const router = express.Router();
const { verifyMemberToken } = require("../middlewares");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { commentsValidator } = require("../validators/comments");

router.post("/search", verifyMemberToken, searchComments);
router.post(
  "/",
  verifyMemberToken,
  commentsValidator("create"),
  processValidationError,
  createComment
);

router.patch(
  "/:code",
  verifyMemberToken,
  commentsValidator("update"),
  processValidationError,
  updateCommentByCode
);

router.delete(
  "/",
  verifyMemberToken,
  commentsValidator("delete"),
  processValidationError,
  deleteComments
);

module.exports = router;
