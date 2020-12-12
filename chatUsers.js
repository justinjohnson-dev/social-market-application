const users = [];

// adds user
const addUser = ( {id, name, room} ) => {

    name = name.trim().toLowerCase();
    
    room = room.trim().toLowerCase();

    if(!name || !room) return { error: 'Username and room are required.' };

    //create user
    const user = { id, name, room };

    //push user onto array
    users.push(user)

    return {user};
}

// remove user
const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {

        return users.splice(index, 1)[0];

    }
}


const getUser = (id) => users.find((user) => user.id ===id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };