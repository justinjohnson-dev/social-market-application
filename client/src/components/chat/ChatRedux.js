import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import RoomInfo from './RoomInfo/RoomInfo';
import TextInput from './TextInput/TextInput';
import Messages from './Messages/Messages';
import queryString from 'querystring';
import io from 'socket.io-client';

import { getChatRoom } from '../actions/chatActions';

import './Chat.css';

let socket;
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || "localhost:80") : "localhost:5000";

class ChatRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",    
            roomName: "",
            roomUsers: [],
            message: "",
            messages: [],
            errors: {},
            chatRoom: {},
            chatHistory: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    //gets a chat room from the db by the name of the room
    getChatRoom = (roomName)=>{
        return axios
            .get(`api/chatRoom/getChatRoom/${roomName}`)
            .then(response => {

                //set state of chat room to be response data
                this.setState({chatRoom: response.data})
                //gets chats by reference to id of chat object housed in chat room document
                this.getChats(response.data._id);
            })
            .catch(error => console.log(error.message))
    }

    //gets a chat history from the db by the name of the room
    getChats = (roomId)=>{
         axios
            .get(`api/chat/getChats/${roomId}`)
            .then(response => this.setState({messages: [...this.state.messages,  ...response.data]}))
            .catch(error => console.log(error.message))
    }

    //mount and re-render
    componentDidMount() {

        //recieve location and set constants to parsed values of user and room name from url
        const {location} = this.props;
        const {user, roomName} = queryString.parse(location.search);

        //http request to get the specific room id by room name
        this.getChatRoom(roomName);

        //set state of user, roomname - triggers re-render
        this.setState({user, roomName})

        //socket connection, changes from request polling to init web socket on join, create to use for sending messages etc.
        socket = io(PORT, {transports: ['websocket']});

        //join info to 
        socket.emit('join', { name: user, room: roomName }, (error) => {

            if(error) {
              alert(error);
            }
            
        });

        //on mount
        socket.on('message', message => { 

            //sets state of messages, adds
            this.setState({messages: [...this.state.messages, message]});
            });
    
        }

    //on unmount
    componentWillUnmount(){

        socket.off()

    }

    //set message
    setMessage = ( {message} ) => {

        this.setState({
            message: message
        })     

    }

    //set message
    setMessages = ({message}) => {

        this.setState({
            messages: [...this.state.messages,message]
        })

    }
    
    //send
    sendMessage = (message) => {  

        if (message) {

            //constant chat composed of room, a sender name, and a message
            const chat = {
                room: this.state.chatRoom._id,
                senderName: this.state.user,
                message
            };

            //set state of message
            this.setState({
                message
            })

            //emit to users
            socket.emit('sendMessage', chat);
            
        }
    }

    render() {

        const {roomName, messages, message, user} = this.state;

        return (

            <div className="outerContainer">
                <div className='container'>
                    <RoomInfo roomName={roomName}/>
                    
                    <Messages messages={messages} user={user}/>

                    <TextInput message={message} setMessage={this.setMessage} sendMessage={this.sendMessage}/>
                </div>
            </div>

        );
    }
}

ChatRedux.propTypes = {    
    auth: PropTypes.object.isRequired, 
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chatRoom: state.chat.chatRoom,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getChatRoom}
)(withRouter(ChatRedux));