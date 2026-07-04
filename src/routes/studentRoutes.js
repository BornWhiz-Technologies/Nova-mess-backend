const express = require("express");
const router = express.Router();

const { saveStudentProfile } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/studentProfile", authMiddleware, saveStudentProfile);

module.exports = router;