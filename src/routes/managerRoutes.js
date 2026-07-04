const express = require("express");

const router = express.Router();

const { addManager } = require("../controllers/managerController");
const upload = require("../middleware/multer");

// Upload Profile Picture + Employee ID Proof
router.post(
  "/create",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "employeeIdProof", maxCount: 1 }
  ]),
  addManager
);

module.exports = router;