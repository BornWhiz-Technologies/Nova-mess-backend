const User = require("../models/User");

const updateStudentProfile = async (userId, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePicture: data.profilePicture,
      fullName: data.fullName,
      registerNumber: data.registerNumber,
      department: data.department,
      year: data.year,
      section: data.section
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return updatedUser;
};

module.exports = {
  updateStudentProfile
};