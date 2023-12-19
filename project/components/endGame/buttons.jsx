import React from "react";

export const Button = ({ newGame, rematch }) => {
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