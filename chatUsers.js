//This will need to change to integrate the users in mongodb,
//for now I am just setting it up so a user can enter a name
//and a chat room and join if there is not a user with that 
//name already in the chatroom

const chatUsers = [];

const addUserToChat = ( { id, userName, roomName } ) => {
    
    //trim and makes lowercase username and chat room name 
    userName = userName.trim().toLowerCase();
    roomName = roomName.trim().toLowerCase();

    //returns error username and room are not entered
    if (!userName || !roomName) return {

        error: 'User name and room name are required to enter the chat room.'
    
    }

    const user = { id, userName, roomName};

    //adds user to array of users
    chatUsers.push(user);

    return {user};

}

const removeUserFromChat = (id) => {

    const userIndex = chatUsers.findIndex((user) => 
    
        user.id === id
    
    );

    if (userIndex !== -1) {

        return chatUsers.splice(userIndex, 1)[0];

    }

}

const getUsersInRoom = ((roomName) => 

    chatUsers.filter((user) => user.roomName === roomName)

)

const getUser = (id) => {
   
    chatUsers.find((user) => user.id === id);

}



module.exports = { addUserToChat, removeUserFromChat, getUser, getUsersInRoom };