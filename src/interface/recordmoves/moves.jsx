import React, { useRef } from 'react';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './moves.scss';

export default function ListOptions({ setStartGame }) {
    const temp = useRef(null);

    function toggleStartGame() {
        setStartGame(true);
        temp.current.classList.add('switch');
    }

    return (
      <div className='recored-moves' ref={temp}>
          <div className='game-type'>
            <h1>Blitz Game</h1>
            <div className='game-timer'>
                <FontAwesomeIcon id='icon' icon={faBoltLightning} /> <span>3</span>
            </div>
          </div>
          <div className='game-start-btn'>
              <button className='new-game' onClick={toggleStartGame}>New Game</button>
              <button className='rematch'>Rematch</button>
          </div>
      </div>
    )
}