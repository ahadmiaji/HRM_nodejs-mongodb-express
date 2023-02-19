const express = require("express");

const { getAll, addInfo, updateDepartmentInfo } = require("../controllers/department-controller");

const departmentRouter = express.Router();

departmentRouter.get("/", getAll);
departmentRouter.post("/create", addInfo);
departmentRouter.put("/update", updateDepartmentInfo);

module.exports = departmentRouter;