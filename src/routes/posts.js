const express = require("express");
const { singleImage, multipleImage } = require("../controllers/file");
const {
  searchPosts,
  createPost,
  updatePostByCode,
  deletePost,
} = require("../controllers/posts");
const router = express.Router();
const { verifyToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { postsValidator } = require("../validators/posts");

router.post("/search", verifyToken, searchPosts);
router.post(
  "/",
  multipleImage,
  verifyToken,
  postsValidator("create"),
  processValidationError,
  createPost
);
router.patch(
  "/:code",
  multipleImage,
  verifyToken,
  postsValidator("update"),
  processValidationError,
  updatePostByCode
);

router.delete(
  "/",
  verifyToken,
  postsValidator("delete"),
  processValidationError,
  deletePost
);

module.exports = router;
