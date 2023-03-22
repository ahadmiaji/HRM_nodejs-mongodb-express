const mongoose = require('mongoose');

const holidaytableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('HolidayTable', holidaytableSchema);
