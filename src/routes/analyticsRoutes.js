const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getAnalyticsData } = require("../controllers/analyticsController");

router.get("/", authMiddleware, getAnalyticsData);

module.exports = router;
