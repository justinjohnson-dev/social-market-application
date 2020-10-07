import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './JoinChat.css';


export default function JoinChat() {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join Chat Room</h1>
                <div>
                    <input placeholder="Name" className="joinInput" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" onChange={event => setRoom(event.target.value)} />
                </div>

                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> 
                    <button className={'joinButton mt-20'} type="submit">Sign in</button>
                </Link>
            </div>
        </div>
    );
}

