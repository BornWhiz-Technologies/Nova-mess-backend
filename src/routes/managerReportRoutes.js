const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getAllReports } = require("../controllers/managerReportController");

router.get("/", authMiddleware, getAllReports);

module.exports = router;
