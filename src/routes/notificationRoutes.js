const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllNotifications,
  readNotification,
} = require("../controllers/notificationController");

router.get("/", authMiddleware, getAllNotifications);

router.put("/:id", authMiddleware, readNotification);

module.exports = router;
