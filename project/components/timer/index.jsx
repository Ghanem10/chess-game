
import React, { useRef } from 'react';
import TimerComponent from './timer';

export default function TimerPlayer({ 
    isCheckMate, 
    piecesTurns,
    setOurTeam,
    setEnemyTeam,
    enemyTeam,
    ourTeam,
    rematch,
    webSocket }) {

    const white = useRef(null);
    const black = useRef(null);

    return (
        <TimerComponent 
            isCheckMate={isCheckMate} 
            piecesTurns={piecesTurns} 
            rematch={rematch}
            setOurTeam={setOurTeam}
            setEnemyTeam={setEnemyTeam}
            enemyTeam={enemyTeam}
            ourTeam={ourTeam}
            white={white}
            black={black}
            webSocket={webSocket}
        />
    );
}