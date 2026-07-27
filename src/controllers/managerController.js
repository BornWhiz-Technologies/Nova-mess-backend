const Manager = require("../models/manager");
const {
  createManager,
  getManagerProfile,
} = require("../services/managerService");
const { getMenus } = require("../services/menuService");
const { sendResponse } = require("../utils/response");

const addManager = async (req, res) => {
  try {
    const profilePicture = req.files?.profilePicture?.[0]?.filename || "";
    const employeeIdProof = req.files?.employeeIdProof?.[0]?.filename || "";

    const managerData = {
      ...req.body,
      profilePicture,
      employeeIdProof,
    };

    const manager = await createManager(managerData);

    return sendResponse(
      res,
      201,
      true,
      "Manager details saved successfully",
      manager,
    );
  } catch (error) {
    console.error("Manager Error:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const manager = await getManagerProfile(userId);

    if (!manager) {
      return sendResponse(res, 404, false, "Manager profile not found");
    }

    return sendResponse(res, 200, true, "Manager profile fetched", manager);
  } catch (error) {
    console.error("Get Profile Error:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const manager = await Manager.findOne({ userId });

    if (!manager) {
      return sendResponse(res, 404, false, "Manager not found");
    }

    const Order = require("../models/order");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today },
    });

    const pendingOrders = await Order.countDocuments({
      createdAt: { $gte: today },
      status: "Pending",
    });

    const completedOrders = await Order.countDocuments({
      createdAt: { $gte: today },
      status: "Completed",
    });

    const revenueResult = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
          status: { $in: ["Preparing", "Completed"] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const todayRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const summary = {
      todayOrders,
      pendingOrders,
      completedOrders,
      todayRevenue,
    };

    return sendResponse(res, 200, true, "Dashboard summary fetched", summary);
  } catch (error) {
    console.error("Dashboard Error:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};

const getTodaysMenu = async (req, res) => {
  try {
    const Menu = require("../models/menu");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const menu = await Menu.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ createdAt: -1 });

    console.log("Today's Menu:", menu);

    return sendResponse(res, 200, true, "Today's menu fetched", menu);
  } catch (error) {
    console.error("Menu Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};
const getWeeklyMenu = async (req, res) => {
  try {
    const menus = await getMenus();

    return sendResponse(res, 200, true, "Weekly menu fetched", menus);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const Order = require("../models/order");

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("studentId", "fullName");

    const formattedOrders = orders.map((order) => ({
      studentName: order.studentName,
      foodName: order.foodName,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
    }));

    return sendResponse(
      res,
      200,
      true,
      "Recent orders fetched",
      formattedOrders,
    );
  } catch (error) {
    console.error("Orders Error:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};
const getOrders = async (req, res) => {
  try {
    const Order = require("../models/order");

    let filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return sendResponse(res, 200, true, "Orders fetched", orders);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  addManager,
  getProfile,
  getDashboardSummary,
  getTodaysMenu,
  getWeeklyMenu,
  getRecentOrders,
  getOrders,
};
