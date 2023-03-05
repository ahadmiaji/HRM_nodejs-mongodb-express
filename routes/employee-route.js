const express = require("express");
const { getEmployee, addEmployeeInfo, getAllEmployee, updateEmployee } = require("../controllers/employee-controller");

const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");

const employeeRouter = express.Router();

employeeRouter.post("/", addEmployeeInfo);
employeeRouter.get("/", getAllEmployee);

employeeRouter.get("/:id", userMiddleware, isAdmin, getEmployee);

employeeRouter.put("/update", userMiddleware, updateEmployee);


//router.get('/:id', authenticateToken, employeeController.getEmployee);

module.exports = employeeRouter;