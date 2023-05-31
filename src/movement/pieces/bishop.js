import { 
    squareOccupied, 
    SquareEmptyOrOccupiedByOpponent, 
    squareOccupiedByOpponent, 
    squareOccupiedByKing 
} from "../rules/reference";

export const bishopMove = (previousX, previousY, x, y, team, chessBoard) => {
    const DiagonalWidthHieght = 8;

    for (let i = 1; i < DiagonalWidthHieght; i++) {
        // TOP RIGHT
        if (x > previousX && y < previousY) {
            const passedPosition = { x: previousX + i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // TOP LEFT
        if (x < previousX && y < previousY) {
            const passedPosition = { x: previousX - i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }

        // BOTTOM RIGHT
        if (x > previousX && y > previousY) {
            const passedPosition = { x: previousX + i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // BOTTOM LEFT
        if (x < previousX && y > previousY) {
            const passedPosition = { x: previousX - i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}

export function getPossibleBishopMoves(bishop, chessBoard) {
    const possiblePositions = [];
    const diagonalWidthHeight = 8;
    
    function traverseDiagonal(dx, dy) {
        for (let i = 1; i < diagonalWidthHeight; i++) {
            const passedPosition = { x: bishop.x + i * dx, y: bishop.y + i * dy };
            const insideBoardPositions =
            passedPosition.x < 8 &&
            passedPosition.y < 8 &&
            passedPosition.x > -1 &&
            passedPosition.y > -1;
    
            if (!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            } else if (squareOccupiedByKing(passedPosition.x, passedPosition.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            } else {
                if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, bishop.team)) {
                    possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
                }
                break;
            }
        }
    }
  
    traverseDiagonal(1, -1); // TOP RIGHT
    traverseDiagonal(-1, -1); // TOP LEFT
    traverseDiagonal(1, 1); // BOTTOM RIGHT
    traverseDiagonal(-1, 1); // BOTTOM LEFT
  
    return possiblePositions;
}  