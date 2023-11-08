import React, { useEffect, useRef, useState } from 'react';

import '../../assets/scss/chatbox/chat.scss';

// + remove
export default function Chat({ websocket }) {

    const [message, setMessage] = useState("");
    const [incomingMsg, setIncomingMsg] = useState([]);
    const messageListRef = useRef(null);

    useEffect(() => {

        websocket.on("chatBox", (socketData) => {
            const { chatMsg, id } = socketData;

            if (websocket.id !== id) {
                // style --
                const somelist = messageListRef.current.querySelector("li");
            }

            setIncomingMsg(pre => [...pre, chatMsg]);
        });

        websocket.on("endMatch", () => {
            setIncomingMsg([]);
        });

    }, []);

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [incomingMsg]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message) {
            websocket.emit("chatBox", message);
        }

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className='chat-box'>
            <div className='chat-box-messages' ref={messageListRef}>
                <ul>
                    {incomingMsg.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>
            </div>
            <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                type="text" name="" id="" 
            />
            <button disabled={message === ""}>Send message</button>
        </form>
    );
}