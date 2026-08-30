const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getActive,
  update,
  remove,
} = require("../controllers/announcementController");

const authMiddleware = require("../middleware/authMiddleware");

// Create announcement
router.post("/", authMiddleware, create);

// IMPORTANT: /active must come before /:id
router.get("/active", authMiddleware, getActive);

// Get all announcements
router.get("/", authMiddleware, getAll);

// Update announcement
router.put("/:id", authMiddleware, update);

// Delete announcement
router.delete("/:id", authMiddleware, remove);

module.exports = router;
