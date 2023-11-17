import React from "react";
import { Team } from "../lib/movement/constants/functions";
import { checkCurrentSquare } from "../../util/_helper_common";
import Cookies from "js-cookie";

export default function Squares(props) {
    const {
        highlightSquare, grabbingPiece,
        MovingPiece, droppingPiece, piecesTurns,
        piece, x, y, position, state,
    } = props;

    const totalNumberOfSquares = 8;
    let updatedClassName, squaresOccupiedByEnemy = "";

    let updateBoardColor = Cookies.get("color") 
            ? Cookies.get("color") 
            : "lightskyblue";

    const availableSquares = highlightSquare
        .some((square) => square.x === x && square.y === y);

    const [ 
        currentPiece, 
        currentTeam, 
        squareColor 
    ] = checkCurrentSquare(piece, piecesTurns, position, x, y);

    for (let i = 1; i < totalNumberOfSquares; i++) {

        if (!squareColor) {
            updatedClassName = `${updateBoardColor}-square`;
        } else {
            updatedClassName = "white-square";
        }
    }

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
