import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";


import './Message.css';

class Message extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      message: {
        name: "",
        text: ""
      },
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
    if (nextProps.message) {
      this.setState({
        message: nextProps.message
      })
    }
  }

  render() {

    //check to see if message is sent by the user using the chat
    let isSentByCurrentUser = false;
    
    const {user} = this.props;

    //if name housed in message is same as user on line 40 above, message was sent by current user
    if(this.props.message.name === user.name) {
      isSentByCurrentUser = true;
    }

    return (
      isSentByCurrentUser
        ? (
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{user.name}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{this.props.message.text}</p>
            </div>
          </div>
          )
          : (
            <div className="messageContainer justifyStart">
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{this.props.message.text}</p>
              </div>
              <p className="sentText pl-10 ">{this.props.message.name}</p>
            </div>
          )
    );
  }
}
  
  Message.propTypes = {    
    auth: PropTypes.object.isRequired,
  };
      
  const mapStateToProps = state => ({
      auth: state.auth,
      errors: state.errors,
  });
      
  export default connect(
      mapStateToProps,
      { }
  )(Message);