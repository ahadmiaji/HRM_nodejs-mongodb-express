const SalaryDetails = require('../models/salaryDetails-model');

const createSalaryDetails = async (req, res) => {
    try {
        const salaryDetails = new SalaryDetails(req.body);
        const savedSalaryDetails = await salaryDetails.save();
        //res.status(201).json(savedSalaryDetails);
        return res.json({
            success: true,
            statusCode: 201,
            message: "SalaryDetails created successfully!",
            data: savedSalaryDetails
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSalaryDetails = async (req, res) => {
    try {
        const salaryDetails = await SalaryDetails.find();
        res.json(salaryDetails);

    } catch (err) {
        console.log("error: ", error);
    }
};

const getSalaryDetailsByEmployeeId = async (req, res) => {
    try {

        const salaryDetails = await SalaryDetails.findOne({ employeeId: req.params.employeeId });
        console.log("salaryDetails :", salaryDetails );

        if (!salaryDetails) {
            let customError = new Error("Salary details not found!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Salary details fetch successfully!",
            data: salaryDetails
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSalaryDetails, getSalaryDetailsByEmployeeId, getSalaryDetails }



