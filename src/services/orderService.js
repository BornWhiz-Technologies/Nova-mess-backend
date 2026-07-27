const Order = require("../models/order");

const createOrder = async (orderData) => {
  const order = await Order.create(orderData);

  return order;
};

const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

const getStudentOrders = async (studentId) => {
  return await Order.find({ studentId }).sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

module.exports = {
  createOrder,
  getAllOrders,
  getStudentOrders,
  updateOrderStatus,
};
