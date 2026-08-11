const express = require("express");

const router = express.Router();

const {
  addMenu,
  getAllMenus,
  getTodayMenu,
  getSingleMenu,
  editMenu,
  removeMenu,
} = require("../controllers/menuController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

// Add Menu
router.post("/", authMiddleware, upload.single("image"), addMenu);

// Get All Menus
router.get("/", getAllMenus);

// Get Today's Menu
router.get("/today", getTodayMenu);

// Get Single Menu
router.get("/:id", authMiddleware, getSingleMenu);

// Update Menu
router.put("/:id", authMiddleware, upload.single("image"), editMenu);

// Delete Menu
router.delete("/:id", authMiddleware, removeMenu);

module.exports = router;
