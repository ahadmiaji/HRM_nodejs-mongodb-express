const mongoose = require('mongoose');

const holidaytableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('HolidayTable', holidaytableSchema);
