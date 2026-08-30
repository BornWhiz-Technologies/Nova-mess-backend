const Order = require("../models/order");
const Payment = require("../models/Payment");

// ==========================================
// GET STUDENT BILLS
// ==========================================

const getStudentBills = async (req, res) => {
  try {
    // Logged-in student's ID
    const studentId = req.user.id;

    // Get all orders of this student
    const orders = await Order.find({
      studentId: studentId,
    }).sort({ createdAt: -1 });

    // Get all payments of this student
    const payments = await Payment.find({
      studentId: studentId,
    }).sort({ createdAt: -1 });

    // Combine Order + Payment data
    const bills = orders
      .map((order) => {
        const payment = payments.find(
          (p) => p.orderId.toString() === order._id.toString(),
        );

        // Only create bill when payment exists
        if (!payment) {
          return null;
        }

        return {
          billId: payment._id,

          orderId: order._id,

          studentId: order.studentId,

          studentName: order.studentName,

          items: order.items,

          totalPrice: order.totalPrice,

          paymentMethod: payment.paymentMethod,

          paymentOption: payment.paymentOption,

          paymentStatus: payment.paymentStatus,

          transactionId: payment.transactionId,

          createdAt: order.createdAt,

          paidAt: payment.createdAt,
        };
      })
      .filter((bill) => bill !== null);

    return res.status(200).json({
      success: true,
      message: "Student bills fetched successfully",
      data: bills,
    });
  } catch (error) {
    console.error("GET STUDENT BILLS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch student bills",
      error: error.message,
    });
  }
};

module.exports = {
  getStudentBills,
};
