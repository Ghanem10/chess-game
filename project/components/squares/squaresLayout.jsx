import React from "react";
import { Team } from "../lib/movement/constants/functions";
import Cookies from "js-cookie";

export default function Squares(props) {
    const {
        highlightSquare, grabbingPiece,
        MovingPiece, droppingPiece, piecesTurns,
        piece, x, y, position, state,
    } = props;

    const totalNumberOfSquares = 8;

    let updatedClassName, squaresOccupiedByEnemy = "";
    let updateBoardColor = Cookies.get("color") ? Cookies.get("color") : "lightskyblue";


    const currentPiece = piece.find((p) => p.x === x && p.y === y);
    const currentTeam = piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;
    
    const lastChar = position.slice(-1)[0];
    const number = parseInt(lastChar, 10);
    const isColor = number % 2 === 0;
    
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const charIndex = chars.indexOf(position.charAt(0));
    
    const isWhiteSquare = charIndex % 2 === 0;
    const squareColor = isColor ? isWhiteSquare : !isWhiteSquare;

    for (let i = 1; i < totalNumberOfSquares; i++) {

        if (!squareColor) {
            updatedClassName = `${updateBoardColor}-square`;
        } else {
            updatedClassName = "white-square";
        }
    }

    const availableSquares = highlightSquare.some((square) => square.x === x && square.y === y);
    if (state.activePiece !== null) {
        const isMatched = state.activePiece.getAttribute("datatype");
        if (isMatched === currentTeam && availableSquares) {

            if (currentPiece) {
                squaresOccupiedByEnemy += `${currentPiece.team}`;
            } else {
                updatedClassName += " highlight-square";
            }
        }
    }

    return (
        <div
            className={updatedClassName}
            onMouseDown={(e) => grabbingPiece(e)}
            onMouseMove={(e) => MovingPiece(e)}
            onMouseUp={(e) => droppingPiece(e)}
        >
            {currentPiece && (
                <div
                    className={`piece ${squaresOccupiedByEnemy}`}
                    datatype={currentPiece.team === Team.WHITE ? "white" : "black"}
                    style={{
                        backgroundImage: `url(${currentPiece.image})`,
                    }}
                ></div>
            )}
        </div>
    );
}
