const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  getMyOrders,
  changeOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// Student Place Order
router.post("/", authMiddleware, placeOrder);

// Manager - View All Orders
router.get("/", authMiddleware, getOrders);

// Student - View My Orders
router.get("/student/:studentId", authMiddleware, getMyOrders);

// Manager - Update Order Status
router.put("/:id/status", authMiddleware, changeOrderStatus);

module.exports = router;
