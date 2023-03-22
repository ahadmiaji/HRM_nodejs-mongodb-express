const express = require("express");
const { getDeduction, createDeduction, updateDeduction, getDeductionById, deleteDeduction } = require("../controllers/Deduction-controller");

const router = express.Router();

router.get("/", getDeduction);
router.post("/create",createDeduction);
router.put("/update", updateDeduction);
router.get("/:id", getDeductionById);
router.delete("/delete", deleteDeduction);

module.exports= router;