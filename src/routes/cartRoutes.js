const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {addCartItem,getCart,removeCartItem,} = require("../controllers/cartController");

// Add menu to cart
router.post("/add", authMiddleware, addCartItem);

// Get student's cart
router.get("/", authMiddleware, getCart);

// Remove item from cart
router.delete("/remove/:foodName", authMiddleware, removeCartItem);

module.exports = router;
