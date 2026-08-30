const User = require("../models/User");
const Student = require("../models/student");
const Manager = require("../models/manager");

const getProfile = async (userId, role) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  let profile = null;

  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "student") {
    // Student details are already stored in User collection
    profile = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      registerNumber: user.registerNumber,
      department: user.department,
      year: user.year,
      section: user.section,
      profilePicture: user.profilePicture,
    };
  }

  if (normalizedRole === "manager") {
    profile = await Manager.findOne({ userId });
  }

  return {
    user,
    profile,
  };
};

module.exports = {
  getProfile,
};
