import React, { useContext, useEffect, useRef } from 'react';
import { faChessQueen, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightContext } from '../../contextprovider/context.provider';
import './gameEnd.scss';
import './checkmate.scss';

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
        updateStateTwo,
        isCheckMate,
        setisCheckMate
    } = props;
    
    const { setRecordMoves } = useContext(LightContext);
    const endGame = useRef(null);
    const title = useRef(null);
    const checkWinner = piecesTurns % 2 === 0 ? "white" : "black"

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
        setisCheckMate(false);

        // Update the board with new copy.
        updateStateTwo();
    }

    function rematch() {
        // Remove the title of once rematch btn clicked.
        endGame.current.classList.remove("end");
        title.current.classList.remove("showtitle");
        
        // Update states.
        setRecordMoves("");
        setOpp(180);
        setOurs(180);
        setRematch(preRem => !preRem);

        setisCheckMate(false);
        // Update the board with new copy.
        updateStateTwo();
    }

    function removeTitle() {
        endGame.current.classList.remove("end");
        title.current.classList.remove("showtitle");
    }

    useEffect(() => {
        winner();
    }, [piecesTurns, currTeam]);

    return (
        <>
            {
                isCheckMate && 
                <div className="check-mate">
                    <FontAwesomeIcon 
                        id='end-game-icon'
                        onClick={removeTitle}
                        icon={faCircleXmark} 
                    />
                    <div className="play-again">
                        <div className='title-end-game'>
                            <h2>Check Mate</h2>
                            <p>Team {checkWinner} wins!</p>
                            <FontAwesomeIcon icon={faChessQueen} id='icon-end'/>
                        </div>
                        <div className='btn-game-end'>
                            <button className='new-game-end' onClick={newGame}>New Game</button>
                            <button className='rematch-game-end' onClick={rematch}>Rematch</button>
                        </div>
                    </div>
                </div>
            }
            <div className='end-game-final' ref={title}>
                <FontAwesomeIcon 
                    id='end-game-icon'
                    onClick={removeTitle}
                    icon={faCircleXmark} 
                />
                <div className='game-end' ref={endGame}>
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
        </>
    );
}