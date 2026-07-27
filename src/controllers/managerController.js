const Manager = require("../models/manager");
const {
  createManager,
  getManagerProfile,
} = require("../services/managerService");
const { getMenus } = require("../services/menuService");
const { sendResponse } = require("../utils/response");

const addManager = async (req, res) => {
  // 👇 Debug
  console.log("===== req.body =====");
  console.log(req.body);

  console.log("===== req.files =====");
  console.log(req.files);

  try {
    const profilePicture = req.files?.profilePicture?.[0]?.filename || "";

    const employeeIdProof = req.files?.employeeIdProof?.[0]?.filename || "";

    const managerData = {
      ...req.body,
      profilePicture,
      employeeIdProof,
    };

    const manager = await createManager(managerData);

    return sendResponse(
      res,
      201,
      true,
      "Manager details saved successfully",
      manager,
    );
  } catch (error) {
    console.error("Manager Error:", error);

    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
    );
  }
};

module.exports = {
  addManager,
};
