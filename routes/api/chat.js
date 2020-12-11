const express = require("express");
const router = express.Router();

//require model for chats
const chat = require("../../models/chat");

    //gets chat messages by specified room id
    router.get('/getChats/:roomId', async (req, res) => {
        
        try {

            //room id 
            const {roomId} = req.params;
            
            //searches for  
            const chats = await chat.find({room: roomId});
            
            //chats found
            if(chats.length > 0){
                
                //creates chat
                const createChat = (item)=> {
                    return { name: item.senderName, text: item.message };
                }
                
                //chat history gotten for chat documents
                const chatHistory = chats.map(chatItem=>createChat(chatItem))
        
                //response sent in json format
                res.json(chatHistory);
                
            }
            
            //not found
            else {
                res.status(404).send({error: 'No chats found!'})
            }
        
        } catch (err) {
            res.json({ message: "Error" })
        }

    });

module.exports = router;