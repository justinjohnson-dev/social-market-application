const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const NameSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    }
})

//create model for name
const Name = mongoose.model('name', NameSchema);
module.exports = Name;