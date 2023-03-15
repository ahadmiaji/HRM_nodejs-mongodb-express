const mongoose = require('mongoose');

const allowanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    allowanceType: {
        type: String,
        enum: [
            "PERCENTAGE", "FIXED"
        ]
    },
    
    PercentageOfBasic : {
        type: Number,
        required: true,
    },
    limitPerMonth :{
        type: Number,
        required: true,
    },
    createdBy: {
        type: Date,
    }
    
},{timestamps: true});
module.exports = mongoose.model('Allowance', allowanceSchema);
