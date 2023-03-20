const express = require("express");

const { getAll, addInfo, updateDepartmentInfo, getInfo } = require("../controllers/department-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");

const departmentRouter = express.Router();

departmentRouter.get("/", getAll);
departmentRouter.post("/create",userMiddleware, isAdmin,addInfo);
departmentRouter.put("/update",userMiddleware,isAdmin,updateDepartmentInfo);
departmentRouter.get("/:id",getInfo)

module.exports = departmentRouter;