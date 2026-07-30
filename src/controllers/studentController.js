const {
  updateStudentProfile,
  getStudentProfile,
  getStudentOrders,
  getStudentDashboard,
} = require("../services/studentService");
const { sendResponse } = require("../utils/response");

const saveStudentProfile = async (req, res) => {
  try {
    const updatedUser = await updateStudentProfile(req.user.id, req.body);

    return sendResponse(
      res,
      200,
      true,
      "Student profile updated successfully",
      updatedUser
    );
  } catch (error) {
    if (error.status) {
      return sendResponse(
        res,
        error.status,
        false,
        error.message,
        null,
        error.errors || []
      );
    }

    console.error("Student Profile Error:", error);

    return sendResponse(
      res,
      500,
      false,
      "Internal server error"
    );
  }
};

const getProfile = async (req, res) => {
  try {
    const student = await getStudentProfile(req.user.id);

    if (!student) {
      return sendResponse(res, 404, false, "Student profile not found");
    }

    return sendResponse(res, 200, true, "Student profile fetched", student);
  } catch (error) {
    console.error("Student Profile Error:", error);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getStudentOrders(req.user.id);
    return sendResponse(res, 200, true, "Student orders fetched", orders);
  } catch (error) {
    console.error("Student Orders Error:", error);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

const getDashboard = async (req, res) => {
  try {
    const dashboard = await getStudentDashboard(req.user.id);

    if (!dashboard.profile) {
      return sendResponse(res, 404, false, "Student profile not found");
    }

    return sendResponse(res, 200, true, "Student dashboard fetched", dashboard);
  } catch (error) {
    console.error("Student Dashboard Error:", error);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

module.exports = {
  saveStudentProfile,
  getProfile,
  getOrders,
  getDashboard,
};
