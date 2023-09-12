import React, { useContext, useEffect, useRef } from 'react';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../contextprovider/context.provider';
import './list.scss';

export default function ListOptions({ setStartGame, startGame }) {

    const { lightUI } = useContext(LightContext);
    const temp = useRef(null);
    let ws;
    
    function toggleStartGame() {
        setStartGame(true);
        temp.current.classList.add('switch');

        const serverURL = location.protocol;
        const serverProtocol = serverURL.replace('https:', 'ws:');
        const hostingServer = location.hostname;
        const webSocketProtocol = serverProtocol + '//' + hostingServer;

        if (!!ws) ws.close();
        //TODO, implement closing conncetion after the game is over & sending moves to server.
        ws = new WebSocket(webSocketProtocol);
        ws.addEventListener("error", () => console.log("connection error"));
        ws.addEventListener("open", () => console.log("connection established"));
        ws.addEventListener("message", (msg) => console.log(`Message received: ${msg.data}`));
    }

    return (
      <section className={`start ${ lightUI ? "light" : "" }`} ref={temp}>
          <header className='game-type'>
                <h1 style={{ fontSize: "30px"}} >Blitz Game</h1>
                <div className='game-timer'>
                    <FontAwesomeIcon id='icon' icon={faBoltLightning} /> <span>3</span>
                </div>
          </header>
          <div className='game-start-btn'>
                <button className='new-game' onClick={() => toggleStartGame()}>New Game</button>
                <button className='rematch'>Tournament</button>
          </div>
      </section>
    );
}