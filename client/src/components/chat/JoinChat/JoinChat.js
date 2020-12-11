import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import classnames from "classnames";


import { 
        createNewChatRoom,
        getChatRoom,
        joinChatRoom,
        } from '../../actions/chatActions';

import './JoinChat.css';

class JoinChat extends Component {
    constructor() {
        super();
        this.state = {
            createRoomName: "",
            joinRoomName: "",
            roomName: "",
            roomUsers: [],
            location: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    //set state to value at id
    onChange = e => { 
        this.setState({ [e.target.id]: e.target.value });
    };

    //create new chat room
    onCreateRoomSubmit =  (e, room, user) => {
        e.preventDefault();

        const createRoomData = {room, user};   

        //redirect to chat room
        this.props.createNewChatRoom(createRoomData, ()=>this.props.history.push(`/chat?&user=${user}&roomName=${room}`))
     
    };  

    //handle joining room on button click
    joinRoomHandler = (e, {user, roomName}) =>{
        e.preventDefault();

        if(roomName === '') return;

        //redirect to chat room
        this.props.getChatRoom(roomName, ()=>this.props.history.push(`/chat?&user=${user}&roomName=${roomName}`))
    }

    render() {
        const { user } = this.props.auth;
        // const {roomName} = this.state.joinRoomName;

        const checkToken = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                return true;
            } else {
                return false;
            }
        }

        return (
            
            <div className="joinOuterContainer">                    
                <h1 className="topHeading">Create or Join a Chat Room!</h1>
                {checkToken() === true &&
                    <form className="authCreateRoom" >
                        <div className="create-input-div">
                            <h1 className="heading">Create a new chat room</h1>
                            <div>
                                <TextField
                                    value={user.name}
                                    type="name"
                                    id="name"
                                    label="Username"
                                    className={classnames("", {
                                    })}
                                />
                                <TextField
                                    onChange={this.onChange}
                                    value={this.state.createRoomName}
                                    type="createRoomName"
                                    id="createRoomName"
                                    label="Create Room"
                                    className={classnames("", {
                                    })}
                                />
                                <div>
                                    {
                                     this.props.errors && (
                                         <div>
                                    <span style={{color: 'red', fontSize: 14}}>{this.props.errors.room}</span>
                                    <br />
                                    </div>)
                                     }
                                    <Link onClick={ e => this.onCreateRoomSubmit(e, this.state.createRoomName, user.name)} >
                                        <button className={'joinButton'}>Create</button>
                                    </Link>
                                </div>
                            </div>    
                        </div>
                    </form> 
                }

                {checkToken() === true &&
                    <form className="authJoinInputRoom">
                        <div className="join-input-div">
                            <h1 className="heading">Join Room</h1>
                            <TextField
                                    value={user.name}
                                    onChange={this.onChange}
                                    type="name"
                                    id="name"
                                    label="Username"
                                    className={classnames("", {
                                    })}
                            />
                            <TextField
                                    onChange={this.onChange}
                                    value={this.state.joinRoomName}
                                    type="joinRoomName"
                                    id="joinRoomName"
                                    label="Room Name"
                                    className={classnames("", {
                                    })}
                            />
                            {
                                     this.props.errors && (
                                         <div>
                                    <span style={{color: 'red', fontSize: 14}}>This chat room does not exist! Create a new one.</span>
                                    <br />
                                    </div>)
                                     }
                            <Link onClick={e => this.joinRoomHandler(e, {user: user.name, roomName:this.state.joinRoomName})}>
                                <button  className={'joinButton'}> Join </button>
                            </Link>
                        </div>
                    </form>
                }   
                    
                {checkToken() === false &&
                    <div>
                        <h1 className="heading">Sign in or create an account to use chat</h1>
                        <Link to="/signin"> 
                            <button className={"noAuthJoinButton"} type="submit">Sign in</button>
                        </Link>
                        <Link to="/signup"> 
                            <button className={"noAuthJoinButton"} type="submit">Sign up</button>
                        </Link>
                    </div>
                }

            </div>
        );
    }
}

JoinChat.propTypes = {    
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.chat.errors

});

export default connect(
    mapStateToProps,
    { createNewChatRoom, joinChatRoom, getChatRoom  }
)(JoinChat);