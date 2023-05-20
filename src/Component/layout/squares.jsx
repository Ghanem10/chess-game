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

    
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const charIndex = chars.indexOf(position.charAt(0));
    
    const isWhiteSquare = charIndex % 2 === 0;
    const squareColor = isColor ? isWhiteSquare : !isWhiteSquare;
    updatedClassName = squareColor ? "white-square" : "darkblue-square";

    if (
        state.activePiece !== null &&
        Array.isArray(highlightSquare) &&
        highlightSquare.some(square => square.x === x && square.y === y)
      ) {
        updatedClassName += " highlight-square";
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
