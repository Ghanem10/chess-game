
import React, {  useEffect, useRef } from 'react';
import * as Icons from 'react-bootstrap-icons';

import { Button } from './buttons';
import { UpdatePlayerStatus } from './playerStatus';
import { addChessPieces } from '../squares/pieces';

import ClonePieces from '../lib/clonePieces';

export default function GameEndTemplate({ 
    currentTeam, 
    setRecordMoves, 
    setOurTeam, 
    setEnemyTeam, 
    matchInfo,
    piecesTurns, 
    setRematch,
    ourTeamTimer,
    enemyTeamTimer,
    isCheckMate, 
    setisCheckMate, 
    setPiecesTurns, 
    setPieces }) {

    let isDraw = false;

    const winnerTeam = (piecesTurns % 2 === 1) ? "Black wins" : "White wins";
    const checkWinner = piecesTurns % 2 === 0 ? "white" : "black";

    const endGameTemplate = useRef(null);
    const endGameTitle = useRef(null);

    const removeTitle = () => {
        endGameTemplate.current.classList.remove("end-game-final");
        endGameTitle.current.classList.remove("showtitle-final");
    };

    const newGame = () => {
        removeTitle();
        setEnemyTeam(180);
        setOurTeam(180);
        setRecordMoves([]);
        setisCheckMate(false);
        setRematch(preRem => !preRem);
        setPiecesTurns(1);

        setPieces(() => {
            const newState = addChessPieces();
            const copyBoardPieces = new ClonePieces(newState).clone();
            return copyBoardPieces;
        });

        localStorage.removeItem("secondPlayer");
    };

    const rematch = () => {
        removeTitle();
        setEnemyTeam(180);
        setOurTeam(180);
        setRecordMoves([]);
        setisCheckMate(false);
        setRematch(preRem => !preRem);
        setPiecesTurns(1);
        
        setPieces(() => {
            const newState = addChessPieces();
            const copyBoardPieces = new ClonePieces(newState).clone();
            return copyBoardPieces;
        });
    };
    
    useEffect(() => {
        const winner = () => {
            if (isCheckMate || currentTeam <= 0) {
                endGameTemplate.current.classList.add("end-game-final");
                endGameTitle.current.classList.add("showtitle-final");
            } else if (ourTeamTimer <= 0 && enemyTeamTimer <= 0) {
                endGameTemplate.current.classList.add("end-game-final");
                endGameTitle.current.classList.add("showtitle-final");
                isDraw = true;   
            }
        };

        winner();
    }, [piecesTurns, currentTeam]);


    useEffect(() => {
        // TODO: Add a function to update the player recorded games
    } , []);

    return (
        <React.Fragment>
            {
                (isCheckMate) ? (
                    <div className={"check-mate"} ref={endGameTitle} >
                        <Icons.XCircle id='end-game-icon' onClick={removeTitle} />
                        
                        <div className="play-again" ref={endGameTemplate} >
                            <div className='title-end-game'>
                                <h2>Check Mate</h2>
                                
                                <UpdatePlayerStatus 
                                    wonTeam={currentTeam} 
                                    matchInfo={matchInfo}
                                    isDraw={isDraw}
                                />

                                <p>Team {checkWinner} wins!</p>
                            </div>
                            <Button newGame={newGame} rematch={rematch} />
                        </div>
                    </div>
                ) : (
                    <div className={"end-game"} ref={endGameTitle} >
                        <Icons.XCircle id='end-game-icon' onClick={removeTitle} />
                        
                        <div className='game-end' ref={endGameTemplate} >
                            <div className='title-end-game'>
                                <h2>{winnerTeam}</h2>

                                <UpdatePlayerStatus 
                                    wonTeam={currentTeam} 
                                    matchInfo={matchInfo} 
                                    isDraw={isDraw}
                                />

                                <p>Good, winning is good!</p>
                            </div>
                            <Button newGame={newGame} rematch={rematch} />
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
}