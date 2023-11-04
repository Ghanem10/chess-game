import React, { useEffect, useRef, useState } from 'react';
import { piecesTurns } from '../boardTemplate/mainTemplate';
import GameEnd from './_gameEnd';
import Cookies from 'js-cookie';

import '../../assets/scss/component/_timer.scss';

export default function TimerPlayer(props) {

    const { 
        updateStateTwo, isCheckMate, 
        setisCheckMate, ourTeam, setRecordMoves,
        enemyTeam, setOurTeam, setEnemyTeam
    } = props;

    const toggleStartGame = Cookies.get("startGame");
    const [rematch, setRematch] = useState(false);
    const white = useRef(null);
    const black = useRef(null);
    let intervalId;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(1, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (toggleStartGame === "true") {
            if (piecesTurns % 2 === 1 && !isCheckMate) {

                intervalId = setInterval(() => {

                    setOurTeam((prevTime) => {
                        if (prevTime - 1 <= 0) {
                            clearInterval(intervalId);
                            return 0;
                        }
                        return prevTime - 1;
                    });

                }, 1000);

                black.current.classList.remove('black-player');
                white.current.classList.add('white-player');

            } else if (piecesTurns % 2 === 0 && !isCheckMate) {

                intervalId = setInterval(() => {

                    setEnemyTeam((prevTime) => {
                        if (prevTime - 1 <= 0) {
                            clearInterval(intervalId);
                            return 0;
                        }
                        return prevTime - 1;
                    });

                }, 1000);

                white.current.classList.remove('white-player');
                black.current.classList.add('black-player');
            }
        }
        
        return () => {
            clearInterval(intervalId);
        };

    }, [piecesTurns, rematch]);

    return (
        <React.Fragment>
            <div className="timers">
                <div className="img-avatar"></div>
                <div ref={black} className='opponent'>{formatTime(enemyTeam)}</div>
                <div ref={white} className='ours'>{formatTime(ourTeam)}</div>
                <div className="img-avatar"></div>
            </div>
            <GameEnd 
                ourTeam={ourTeam}
                enemyTeam={enemyTeam}
                setOurTeam={setOurTeam}
                setEnemyTeam={setEnemyTeam}
                setRematch={setRematch}
                isCheckMate={isCheckMate}
                piecesTurns={piecesTurns}
                updateStateTwo={updateStateTwo}
                setRecordMoves={setRecordMoves}
                setisCheckMate={setisCheckMate}
            />
        </React.Fragment>
    );
}