import React from 'react';

import './TextInput.css';

const TextInput = ( { message, setMessage, sendMessage } ) => (
    
    <form className="textForm">

        <input className="textInput"
        type="text"
        placeholder="..."
        value={message}
        onChange={({ target: {value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>

)

export default TextInput;