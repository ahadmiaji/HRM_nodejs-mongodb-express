const EmployeeBonus = require("../models/EmployeeBonus-model");

const createEmployeeBonus = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;
        // req.body.bonusSettingId = req.user._id;
        // req.body.employeeId = req.body._id;

        // console.log("req.body: ", req.body);
        const employeebonus = await EmployeeBonus.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "EmployeeBonus Created Successfully!",
            data: employeebonus
        })

    } catch (error) {
        console.log("error: ", error);
    }
};


const getEmployeeBonus = async (req, res) => {
    try {
        const employeebonus = await EmployeeBonus.find();
        res.json(employeebonus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeBonusById = async (req, res) => {                                       
    try {
        const employeebonus = await EmployeeBonus.findById(req.params.id);

        if (!employeebonus) {
            return res.status(404).json({ message: "EmployeeBonus not Found" });
        }

        res.json(employeebonus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployeeBonus = async (req, res) => {
    try {
        const employeebonus = await EmployeeBonus.findByIdAndDelete(req.params.id);

        if (!employeebonus) {
            return res.status(404).json({
                message: "EmployeeBonus not Found"
            });
        }
        return res.json({
            success: true,
            statusCode: 201,
            message: "EmployeeBonus deleted Successfully!",
            data: employeebonus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployeeBonus = async (req, res) => {

    try {
        const updateData = req.body;


        const employeebonusInfo = await EmployeeBonus.findById(updateData.id);

        if (!employeebonusInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'EmployeeBonus not found' });
        }

        const employeebonus = new EmployeeBonus(employeebonusInfo);

        let isChanged = false;

        if (updateData.month && employeebonusInfo.month !== updateData.month) {
            isChanged = true;
            employeebonus.month = updateData.month;
        }

        if (updateData.grossSalary && employeebonusInfo.grossSalary !== updateData.grossSalary) {
            isChanged = true;
            employeebonus.grossSalary = updateData.grossSalary;
        }

        if (updateData.basicSalary && employeebonusInfo.basicSalary !== updateData.basicSalary) {
            isChanged = true;
            employeebonus.basicSalary = updateData.basicSalary;
        }

        if (updateData.bonusAmount && employeebonusInfo.bonusAmount !== updateData.bonusAmount) {
            isChanged = true;
            employeebonus.bonusAmount = updateData.bonusAmount;
        }

        if (updateData.tax && employeebonusInfo.tax !== updateData.tax) {
            isChanged = true;
            employeebonus.tax = updateData.tax;
        }



        if (isChanged) {
            const updatedemployeebonusInfo = await employeebonus.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "EmployeeBonus updated successfully!",
                details: updatedemployeebonusInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "EmployeeBonus updated successfully!",
            details: employeebonusInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createEmployeeBonus,
    getEmployeeBonus,
    getEmployeeBonusById,
    deleteEmployeeBonus,
    updateEmployeeBonus

}