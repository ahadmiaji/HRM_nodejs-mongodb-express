const EmployeeAward = require ("../models/EmployeeAward-model");

const createEmployeeAward = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;

        const employeeaward = await EmployeeAward.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "EmployeeAward Created Successfully!",
            data: employeeaward
        })

    } catch (error) {
        console.log("error: ", error);
    }
};

const getEmployeeAward = async (req, res) => {
    try {
        const employeeaward = await EmployeeAward.find();
        res.json(employeeaward);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeAwardById = async (req, res) => {
    try {
        const employeeaward = await EmployeeAward.findById(req.params.id);

        if (!employeeaward) {
            return res.status(404).json({ message: "EmployeeAward not Found" });
        }

        res.json(employeeaward);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployeeAward = async (req, res) => {
    try {
        const employeeaward = await EmployeeAward.findByIdAndDelete(req.params.id);

        if (!employeeaward) {
            return res.status(404).json({
                message: "EmployeeAward not Found"
            });
        }
        return res.json({
            success: true,
            statusCode: 201,
            message: "EmployeeAward deleted Successfully!",
            data: employeeaward
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployeeAward = async (req, res) => {

    try {
        const updateData = req.body;


        const employeeawardInfo = await EmployeeAward.findById(updateData.id);

        if (!employeeawardInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'EmployeeAward not found' });
        }

        const employeeaward = new EmployeeAward(employeeawardInfo);

        let isChanged = false;

        if (updateData.awardName && employeeawardInfo.awardName !== updateData.awardName) {
            isChanged = true;
            employeeaward.awardName = updateData.awardName;
        }

        if (updateData.giftItem && employeeawardInfo.giftItem !== updateData.giftItem) {
            isChanged = true;
            employeeaward.giftItem = updateData.giftItem;
        }

        if (updateData.month && employeeawardInfo.month !== updateData.month) {
            isChanged = true;
            employeeaward.month = updateData.month;
        }


        if (isChanged) {
            const updatedemployeeawardInfo = await employeeaward.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "EmployeeAward updated successfully!",
                details: updatedemployeeawardInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "EmployeeAward updated successfully!",
            details: employeeawardInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports ={
createEmployeeAward,
getEmployeeAward,
getEmployeeAwardById,
deleteEmployeeAward,
updateEmployeeAward
}