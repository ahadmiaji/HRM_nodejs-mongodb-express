const mongoose = require('mongoose');

const BonusSettingSchema = new mongoose.Schema({
    festival_name: {
        type: String,
        required: true,
        unique: true
    },
    percentage_of_bonus: {
        type: Number,
        required: true
    },
    bonus_type: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        require: true
    }
},{timestamps:true});

module.exports = mongoose.model('BonusSetting', BonusSettingSchema);