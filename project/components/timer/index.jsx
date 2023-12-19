
import React, { useRef, useState } from 'react';
import GameEnd from '../endGame/_gameEnd';

import TimerComponent from './timer';

export default function TimerPlayer({ isCheckMate, piecesTurns, setisCheckMate,
    setRecordMoves, setPiecesTurns, matchInfo, setPieces, webSocket
}) {

    const [rematch, setRematch] = useState(false);
    const [ourTeam, setOurTeam] = useState(180);
    const [enemyTeam, setEnemyTeam] = useState(180);

    const white = useRef(null);
    const black = useRef(null);

    const currentTeam = (piecesTurns % 2 === 1) ? ourTeam : enemyTeam;

    return (
        <React.Fragment>
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
            {
                (isCheckMate || ourTeam <= 0 || enemyTeam <= 0) && (
                    <GameEnd 
                        isCheckMate={isCheckMate}
                        piecesTurns={piecesTurns}
                        currentTeam={currentTeam}
                        setRematch={setRematch}
                        setisCheckMate={setisCheckMate}
                        setRecordMoves={setRecordMoves}
                        setPiecesTurns={setPiecesTurns}
                        setOurTeam={setOurTeam}
                        setPieces={setPieces}
                        setEnemyTeam={setEnemyTeam}
                        matchInfo={matchInfo}
                    />
                )
            }
        </React.Fragment>
    );
}