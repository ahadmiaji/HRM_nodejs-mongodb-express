const Department = require("../models/department-model");

//get all department info by filter query

const getDepartmentInfoByFilterQuery = async (id) => {
    try {
        return await Department.findById(id);
    } catch (error) {
        throw error;
    }
};

//Get a Departmentinfo by filter query
const getDepartmentByFilterQuery = async () => {
    try {
        return await Department.find();
    } catch (error) {
        throw error;
    }
};

const addInfo = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;
        const department = await Department.create(req.body);


        return res.json({
            success: true,
            statusCode: 201,
            message: "Department created successfully!",
            data: department
        });

    } catch (error) {
        console.log("error: ", error);
    }
};

const getAll = async (req, res) => {
    try {

        const department = await getDepartmentByFilterQuery();

        if (!department) {
            let customError = new Error("Invalid department info!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Department fetch successfully!",
            data: department
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const getInfo = async (req, res) => {
    try {

        const departmentInfo = await getDepartmentInfoByFilterQuery(req.params.id);
        

        if (!departmentInfo) {
            let customError = new Error("Invalid departmentInfo!");
            customError.statusCode = 404;
            throw customError;
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "DepartmentInfo fetch successfully!",
            details: departmentInfo
        });

    } catch (error) {
        console.log("Error: ", error);
    }
};

const updateDepartmentInfo = async (req, res) => {
    try {
        const updateData = req.body;

        const departmentInfo = await getDepartmentInfoByFilterQuery(updateData.id);

        if (!departmentInfo) {
            let customError = new Error("Invalid departmentInfo!");
            customError.statusCode = 404;
            throw customError;
        }

        const department = new Department(departmentInfo);

        let isChanged = false;

        if (updateData.name && departmentInfo.name !== updateData.name) {
            isChanged = true;
            department.name = updateData.name;
        }

        if (updateData.description && departmentInfo.description !== updateData.description) {
            isChanged = true;
            department.description = updateData.description;
        }

        if (isChanged) {
            const updatedepartmentInfo = await department.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "Department updated successfully!",
                details: updatedepartmentInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "Department updated successfully!",
            details: departmentInfo
        });

    } catch (error) {
        throw error;
    }
};
const deleteDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { addInfo, getAll, getInfo, updateDepartmentInfo, getDepartmentInfoByFilterQuery, deleteDepartmentById };
