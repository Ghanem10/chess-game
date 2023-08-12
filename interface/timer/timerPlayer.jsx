import React, { useEffect, useRef, useState } from 'react';
import { piecesTurns } from '../../ReferenceBoard/ReferenceBoard';
import GameEnd from './end/gameEnd';
import './timerPlayer.scss';

export default function TimerPlayer({ startGame, setStartGame, updateStateTwo }) {
    // TODO
    // Create a list of timers, optional choice.
    const [ours, setOurs] = useState(180);
    const [opponent, setOpponent] = useState(180);
    const [rematch, setRematch] = useState(false);
    
    // Reference for the winner title.
    const white = useRef(null);
    const black = useRef(null);
    let intervalId;

    useEffect(() => {
        // Game start - update the timer for current team.
        if (startGame) {
            if (piecesTurns % 2 === 1) {

                intervalId = setInterval(() => {

                    setOurs((prevTime) => {
                        const newValue = prevTime - 1;
                        if (newValue <= 0) {
                            clearInterval(intervalId);
                            return 0;
                        }
                        return newValue;
                    });

                }, 1000);

                black.current.classList.remove('black-player');
                white.current.classList.add('white-player');

            } else if (piecesTurns % 2 === 0) {

                intervalId = setInterval(() => {

                    setOpponent((prevTime) => {
                        const newValue = prevTime - 1;
                        if (newValue <= 0) {
                            clearInterval(intervalId);
                            return 0;
                        }
                        return newValue;
                    });

                }, 1000);

                white.current.classList.remove('white-player');
                black.current.classList.add('black-player');
            }
        }
        
        return () => {
            clearInterval(intervalId);
        };

    }, [piecesTurns, startGame, rematch]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(1, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <>
            <div className="timers">
                <div ref={black} className='opponent'>{formatTime(opponent)}</div>
                <div ref={white} className='ours'>{formatTime(ours)}</div>
            </div>
            <GameEnd 
                ours={ours}
                opp={opponent}
                piecesTurns={piecesTurns}
                setOurs={setOurs}
                setOpp={setOpponent}
                setGame={setStartGame}
                setRematch={setRematch}
                updateStateTwo={updateStateTwo}
            />
        </>
    );
}