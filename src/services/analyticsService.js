const Analytics = require("../models/analytics");

const getAnalytics = async () => {
  return await Analytics.findOne();
};

module.exports = {
  getAnalytics,
};
