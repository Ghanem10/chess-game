import React, { useContext, useEffect, useRef } from 'react';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../contextprovider/context.provider';
import Cookies from 'js-cookie';
import axios from 'axios';
import './list.scss';

export default function ListOptions({ setStartGame, startGame }) {

    const { lightUI, setLoading } = useContext(LightContext);
    // const ID = JSON.parse(Cookies.get("loggedIn-User"));
    const temp = useRef(null);
    let ws;
    
    function toggleStartGame() {
        setStartGame(true);
        temp.current.classList.add('switch');

        const serverURL = location.protocol;
        const hostingServer = location.hostname;
        const serverProtocol = serverURL.replace('https:', 'wss:');
        const webSocketProtocol = serverProtocol + '//' + hostingServer;

        if (!!ws) ws.close();
        ws = new WebSocket("ws://localhost:4000");
        ws.addEventListener("error", () => console.log("connection error"));
        ws.addEventListener("open", () => console.log("connection established"));
        
        // const cb = async () => {
        //     try {
        //         await axios.post(`${import.meta.env.VITE_URL}/gameplay/start`, { ID }).then(res => {
        //             console.log(res.data)
        //             setStartGame(true);
        //             setLoading(false);
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // cb();
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