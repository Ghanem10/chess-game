import React from "react";

export default function Squares(props) {
    const {
        grabbingPiece,
        MovingPiece,
        dropingPiece,
        index,
        piece,
        x,
        y,
        position,
        highlightSquare,
        state
    } = props;

    const currentPiece = piece.find((pre) => pre.x === x && pre.y === y);
    const lastChar = position.slice(-1)[0];
    const number = parseInt(lastChar, 10);
    const isColor = number % 2 === 0;
    let updatedClassName = "";

    // TODO
    // Refactor this code & the if statement.
    if (position.startsWith('a')) {
        updatedClassName = isColor ? "white-square" : "darkblue-square";
    } else if (position.startsWith('b')) {
        updatedClassName = isColor ? "darkblue-square" : "white-square"; 
    } else if (position.startsWith('c')) {
        updatedClassName = isColor ? "white-square" : "darkblue-square"; 
    } else if (position.startsWith('d')) {
        updatedClassName = isColor ? "darkblue-square" : "white-square"; 
    } else if (position.startsWith('e')) {
        updatedClassName = isColor ? "white-square" : "darkblue-square"; 
    } else if (position.startsWith('f')) {
        updatedClassName = isColor ? "darkblue-square" : "white-square"; 
    } else if (position.startsWith('g')) {
        updatedClassName = isColor ? "white-square" : "darkblue-square"; 
    } else if (position.startsWith('h')) {
        updatedClassName = isColor ? "darkblue-square" : "white-square"; 
    }

    if (state.activePiece !== null) {
        if (Array.isArray(highlightSquare) && highlightSquare.length > 0) {
            for (let i = 0; i < highlightSquare.length; i++) {
                if (highlightSquare[i].x === x && highlightSquare[i].y === y) {
                    updatedClassName = updatedClassName + " highlight-square";
                } 
            }
        }
    }
    
    return (
        <div
            key={index}
            className={updatedClassName}
            onMouseDown={(e) => grabbingPiece(e)}
            onMouseMove={(e) => MovingPiece(e)}
            onMouseUp={(e) => dropingPiece(e)}
        >
        {currentPiece && (
            <div
            className="piece"
            style={{
                backgroundImage: `url(${currentPiece.image})`,
            }}
            ></div>
        )}
        </div>
    );
}
