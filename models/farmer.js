const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const farmerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    password: {
        type: String,
        required: true
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true }
);

//create model for farmer
module.exports = Farmer = mongoose.model('farmer', farmerSchema);
