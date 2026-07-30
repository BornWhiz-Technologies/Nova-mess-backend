const express = require("express");
const router = express.Router();

const {
  saveStudentProfile,
  getProfile,
  getOrders,
  getDashboard,
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, getDashboard);
router.get("/profile", authMiddleware, getProfile);
router.get("/orders", authMiddleware, getOrders);
router.put("/studentProfile", authMiddleware, saveStudentProfile);

module.exports = router;
