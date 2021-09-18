const express = require("express");
const { singleImage, multipleImage } = require("../controllers/file");
const {
  searchPosts,
  createPost,
  updatePostByCode,
  deletePost,
} = require("../controllers/posts");
const router = express.Router();
const { verifyAdminToken } = require("../middlewares/index");
const {
  processValidationError,
} = require("../utils/process-validation-errors");
const { postsValidator } = require("../validators/posts");

router.post("/search", verifyAdminToken, searchPosts);
router.post(
  "/",
  multipleImage,
  verifyAdminToken,
  postsValidator("create"),
  processValidationError,
  createPost
);
router.patch(
  "/:code",
  multipleImage,
  verifyAdminToken,
  postsValidator("update"),
  processValidationError,
  updatePostByCode
);

router.delete(
  "/",
  verifyAdminToken,
  postsValidator("delete"),
  processValidationError,
  deletePost
);

module.exports = router;
