import React, { useEffect, useRef, useState } from 'react';
import './timerPlayer.scss';
import GameEnd from './end/gameEnd';

export default function TimerPlayer({ piecesTurns, startGame, setStartGame }) {
    const [ours, setOurs] = useState(180);
    const [opponent, setOpponent] = useState(180);
    const [rematch, setRematch] = useState(false);
    const white = useRef(null);
    const black = useRef(null);
    let intervalId;
    
    useEffect(() => {
        piecesTurns = rematch ? 1 : piecesTurns;
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
            />
        </>
    );
}