const Manager = require("../models/Manager");

const createManager = async (managerData) => {

    const manager = await Manager.create({

        userId: managerData.userId,
        fullName: managerData.fullName,
        employeeId: managerData.employeeId,
        experience: managerData.experience,
        shift: managerData.shift,

        // Uploaded file names
        profilePicture: managerData.profilePicture,
        employeeIdProof: managerData.employeeIdProof

    });

    return manager;

};

module.exports = {
    createManager
};