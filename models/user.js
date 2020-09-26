const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
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

//create model for name
module.exports = User = mongoose.model('user', userSchema);
