import React from 'react';

import '../../assets/scss/chatbox/chat.scss';

export default function Chat() {
    
    return (
        <form className='chat-box'>
            <div className='chat-box-messages'></div>
            <input type="text" name="" id="" />
            <button>Send</button>
        </form>
    );
}