const { getProfile } = require("../services/profileService");
const { sendResponse } = require("../utils/response");

const getMyProfile = async (req, res) => {
  try {
    const data = await getProfile(req.user.id, req.user.role);

    return sendResponse(res, 200, true, "Profile fetched successfully", data);
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getMyProfile,
};
