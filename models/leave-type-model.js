const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
