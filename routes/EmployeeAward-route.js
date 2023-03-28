const express = require("express");
const { createEmployeeAward, getEmployeeAwardById, deleteEmployeeAward, getEmployeeAward, updateEmployeeAward } = require("../controllers/EmployeeAward-controller");
const { userMiddleware, isAdmin } = require("../middlewares/user-middleware");


const router = express.Router();

router.get("/", getEmployeeAward );
router.post("/create",userMiddleware,isAdmin, createEmployeeAward);
router.put("/update",userMiddleware,isAdmin, updateEmployeeAward );
router.get("/:id", getEmployeeAwardById);
router.delete("/delete",deleteEmployeeAward );

module.exports = router;