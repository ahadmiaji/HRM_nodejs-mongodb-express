const Payroll = require("../models/payroll-model");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken"); //before use make sure you required refreshtoken.
const jwt = require("jsonwebtoken");

const createPayroll = asyncHandler(async (req, res) => {
    try {
        const payroll = new Payroll(req.body);
        const savedPayroll = await payroll.save();
        res.status(201).json(savedPayroll);
    } catch (error) {
        console.log("error: ", error);
    }
});

const getPayroll = asyncHandler(async (req, res) => {
    try {
        const payrolls = await Payroll.find();
        res.json(payrolls);

    } catch (err) {
        console.log("error: ", error);
    }
});

const getPayrollbyID = asyncHandler(async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        res.json(payroll);
    } catch (err) {
        console.log("error: ", error);
    }
});

const updatePayroll = asyncHandler(async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate(req.params.id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        payroll.template = req.body.template;
        payroll.basicSalary = req.body.basicSalary;
        payroll.houseRent = req.body.houseRent;
        payroll.providentFund = req.body.providentFund;
        payroll.travelAllowance = req.body.travelAllowance;
        payroll.securityDeposit = req.body.securityDeposit;

        const updatedPayroll = await payroll.save();
        res.json(updatedPayroll);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = { createPayroll, getPayroll, getPayrollbyID, updatePayroll };