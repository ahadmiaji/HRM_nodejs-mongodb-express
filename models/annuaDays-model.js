const mongoose = require('mongoose');

const annualDaysSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,   
    },
    annualLeaves: {
        type: Number,
        required: true
    },
    sickLeaves: {
        type: Number,
        required: true
    },
    casualLeaves: {
        type: Number,
        required: true
    },
    publicHolidays: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('AnnualDays', annualDaysSchema);

// const annualdaysRouter = require("./annualdays-route");

// router.use("/api/v1/annual-days", );