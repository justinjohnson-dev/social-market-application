const express = require("express");
const router = express.Router();

//require model
const chatRoom = require("../../models/chatRoom");

//when user creates a chat room
router.post("/createChat", (req, res) => {

    //room, user are assigned values from request body
    const {room, user} = req.body;
    
    //inputs empty, error
    if(!user || !room ) {
        res.status.apply(400).json({
            error: "All inputs must be filled"
        });
        return;
    }
    
    //searches db for existing room
    chatRoom.find({room}).then(rooms => {

            //room exists
            if(rooms.length > 0) {
                res.status(400).json({ room: `Room already exists. Try joining it instead of creating a new one.`});
            } 
            
            //create and save new room in db
            else {           

                //new document
                let newChatRoom = new chatRoom({user, room});

                //save document
                newChatRoom.save((err, success) => {
                    if(err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });    
                    }
                    res.json(success);
                });
            }        

        });  
    });
    
    //gets a room by the room name
    router.get('/getChatRoom/:roomName', async (req, res) => {
    try {

        //room name assigned value from request params
        const {roomName} = req.params;
        
        //searches for existing room
        const room = await chatRoom.find({room: roomName});
        
        //responds with room name
        if(room.length > 0){
            res.json(room[0]);
        }
        
        //not found
        else{
            res.status(404).send({error: 'Chat room not found!'})
        }

    } catch (err) {
        res.json({ message: "Error" })
    }

});

module.exports = router;