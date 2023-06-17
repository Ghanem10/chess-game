import React, { useEffect } from "react";
import { Type } from "../movement/constants/functions";

export default function Squares(props) {
    const {
        grabbingPiece,
        MovingPiece,
        droppingPiece,
        index,
        piece,
        x,
        y,
        position,
        highlightSquare,
        state,
        updateBoardColor
    } = props;

    const currentPiece = piece.find((pre) => pre.x === x && pre.y === y);
    const lastChar = position.slice(-1)[0];
    const number = parseInt(lastChar, 10);
    const isColor = number % 2 === 0;
    let updatedClassName, t = "";
    let king = "";
    
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const charIndex = chars.indexOf(position.charAt(0));
    
    const isWhiteSquare = charIndex % 2 === 0;
    const squareColor = isColor ? isWhiteSquare : !isWhiteSquare;
    // refactor the code.
    if (updateBoardColor === 1) {
        updatedClassName = squareColor ? "white-square" : "green-square";
    } else if (updateBoardColor === 2) {
        updatedClassName = squareColor ? "white-square" : "lightblue-square";
    } else if (updateBoardColor === 3) {
        updatedClassName = squareColor ? "white-square" : "darkblue-square";
    } else if (updateBoardColor === 4) {
        updatedClassName = squareColor ? "white-square" : "brown-square";
    } else if (updateBoardColor === 5) {
        updatedClassName = squareColor ? "white-square" : "purple-square";
    } else if (updateBoardColor === 6) {
        updatedClassName = squareColor ? "white-square" : "black-square";
    }
    const availableSquares = highlightSquare.some(square => square.x === x && square.y === y);
    if (state.activePiece !== null && availableSquares) {
        // attacked piece.
        if (currentPiece) {
            if (currentPiece.Piece === Type.KING) {
                king += `${currentPiece.Piece}`;
            } else {
                t += `${currentPiece.team}`;
            }
        } else {
            // otherwise highlight square.
            updatedClassName += " highlight-square";
        }
    }

    return (
        <div
            key={index}
            className={updatedClassName}
            onMouseDown={(e) => grabbingPiece(e)}
            onMouseMove={(e) => MovingPiece(e)}
            onMouseUp={(e) => droppingPiece(e)}
        >
            {currentPiece && (
                <div
                className={`piece ${t} ${king}`}
                style={{
                    backgroundImage: `url(${currentPiece.image})`,
                }}
                ></div>
            )}
        </div>
    );
}
