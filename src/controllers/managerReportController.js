const { getReports } = require("../services/managerReportService");
const { sendResponse } = require("../utils/response");

const getAllReports = async (req, res) => {
  try {
    const reports = await getReports();

    return sendResponse(
      res,
      200,
      true,
      "Reports fetched successfully",
      reports,
    );
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = { getAllReports };
