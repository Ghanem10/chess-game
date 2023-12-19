import React from "react";
import { Team } from "../lib/movement/constants/functions";
import { checkCurrentSquare } from "../../util/_helper_common";

export default function Squares(props) {
    const {
        highlightSquare, grabbingPiece,
        MovingPiece, droppingPiece, piecesTurns,
        piece, x, y, position, activePiece,
    } = props;

    let updatedClassName, squaresOccupiedByEnemy = "";

    let updateBoardColor =  "lightskyblue";

    const availableSquares = highlightSquare
        .some((square) => square.x === x && square.y === y);

    const [ 
        currentPiece, 
        currentTeam, 
        squareColor 
    ] = checkCurrentSquare(piece, piecesTurns, position, x, y);

    for (let i = 1; i < 8; i++) {

        if (!squareColor) {
            updatedClassName = `${updateBoardColor}-square`;
        } else {
            updatedClassName = "white-square";
        }
    }

    if (activePiece !== null) {
        const isMatched = activePiece.getAttribute("datatype");
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
