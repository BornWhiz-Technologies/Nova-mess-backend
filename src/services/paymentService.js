const Payment = require("../models/Payment");

const createPayment = async (paymentData) => {
  const existingPayment = await Payment.findOne({
    orderId: paymentData.orderId,
    studentId: paymentData.studentId,
    paymentStatus: "Paid",
  });

  if (existingPayment) {
    throw new Error("This order has already been paid.");
  }

  const payment = await Payment.create({
    ...paymentData,
    paymentStatus: "Paid",
  });

  return payment;
};

const getPaymentByOrder = async (orderId) => {
  return Payment.findOne({ orderId });
};

const updatePaymentStatus = async (id, status) => {
  return Payment.findByIdAndUpdate(
    id,
    {
      paymentStatus: status,
    },
    {
      new: true,
    },
  );
};
const getAllPayments = async () => {
  return Payment.find()
    .populate("studentId", "fullName email")
    .populate("orderId")
    .sort({ createdAt: -1 });
};
module.exports = {
  createPayment,
  getPaymentByOrder,
  updatePaymentStatus,
  getAllPayments,
};
