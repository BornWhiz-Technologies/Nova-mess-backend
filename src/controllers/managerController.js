const { createManager } = require("../services/managerService");
const { sendResponse } = require("../utils/response");

const addManager = async (req, res) => {

    try {

        // Get uploaded file paths
        const profilePicture =
            req.files?.profilePicture?.[0]?.filename || "";

        const employeeIdProof =
            req.files?.employeeIdProof?.[0]?.filename || "";

        // Combine form data + file names
        const managerData = {
            ...req.body,
            profilePicture,
            employeeIdProof
        };

        const manager = await createManager(managerData);

        return sendResponse(
            res,
            201,
            true,
            "Manager details saved successfully",
            manager
        );

    } catch (error) {

        console.error("Manager Error:", error);

        return sendResponse(
            res,
            500,
            false,
            error.message || "Internal Server Error"
        );

    }

};

module.exports = {
    addManager
};