const express = require("express");
const { createPayroll, getPayroll, getPayrollbyID, updatePayroll } = require("../controllers/payroll-controller");


const payrollRouter = express.Router();

payrollRouter.get("/", getPayroll);
payrollRouter.post("/", createPayroll);
payrollRouter.get("/:id", getPayrollbyID);
payrollRouter.put("/:id", updatePayroll);

module.exports = payrollRouter;