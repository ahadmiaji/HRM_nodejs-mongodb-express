const AnnualDays = require("../models/annuaDays-model");

const createAnnualDays = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;

        const annualdays = await AnnualDays.create(req.body);

        return res.json({
            success: true,
            statusCode: 201,
            message: "AnnualDays Created Successfully!",
            data: annualdays
        })
    } catch (error) {
        console.log("error:", error);
    }
};

const getAnnualDays = async (req, res) => {
    try {
        const annualdays = await AnnualDays.find();
        res.json(annualdays)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnnualDaysById = async (req, res) => {
    try {
        const annualdays = await AnnualDays.findById(req.prams.id);

        if (!annualdays) {
            return res.status(404).json({ message: 'AnnualDays not found' });
        }

        res.json(annualdays);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAnnualDays = async (req, res) => {
    try {
        const annualdays = await AnnualDays.findByIdAndDelete(req.params.id);

        if (!annualdays) {
            return res.status(404).json({ message: 'AnnualDays not found' });
        }

        return res.json({
            success: true,
            statusCode: 201,
            message: "AnnualDays deleted successfully!",
            data: annualdays
        });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};


const updateAnnualDays = async (req, res) => {

    try {
        const updateData = req.body;


        const annualdaysInfo = await AnnualDays.findById(updateData.id);

        if (!annualdaysInfo) {
            return res.status(404).json({ succes: false, statusCode: 404, message: 'AnnualDays not found' });
        }

        const annualdays = new AnnualDays(annualdaysInfo);

        let isChanged = false;

        if (updateData.year && annualdaysInfo.year !== updateData.year) {
            isChanged = true;
            annualdays.year = updateData.year;
        }

        if (updateData.annualLeaves && annualdaysInfo.annualLeaves !== updateData.annualLeaves) {
            isChanged = true;
            annualdays.annualLeaves = updateData.annualLeaves;
        }

        if (updateData.sickLeaves && annualdaysInfo.sickLeaves !== updateData.sickLeaves) {
            isChanged = true;
            annualdays.sickLeaves = updateData.sickLeaves;
        }

        if (updateData.casualLeaves && annualdaysInfo.casualLeaves !== updateData.casualLeaves) {
            isChanged = true;
            annualdays.casualLeaves = updateData.casualLeaves;
        }

        if (updateData.publicHolidays && annualdaysInfo.publicHolidays !== updateData.publicHolidays) {
            isChanged = true;
            annualdays.publicHolidays = updateData.publicHolidays;
        }


        if (isChanged) {
            const updatedannualdaysInfo = await annualdays.save();

            return res.json({
                success: true,
                statusCode: 200,
                message: "AnnualDays updated successfully!",
                details: updatedannualdaysInfo
            });
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "AnnualDays updated successfully!",
            details: annualdaysInfo
        });

    } catch (error) {
        throw error;
    }
};



module.exports = {
  createAnnualDays,
  getAnnualDays,
  getAnnualDaysById,
  updateAnnualDays,
  deleteAnnualDays
}