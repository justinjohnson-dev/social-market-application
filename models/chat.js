const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for chat
const chatSchema = new Schema({
    
    //reference to chat room to hold chats for a chat history
    room: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'chatRoom'
    },
    senderName: {
        type: String,
    },
    message: {
        type: String,
    },
    created: {type: Date,  default: Date.now}

});

//create model for chat
module.exports = mongoose.model('chat', chatSchema);
