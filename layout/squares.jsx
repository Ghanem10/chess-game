import React from "react";

export default function Squares(props) {
    const {
        grabbingPiece,
        MovingPiece,
        droppingPiece,
        index, piece, x, y,
        position, state,
        highlightSquare,
        updateBoardColor
    } = props;

    const totalNumberOfSquares = 6;
    let updatedClassName, squaresOccupiedByEnemy = "";

    // CurrentPiece used to highlight the enemy pieces on the board.
    const currentPiece = piece.find((p) => p.x === x && p.y === y);
    
    // Get last number of each row to apply the color on squares.
    const lastChar = position.slice(-1)[0];
    const number = parseInt(lastChar, 10);
    const isColor = number % 2 === 0;
    
    
    // Create the board positions based on this array.
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const charIndex = chars.indexOf(position.charAt(0));
    
    // If the board starts with num [8] then apply white color to square.
    const isWhiteSquare = charIndex % 2 === 0;
    const squareColor = isColor ? isWhiteSquare : !isWhiteSquare;


    // Update the squares with their corresponding color.
    for (let i = 1; i < totalNumberOfSquares; i++) {
        
        // squareColor checking if the square is white.
        if (squareColor) {

            updatedClassName = `${updateBoardColor}-square`;

        } else {
            updatedClassName = "white-square";
        }
    }

    // Push all squares positions that matches the possible moves of the pieces on the board.
    const availableSquares = highlightSquare.some((square) => square.x === x && square.y === y);

    // Simple check for if there's a piece [grabbed].
    if (state.activePiece !== null && availableSquares) {
       
        // Highlight enemy positions by the attacking piece.
        if (currentPiece) {

            // Highlight that square by adding the name of the team for styling.
            squaresOccupiedByEnemy += `${currentPiece.team}`;
        
        } else {

            // if there's no enemy pieces, highlight the squares only.
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
                    className={`piece ${squaresOccupiedByEnemy}`}
                    style={{
                        backgroundImage: `url(${currentPiece.image})`,
                    }}
                ></div>
            )}
        </div>
    );
}
