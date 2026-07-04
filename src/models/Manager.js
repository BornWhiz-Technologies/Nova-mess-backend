const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    fullName: {
        type: String,
        required: true
    },

    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    experience: {
        type: Number,
        required: true
    },

    shift: {
        type: String,
        required: true
    },

    employeeIdProof: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("Manager", managerSchema);