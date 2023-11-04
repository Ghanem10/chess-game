import React, {  useEffect, useRef } from 'react';
import { faChessQueen, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../assets/scss/component/_endGame.scss';

export default function GameEnd(props) {
    const {
        ourTeam, enemyTeam, setRecordMoves,
        setOurTeam, setEnemyTeam,
        piecesTurns, setRematch,
        updateStateTwo, isCheckMate,
        setisCheckMate
    } = props;
    
    const currTeam = (piecesTurns % 2 === 1) ? ourTeam : enemyTeam;
    const team = (piecesTurns % 2 === 1) ? "Black wins" : "White wins";
    const checkWinner = piecesTurns % 2 === 0 ? "white" : "black";

    const endGameTemplate = useRef(null);
    const endGameTitle = useRef(null);

    const removeTitle = () => {
        endGameTemplate.current.classList.remove("end");
        endGameTitle.current.classList.remove("showtitle");
    };

    /**
     * 
     * @function updateStateTwo - Update the board with new copy.
     * 
    */

    const newGame = () => {
        removeTitle();
        setisCheckMate(false);

        // another board copy
        updateStateTwo();
    };

    const rematch = () => {
        removeTitle();
        
        setEnemyTeam(180);
        setOurTeam(180);
        setRecordMoves("");
        setisCheckMate(false);
        setRematch(preRem => !preRem);

        // another board copy
        updateStateTwo();
    };

    const Icon = () => {
        return (
            <FontAwesomeIcon 
                id='icon-end'
                icon={faChessQueen} 
            />
        );
    };

    const IconEndGame = () => {
        return (
            <FontAwesomeIcon 
                id='end-game-icon'
                onClick={removeTitle}
                icon={faCircleXmark} 
            />
        );
    };

    const Button = () => {
        return (
            <div className='btn-game-end'>
                <button className='new-game-end' onClick={newGame}>
                    New Game
                </button>
                <button className='rematch-game-end' onClick={rematch}>
                    Rematch
                </button>
            </div>
        );
    };
    
    useEffect(() => {
        const winner = () => {
            if (currTeam <= 0 || isCheckMate) {
                endGameTemplate.current.classList.add("end");
                endGameTitle.current.classList.add("showtitle");
            }
        };

        winner();
    }, [piecesTurns, currTeam]);

    return (
        <React.Fragment>
            {
                (isCheckMate) ? (
                    <div className="check-mate" ref={endGameTitle}>
                        <IconEndGame />
                        <div className="play-again" ref={endGameTemplate}>
                            <div className='title-end-game'>
                                <h2>Check Mate</h2>
                                <p>Team {checkWinner} wins!</p>
                                <Icon />
                            </div>
                            <Button />
                        </div>
                    </div>
                ) : (
                    <div className='end-game-final' ref={endGameTitle}>
                        <IconEndGame />
                        <div className='game-end' ref={endGameTemplate}>
                            <div className='title-end-game'>
                                <h2>{team}</h2>
                                <Icon />
                                <p>Good, winning is good!</p>
                            </div>
                            <Button />
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
}