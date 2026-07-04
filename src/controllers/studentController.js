const { updateStudentProfile } = require("../services/studentService");
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

module.exports = {
  saveStudentProfile
};