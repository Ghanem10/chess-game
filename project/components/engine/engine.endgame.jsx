
import React, { useEffect, useRef } from 'react';

import * as Icons from 'react-bootstrap-icons';

import ClonePieces from '../lib/clonePieces';

import { Button } from '../endGame/buttons';
import { addChessPieces } from '../squares/pieces';

import '../../assets/scss/main/_endGame.scss';

export default function EngineEndgame({ 
    isCheckMate, 
    setPieces, 
    setisCheckMate, 
    resign, 
    draw }) {

    const endGameTemplate = useRef(null);
    const endGameTitle = useRef(null);

    const removeTitle = () => {
        endGameTemplate.current.classList.remove("end-game-final");
        endGameTitle.current.classList.remove("showtitle-final");
    };

    const newGame = () => {
        removeTitle();
        setisCheckMate(false);
        setPieces(() => {
            const newState = addChessPieces();
            const copyBoardPieces = new ClonePieces(newState).clone();
            return copyBoardPieces;
        });
    };

    const rematch = () => {
        removeTitle();
        setisCheckMate(false);
        setPieces(() => {
            const newState = addChessPieces();
            const copyBoardPieces = new ClonePieces(newState).clone();
            return copyBoardPieces;
        });
    };
    
    useEffect(() => {
        const winner = () => {
            if (isCheckMate || resign || draw) {
                endGameTemplate.current.classList.add("end-game-final");
                endGameTitle.current.classList.add("showtitle-final");
            } 
        };

        winner();
    }, [
        isCheckMate, 
        resign, 
        draw
    ]);
    
    return (
        <React.Fragment>
            {(isCheckMate || resign || draw) && (
                <div className={"check-mate"} ref={endGameTitle} >
                    <Icons.XCircle id='end-game-icon' onClick={removeTitle} />

                    <div className="play-again" ref={endGameTemplate} >
                        <div className='title-end-game'>
                            <h2>Check Mate</h2>
                            <p>Ok, try harder next time</p>
                            <p>GG</p>
                        </div>
                        <Button newGame={newGame} rematch={rematch} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}