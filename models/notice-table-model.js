const mongoose = require('mongoose');

const noticetableSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: Date,
    },
    publishDate :{
        type: Date,
    },
    attachFile:{
        type : String
    }

}, { timestamps: true });
module.exports = mongoose.model('NoticeTable', noticetableSchema);
