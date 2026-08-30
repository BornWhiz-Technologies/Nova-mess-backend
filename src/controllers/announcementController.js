const {
  createAnnouncement,
  getAllAnnouncements,
  getActiveAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../services/announcementService");

const { sendResponse } = require("../utils/response");

// Create Announcement
const create = async (req, res) => {
  try {
    const announcementData = {
      ...req.body,
      createdBy: req.user.id,
    };

    const announcement = await createAnnouncement(announcementData);

    return sendResponse(
      res,
      201,
      true,
      "Announcement created successfully",
      announcement,
    );
  } catch (error) {
    console.error("Create Announcement Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Failed to create announcement",
    );
  }
};

// Get All Announcements
const getAll = async (req, res) => {
  try {
    const announcements = await getAllAnnouncements();

    return sendResponse(
      res,
      200,
      true,
      "Announcements fetched successfully",
      announcements,
    );
  } catch (error) {
    console.error("Get Announcements Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch announcements",
    );
  }
};

// Get Active Announcements
const getActive = async (req, res) => {
  try {
    const announcements = await getActiveAnnouncements();

    return sendResponse(
      res,
      200,
      true,
      "Active announcements fetched successfully",
      announcements,
    );
  } catch (error) {
    console.error("Get Active Announcements Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Failed to fetch active announcements",
    );
  }
};

// Update Announcement
const update = async (req, res) => {
  try {
    const announcement = await updateAnnouncement(req.params.id, req.body);

    if (!announcement) {
      return sendResponse(res, 404, false, "Announcement not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Announcement updated successfully",
      announcement,
    );
  } catch (error) {
    console.error("Update Announcement Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Failed to update announcement",
    );
  }
};

// Delete Announcement
const remove = async (req, res) => {
  try {
    const announcement = await deleteAnnouncement(req.params.id);

    if (!announcement) {
      return sendResponse(res, 404, false, "Announcement not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Announcement deleted successfully",
      announcement,
    );
  } catch (error) {
    console.error("Delete Announcement Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Failed to delete announcement",
    );
  }
};

module.exports = {
  create,
  getAll,
  getActive,
  update,
  remove,
};
