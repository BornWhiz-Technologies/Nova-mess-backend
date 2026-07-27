const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getStudents } = require("../controllers/managerStudentController");

router.get("/", authMiddleware, getStudents);

module.exports = router;
