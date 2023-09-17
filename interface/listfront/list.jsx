import React, { useContext, useEffect, useRef } from 'react';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../contextprovider/context.provider';
import Cookies from 'js-cookie';
import axios from 'axios';
import './list.scss';

export default function ListOptions({ setStartGame, startGame, ws, setWs }) {

    const { lightUI, setLoading, setVsEngine } = useContext(LightContext);
    // const ID = JSON.parse(Cookies.get("loggedIn-User"));
    const temp = useRef(null);
    
    function toggleStartGame() {

        setStartGame(true);
        temp.current.classList.add('switch');

        try {

            const serverURL = import.meta.env.VITE_URL;
            const serverProtocol = serverURL.replace('https:', 'wss:');

            if (!!ws) ws.close();
            ws = new WebSocket(serverProtocol);
            
            ws.onopen = (event) => {
                console.log("connection established", event)
            }
            ws.onerror = (event) => {
                console.log("connection error", event)
            }
            setWs(ws);
            
        } catch (error) {
            console.log(`Error-list: ${error}`);
        }
        
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

    function startWithEngine() {
        setVsEngine(true);
        setStartGame(true);
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
                <button className='new-game' onClick={() => toggleStartGame()}>Game test</button>
                <button className='vs-engine' onClick={() => startWithEngine()}>play vs Engine</button>
                <button className='rematch'>Tournament</button>
          </div>
      </section>
    );
}