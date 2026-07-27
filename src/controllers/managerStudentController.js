const { getAllStudents } = require("../services/managerStudentService");
const { sendResponse } = require("../utils/response");

const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();

    return sendResponse(
      res,
      200,
      true,
      "Students fetched successfully",
      students,
    );
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getStudents,
};
