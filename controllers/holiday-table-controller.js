const HolidayTable = require("../models/holiday-table-model");

const createHolidayTable = async (req, res) => {
    try {
        const holidaytable = await HolidayTable.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "HolidayTable created successfully!",
            data: holidaytable
        })
    } catch (error) {
        console.log("error : ", error);
    }
};

const getholidaytable = async (req, res) => {
    try {
        const holidaytable = await HolidayTable.find();
        res.json(holidaytable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHolidayTableById = async (req, res) => {
    try {
        const holidaytable = await HolidayTable.findById(req.params.id);
        if (!holidaytable) {
            return res.status(404).json({ message: 'Noticetable not found' });
        }
        res.json(holidaytable);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const deleteHolidayTableById = async (req, res) => {
    try {
        const holidaytable = await HolidayTable.findByIdAndDelete(req.params.id);
        if (!holidaytable) {
            return res.status(404).json({ message: 'HolidayTable not found' });
        }
        res.json(holidaytable);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const updateHolidayTable = async (req, res) => {

    try {
        const updateData = req.body;


        const holidaytableInfo = await HolidayTable.findById(updateData.id);

        if (!holidaytableInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'HolidayTable not found' });
        }

        const holidaytable = new HolidayTable(holidaytableInfo);

        let isChanged = false;

        if (updateData.name && holidaytableInfo.name !== updateData.name) {
            isChanged = true;
            holidaytable.name = updateData.name;
        }


        

        if (isChanged) {
            const updatedholidaytableInfo = await holidaytable.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "HolidayTable updated successfully!",
                details: updatedholidaytableInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "HolidayTable updated successfully!",
            details: holidaytableInfo
        });

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createHolidayTable,
    getholidaytable,
    getHolidayTableById,
    deleteHolidayTableById,
    updateHolidayTable
};