import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users } ) => (
    <div className="textContainer">
        <div>
            <h1>Chat with other users in the HomeGrown chat rooms here!</h1>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>Users currently chatting in this room: </h1>
                        <div className="activeContainer">
                            <h2>
                                {users.map(({userName}) => (
                                    <div key={userName} className="activeItem">
                                        {userName}
                                    </div>
                                ))}
                            </h2>
                        </div>

                    </div>
                )
                : null
        }
        
    </div>
    

);

export default TextContainer;