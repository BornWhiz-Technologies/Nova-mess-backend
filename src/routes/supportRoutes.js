const express = require("express");

const router = express.Router();

const {
  submitFeedback,
  submitReport,
  getMySupport,
  getSupport,
  changeSupportStatus,
} = require("../controllers/supportController");

const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// STUDENT
// ===============================

// Submit Feedback
router.post("/feedback", authMiddleware, submitFeedback);

// Submit Report
router.post("/report", authMiddleware, submitReport);

// Student - View own support requests
router.get("/my", authMiddleware, getMySupport);

// ===============================
// ADMIN / MANAGER
// ===============================

// View all support requests
router.get("/", authMiddleware, getSupport);

// Update support status
router.put("/:id/status", authMiddleware, changeSupportStatus);

module.exports = router;
