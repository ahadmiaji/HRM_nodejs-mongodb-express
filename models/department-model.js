const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
