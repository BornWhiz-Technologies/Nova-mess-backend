const Support = require("../models/support");

// Create Feedback
const createFeedback = async (studentId, feedbackData) => {
  const feedback = await Support.create({
    studentId,
    type: "feedback",
    rating: feedbackData.rating,
    comment: feedbackData.comment,
  });

  return feedback;
};

// Create Report
const createReport = async (studentId, reportData) => {
  const report = await Support.create({
    studentId,
    type: "report",
    issueType: reportData.issueType,
    description: reportData.description,
  });

  return report;
};

// Get student's support requests
const getStudentSupport = async (studentId) => {
  return await Support.find({ studentId }).sort({ createdAt: -1 });
};

// Get support requests - last 7 days only
const getAllSupport = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return await Support.find({
    createdAt: { $gte: oneWeekAgo },
  }).sort({ createdAt: -1 });
};

// Update support status
const updateSupportStatus = async (supportId, status) => {
  return await Support.findByIdAndUpdate(supportId, { status }, { new: true });
};

module.exports = {
  createFeedback,
  createReport,
  getStudentSupport,
  getAllSupport,
  updateSupportStatus,
};
