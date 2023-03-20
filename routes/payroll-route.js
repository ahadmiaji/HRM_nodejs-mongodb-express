const express = require("express");
const { createPayroll, getPayroll, getPayrollbyID, updatePayroll } = require("../controllers/payroll-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");


const payrollRouter = express.Router();

payrollRouter.get("/", getPayroll);
payrollRouter.post("/", createPayroll);
payrollRouter.get("/:id",userMiddleware,isAdmin, getPayrollbyID);
payrollRouter.put("/:id",userMiddleware,isAdmin, updatePayroll);

module.exports = payrollRouter;