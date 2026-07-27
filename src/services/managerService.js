const Manager = require("../models/manager");

const createManager = async (managerData) => {
  const manager = await Manager.create({
    userId: managerData.userId,
    fullName: managerData.fullName,
    employeeId: managerData.employeeId,
    experience: managerData.experience,
    shift: managerData.shift,
    profilePicture: managerData.profilePicture,
    employeeIdProof: managerData.employeeIdProof,
  });

  return manager;
};

const getManagerProfile = async (userId) => {
  const manager = await Manager.findOne({ userId });

  return manager;
};

module.exports = {
  createManager,
  getManagerProfile,
};
