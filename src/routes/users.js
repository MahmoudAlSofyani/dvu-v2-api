const express = require("express");
const {
  getAllUsers,
  getUserByCode,
  updateUserByCode,
  deleteUsers,
  createUser,
} = require("../controllers/users");
const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:code", getUserByCode);
router.patch("/:code", updateUserByCode);
router.delete("/", deleteUsers);

module.exports = router;
