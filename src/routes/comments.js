const express = require("express");
const {
  createComment,
  searchComments,
  updateCommentByCode,
  deleteComments,
} = require("../controllers/comments");
const router = express.Router();
const { verifyToken } = require("../middlewares");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { commentsValidator } = require("../validators/comments");

router.post("/search", verifyToken, searchComments);
router.post(
  "/",
  verifyToken,
  commentsValidator("create"),
  processValidationError,
  createComment
);

router.patch(
  "/:code",
  verifyToken,
  commentsValidator("update"),
  processValidationError,
  updateCommentByCode
);

router.delete(
  "/",
  verifyToken,
  commentsValidator("delete"),
  processValidationError,
  deleteComments
);

module.exports = router;
