const express = require("express");

const router = express.Router();

const {
  makePayment,
  getPayment,
  changePaymentStatus,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

// Student Payment

router.post("/", authMiddleware, makePayment);

// Get payment by order

router.get("/:orderId", authMiddleware, getPayment);

// Update payment

router.put("/:id/status", authMiddleware, changePaymentStatus);

module.exports = router;
