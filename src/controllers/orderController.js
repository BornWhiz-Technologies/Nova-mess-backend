const {
  createOrder,
  getAllOrders,
  getStudentOrders,
  updateOrderStatus,
} = require("../services/orderService");

const { sendResponse } = require("../utils/response");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);

    return sendResponse(res, 201, true, "Order placed successfully", order);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Get All Orders (Manager)
const getOrders = async (req, res) => {
  try {
    const status = req.query.status;

    let orders = await getAllOrders();

    if (status) {
      orders = orders.filter(
        (o) => o.status.toLowerCase() === status.toLowerCase(),
      );
    }

    return sendResponse(res, 200, true, "Orders fetched successfully", orders);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Get Student Orders
const getMyOrders = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const orders = await getStudentOrders(studentId);

    return sendResponse(
      res,
      200,
      true,
      "Student orders fetched successfully",
      orders,
    );
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

// Update Order Status
const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatus(req.params.id, status);

    return sendResponse(
      res,
      200,
      true,
      "Order status updated successfully",
      order,
    );
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getMyOrders,
  changeOrderStatus,
};
