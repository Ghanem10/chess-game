import React, { useEffect, useRef } from 'react';
import * as Icons from 'react-bootstrap-icons';

import '../../assets/scss/main/_endGame.scss';
import { Button } from '../endGame/buttons';

export default function EngineEndgame({ isCheckMate, setisCheckMate, resign, draw }) {

    const endGameTemplate = useRef(null);
    const endGameTitle = useRef(null);

    const removeTitle = () => {
        endGameTemplate.current.classList.remove("end");
        endGameTitle.current.classList.remove("showtitle");
    };

    const newGame = () => {
        removeTitle();
        setisCheckMate(false);
        setPieces(state.pieces);
    };

    const rematch = () => {
        removeTitle();
        setisCheckMate(false);
        setPieces(state.pieces);
    };
    
    useEffect(() => {
        const winner = () => {
            if (isCheckMate || resign || draw) {
                endGameTemplate.current.classList.add("end");
                endGameTitle.current.classList.add("showtitle");
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
                <div className={"check-mate-engine"} ref={endGameTitle} >
                    <Icons.XCircle id='end-game-icon' onClick={removeTitle} />

                    <div className="play-again" ref={endGameTemplate} >
                        <div className='title-end-game'>
                            <h2>Check Mate</h2>
                        </div>
                        <Button newGame={newGame} rematch={rematch} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}