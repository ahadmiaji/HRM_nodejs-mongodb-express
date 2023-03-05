const Employee = require('../models/employee-model');
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken"); //before use make sure you required refreshtoken.
const jwt = require("jsonwebtoken");
const { getDepartmentInfoByFilterQuery } = require('./department-controller');
const validateMongoDbId = require("../utils/validateMongodbId");


const getEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const annualDays = employee.getAnnualDays();
        res.json({ employee, annualDays });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getEmployeeByFilterQuery = async () => {
    try {
        return await Employee.find();
    } catch (error) {
        throw error;
    }
};

const getEmployeeInfoByFilterQuery = async (id) => {
    try {
        return await Employee.findById(id);
    } catch (error) {
        throw error
    }
};

const getAllEmployee = async (req, res) => {
    try {

        const employees = await getEmployeeByFilterQuery();

        if (!employees) {
            let customError = new Error("Invalid employee info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Employee fetch successfully!",
            data: employees
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const addEmployeeInfo = asyncHandler(async (req, res) => {
    try {

        const input = req.body;

        const employeeInfo = await getDepartmentInfoByFilterQuery(input.departmentId);

        if (!employeeInfo) {
            let customError = new Error("Invalid department info!");
            customError.statusCode = 404;
            throw customError;
        }

        input.designationName = employeeInfo.name;

        const employee = await Employee.create(input);

        return res.json({
            success: true,
            statusCode: 201,
            message: "Employee created successfully!",
            data: employee
        });
    } catch (error) {
        console.log("error: ", error);
    }
});

const updateEmployee = asyncHandler(async (req, res) => {

    try {
        const updateData = req.body;
        console.log("updateData :", updateData);

        const employeeInfo = await getEmployeeInfoByFilterQuery(updateData.id);

        if (!employeeInfo) {
            console.log("employeeInfo :", employeeInfo);
            let customError = new Error("Invalid employeeInfo!");
            customError.statusCode = 404;
            throw customError;
        }

        const employee = new Employee(employeeInfo);

        let isChanged = false;

        if (updateData.name && employeeInfo.name !== updateData.name) {
            isChanged = true;
            employee.name = updateData.name;
        }

        if (updateData.hireDate && employeeInfo.hireDate !== updateData.hireDate) {
            isChanged = true;
            employee.hireDate = updateData.hireDate;
        }

        if (updateData.departmentId && employeeInfo.departmentId.toString() !== updateData.departmentId.toString()) {

            const employeeInfo = getEmployeeInfoByFilterQuery(updateData.departmentId);

            if (!employeeInfo) {
                let customError = new Error("Invalid department info!");
                customError.statusCode = 404;
                throw customError;
            }

            isChanged = true;
            employee.departmentId = employeeInfo._id;
            employee.departmentName = employeeInfo.name;
        }

        if (updateData.designationId && employeeInfo.designationId.toString() !== updateData.designationId.toString()) {

            const employeeInfo = getEmployeeInfoByFilterQuery(updateData.designationId);

            if (!employeeInfo) {
                let customError = new Error("Invalid employee info!");
                customError.statusCode = 404;
                throw customError;
            }

            isChanged = true;
            employee.designationId = employeeInfo._id;
            employee.designationName = employeeInfo.name;

        }

        if (isChanged) {
            const employeeInfo = await employee.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Employee updated successfully!",
                details: employeeInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Employee updated successfully!",
            details: employeeInfo
        });

    } catch (error) {
        throw error;
    }
});

// const updateEmployee = asyncHandler(async (req, res) => {
//     try {
//         const { name, hireDate, departmentName, departmentId } = req.body;

//         // await validateMongoDbId(req.body.id);

//         const employeeInfo = await Employee.findById(req.body.id);
//         console.log("employeeInfo :", employeeInfo);

//         if (!employeeInfo) {
//             let customError = new Error("Employee not found");
//             customError.statusCode = 404;
//             throw customError;
//         }

//         const employee = new Employee(employeeInfo);

//         let isChanged = false;

//         if (name && name !== employeeInfo.name) {
//             isChanged = true;
//             employee.name = name;
//         }

//         if (hireDate && hireDate !== employeeInfo.hireDate) {
//             isChanged = true;
//             employee.hireDate = hireDate;
//         }

//         if (departmentId && departmentId !== employeeInfo.departmentId) {
//             isChanged = true;
//             employee.departmentId = departmentId;
//         }

//         if (departmentName && departmentName !== employeeInfo.departmentName) {
//             isChanged = true;
//             employee.departmentName = departmentName;
//         }

//         if (designationId && designationId !== employeeInfo.designationId) {
//             isChanged = true;
//             employee.designationId = designationId;
//         }

//         if (designationName && designationName !== employeeInfo.designationName) {
//             isChanged = true;
//             employee.designationName = designationName;
//         }

//         if (isChanged) {
//             const updateEmployeeInfo = await employee.save();
//             return await successResponseHandler(res, 200, "Employee updated successfully!", "details", updateEmployeeInfo);
//         }

//         // return await successResponseHandler(res, 200, "Employee updated successfully!", "details", employeeInfo);
//         return res.json({
//             success: true,
//             statusCode: 200,
//             message: "Employee updated successfully!",
//             details: employeeInfo
//         });

//     } catch (error) {
//         throw new Error(error);
//     }
// });

module.exports = { getEmployee, getAllEmployee, addEmployeeInfo, updateEmployee };
