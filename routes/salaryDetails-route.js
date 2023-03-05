const express = require('express');
const { createSalaryDetails, getSalaryDetailsByEmployeeId, getSalaryDetails } = require('../controllers/salaryDetails-controller');
const router = express.Router();

getSalaryDetails
router.get('/', getSalaryDetails);
router.post('/', createSalaryDetails );
router.get('/employee/:employeeId', getSalaryDetailsByEmployeeId);

module.exports = router;
