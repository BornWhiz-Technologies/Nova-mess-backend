const ManagerReport = require("../models/managerReport");

const getReports = async () => {
  return await ManagerReport.find().sort({ createdAt: -1 });
};

module.exports = { getReports };
