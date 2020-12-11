import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './Messages.css';

class Messages extends Component{
    constructor(props){
        super(props);
    }

    render() {

        //receive messages/user as prop
        const {messages} = this.props;
        const user = this.props.auth;

        return(
            //map messages to div of previously sent Message components for all messages contained
            <ScrollToBottom className="messages">
                {messages.map((sent, i) => 
                    <div key={i}><Message message={sent} user={user}/></div>
                )}
            </ScrollToBottom>
        )     
           
    }
}

Messages.propTypes = {    
    auth: PropTypes.object.isRequired,
};
    
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});
    
export default connect(
    mapStateToProps,
    { }
)(Messages);