const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  totalRevenue: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  mostOrderedFood: {
    type: String,
    default: "",
  },
  weeklyData: [
    {
      day: String,
      orders: Number,
    },
  ],
});

module.exports = mongoose.model("Analytics", analyticsSchema);
