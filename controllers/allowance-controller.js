const Allowance = require("../models/allowance-model");

const createAllowance = async (req, res) => {
    try {
        const allowance = await Allowance.create(req.body);


        return res.json({
            success: true,
            statusCode: 201,
            message: "Allowance created successfully!",
            data: allowance
        });
    } catch (error) {
        console.log("error: ", error);
    }
};

const getAllowance = async (req, res) => {

    try {
        const allowance = await Allowance.find();
        res.json(allowance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllowanceById = async (req, res) => {
    try {
        const allowance = await Allowance.findById(req.params.id);
        if (!allowance) {
            return res.status(404).json({ message: 'Allowance not found' });
        }
        res.json(allowance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAllowance = async (req, res) => {
    try {
        const updateData = req.body;

        const allowanceInfo = await Allowance.findById(updateData.id);

        if (!allowanceInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'Allowance not found' });
        }

        const allowance = new Allowance(allowanceInfo);

        let isChanged = false;

        if (updateData.name && allowanceInfo.name !== updateData.name) {
            isChanged = true;
            allowance.name = updateData.name;
        }

        if (updateData.allowanceType && allowanceInfo.allowanceType !== updateData.allowanceType) {
            isChanged = true;
            allowance.allowanceType = updateData.allowanceType;
        }

        if (updateData.PercentageOfBasic && allowanceInfo.PercentageOfBasic !== updateData.PercentageOfBasic) {
            isChanged = true;
            allowance.PercentageOfBasic = updateData.PercentageOfBasic;
        }
        if (updateData.limitPerMonth && allowanceInfo.limitPerMonth !== updateData.limitPerMonth) {
            isChanged = true;
            allowance.limitPerMonth = updateData.limitPerMonth;
        }

        if (isChanged) {
            const updatedallowanceInfo = await allowance.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Allowance updated successfully!",
                details: updatedallowanceInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Allowance updated successfully!",
            details: allowanceInfo
        });

    } catch (error) {
        throw error;
    }
};

const DeleteAllowanceById = async (req, res) => {
    try {
        const allowance = await Allowance.findByIdAndDelete(req.params.id);
        if (!allowance) {
            return res.status(404).json({ message: 'Allowance not found' });
        }
        res.json(allowance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createAllowance, getAllowance, getAllowanceById, updateAllowance, DeleteAllowanceById }