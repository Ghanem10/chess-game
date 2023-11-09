import React, { useEffect, useRef, useState } from 'react';

import '../../assets/scss/chatbox/chat.scss';

// + remove
export default function Chat({ websocket }) {

    const [message, setMessage] = useState("");
    const [incomingMsg, setIncomingMsg] = useState([]);
    const messageListRef = useRef(null);

    useEffect(() => {

        websocket.on("chatBox", (socketData) => {
            const { message, id } = socketData;

            if (websocket.id !== id) {
                // style --
                const somelist = messageListRef.current.querySelector("li");
            }

            setIncomingMsg(pre => [...pre, socketData]);
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

    const receiver = {
        marginLeft: "auto",
        marginRight: "10px"
    };

    const sender = {
        marginLeft: "-25px",
    };

    return (
        <form onSubmit={handleSubmit} className='chat-box'>
            <div className='chat-box-messages' ref={messageListRef}>
                <span className='chat-box-title'>Chat with player</span>
                <ul>
                    {incomingMsg.map((msgData, idx) => (
                        <li style={(websocket.id !== msgData.id) ? receiver : sender} key={idx}>
                            <span className='li-message'>{msgData.message}</span>
                            <span className='li-time'>{msgData.time}</span>
                        </li>
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