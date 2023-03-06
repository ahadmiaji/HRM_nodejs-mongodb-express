const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    trainingList: {
        type: String,
        required: true
    },
    trainingType: {
        type: String,
        required: true
    },
    trainerList: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Training', trainingSchema);
