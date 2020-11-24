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
    photo: {
        data: Buffer,
        contentType: String
    },
    farmer: {
        type: String,
        maxlength: 32
    },
    highlight1: {
        data: Buffer,
        contentType: String
    },
    highlight2: {
        data: Buffer,
        contentType: String
    },
    farmerId: {
        type: String,
        trim: true
    },
    usersLiked: {
        type: Array,
        trim: true
    }
}, { timestamps: true }
);

//create model for post
module.exports = Post = mongoose.model('post', postSchema);
