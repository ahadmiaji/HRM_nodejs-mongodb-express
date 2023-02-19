const { Router } = require("express");

const leaveTypeRouter = require("./leave-type-route");
const departmentRouter = require("./department-route");
const designationRouter = require("./designation-route");
const userRouter = require("./users-route");

const router = Router();

router.use("/api/v1/leave-types", leaveTypeRouter);
router.use("/api/v1/departments", departmentRouter);
router.use("/api/v1/designations", designationRouter);
router.use("/api/v1/users", userRouter);

module.exports = router;