const mongoose = require('mongoose');

const employeeBonusSchema = new mongoose.Schema({
    bonusSettingId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    employeeId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    grossSalary: {
        type: Number,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    bonusAmount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeBonus', employeeBonusSchema);
