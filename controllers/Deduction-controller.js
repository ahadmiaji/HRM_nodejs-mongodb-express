const Deduction = require("../models/Deduction-model");

const createDeduction = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;
        
        const deduction = await Deduction.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "Deduction Created Successfully!",
            data: deduction
        })

    } catch (error) {
        console.log("error: ", error);
    }
};


const getDeduction = async (req, res) => {
    try {
        const deduction = await Deduction.find();
        res.json(deduction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDeductionById = async (req, res) => {
    try {
        const deduction = await Deduction.findById(req.params.id);

        if (!deduction) {
            return res.status(404).json({ message: "Deduction not Found" });
        }

        res.json(deduction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDeduction = async (req, res) => {
    try {
        const deduction = await Deduction.findByIdAndDelete(req.params.id);

        if (!deduction) {
            return res.status(404).json({
                message: "Deduction not Found"
            });
        }
        return res.json({
            success: true,
            statusCode: 201,
            message: "Deduction deleted Successfully!",
            data: deduction
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDeduction = async (req, res) => {

    try {
        const updateData = req.body;


        const deductionInfo = await Deduction.findById(updateData.id);

        if (!deductionInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'Deduction not found' });
        }

        const deduction = new Deduction(deductionInfo);

        let isChanged = false;

        if (updateData.deduction_name && deductionInfo.deduction_name !== updateData.deduction_name) {
            isChanged = true;
            deduction.deduction_name = updateData.deduction_name;
        }

        if (updateData.deduction_type && deductionInfo.deduction_type !== updateData.deduction_type) {
            isChanged = true;
            deduction.deduction_type = updateData.deduction_type;
        }

        if (updateData.percentage_of_basic && deductionInfo.percentage_of_basic !== updateData.percentage_of_basic) {
            isChanged = true;
            deduction.percentage_of_basic = updateData.percentage_of_basic;
        }

        if (updateData.limit_per_month && deductionInfo.limit_per_month !== updateData.limit_per_month) {
            isChanged = true;
            deduction.limit_per_month = updateData.limit_per_month;
        }


        if (isChanged) {
            const updateddeductionInfo = await deduction.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Deduction updated successfully!",
                details: updateddeductionInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Deduction updated successfully!",
            details: deductionInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createDeduction,
    getDeduction,
    getDeductionById,
    deleteDeduction,
    updateDeduction

}