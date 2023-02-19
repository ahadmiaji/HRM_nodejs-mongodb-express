const LeaveType = require('../models/leave-type-model');

//Get all leave type info by filter query
const getLeaveTypeInfoByFilterQuery = async (id) => {
    try {
        return await LeaveType.findById(id);
    } catch (error) {
        throw error;
    }
};

//Get a leave type info by filter query
const getLeaveTypesByFilterQuery = async () => {
    try {
        return await LeaveType.find();
    } catch (error) {
        throw error;
    }
};

const addInfo = async (req, res) => {
    try {
        const leaveTypes = await LeaveType.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "Leave type created successfully!",
            data: leaveTypes
        });

    } catch (error) {
        console.log("error: ", error);
    }
};

const getAll = async (req, res) => {
    try {

        const leaveTypes = await getLeaveTypesByFilterQuery();

        if (!leaveTypes) {
            let customError = new Error("Invalid leave type info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Leave type fetch successfully!",
            data: leaveTypes
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const getInfo = async (req, res) => {
    try {

        const leaveTypeInfo = getLeaveTypeInfoByFilterQuery(req.params.id);

        if (!leaveTypeInfo) {
            let customError = new Error("Invalid leave type info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Leave type info fetch successfully!",
            details: leaveTypeInfo
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const updateInfo = async (req, res) => {
    try {
        const updateData = req.body;

        const leaveTypeInfo = await getLeaveTypeInfoByFilterQuery(updateData.id);

        if (!leaveTypeInfo) {
            let customError = new Error("Invalid leave type info!");
            customError.statusCode = 404;
            throw customError;
        }

        const leaveType = new LeaveType(leaveTypeInfo);

        let isChanged = false;

        if (updateData.name && leaveTypeInfo.name !== updateData.name) {
            isChanged = true;
            leaveType.name = updateData.name;
        }

        if (updateData.numberOfDays && leaveTypeInfo.numberOfDays !== updateData.numberOfDays) {
            isChanged = true;
            leaveType.numberOfDays = updateData.numberOfDays;
        }

        if (typeof updateData.active === 'boolean' && leaveTypeInfo.active !== updateData.active) {
            isChanged = true;
            leaveType.active = updateData.active;
        }

        if (isChanged) {
            const updateLeaveTypeInfo = await leaveType.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Leave type updated successfully!",
                details: updateLeaveTypeInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Leave type updated successfully!",
            details: leaveTypeInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports = { addInfo, getAll, getInfo, updateInfo };
