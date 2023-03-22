const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    template: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true,
        min: 0
    },
    houseRent: {
        type: Number,
        required: true,
        min: 0
    },
    providentFund: {
        type: Number,
        required: true,
        min: 0
    },
    travelAllowance: {
        type: Number,
        required: true,
        min: 0
    },
    securityDeposit: {
        type: Number,
        required: true,
        min: 0
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Payroll', payrollSchema);
