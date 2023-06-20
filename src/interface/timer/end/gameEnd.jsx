import React, { useContext, useEffect, useRef, useState } from 'react';
import { faChessQueen, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../wraper/props';
import './gameEnd.scss';

let team, currTeam = "";

export default function GameEnd(props) {
    const {
        ours, 
        opp, 
        setOurs, 
        setOpp, 
        setGame, 
        piecesTurns, 
        setRematch,
    } = props;
    const { setRecordMoves } = useContext(LightContext);
    const endGame = useRef(null);
    const title = useRef(null)

    if (piecesTurns % 2 === 1) {
        currTeam = ours;
        team = "Black wins";
    } else if (piecesTurns % 2 === 0) {
        currTeam = opp;
        team = "White wins";
    }

    function winner() {
        if (currTeam <= 0) {
            endGame.current.classList.add("end");
            title.current.classList.add("showtitle");
        }
    }

    function newGame() {
        setGame(pre => !pre);
    }

    function rematch() {
        endGame.current.classList.remove("end");
        title.current.classList.remove("showtitle");
        setRecordMoves("");
        setOpp(180);
        setOurs(180);
        setRematch(preRem => !preRem);
    }

    function removeTitle() {
        endGame.current.classList.remove("end");
        title.current.classList.remove("showtitle");
    }

    useEffect(() => {
        winner();
    }, [piecesTurns, currTeam]);

    return (
        <div className={`end-game-final`} ref={title}>
            <FontAwesomeIcon 
                id='end-game-icon'
                onClick={removeTitle}
                icon={faCircleXmark} 
            />
            <div className={`game-end`} ref={endGame}>
                <div className='title-end-game'>
                    <h2>{team}</h2>
                    <FontAwesomeIcon icon={faChessQueen} id='icon-end'/>
                    <p>Good, winning is good!</p>
                </div>
                <div className='btn-game-end'>
                    <button className='new-game-end' onClick={newGame}>New Game</button>
                    <button className='rematch-game-end' onClick={rematch}>Rematch</button>
                </div>
            </div>
        </div>
    );
}