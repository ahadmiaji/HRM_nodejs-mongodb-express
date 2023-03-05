const { Router } = require("express");

const leaveTypeRouter = require("./leave-type-route");
const departmentRouter = require("./department-route");
const designationRouter = require("./designation-route");
const userRouter = require("./users-route");
const employeeRouter = require("./employee-route");
const payrollRouter = require("./payroll-route");

const router = Router();

router.use("/api/v1/leave-types", leaveTypeRouter);
router.use("/api/v1/departments", departmentRouter);
router.use("/api/v1/designations", designationRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/employees", employeeRouter);
router.use("/api/v1/payrolls", payrollRouter);

module.exports = router;