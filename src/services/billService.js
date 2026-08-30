const Order = require("../models/order");
const Payment = require("../models/Payment");

// Get bills for a student
const getStudentBills = async (studentId) => {
  const orders = await Order.find({
    studentId: studentId,
  }).sort({ createdAt: -1 });

  const bills = [];

  for (const order of orders) {
    const payment = await Payment.findOne({
      orderId: order._id,
      paymentStatus: "Paid",
    });

    // Bill should be generated only for paid orders
    if (payment) {
      bills.push({
        billId: payment._id,
        orderId: order._id,
        studentName: order.studentName,
        items: order.items,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,

        payment: {
          paymentMethod: payment.paymentMethod,
          paymentOption: payment.paymentOption,
          paymentStatus: payment.paymentStatus,
          amount: payment.amount,
          transactionId: payment.transactionId,
          paidAt: payment.createdAt,
        },
      });
    }
  }

  return bills;
};

// Get single bill
const getStudentBillById = async (studentId, billId) => {
  const payment = await Payment.findOne({
    _id: billId,
    studentId: studentId,
    paymentStatus: "Paid",
  });

  if (!payment) {
    throw new Error("Bill not found");
  }

  const order = await Order.findOne({
    _id: payment.orderId,
    studentId: studentId,
  });

  if (!order) {
    throw new Error("Order not found for this bill");
  }

  return {
    billId: payment._id,
    orderId: order._id,
    studentName: order.studentName,
    items: order.items,
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,

    payment: {
      paymentMethod: payment.paymentMethod,
      paymentOption: payment.paymentOption,
      paymentStatus: payment.paymentStatus,
      amount: payment.amount,
      transactionId: payment.transactionId,
      paidAt: payment.createdAt,
    },
  };
};

module.exports = {
  getStudentBills,
  getStudentBillById,
};
