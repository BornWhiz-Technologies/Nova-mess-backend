const { registerUser } = require('../services/authService');
const { sendResponse } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);

    return sendResponse(res, 201, true, 'Account created successfully', {
      id: user._id,
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      token
    });
  } catch (error) {
    if (error.status) {
      return sendResponse(res, error.status, false, error.message, null, error.errors || []);
    }

    console.error('Registration error:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

module.exports = { register };
