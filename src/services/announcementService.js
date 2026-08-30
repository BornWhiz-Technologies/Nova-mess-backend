const Announcement = require("../models/Announcement");

const createAnnouncement = async (announcementData) => {
  return Announcement.create(announcementData);
};

const getAllAnnouncements = async () => {
  return Announcement.find()
    .populate("createdBy", "fullName email")
    .sort({ createdAt: -1 });
};

const getActiveAnnouncements = async () => {
  return Announcement.find({
    isActive: true,
    targetRole: { $in: ["student", "all"] },
  })
    .populate("createdBy", "fullName")
    .sort({ createdAt: -1 });
};

const updateAnnouncement = async (id, data) => {
  return Announcement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteAnnouncement = async (id) => {
  return Announcement.findByIdAndDelete(id);
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getActiveAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
