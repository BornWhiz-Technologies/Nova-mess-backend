const {
  createPayment,
  getPaymentByOrder,
  updatePaymentStatus,
} = require("../services/paymentService");

const { sendResponse } = require("../utils/response");

// Create Payment

const makePayment = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      studentId: req.user.id,
    };

    const payment = await createPayment(paymentData);

    return sendResponse(
      res,
      200,
      true,
      "Payment created successfully",
      payment,
    );
  } catch (error) {
    console.log(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Get Payment

const getPayment = async (req, res) => {
  try {
    const payment = await getPaymentByOrder(req.params.orderId);

    return sendResponse(res, 200, true, "Payment fetched", payment);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

// Update Payment

const changePaymentStatus = async (req, res) => {
  try {
    const payment = await updatePaymentStatus(req.params.id, req.body.status);

    return sendResponse(res, 200, true, "Payment status updated", payment);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  makePayment,
  getPayment,
  changePaymentStatus,
};
