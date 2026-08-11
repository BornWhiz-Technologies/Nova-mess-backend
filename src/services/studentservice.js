const User = require("../models/User");
const Menu = require("../models/menu");
const Order = require("../models/order");

const getStudentProfile = async (userId) => {
  return User.findById(userId).select("-password");
};

const getStudentOrders = async (userId) => {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return await Order.find({
    studentId: userId,
    createdAt: {
      $gte: start,
      $lte: end,
    },
  }).sort({ createdAt: -1 });
};

const getStudentDashboard = async (userId) => {
  const profile = await getStudentProfile(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let todayMenu = await Menu.find({
    available: true,
    date: { $gte: today, $lt: tomorrow },
  })
    .sort({ createdAt: -1 })
    .limit(1);

  // If the manager has not selected today's date, show the most recently
  // added available menu instead of leaving the dashboard empty.
  if (todayMenu.length === 0) {
    todayMenu = await Menu.find({ available: true })
      .sort({ createdAt: -1 })
      .limit(1);
  }
  const recentOrders = await Order.find({
    studentId: userId,
    createdAt: {
      $gte: today,
      $lt: tomorrow,
    },
  })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    profile,
    todayMenu: todayMenu[0] || null,
    recentOrders,
  };
};

const updateStudentProfile = async (userId, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePicture: data.profilePicture,
      fullName: data.fullName,
      registerNumber: data.registerNumber,
      department: data.department,
      year: data.year,
      section: data.section,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return updatedUser;
};

module.exports = {
  getStudentProfile,
  getStudentOrders,
  getStudentDashboard,
  updateStudentProfile,
};
