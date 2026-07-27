const Notification = require("../models/notification");

const getNotifications = async () => {
  return await Notification.find().sort({ createdAt: -1 });
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
