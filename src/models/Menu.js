const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      required: true,
    },

    foodName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Veg", "Non Veg"],
      required: true,
    },

    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    available: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Menu", menuSchema);
