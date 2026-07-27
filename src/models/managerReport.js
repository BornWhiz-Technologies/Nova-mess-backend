const mongoose = require("mongoose");

const managerReportSchema = new mongoose.Schema(
  {
    studentName: String,
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["complaints", "feedback", "resolved"],
      default: "complaints",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ManagerReport", managerReportSchema);
