const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const postSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    location: {
        type: String,
        required: true,
        maxlength: 500
    },
    farmer: {
        type: String,
        maxlength: 32
    }
}, { timestamps: true }
);

//create model for post
module.exports = Post = mongoose.model('post', postSchema);
