const ManagerStudent = require("../models/managerStudent");

const getAllStudents = async () => {
  return await ManagerStudent.find().sort({ createdAt: -1 });
};

module.exports = {
  getAllStudents,
};