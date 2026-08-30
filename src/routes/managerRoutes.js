const express = require("express");
const router = express.Router();

const {
  addManager,
  getProfile,
  updateProfile,
  getDashboardSummary,
  getTodaysMenu,
  getWeeklyMenu,
  getRecentOrders,
  getOrders,
} = require("../controllers/managerController");

const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/create",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "employeeIdProof", maxCount: 1 },
  ]),
  addManager,
);

router.get("/profile", authMiddleware, getProfile);
router.get("/dashboard", authMiddleware, getDashboardSummary);

router.get("/menu/today", authMiddleware, getTodaysMenu);
router.get("/menu/weekly", authMiddleware, getWeeklyMenu);

router.get("/orders/recent", authMiddleware, getRecentOrders);
router.get("/orders", authMiddleware, getOrders);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
