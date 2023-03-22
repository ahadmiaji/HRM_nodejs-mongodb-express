const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Designation", DesignationSchema);
