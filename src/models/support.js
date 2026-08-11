const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    type: {
      type: String,
      enum: ["feedback", "report"],
      required: true,
    },

    // Feedback fields
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },

    // Report fields
    issueType: {
      type: String,
      enum: [
        "Food Quality",
        "Order Issue",
        "Payment Issue",
        "Menu Issue",
        "Technical Issue",
        "Other",
      ],
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Support", supportSchema);
