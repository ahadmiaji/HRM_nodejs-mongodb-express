const mongoose = require('mongoose');

const salaryDetailsSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  grossSalary: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
    required: true,
  },
  deductions: {
    type: Number,
    required: true,
  },
  netSalary: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('SalaryDetails', salaryDetailsSchema);
