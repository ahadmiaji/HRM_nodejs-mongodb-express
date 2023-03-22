const mongoose = require('mongoose');

const DeductionSchema = new mongoose.Schema({
    deduction_name: {
        type: String,
        required: true
    },
    deduction_type: {
        type: String,
        required: true
    },
    percentage_of_basic: {
        type: Number,
        required: true
    },
    limit_per_month: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        require: true
    }
},{timestamps:true});

module.exports = mongoose.model('DeductionSchema', DeductionSchema);
