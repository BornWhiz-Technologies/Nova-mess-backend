const express = require("express");

const router = express.Router();

const {
  makePayment,
  getPayment,
  changePaymentStatus,
  getPayments,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

// Student - Create Payment
router.post("/", authMiddleware, makePayment);

// Manager - Get All Payments
router.get("/all", authMiddleware, getPayments);

// Get Payment by Order
router.get("/:orderId", authMiddleware, getPayment);

// Update Payment
router.put("/:id/status", authMiddleware, changePaymentStatus);

module.exports = router;