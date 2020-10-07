import React from 'react';

import './RoomInfo.css';

import closeIcon from './closeIcon.png';


const RoomInfo = ( { roomName } ) => (
    
    <div className="roomInfo">
        <div className="leftInnerContainer">
            <h3>{ roomName }</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>

);

export default RoomInfo;