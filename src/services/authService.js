const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const createError = (status, message, errors = []) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
};

const registerUser = async (payload) => {
  const { username, email, mobileNumber, password, confirmPassword, role } = payload || {};

  if (password !== confirmPassword) {
    throw createError(400, 'Passwords do not match');
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw createError(409, 'Email already exists');
  }

  const existingMobile = await User.findOne({ mobileNumber });
  if (existingMobile) {
    throw createError(409, 'Mobile number already exists');
  }

  const user = await User.create({
    username,
    email,
    mobileNumber,
    password,
    role
  });

  const token = generateToken({ id: user._id, role: user.role });

  return {
    user,
    token
  };
};

module.exports = { registerUser };
