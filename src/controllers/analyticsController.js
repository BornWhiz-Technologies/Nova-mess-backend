const { getAnalytics } = require("../services/analyticsService");
const { sendResponse } = require("../utils/response");

const getAnalyticsData = async (req, res) => {
  try {
    const data = await getAnalytics();

    return sendResponse(
      res,
      200,
      true,
      "Analytics fetched successfully",
      data
    );
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getAnalyticsData,
};