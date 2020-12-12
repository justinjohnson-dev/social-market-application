const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for a single chatroom
let chatRoom = new Schema({
    
    room: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    users: [{
        name: String,
    }],
    //reference to chat room to hold chats for a chat history
    chats: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'chat'
    }] 

});

//create model for room
module.exports = chatRoom = mongoose.model('chatRoom', chatRoom);
