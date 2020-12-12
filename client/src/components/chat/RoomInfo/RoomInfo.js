import React from 'react';
import './RoomInfo.css';
import closeIcon from './closeIcon.png';
import { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './RoomInfo.css';

class RoomInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }

    render() {

        const roomName = this.props.roomName;
        const { user } = this.props.auth;
        
        return(
            <div className="roomInfo">
                <div className="leftInnerContainer">
                    <div className="roomInfoText">{ `${user.name} is in the chat room: ${roomName}` }</div>
                 </div>
                <div className="rightInnerContainer">
                    <a href="/"><img src={closeIcon} alt="close image" /></a>
                 </div>
            </div>
        );
        
    }

}

RoomInfo.propTypes = {    
    auth: PropTypes.object.isRequired,
    roomName: PropTypes.string.isRequired
    
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    // roomName: state.roomName

});

export default connect(
    mapStateToProps,
    {}
)(RoomInfo);