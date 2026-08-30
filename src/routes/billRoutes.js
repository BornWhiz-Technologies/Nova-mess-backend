const express = require("express");

const router = express.Router();

const { getStudentBills } = require("../controllers/billController");

const authMiddleware = require("../middleware/authMiddleware");

// Get all bills of logged-in student
router.get("/", authMiddleware, getStudentBills);

module.exports = router;
