const express = require("express");
const router = express.Router();

const {
  addManager,
  getProfile,
  getDashboardSummary,
  getTodaysMenu,
  getWeeklyMenu,
  getRecentOrders,
  getOrders,
} = require("../controllers/managerController");

const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");

<<<<<<< HEAD
router.post(
  "/create",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "employeeIdProof", maxCount: 1 },
  ]),
  addManager,
=======
// Upload Profile Picture + Employee ID Proof
router.post("/create",upload.fields([{ name: "profilePicture", maxCount: 1 },{ name: "employeeIdProof", maxCount: 1 }]),
  addManager
>>>>>>> e455aab301a8a6b466701760bd2ade5063605659
);

router.get("/profile", authMiddleware, getProfile);
router.get("/dashboard", authMiddleware, getDashboardSummary);

router.get("/menu/today", authMiddleware, getTodaysMenu);
router.get("/menu/weekly", authMiddleware, getWeeklyMenu);

router.get("/orders/recent", authMiddleware, getRecentOrders);
router.get("/orders", authMiddleware, getOrders);

module.exports = router;
