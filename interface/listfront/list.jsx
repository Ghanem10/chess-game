import React, { useContext, useRef } from 'react';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../wraper/props';
import './list.scss';

export default function ListOptions({ setStartGame }) {

    const { lightUI } = useContext(LightContext);
    const temp = useRef(null);
    
    function toggleStartGame() {

        setStartGame(true);
        temp.current.classList.add('switch');
    }

    return (
      <div className={`start ${ lightUI ? "light" : "" }`} ref={temp}>
          <div className='game-type'>
                <h1>Blitz Game</h1>
                <div className='game-timer'>
                    <FontAwesomeIcon id='icon' icon={faBoltLightning} /> <span>3</span>
                </div>
          </div>
          <div className='game-start-btn'>
                <button className='new-game' onClick={toggleStartGame}>New Game</button>
                <button className='rematch'>Tournament</button>
          </div>
      </div>
    );
}