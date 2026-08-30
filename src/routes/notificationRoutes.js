const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllNotifications,
  readNotification,
} = require("../controllers/notificationController");

// Get all notifications
router.get("/", authMiddleware, getAllNotifications);

// Mark notification as read
router.put("/:id", authMiddleware, readNotification);

module.exports = router;
