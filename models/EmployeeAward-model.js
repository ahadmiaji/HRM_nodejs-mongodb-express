const mongoose = require('mongoose');

const EmployeeAwardSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    awardName: {
        type: String,
        required: true,
    },
    giftItem: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeAward', EmployeeAwardSchema);




