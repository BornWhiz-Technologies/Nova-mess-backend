const mongoose = require("mongoose");

const managerStudentSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    registerNo: String,
    department: String,
    year: Number,
    phone: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ManagerStudent", managerStudentSchema);
