/* 

Previous implementation of the chat that did not work. 
Has been updated in the component ChatRedux in the file ChatRedux.js

*/





// import React, { useState, useEffect } from 'react';
// import queryString from "query-string";
// import io from 'socket.io-client';
// import './Chat.css';

// import TextContainer from './TextContainer/TextContainer.js';
// import RoomInfo from './RoomInfo/RoomInfo';
// import TextInput from './TextInput/TextInput';
// import Messages from './Messages/Messages';


// const PORT = 'localhost:5000';

// let socket;

// const Chat = ({ location }) => {
    
//     const [userName, setUserName] = useState('');
//     const [roomName, setUserRoom] = useState('');
//     const [usersInRoom, setUsersInRoom] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect( () => {

//         const {userName, roomName} = queryString.parse(location.search);

//         socket = io(PORT);

//         setUserName(userName);
//         setUserRoom(roomName);

//         socket.emit('join', {userName, roomName}, (error) => {
//             if (error) {
//                 alert(error);
//             }
//         });

//     }, [PORT, location.search]);

//     useEffect( () => {

//         socket.on('message', message => {

//         setMessages(message => [...messages, message]);

//         });
        
//         socket.on('roomUsers', ({ usersInRoom })=> {

//             setUsersInRoom(usersInRoom);

//         });


//     }, []);

//     const sendMessage = (event) => {

//         event.preventDefault();

//         if (message) {
            
//             socket.emit('sendMessage', message, () => setMessage(''));

//         }

//     }

//     return (
//         <div className='outerContainer'>
//             <div className='container'>
//                <RoomInfo room={roomName}/>
               
//                <Messages messages={messages} name={userName}/>

//                <TextInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
//             </div>
//             <TextContainer users={usersInRoom}/>
//         </div>
//    );

// }

// export default Chat;