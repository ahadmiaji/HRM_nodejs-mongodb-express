const Designation = require("../models/designation-model");

//get all Designation info by filter query

const getDesignationInfoByFilterQuery = async (id) => {
    try {
        return await Designation.findById(id);
    } catch (error) {
        throw error
    }
};

//get a Designation info by filter query

const getDesignationListByFilterQuery = async () => {
    try {
        return await Designation.find();
    } catch (error) {
        throw error
    }
};

const addDesignationInfo = async (req, res) => {

    try {
        const designation = await Designation.create(req.body);
        // console.log("designation:",designation);


        return res.json({
            success: true,
            statusCode: 201,
            message: "Designation created successfully!",
            data: designation
        });

    } catch (error) {
        console.log("error: ", error);
    }
};

const getAllDesignation = async (req, res) => {
    try {
        const designation = await getDesignationListByFilterQuery();

        if (!designation) {
            let customError = new Error("Invalid designation info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Designation fetch successfully!",
            data: designation
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const getDesignationInfo = async (req, res) => {
    try {

        const designationInfo = await getDesignationInfoByFilterQuery(req.params.id);

        if (!designationInfo) {
            let customError = new Error("Invalid designation info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Designation info fetch successfully!",
            details: designationInfo
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const updatedesignationInfo = async (req, res) => {
    try {
        const updateData = req.body;

        const designationInfo = await getDesignationInfoByFilterQuery(updateData.id);

        if (!designationInfo) {
            let customError = new Error("Invalid designationInfo!");
            customError.statusCode = 404;
            throw customError;
        }

        const designation = new Designation(designationInfo);

        let isChanged = false;

        if (updateData.name && designationInfo.name !== updateData.name) {
            isChanged = true;
            designation.name = updateData.name;
        }

        if (updateData.description && designationInfo.description !== updateData.description) {
            isChanged = true;
            designation.description = updateData.description;
        }

        if (updateData.status && designationInfo.status !== updateData.status) {
            isChanged = true;
            designation.status = updateData.status;
        }

        if (isChanged) {
            const updatedesignationInfo = await designation.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Designation updated successfully!",
                details: updatedesignationInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Designation updated successfully!",
            details: designationInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports = {
    addDesignationInfo,
    getAllDesignation,
    getDesignationInfo,
    updatedesignationInfo,
};