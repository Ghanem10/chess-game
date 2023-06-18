import React, { useEffect, useState } from 'react';
import { faChessQueen, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './gameEnd.scss';

let team, currTeam = "";

export default function GameEnd({ ours, opp, setOurs, setOpp, setGame, piecesTurns }) {
    const [endGame, setEndGame] = useState("");
    const [hideTitle, setHideTitle] = useState("");

    if (piecesTurns % 2 === 1) {
        currTeam = ours;
        team = "Black wins";
    } else if (piecesTurns % 2 === 0) {
        currTeam = opp;
        team = "White wins";
    }

    function winner() {
        if (currTeam <= 0) {
            setEndGame("end");
            setHideTitle("showtitle");
        }
    }

    function newGame() {
        setGame(pre => !pre);
    }

    function rematch() {
        setEndGame("");
        setHideTitle("");
        setOpp(180);
        setOurs(180);
    }

    function removeTitle() {
        setEndGame("");
        setHideTitle("");
    }

    useEffect(() => {
        winner();
    }, [piecesTurns, currTeam]);

    return (
        <div className={`end-game-final ${hideTitle}`}>
            <FontAwesomeIcon 
                id='end-game-icon'
                onClick={removeTitle}
                icon={faCircleXmark} 
            />
            <div className={`game-end ${endGame}`}>
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