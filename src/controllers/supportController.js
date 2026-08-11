const {
  createFeedback,
  createReport,
  getStudentSupport,
  getAllSupport,
  updateSupportStatus,
} = require("../services/supportService");

const { sendResponse } = require("../utils/response");

// ===============================
// SUBMIT FEEDBACK
// ===============================

const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment || !comment.trim()) {
      return sendResponse(res, 400, false, "Rating and feedback are required");
    }

    const feedback = await createFeedback(req.user.id, {
      rating,
      comment,
    });

    return sendResponse(
      res,
      201,
      true,
      "Feedback submitted successfully",
      feedback,
    );
  } catch (error) {
    console.error("Submit Feedback Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Unable to submit feedback",
    );
  }
};

// ===============================
// SUBMIT REPORT
// ===============================

const submitReport = async (req, res) => {
  try {
    const { issueType, description } = req.body;

    if (!issueType || !description || !description.trim()) {
      return sendResponse(
        res,
        400,
        false,
        "Issue type and description are required",
      );
    }

    const report = await createReport(req.user.id, {
      issueType,
      description,
    });

    return sendResponse(
      res,
      201,
      true,
      "Report submitted successfully",
      report,
    );
  } catch (error) {
    console.error("Submit Report Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Unable to submit report",
    );
  }
};

// ===============================
// GET MY SUPPORT REQUESTS
// ===============================

const getMySupport = async (req, res) => {
  try {
    const support = await getStudentSupport(req.user.id);

    return sendResponse(
      res,
      200,
      true,
      "Support requests fetched successfully",
      support,
    );
  } catch (error) {
    console.error("Get Student Support Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Unable to fetch support requests",
    );
  }
};

// ===============================
// GET ALL SUPPORT
// ===============================

const getSupport = async (req, res) => {
  try {
    const support = await getAllSupport();

    return sendResponse(
      res,
      200,
      true,
      "Support requests fetched successfully",
      support,
    );
  } catch (error) {
    console.error("Get Support Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Unable to fetch support requests",
    );
  }
};

// ===============================
// UPDATE SUPPORT STATUS
// ===============================

const changeSupportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return sendResponse(res, 400, false, "Status is required");
    }

    const support = await updateSupportStatus(req.params.id, status);

    if (!support) {
      return sendResponse(res, 404, false, "Support request not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Support status updated successfully",
      support,
    );
  } catch (error) {
    console.error("Update Support Status Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Unable to update support status",
    );
  }
};

module.exports = {
  submitFeedback,
  submitReport,
  getMySupport,
  getSupport,
  changeSupportStatus,
};
