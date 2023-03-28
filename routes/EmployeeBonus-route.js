const express = require("express");
const { getEmployeeBonus, createEmployeeBonus, updateEmployeeBonus, getEmployeeBonusById, deleteEmployeeBonus } = require("../controllers/EmployeeBonus-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");


const router = express.Router();

router.get("/", getEmployeeBonus);
router.post("/create",userMiddleware,isAdmin, createEmployeeBonus);
router.put("/update",userMiddleware,isAdmin, updateEmployeeBonus );
router.get("/:id", getEmployeeBonusById);
router.delete("/delete",deleteEmployeeBonus);

module.exports = router;

//const employeebonusRouter = require("");
//router.use("/api/v1/employee-bonus", );