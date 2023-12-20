
import React, { useEffect } from 'react';

export default function TimerComponent({ isCheckMate, piecesTurns, rematch, 
    setOurTeam, setEnemyTeam, enemyTeam, ourTeam, white, black, webSocket
}) {
    
    const gamestart = localStorage.getItem("gamestart");

    const firstPlayer = JSON.parse(localStorage.getItem("token")).user;
    const secondPlayer = JSON.parse(localStorage.getItem("secondPlayer"))?.matchedPlayer[0];

    let intervalId;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(1, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (gamestart === "start") {
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
        <div className="timers">
            <img src={secondPlayer?.avatar || "/avatar.png"} referrerPolicy='no-referrer'/>
                <div 
                    ref={black} 
                    className='opponent'
                >
                    {formatTime(enemyTeam)}
                </div>
                <div 
                    ref={white} 
                    className='ours'
                >
                    {formatTime(ourTeam)}
                </div>
            <img src={firstPlayer?.avatar || "/avatar.png"} referrerPolicy='no-referrer'/>
        </div>
    )
}