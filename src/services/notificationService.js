const Notification = require("../models/notification");

const getNotifications = async (user) => {
  const role = user.role;
  const userId = user._id;

  return await Notification.find({
    $or: [
      { targetRole: "All" },
      { targetRole: role },
      { userId: userId },
    ],
  }).sort({ createdAt: -1 });
};

const markAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  );
};

module.exports = {
  getNotifications,
  markAsRead,
};