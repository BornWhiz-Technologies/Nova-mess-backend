const {
  getNotifications,
  markAsRead,
} = require("../services/notificationService");

const { sendResponse } = require("../utils/response");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications();

    return sendResponse(res, 200, true, "Notifications fetched", notifications);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const readNotification = async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id);

    return sendResponse(res, 200, true, "Notification updated", notification);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getAllNotifications,
  readNotification,
};
