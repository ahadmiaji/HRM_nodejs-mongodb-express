const express = require('express');
const { createSalaryDetails, getSalaryDetailsByEmployeeId, getSalaryDetails } = require('../controllers/salaryDetails-controller');
const { userMiddleware, isAdmin } = require('../middlewares/user-middleware');
const router = express.Router();

getSalaryDetails
router.get('/', getSalaryDetails);
router.post('/', createSalaryDetails );
router.get('/employee/:employeeId',userMiddleware,isAdmin,getSalaryDetailsByEmployeeId);

module.exports = router;
