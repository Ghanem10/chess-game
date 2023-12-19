
import React, { useEffect, useRef, useState } from 'react';

export default function ChatComponent({ websocket, match }) {

    const [incomingMsg, setIncomingMsg] = useState([]);
    const [message, setMessage] = useState("");

    const messageListRef = useRef(null);

    useEffect(() => {
        websocket.on("room-chat-box", (socketData) => {
            setIncomingMsg((incomingMsg) => [...incomingMsg, socketData]);
        });
    }, []);

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [incomingMsg]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message) {
            websocket.emit("room-chat-box", match, message);
        }

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className='chat-box'>
            <div className='chat-box-messages' ref={messageListRef}>
                <span className='chat-box-title'>
                    Chat with player
                </span>
                <ul>
                    {incomingMsg.map((msgData, idx) => (
                        console.log(msgData),
                        <li 
                            key={idx}
                            className={
                                websocket.id !== msgData.id 
                                ? "receiver" 
                                : "sender"
                            }
                        >
                            <span className='li-message'>
                                {msgData.message}
                            </span>
                            <span className='li-time'>
                                {msgData.time}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                type="text" name="" id="" 
            />
            <button disabled={message === ""}>
                Send message
            </button>
        </form>
    );
}