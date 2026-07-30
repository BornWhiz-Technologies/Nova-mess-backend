const Payment = require("../models/payment");

const createPayment = async (paymentData) => {
  const payment = await Payment.create(paymentData);

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

module.exports = {
  createPayment,
  getPaymentByOrder,
  updatePaymentStatus,
};
