
import React, {  useEffect, useRef } from 'react';

import * as Icons from 'react-bootstrap-icons';

import { Button } from './buttons';
import { UpdatePlayerStatus } from './playerStatus';
import { useSelector } from 'react-redux';

export default function GameEnd({ currentTeam, setRecordMoves, setOurTeam, setEnemyTeam, matchInfo,
    piecesTurns, setRematch, isCheckMate, setisCheckMate, VsEngine, setPiecesTurns, setPieces,
}) {

    const state = useSelector(state => state.match);

    const team = (piecesTurns % 2 === 1) ? "Black wins" : "White wins";
    const checkWinner = piecesTurns % 2 === 0 ? "white" : "black";

    const endGameTemplate = useRef(null);
    let endGameTitle = useRef(null);

    const removeTitle = () => {
        if (VsEngine) {
            endGameTemplate.current.classList.remove("end");
            endGameTitle.current.classList.remove("showtitle-engine");
        } else {
            endGameTemplate.current.classList.remove("end");
            endGameTitle.current.classList.remove("showtitle");
        }
    };

    const newGame = () => {
        removeTitle();
        setEnemyTeam(180);
        setOurTeam(180);
        setRecordMoves([]);
        setisCheckMate(false);
        setRematch(preRem => !preRem);
        setPiecesTurns(1);
        setPieces(state.pieces);

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
        setPieces(state.pieces);
    };
    
    useEffect(() => {
        const winner = () => {
            if (currentTeam <= 0 || isCheckMate) {
                if (VsEngine) {
                    endGameTitle.current.classList.add("showtitle-engine");
                    endGameTemplate.current.classList.add("end");
                } else {
                    endGameTemplate.current.classList.add("end");
                    endGameTitle.current.classList.add("showtitle");
                }
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
                    <div 
                        className={`${
                            VsEngine ? "check-mate-engine" : "check-mate"
                            }`} 
                        ref={endGameTitle}
                    >
                        <Icons.XCircle 
                            id='end-game-icon'
                            onClick={removeTitle}
                        />

                        <div 
                            className="play-again" ref={endGameTemplate}
                        >
                            <div className='title-end-game'>
                                <h2>Check Mate</h2>
                                
                                <UpdatePlayerStatus wonTeam={currentTeam} matchInfo={matchInfo} />

                                <p>Team {checkWinner} wins!</p>
                            </div>

                            <Button newGame={newGame} rematch={rematch} />
                        </div>
                    </div>
                ) : (
                    <div 
                        className={`${
                                VsEngine ? "end-game-final-engine" : "end-game-final"
                            }`} 
                            ref={endGameTitle}
                    >
                        <Icons.XCircle 
                            id='end-game-icon'
                            onClick={removeTitle}
                        />

                        <div 
                            className='game-end' ref={endGameTemplate}
                        >


                            <div className='title-end-game'>
                                <h2>{team}</h2>

                                <UpdatePlayerStatus wonTeam={currentTeam} matchInfo={matchInfo} />

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