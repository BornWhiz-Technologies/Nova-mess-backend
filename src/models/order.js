const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    foodName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Preparing", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
