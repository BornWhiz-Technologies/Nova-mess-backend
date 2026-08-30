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

const updateManagerProfile = async (userId, profileData) => {
  const manager = await Manager.findOne({ userId });

  if (!manager) {
    throw new Error("Manager profile not found");
  }

  manager.fullName = profileData.fullName ?? manager.fullName;

  manager.phone = profileData.phone ?? manager.phone;

  manager.shift = profileData.shift ?? manager.shift;

  await manager.save();

  return manager;
};

module.exports = {
  createManager,
  getManagerProfile,
  updateManagerProfile,
};
