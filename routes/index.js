const { Router } = require("express");

const leaveTypeRouter = require("./leave-type-route");
const departmentRouter = require("./department-route");
const designationRouter = require("./designation-route");
const userRouter = require("./users-route");
const employeeRouter = require("./employee-route");
const payrollRouter = require("./payroll-route");
const salaryRouter = require("./salaryDetails-route");
const trainingRouter = require("./training-route");
const allowanceRouter =require("./allowance-route");
const noticetableRouter = require("./notice-table-route");
const bonussettingRouter = require("./BonusSetting-route");
const deductionRouter = require("./Deduction-route");

const router = Router();

router.use("/api/v1/leave-types", leaveTypeRouter);
router.use("/api/v1/departments", departmentRouter);
router.use("/api/v1/designations", designationRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/employees", employeeRouter);
router.use("/api/v1/payrolls", payrollRouter);
router.use("/api/v1/salary-details", salaryRouter );
router.use("/api/v1/trainings", trainingRouter);
router.use("/api/v1/allowances", allowanceRouter);
router.use("/api/v1/notice-tables", noticetableRouter );
router.use("/api/v1/bonus-settings", bonussettingRouter);
router.use("/api/v1/deductions", deductionRouter);
module.exports = router;